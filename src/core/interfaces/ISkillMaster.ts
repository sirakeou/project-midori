import type { Skill } from '../entities/skillMaster';

/**
 * スキルマスタを管理するリポジトリのインターフェース
 *
 * データソースの実装に依存しない抽象層を提供する。
 * SQLite、Firebase、Supabase等、異なるデータソースへの切り替えが可能。
 */
export interface ISkillMaster {
    /**
     * 全てのスキルマスタを取得する
     * @returns スキル一覧
     */
    getAllSkills(): Promise<Skill[]>;

    /**
     * IDを指定してスキルマスタを取得する
     * @param id スキルID
     * @returns スキル情報、存在しない場合はnull
     */
    getSkillById(id: number): Promise<Skill | null>;

    /**
     * カテゴリを指定してスキルマスタを取得する
     * @param category1 第1カテゴリ
     * @param category2 第2カテゴリ（オプション）
     * @returns スキル一覧
     */
    getSkillsByCategory(category1: string, category2?: string): Promise<Skill[]>;

    /**
     * スキルマスタを作成する
     * @param skill スキル情報
     */
    createSkill(skill: import('../entities/skillMaster').SkillInsert): Promise<void>;

    /**
     * スキルマスタを更新する
     * @param id スキルID
     * @param updates 更新内容
     */
    updateSkill(id: number, updates: import('../entities/skillMaster').SkillUpdate): Promise<void>;

    /**
     * スキルマスタを削除する
     * @param id スキルID
     */
    deleteSkill(id: number): Promise<void>;
}
