import { IUser } from "../../interface/IUser";
import { client } from "../../config/db";

export async function ser_getEmployees(): Promise<IUser[]> {
    try {
		const tmp = await client.query(
			`SELECT id, name, email, role
             FROM users
			 WHERE role != 'admin' AND role != 'manager'`
		);

        const res: IUser[] = tmp.rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role,
        }));

		return res;
	} catch (error) {
		console.error('Error in ser_update_output:', error);
		return [];
	}
}