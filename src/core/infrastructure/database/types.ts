// データベース層固有の型定義
// このファイルにはデータベーステーブルとドメインモデルの変換に必要な型のみを定義

import type { WorkPreferences } from '../../entities/enums';

/**
 * データベースの個人プロフィールテーブルの型
 * work_preferencesはJSON文字列として保存される
 */
export interface PersonalProfileRow {
  id: number;
  employee_id: string;
  photo_path: string | null;
  career: string | null;
  hobbies: string | null;
  self_introduction: string | null;
  triggers: string | null;
  work_preferences: string | null; // JSON文字列
  updated_at: string;
  created_at: string;
}

/**
 * JSON文字列をパースしてWorkPreferencesに変換するヘルパー
 */
export function parseWorkPreferences(json: string | null): WorkPreferences | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as WorkPreferences;
  } catch {
    return null;
  }
}

/**
 * WorkPreferencesをJSON文字列に変換するヘルパー
 */
export function stringifyWorkPreferences(prefs: WorkPreferences | null): string | null {
  if (!prefs) return null;
  return JSON.stringify(prefs);
}
