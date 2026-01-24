import { getDatabase } from './database';
import type { User, UserInsert, UserUpdate } from '../entities/user';
import type { IUser } from '../interfaces/IUser';

/**
 * SQLiteを使用したユーザーリポジトリの実装
 */
export class UserRepository implements IUser {
    /**
     * 全ユーザーを取得
     */
    async getUsers(): Promise<User[]> {
        const db = await getDatabase();
        return await db.select<User[]>('SELECT * FROM users ORDER BY employee_id');
    }

    /**
     * 社員IDを指定してユーザー情報を取得する
     */
    async getUser(employeeId: string): Promise<User | null> {
        const db = await getDatabase();
        const users = await db.select<User[]>(
            'SELECT * FROM users WHERE employee_id = ?',
            [employeeId]
        );
        return users.length > 0 ? users[0] : null;
    }

    /**
     * ユーザーを作成
     */
    async createUser(user: UserInsert): Promise<void> {
        const db = await getDatabase();
        await db.execute(
            'INSERT INTO users (employee_id, name, position) VALUES (?, ?, ?)',
            [user.employee_id, user.name, user.position]
        );
    }

    /**
     * ユーザーを更新
     */
    async updateUser(employeeId: string, updates: UserUpdate): Promise<void> {
        const db = await getDatabase();
        const fields: string[] = [];
        const values: any[] = [];

        if (updates.name !== undefined) {
            fields.push('name = ?');
            values.push(updates.name);
        }
        if (updates.position !== undefined) {
            fields.push('position = ?');
            values.push(updates.position);
        }

        if (fields.length === 0) return;

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(employeeId);

        await db.execute(
            `UPDATE users SET ${fields.join(', ')} WHERE employee_id = ?`,
            values
        );
    }

    /**
     * ユーザーを削除
     */
    async deleteUser(employeeId: string): Promise<void> {
        const db = await getDatabase();
        await db.execute('DELETE FROM users WHERE employee_id = ?', [employeeId]);
    }
}
