import { getDatabase } from './database';
import { parseWorkPreferences as parsePrefs, stringifyWorkPreferences as stringifyPrefs, type PersonalProfileRow } from './database/types';
import type { PersonalProfile, PersonalProfileInsert } from '../entities/user';
import type { IPersonalProfile } from '../interfaces/IPersonalProfile';

/**
 * SQLiteを使用したプロフィールリポジトリの実装
 */
export class PersonalProfileRepository implements IPersonalProfile {
    /**
     * 特定社員の最新プロフィールを取得
     */
    async getLatestPersonalProfile(employeeId: string): Promise<PersonalProfile | null> {
        const db = await getDatabase();
        const profiles = await db.select<PersonalProfileRow[]>(
            'SELECT * FROM personal_profiles WHERE employee_id = ? ORDER BY updated_at DESC LIMIT 1',
            [employeeId]
        );

        if (profiles.length === 0) return null;

        const row = profiles[0];
        return {
            ...row,
            work_preferences: parsePrefs(row.work_preferences),
        };
    }

    /**
     * プロフィールを作成（バージョン管理）
     */
    async createPersonalProfile(profile: PersonalProfileInsert): Promise<void> {
        const db = await getDatabase();
        const workPreferencesJson = stringifyPrefs(profile.work_preferences);

        await db.execute(
            'INSERT INTO personal_profiles (employee_id, photo_path, career, hobbies, self_introduction, triggers, work_preferences, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                profile.employee_id,
                profile.photo_path,
                profile.career,
                profile.hobbies,
                profile.self_introduction,
                profile.triggers,
                workPreferencesJson,
                // updated_at is in PersonalProfileInsert? Yes.
                // But in logic it was passed.
                // I should check if PersonalProfileInsert has updated_at.
                // It is Omit<PersonalProfile, 'id' | 'created_at'>.
                // created_at is automatic in DB maybe? or we omit it and DB sets it?
                // The Insert logic in database/index.ts had updated_at.
                // created_at is NOT in insert logic.
                // So this is correct.
                profile.updated_at || new Date().toISOString(),
            ]
        );
    }

    /**
     * プロフィール履歴を取得
     */
    async getPersonalProfileHistory(employeeId: string): Promise<PersonalProfile[]> {
        const db = await getDatabase();
        const profiles = await db.select<PersonalProfileRow[]>(
            'SELECT * FROM personal_profiles WHERE employee_id = ? ORDER BY updated_at DESC',
            [employeeId]
        );

        return profiles.map((row) => ({
            ...row,
            work_preferences: parsePrefs(row.work_preferences),
        }));
    }

    /**
     * プロフィールを削除
     */
    async deletePersonalProfile(id: number): Promise<void> {
        const db = await getDatabase();
        await db.execute('DELETE FROM personal_profiles WHERE id = ?', [id]);
    }
}
