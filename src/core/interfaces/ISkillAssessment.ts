import type {
    SkillAssessment,
    LatestSkillAssessment,
    SkillAssessmentInsert,
    EmployeeSkillSummary,
} from '../entities/skillAssessment';

/**
 * スキル評価を管理するリポジトリのインターフェース
 *
 * データソースの実装に依存しない抽象層を提供する。
 * SQLite、Firebase、Supabase等、異なるデータソースへの切り替えが可能。
 */
export interface ISkillAssessment {
    /**
     * 社員の最新スキル評価を取得する
     * @param employeeId 社員ID
     * @returns スキル評価一覧
     */
    getEmployeeSkills(employeeId: string): Promise<LatestSkillAssessment[]>;

    /**
     * 特定スキルの評価を持つ社員を取得する
     * @param skillId スキルID
     * @returns スキル評価一覧
     */
    getEmployeesBySkill(skillId: number): Promise<LatestSkillAssessment[]>;

    /**
     * スキル評価を作成する（バージョン管理）
     * @param assessment スキル評価情報
     */
    createSkillAssessment(assessment: SkillAssessmentInsert): Promise<void>;

    /**
     * 特定社員の全スキル評価履歴を取得する
     * @param employeeId 社員ID
     * @param skillId スキルID
     * @returns スキル評価履歴
     */
    getSkillAssessmentHistory(employeeId: string, skillId: number): Promise<SkillAssessment[]>;

    /**
     * スキル評価を削除する
     * @param id スキル評価ID
     */
    deleteSkillAssessment(id: number): Promise<void>;

    /**
     * 全社員のスキル一覧を取得する
     * @returns 社員スキルサマリー一覧
     */
    getEmployeeSkillSummary(): Promise<EmployeeSkillSummary[]>;
}
