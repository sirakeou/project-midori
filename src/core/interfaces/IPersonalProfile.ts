import type { PersonalProfile, PersonalProfileInsert } from '../entities/user';

/**
 * 個人プロフィール情報を管理するリポジトリのインターフェース
 *
 * データソースの実装に依存しない抽象層を提供する。
 * SQLite、Firebase、Supabase等、異なるデータソースへの切り替えが可能。
 */
export interface IPersonalProfile {
    /**
     * 社員の最新の個人プロフィールを取得する
     * @param employeeId 社員ID
     * @returns 個人プロフィール情報、存在しない場合はnull
     */
    getLatestPersonalProfile(employeeId: string): Promise<PersonalProfile | null>;

    /**
     * 個人プロフィールを作成する（バージョン管理）
     * @param profile 個人プロフィール情報
     */
    createPersonalProfile(profile: PersonalProfileInsert): Promise<void>;

    /**
     * 社員の個人プロフィール履歴を取得する
     * @param employeeId 社員ID
     * @returns 個人プロフィール履歴一覧
     */
    getPersonalProfileHistory(employeeId: string): Promise<PersonalProfile[]>;

    /**
     * 個人プロフィールを削除する
     * @param id 個人プロフィールID
     */
    deletePersonalProfile(id: number): Promise<void>;
}
