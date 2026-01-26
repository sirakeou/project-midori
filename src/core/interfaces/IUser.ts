import type { User, UserInsert, UserUpdate } from '../entities/user';

/**
 * ユーザー情報を管理するリポジトリのインターフェース
 *
 * データソースの実装に依存しない抽象層を提供する。
 * SQLite、Firebase、Supabase等、異なるデータソースへの切り替えが可能。
 */
export interface IUser {
    /**
     * 全てのユーザーを取得する
     * @returns ユーザー一覧
     */
    getUsers(): Promise<User[]>;

    /**
     * 社員IDを指定してユーザー情報を取得する
     * @param employeeId 社員ID
     * @returns ユーザー情報、存在しない場合はnull
     */
    getUser(employeeId: string): Promise<User | null>;

    /**
     * ユーザーを作成する
     * @param user ユーザー情報
     */
    createUser(user: UserInsert): Promise<void>;

    /**
     * ユーザー情報を更新する
     * @param employeeId 社員ID
     * @param updates 更新内容
     */
    updateUser(employeeId: string, updates: UserUpdate): Promise<void>;

    /**
     * ユーザーを削除する
     * @param employeeId 社員ID
     */
    deleteUser(employeeId: string): Promise<void>;
}
