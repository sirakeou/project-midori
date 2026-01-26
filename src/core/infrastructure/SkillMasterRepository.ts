import { getDatabase } from './database';
import type { Skill, SkillInsert, SkillUpdate } from '../entities/skillMaster';
import type { ISkillMaster } from '../interfaces/ISkillMaster';

/**
 * SQLiteを使用したスキルマスタリポジトリの実装
 */
export class SkillMasterRepository implements ISkillMaster {
    /**
     * 全スキルを取得
     */
    async getAllSkills(): Promise<Skill[]> {
        const db = await getDatabase();
        return await db.select<Skill[]>(
            'SELECT * FROM skills ORDER BY category1, category2, name'
        );
    }

    /**
     * スキルをIDで取得
     */
    async getSkillById(id: number): Promise<Skill | null> {
        const db = await getDatabase();
        const skills = await db.select<Skill[]>('SELECT * FROM skills WHERE id = ?', [
            id,
        ]);
        return skills.length > 0 ? skills[0] : null;
    }

    /**
     * カテゴリでスキルをフィルタ
     */
    async getSkillsByCategory(
        category1: string,
        category2?: string
    ): Promise<Skill[]> {
        const db = await getDatabase();
        if (category2 !== undefined) {
            return await db.select<Skill[]>(
                'SELECT * FROM skills WHERE category1 = ? AND category2 = ? ORDER BY name',
                [category1, category2]
            );
        }
        return await db.select<Skill[]>(
            'SELECT * FROM skills WHERE category1 = ? ORDER BY name',
            [category1]
        );
    }

    /**
     * スキルを作成
     */
    async createSkill(skill: SkillInsert): Promise<void> {
        const db = await getDatabase();
        await db.execute(
            'INSERT INTO skills (name, category1, category2, description) VALUES (?, ?, ?, ?)',
            [skill.name, skill.category1, skill.category2, skill.description]
        );
    }

    /**
     * スキルを更新
     */
    async updateSkill(id: number, updates: SkillUpdate): Promise<void> {
        const db = await getDatabase();
        const fields: string[] = [];
        const values: unknown[] = [];

        if (updates.name !== undefined) {
            fields.push('name = ?');
            values.push(updates.name);
        }
        if (updates.category1 !== undefined) {
            fields.push('category1 = ?');
            values.push(updates.category1);
        }
        if (updates.category2 !== undefined) {
            fields.push('category2 = ?');
            values.push(updates.category2);
        }
        if (updates.description !== undefined) {
            fields.push('description = ?');
            values.push(updates.description);
        }

        if (fields.length === 0) return;

        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);

        await db.execute(
            `UPDATE skills SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
    }

    /**
     * スキルを削除
     */
    async deleteSkill(id: number): Promise<void> {
        const db = await getDatabase();
        await db.execute('DELETE FROM skills WHERE id = ?', [id]);
    }
}
