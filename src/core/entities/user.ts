import type { Position, WorkPreferences } from './enums';

/**
 * ユーザー（社員）
 */
export interface User {
  employee_id: string;
  name: string;
  position: Position;
  created_at: string;
  updated_at: string;
}

/**
 * 個人プロフィール
 */
export interface PersonalProfile {
  id: number;
  employee_id: string;
  photo_path: string | null;
  career: string | null;
  hobbies: string | null;
  self_introduction: string | null;
  triggers: string | null;
  work_preferences: WorkPreferences | null;
  updated_at: string;
  created_at: string;
}

/**
 * INSERT用の型（IDや自動生成フィールドを除外）
 */
export type UserInsert = Omit<User, 'created_at' | 'updated_at'>;

/**
 * UPDATE用の型（主キーや自動生成フィールドを除外）
 */
export type UserUpdate = Partial<Omit<User, 'employee_id' | 'created_at' | 'updated_at'>>;

/**
 * INSERT用の型（IDや自動生成フィールドを除外）
 */
export type PersonalProfileInsert = Omit<PersonalProfile, 'id' | 'created_at'>;

/**
 * UPDATE用の型（主キーや自動生成フィールドを除外）
 */
export type PersonalProfileUpdate = Partial<Omit<PersonalProfile, 'id' | 'employee_id' | 'created_at'>>;
