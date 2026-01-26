/**
 * React単独起動時に使用するMockDatabase実装
 * Tauri Databaseと同じインターフェースを提供し、mockDataを返す
 */

import { mockUsers, mockSkills, mockPersonalProfiles, mockLatestSkillAssessments } from './mockData';

/**
 * Tauri Database互換のMockDatabase実装
 */
export class MockDatabase {
  /**
   * SELECTクエリを実行してmockDataを返す
   */
  async select<T = unknown[]>(query: string, bindValues?: unknown[]): Promise<T> {
    const normalizedQuery = query.trim().toLowerCase();

    // usersテーブル
    if (normalizedQuery.includes('from users')) {
      if (normalizedQuery.includes('where employee_id')) {
        const employeeId = bindValues?.[0] as string;
        const user = mockUsers.find(u => u.employee_id === employeeId);
        return (user ? [user] : []) as T;
      }
      return mockUsers as T;
    }

    // personal_profilesテーブル
    if (normalizedQuery.includes('from personal_profiles')) {
      if (normalizedQuery.includes('where employee_id')) {
        const employeeId = bindValues?.[0] as string;
        const profiles = mockPersonalProfiles.filter(p => p.employee_id === employeeId);
        return profiles as T;
      }
      if (normalizedQuery.includes('where id')) {
        const id = bindValues?.[0] as number;
        const profile = mockPersonalProfiles.find(p => p.id === id);
        return (profile ? [profile] : []) as T;
      }
      return mockPersonalProfiles as T;
    }

    // skill_masterテーブル
    if (normalizedQuery.includes('from skill_master')) {
      if (normalizedQuery.includes('where id')) {
        const id = bindValues?.[0] as number;
        const skill = mockSkills.find(s => s.id === id);
        return (skill ? [skill] : []) as T;
      }
      if (normalizedQuery.includes('where category1')) {
        const category = bindValues?.[0] as string;
        const skills = mockSkills.filter(s => s.category1 === category);
        return skills as T;
      }
      return mockSkills as T;
    }

    // latest_skill_assessments ビュー
    if (normalizedQuery.includes('from latest_skill_assessments')) {
      if (normalizedQuery.includes('where employee_id')) {
        const employeeId = bindValues?.[0] as string;
        const assessments = mockLatestSkillAssessments.filter(a => a.employee_id === employeeId);
        return assessments as T;
      }
      return mockLatestSkillAssessments as T;
    }

    // skill_assessmentsテーブル（latest_skill_assessmentsと同様に扱う）
    if (normalizedQuery.includes('from skill_assessments')) {
      if (normalizedQuery.includes('where employee_id')) {
        const employeeId = bindValues?.[0] as string;
        const assessments = mockLatestSkillAssessments.filter(a => a.employee_id === employeeId);
        return assessments as T;
      }
      return mockLatestSkillAssessments as T;
    }

    console.warn('[MockDatabase] Unhandled SELECT query:', query);
    return [] as T;
  }

  /**
   * INSERT/UPDATE/DELETEクエリを実行（Mock環境では何もしない）
   */
  async execute(query: string): Promise<{ rowsAffected: number; lastInsertId: number }> {
    const normalizedQuery = query.trim().toLowerCase();

    // トランザクション制御
    if (normalizedQuery.startsWith('begin') ||
        normalizedQuery.startsWith('commit') ||
        normalizedQuery.startsWith('rollback')) {
      return { rowsAffected: 0, lastInsertId: 0 };
    }

    // PRAGMA（設定）
    if (normalizedQuery.startsWith('pragma')) {
      return { rowsAffected: 0, lastInsertId: 0 };
    }

    // INSERT/UPDATE/DELETE（Mock環境では実際には変更しない）
    if (normalizedQuery.startsWith('insert') ||
        normalizedQuery.startsWith('update') ||
        normalizedQuery.startsWith('delete')) {
      console.info('[MockDatabase] Simulated execute:', query.substring(0, 50));
      return { rowsAffected: 1, lastInsertId: 1 };
    }

    console.warn('[MockDatabase] Unhandled EXECUTE query:', query);
    return { rowsAffected: 0, lastInsertId: 0 };
  }

  /**
   * データベース接続を閉じる（Mock環境では何もしない）
   */
  async close(): Promise<void> {
    // No-op for mock
  }
}
