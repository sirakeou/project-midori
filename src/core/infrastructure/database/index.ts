import Database from '@tauri-apps/plugin-sql';
import { MockDatabase } from './mockDatabase';

// データベース接続のシングルトン
let dbInstance: Database | MockDatabase | null = null;

/**
 * Tauri環境かどうかを判定
 * __TAURI_INTERNALS__ はTauriアプリ内で確実に存在する
 */
function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && (
    '__TAURI_INTERNALS__' in window ||
    '__TAURI__' in window
  );
}

/**
 * データベース接続を取得
 * Tauri環境: 本物のSQLiteデータベース
 * React単独: MockDatabase（mockDataを使用）
 */
export async function getDatabase(): Promise<Database | MockDatabase> {
  if (!dbInstance) {
    if (isTauriEnvironment()) {
      // Tauri環境: 本物のデータベース
      dbInstance = await Database.load('sqlite:app.db');
      // 外部キー制約を有効化
      await dbInstance.execute('PRAGMA foreign_keys = ON');
      console.info('[Database] Using Tauri SQLite database');
    } else {
      // React単独: MockDatabase
      dbInstance = new MockDatabase();
      console.info('[Database] Using MockDatabase with mockData');
    }
  }
  return dbInstance;
}

/**
 * トランザクションを実行
 */
export async function executeTransaction(
  operations: (db: Database | MockDatabase) => Promise<void>
): Promise<void> {
  const db = await getDatabase();
  await db.execute('BEGIN TRANSACTION');
  try {
    await operations(db);
    await db.execute('COMMIT');
  } catch (error) {
    await db.execute('ROLLBACK');
    throw error;
  }
}
