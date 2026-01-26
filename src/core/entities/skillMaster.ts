import type { SkillCategory1, SkillCategory2 } from './enums';

/**
 * スキル
 */
export interface Skill {
  id: number;
  name: string;
  category1: SkillCategory1;
  category2: SkillCategory2 | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * INSERT用の型（IDや自動生成フィールドを除外）
 */
export type SkillInsert = Omit<Skill, 'id' | 'created_at' | 'updated_at'>;

/**
 * UPDATE用の型（主キーや自動生成フィールドを除外）
 */
export type SkillUpdate = Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>;
