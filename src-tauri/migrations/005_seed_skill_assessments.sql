-- スキル評価テストデータ
-- 20人の社員に対するスキルレベル設定

-- すべてのユーザーに対してすべてのスキルをレベル0で初期化
INSERT INTO skill_assessments (employee_id, skill_id, level, updated_at)
SELECT
    u.employee_id,
    s.id,
    0,
    CURRENT_TIMESTAMP
FROM users u
CROSS JOIN skills s;

-- 各ユーザーの実際のスキルレベルで更新していく

-- 100001: 山田太郎 (パートナー) - 戦略コンサルタント、金融業界エキスパート
UPDATE skill_assessments
SET level = CASE skill_id
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '銀行') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '証券') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '保険') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'フィンテック') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ビジネス戦略立案') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'IT戦略・ITガバナンス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'エンタープライズアーキテクチャ') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100001';

-- 100002: 佐藤花子 (パートナー) - AI/DXリーダー、製造業エキスパート
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 4
    -- インダストリスキル（6つ）
    WHEN (SELECT id FROM skills WHERE name = '自動車') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '電機・電子機器') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '産業機械') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '官公庁・自治体') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計14）
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'クラウド戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '生成AI') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'MLOps') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'AI倫理・ガバナンス') THEN 4
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100002';

-- 100003: 鈴木一郎 (シニアマネージャー) - データアーキテクト、小売業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（5つ）
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '物流') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '卸売・商社') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計15）
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウド戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'RDB管理') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データウェアハウス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データレイク') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ビッグデータ基盤') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100003';

-- 100004: 田中美咲 (シニアマネージャー) - AIエンジニア、医療業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = '医薬品・医療機器') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '医療・ヘルスケア') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計16）
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データセキュリティ') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '自然言語処理') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コンピュータビジョン') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '生成AI') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'MLOps') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '特徴量エンジニアリング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'モデル評価・選択') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'MLプラットフォーム') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '時系列分析') THEN 3
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100004';

-- 100005: 高橋健太 (シニアマネージャー) - ITコンサルタント、通信業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 4
    -- インダストリスキル（5つ）
    WHEN (SELECT id FROM skills WHERE name = '通信キャリア') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '銀行') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '官公庁・自治体') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計13）
    WHEN (SELECT id FROM skills WHERE name = 'ビジネス戦略立案') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'IT戦略・ITガバナンス') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'エンタープライズアーキテクチャ') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '業務プロセス改革') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'PMO') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'クラウド戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'セキュリティ戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100005';

-- 100006: 伊藤愛 (マネージャー) - データエンジニア、エネルギー業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = 'エネルギー') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '官公庁・自治体') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '建設・土木') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計14）
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'RDB管理') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データウェアハウス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データレイク') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ビッグデータ基盤') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100006';

-- 100007: 渡辺翔太 (マネージャー) - MLエンジニア、広告業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（5つ）
    WHEN (SELECT id FROM skills WHERE name = '広告・マーケティング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '放送・メディア') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計16）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ビッグデータ基盤') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '自然言語処理') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '生成AI') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'MLOps') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '特徴量エンジニアリング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'モデル評価・選択') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'MLプラットフォーム') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '推薦システム') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'AutoML') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100007';

-- 100008: 中村優子 (マネージャー) - BIスペシャリスト、不動産業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 4
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = '不動産') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '建設・土木') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計13）
    WHEN (SELECT id FROM skills WHERE name = 'データ戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データウェアハウス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100008';

-- 100009: 小林大輔 (マネージャー) - PMO、銀行・証券業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 4
    -- インダストリスキル（5つ）
    WHEN (SELECT id FROM skills WHERE name = '銀行') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '証券') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '保険') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'フィンテック') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 3
    -- テクニカルスキル（戦略・データマネジメント・AI合計12）
    WHEN (SELECT id FROM skills WHERE name = 'ビジネス戦略立案') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'IT戦略・ITガバナンス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'エンタープライズアーキテクチャ') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '業務プロセス改革') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'PMO') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'セキュリティ戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100009';

-- 100010: 加藤梨花 (シニアコンサルタント) - データサイエンティスト、教育業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（3つ）
    WHEN (SELECT id FROM skills WHERE name = '教育') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計15）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '自然言語処理') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '特徴量エンジニアリング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'モデル評価・選択') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'R') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'MLプラットフォーム') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '時系列分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '推薦システム') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100010';

-- 100011: 吉田直樹 (シニアコンサルタント) - データエンジニア、物流業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = '物流') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '卸売・商社') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計13）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'RDB管理') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データレイク') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ビッグデータ基盤') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '時系列分析') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100011';

-- 100012: 山本さくら (シニアコンサルタント) - BIコンサルタント、観光業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = '観光・ホスピタリティ') THEN 4
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '交通・運輸') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計11）
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データウェアハウス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100012';

-- 100013: 松本隼人 (シニアコンサルタント) - AIエンジニア、ゲーム業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（3つ）
    WHEN (SELECT id FROM skills WHERE name = 'ゲーム') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計15）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'コンピュータビジョン') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '生成AI') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'MLOps') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '特徴量エンジニアリング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'モデル評価・選択') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'MLプラットフォーム') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '強化学習') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '推薦システム') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100013';

-- 100014: 井上瑞希 (シニアコンサルタント) - ITコンサルタント、製造業経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 4
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 3
    -- インダストリスキル（5つ）
    WHEN (SELECT id FROM skills WHERE name = '化学・素材') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '産業機械') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '電機・電子機器') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '自動車') THEN 2
    -- テクニカルスキル（戦略・データマネジメント・AI合計12）
    WHEN (SELECT id FROM skills WHERE name = 'DX戦略') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'IT戦略・ITガバナンス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'エンタープライズアーキテクチャ') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '業務プロセス改革') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'PMO') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITコンサルティング') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウド戦略') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100014';

-- 100015: 木村拓也 (コンサルタント) - データアナリスト、食品業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（3つ）
    WHEN (SELECT id FROM skills WHERE name = '食品・飲料') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '小売') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計10）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'R') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '時系列分析') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100015';

-- 100016: 林麻衣 (コンサルタント) - データエンジニア、化学業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（3つ）
    WHEN (SELECT id FROM skills WHERE name = '化学・素材') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '産業機械') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計11）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'RDB管理') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データレイク') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ビッグデータ基盤') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 1
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100016';

-- 100017: 清水陽介 (コンサルタント) - MLエンジニア、フィンテック経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（4つ）
    WHEN (SELECT id FROM skills WHERE name = 'フィンテック') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '銀行') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計13）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '深層学習') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '自然言語処理') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'MLOps') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '特徴量エンジニアリング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'モデル評価・選択') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'MLプラットフォーム') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '時系列分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '推薦システム') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100017';

-- 100018: 森野あかり (コンサルタント) - BIアナリスト、医療業界経験
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 2
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 2
    -- インダストリスキル（3つ）
    WHEN (SELECT id FROM skills WHERE name = '医療・ヘルスケア') THEN 3
    WHEN (SELECT id FROM skills WHERE name = '医薬品・医療機器') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計11）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データウェアハウス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データモデリング') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 3
    WHEN (SELECT id FROM skills WHERE name = 'データガバナンス') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データセキュリティ') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100018';

-- 100019: 池田蓮 (アナリスト) - 新人データアナリスト
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 1
    -- インダストリスキル（2つ）
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計7）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'BI・データ可視化') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '機械学習基礎') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'R') THEN 1
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100019';

-- 100020: 斎藤結衣 (アナリスト) - 新人データエンジニア
UPDATE skill_assessments
SET level = CASE skill_id
    -- ビジネススキル（全6つ）
    WHEN (SELECT id FROM skills WHERE name = 'ロジカルシンキング') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '問題解決能力') THEN 1
    WHEN (SELECT id FROM skills WHERE name = '調査・分析') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'コミュニケーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'ドキュメンテーション') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'プレゼンテーション') THEN 1
    -- インダストリスキル（2つ）
    WHEN (SELECT id FROM skills WHERE name = 'ITサービス') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'ソフトウェア・SaaS') THEN 1
    -- テクニカルスキル（戦略・データマネジメント・AI合計8）
    WHEN (SELECT id FROM skills WHERE name = 'SQL') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'データベース設計') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'RDB管理') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'NoSQL') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'ETL/ELT') THEN 2
    WHEN (SELECT id FROM skills WHERE name = 'クラウドデータサービス') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'データ分析') THEN 1
    WHEN (SELECT id FROM skills WHERE name = 'Python (AI/ML)') THEN 2
    ELSE level
END,
updated_at = CURRENT_TIMESTAMP
WHERE employee_id = '100020';
