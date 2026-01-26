-- 外部キー制約を有効化
PRAGMA foreign_keys = ON;

-- ユーザーテーブル
CREATE TABLE users (
  employee_id TEXT PRIMARY KEY CHECK(LENGTH(employee_id) = 6 AND employee_id GLOB '[0-9][0-9][0-9][0-9][0-9][0-9]'),
  name TEXT NOT NULL,
  position TEXT NOT NULL CHECK(position IN ('ANALYST', 'CONSULTANT', 'SENIOR_CONSULTANT', 'MANAGER', 'SENIOR_MANAGER','DIRECTOR', 'PARTNER')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_position ON users(position);

-- スキルテーブル
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  category1 TEXT NOT NULL CHECK(category1 IN ('BUSINESS', 'INDUSTRY', 'TECHNICAL')),
  category2 TEXT CHECK(category2 IS NULL OR category2 IN ('STRATEGY', 'DATA_MANAGEMENT', 'AI')),
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK((category1 IN ('BUSINESS', 'INDUSTRY') AND category2 IS NULL) OR category1 = 'TECHNICAL')
);

CREATE INDEX idx_skills_category1 ON skills(category1);
CREATE INDEX idx_skills_category ON skills(category1, category2);

-- スキル評価テーブル
CREATE TABLE skill_assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id TEXT NOT NULL,
  skill_id INTEGER NOT NULL,
  level INTEGER NOT NULL CHECK(level >= 0 AND level <= 5),
  updated_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE(employee_id, skill_id, updated_at)
);

CREATE INDEX idx_skill_assessments_employee ON skill_assessments(employee_id);
CREATE INDEX idx_skill_assessments_skill ON skill_assessments(skill_id);
CREATE INDEX idx_skill_assessments_updated ON skill_assessments(updated_at);
CREATE INDEX idx_skill_assessments_employee_updated ON skill_assessments(employee_id, updated_at);

-- 個人プロフィールテーブル
CREATE TABLE personal_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id TEXT NOT NULL,
  photo_path TEXT,
  career TEXT CHECK(LENGTH(career) <= 2000),
  hobbies TEXT CHECK(LENGTH(hobbies) <= 2000),
  self_introduction TEXT CHECK(LENGTH(self_introduction) <= 2000),
  triggers TEXT CHECK(LENGTH(triggers) <= 2000),
  work_preferences TEXT,
  updated_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(employee_id) ON DELETE CASCADE,
  UNIQUE(employee_id, updated_at)
);

CREATE INDEX idx_personal_profiles_employee ON personal_profiles(employee_id);
CREATE INDEX idx_personal_profiles_updated ON personal_profiles(updated_at);

-- ビュー: 最新スキル評価
CREATE VIEW latest_skill_assessments AS
SELECT
    sa.id,
    sa.employee_id,
    sa.skill_id,
    sa.level,
    sa.updated_at,
    s.name as skill_name,
    s.category1,
    s.category2
FROM skill_assessments sa
INNER JOIN skills s ON sa.skill_id = s.id
WHERE sa.updated_at = (
    SELECT MAX(updated_at)
    FROM skill_assessments
    WHERE employee_id = sa.employee_id
    AND skill_id = sa.skill_id
);

-- ビュー: 社員スキル一覧
CREATE VIEW employee_skill_summary AS
SELECT
    u.employee_id,
    u.name as employee_name,
    u.position,
    lsa.skill_name,
    lsa.category1,
    lsa.category2,
    lsa.level,
    lsa.updated_at
FROM users u
LEFT JOIN latest_skill_assessments lsa ON u.employee_id = lsa.employee_id
ORDER BY u.employee_id, lsa.category1, lsa.skill_name;
