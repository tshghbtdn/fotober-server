//File: src/services/accounts/addNewUser.ts
// File: src/services/accounts/addNewUser.ts
import { client } from "../../config/db";
import { hash } from "bcryptjs";

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '8');

if (!BCRYPT_SALT_ROUNDS) {
    throw new Error("Missing BCRYPT_SALT_ROUNDS in environment variables.");
}

// Hàm tạo cs_code từ name
const generateCSCode = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
}

export const ser_addNewUser = async (
    username: string,
    email: string,
    password: string,
    name: string,
    role: string
): Promise<string> => { // trả về userId
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    let userId: string;

    try {
        const query = `
            INSERT INTO users (username, password, name, email, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;

        const values = [username, hashedPassword, name, email, role];
        const result = await client.query(query, values);
        userId = result.rows[0].id;

        // Nếu role là saler thì tạo CS record
        if (role === 'saler') {
            const cs_code = generateCSCode(name);
            const cs_name = name;

            const csQuery = `
                INSERT INTO saler (id, cs_code, cs_name)
                VALUES ($1, $2, $3)
            `;
            await client.query(csQuery, [userId, cs_code, cs_name]);
        }

        return userId;
    } catch (err: any) {
        if (err.code === '23505') { // PostgreSQL duplicate key
            const detail = err.detail || 'Duplicate value';
            throw new Error(`Duplicate key error: ${detail}`);
        } else {
            throw err;
        }
    }
}
