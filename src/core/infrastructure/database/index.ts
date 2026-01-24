import Database from '@tauri-apps/plugin-sql';

// データベース接続のシングルトン
let dbInstance: Database | null = null;

/**
 * データベース接続を取得
 */
export async function getDatabase(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await Database.load('sqlite:app.db');
    // 外部キー制約を有効化
    await dbInstance.execute('PRAGMA foreign_keys = ON');
  }
  return dbInstance;
}

/**
 * トランザクションを実行
 */
export async function executeTransaction(
  operations: (db: Database) => Promise<void>
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
