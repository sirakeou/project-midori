import { getDatabase } from './database';
import type {
    SkillAssessment,
    LatestSkillAssessment,
    SkillAssessmentInsert,
    EmployeeSkillSummary,
} from '../entities/skillAssessment';
import type { ISkillAssessment } from '../interfaces/ISkillAssessment';

/**
 * SQLiteを使用したスキル評価リポジトリの実装
 */
export class SkillAssessmentRepository implements ISkillAssessment {
    /**
     * 特定社員の最新スキル評価を取得
     */
    async getEmployeeSkills(employeeId: string): Promise<LatestSkillAssessment[]> {
        const db = await getDatabase();
        return await db.select<LatestSkillAssessment[]>(
            'SELECT * FROM latest_skill_assessments WHERE employee_id = ? ORDER BY category1, skill_name',
            [employeeId]
        );
    }

    /**
     * 特定スキルの評価を持つ社員を取得
     */
    async getEmployeesBySkill(skillId: number): Promise<LatestSkillAssessment[]> {
        const db = await getDatabase();
        return await db.select<LatestSkillAssessment[]>(
            'SELECT * FROM latest_skill_assessments WHERE skill_id = ? ORDER BY level DESC, employee_id',
            [skillId]
        );
    }

    /**
     * スキル評価を作成（バージョン管理）
     */
    async createSkillAssessment(assessment: SkillAssessmentInsert): Promise<void> {
        const db = await getDatabase();
        await db.execute(
            'INSERT INTO skill_assessments (employee_id, skill_id, level, updated_at) VALUES (?, ?, ?, ?)',
            [
                assessment.employee_id,
                assessment.skill_id,
                assessment.level,
                assessment.updated_at,
            ]
        );
    }

    /**
     * 特定社員の全スキル評価履歴を取得
     */
    async getSkillAssessmentHistory(
        employeeId: string,
        skillId: number
    ): Promise<SkillAssessment[]> {
        const db = await getDatabase();
        return await db.select<SkillAssessment[]>(
            'SELECT * FROM skill_assessments WHERE employee_id = ? AND skill_id = ? ORDER BY updated_at DESC',
            [employeeId, skillId]
        );
    }

    /**
     * スキル評価を削除
     */
    async deleteSkillAssessment(id: number): Promise<void> {
        const db = await getDatabase();
        await db.execute('DELETE FROM skill_assessments WHERE id = ?', [id]);
    }

    /**
     * 全社員のスキル一覧を取得
     */
    async getEmployeeSkillSummary(): Promise<EmployeeSkillSummary[]> {
        const db = await getDatabase();
        return await db.select<EmployeeSkillSummary[]>(
            'SELECT * FROM employee_skill_summary'
        );
    }
}
