import type { Position, SkillCategory1, SkillCategory2 } from './enums';

/**
 * スキル評価
 */
export interface SkillAssessment {
  id: number;
  employee_id: string;
  skill_id: number;
  level: number; // 0-5
  updated_at: string;
  created_at: string;
}

/**
 * 最新スキル評価（スキル情報を含む）
 * ビュー: latest_skill_assessments
 */
export interface LatestSkillAssessment {
  id: number;
  employee_id: string;
  skill_id: number;
  level: number;
  updated_at: string;
  skill_name: string;
  category1: SkillCategory1;
  category2: SkillCategory2 | null;
}

/**
 * 社員スキル一覧（社員情報を含む）
 * ビュー: employee_skill_summary
 */
export interface EmployeeSkillSummary {
  employee_id: string;
  employee_name: string;
  position: Position;
  skill_name: string | null;
  category1: SkillCategory1 | null;
  category2: SkillCategory2 | null;
  level: number | null;
  updated_at: string | null;
}

/**
 * INSERT用の型（IDや自動生成フィールドを除外）
 */
export type SkillAssessmentInsert = Omit<SkillAssessment, 'id' | 'created_at'>;

/**
 * UPDATE用の型（主キーや自動生成フィールドを除外）
 */
export type SkillAssessmentUpdate = Partial<Omit<SkillAssessment, 'id' | 'employee_id' | 'skill_id' | 'created_at'>>;
