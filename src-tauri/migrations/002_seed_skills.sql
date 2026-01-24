-- スキルマスタデータ投入

-- ビジネススキル
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('ロジカルシンキング', 'BUSINESS', NULL, '論理的思考、体系的な分析、筋道を立てた思考', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('問題解決能力', 'BUSINESS', NULL, '課題発見、根本原因分析、解決策立案', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('調査・分析', 'BUSINESS', NULL, '情報収集、データ分析、インサイト抽出', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('コミュニケーション', 'BUSINESS', NULL, '効果的な意思疎通、傾聴、対人関係構築', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ドキュメンテーション', 'BUSINESS', NULL, '文書作成、技術文書、報告書作成', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('プレゼンテーション', 'BUSINESS', NULL, '発表スキル、資料作成、説得力のある伝達', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - 製造業
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('自動車', 'INDUSTRY', NULL, '自動車製造、EV、CASE、サプライチェーン', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('電機・電子機器', 'INDUSTRY', NULL, '家電、半導体、電子部品、製造プロセス', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('産業機械', 'INDUSTRY', NULL, '工作機械、ロボット、FA、プラント設備', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('化学・素材', 'INDUSTRY', NULL, '化学品、素材開発、プロセス産業', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('食品・飲料', 'INDUSTRY', NULL, '食品製造、品質管理、衛生管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('医薬品・医療機器', 'INDUSTRY', NULL, '創薬、治験、医療機器開発、薬事', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - 金融・保険
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('銀行', 'INDUSTRY', NULL, '預金、融資、決済、リテール・法人バンキング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('証券', 'INDUSTRY', NULL, '株式、債券、投資銀行、資産運用', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('保険', 'INDUSTRY', NULL, '生命保険、損害保険、アクチュアリー', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('フィンテック', 'INDUSTRY', NULL, 'デジタル決済、ブロックチェーン、デジタル金融', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - 情報通信
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('通信キャリア', 'INDUSTRY', NULL, '通信インフラ、5G/6G、ネットワーク運用', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ITサービス', 'INDUSTRY', NULL, 'SIer、コンサルティング、BPO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ソフトウェア・SaaS', 'INDUSTRY', NULL, 'パッケージ、クラウドサービス、サブスクリプション', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - 小売・流通
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('小売', 'INDUSTRY', NULL, '店舗運営、EC、オムニチャネル、商品管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('物流', 'INDUSTRY', NULL, 'サプライチェーン、倉庫管理、配送最適化', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('卸売・商社', 'INDUSTRY', NULL, '貿易、調達、在庫管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - サービス
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('医療・ヘルスケア', 'INDUSTRY', NULL, '病院、診療所、医療IT、ヘルステック', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('教育', 'INDUSTRY', NULL, '学校、eラーニング、EdTech', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('観光・ホスピタリティ', 'INDUSTRY', NULL, 'ホテル、旅行、インバウンド', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('不動産', 'INDUSTRY', NULL, '不動産開発、賃貸管理、PropTech', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - 公共・インフラ
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('官公庁・自治体', 'INDUSTRY', NULL, '行政、公共サービス、電子政府', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('エネルギー', 'INDUSTRY', NULL, '電力、ガス、再生可能エネルギー', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('交通・運輸', 'INDUSTRY', NULL, '鉄道、航空、海運、MaaS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('建設・土木', 'INDUSTRY', NULL, '建築、インフラ整備、BIM/CIM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- インダストリスキル - メディア・エンタメ
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('放送・メディア', 'INDUSTRY', NULL, 'テレビ、ラジオ、ストリーミング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('広告・マーケティング', 'INDUSTRY', NULL, '広告代理店、デジタルマーケティング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ゲーム', 'INDUSTRY', NULL, 'コンシューマー、モバイル、eスポーツ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- テクニカルスキル - 戦略
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('ビジネス戦略立案', 'TECHNICAL', 'STRATEGY', '事業戦略、経営計画、競争戦略', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DX戦略', 'TECHNICAL', 'STRATEGY', 'デジタル変革、IT戦略、業務改革', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IT戦略・ITガバナンス', 'TECHNICAL', 'STRATEGY', 'IT投資計画、ITポートフォリオ管理、COBIT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('エンタープライズアーキテクチャ', 'TECHNICAL', 'STRATEGY', 'EA、TOGAF、業務・システム全体設計', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('業務プロセス改革', 'TECHNICAL', 'STRATEGY', 'BPR、業務フロー最適化、リエンジニアリング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PMO', 'TECHNICAL', 'STRATEGY', 'プロジェクト統制、標準化、ポートフォリオ管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ITコンサルティング', 'TECHNICAL', 'STRATEGY', '業務・IT課題分析、ソリューション提案', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('クラウド戦略', 'TECHNICAL', 'STRATEGY', 'クラウド移行計画、マルチクラウド、FinOps', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('セキュリティ戦略', 'TECHNICAL', 'STRATEGY', 'セキュリティガバナンス、リスク管理、CISO業務', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データ戦略', 'TECHNICAL', 'STRATEGY', 'データ活用方針、データドリブン経営、CDO業務', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- テクニカルスキル - データマネジメント
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('データベース設計', 'TECHNICAL', 'DATA_MANAGEMENT', 'ER図、正規化、インデックス設計', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SQL', 'TECHNICAL', 'DATA_MANAGEMENT', 'データクエリ、結合、集計、パフォーマンスチューニング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('RDB管理', 'TECHNICAL', 'DATA_MANAGEMENT', 'PostgreSQL、MySQL、Oracle、SQL Server', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('NoSQL', 'TECHNICAL', 'DATA_MANAGEMENT', 'MongoDB、Cassandra、DynamoDB、Redis', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データウェアハウス', 'TECHNICAL', 'DATA_MANAGEMENT', 'DWH設計、スタースキーマ、Snowflake、BigQuery', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ETL/ELT', 'TECHNICAL', 'DATA_MANAGEMENT', 'データパイプライン、Informatica、Talend、dbt', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データレイク', 'TECHNICAL', 'DATA_MANAGEMENT', 'S3、Azure Data Lake、データレイク設計', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データガバナンス', 'TECHNICAL', 'DATA_MANAGEMENT', 'マスタデータ管理、データ品質、メタデータ管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データモデリング', 'TECHNICAL', 'DATA_MANAGEMENT', '概念・論理・物理モデル、ディメンショナルモデリング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('BI・データ可視化', 'TECHNICAL', 'DATA_MANAGEMENT', 'Tableau、Power BI、Looker、ダッシュボード設計', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データ分析', 'TECHNICAL', 'DATA_MANAGEMENT', '統計分析、探索的データ分析、レポーティング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ビッグデータ基盤', 'TECHNICAL', 'DATA_MANAGEMENT', 'Hadoop、Spark、Kafka、ストリーミング処理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データカタログ', 'TECHNICAL', 'DATA_MANAGEMENT', 'データディスカバリ、Collibra、Alation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('データセキュリティ', 'TECHNICAL', 'DATA_MANAGEMENT', '暗号化、アクセス制御、マスキング、GDPR/個人情報保護', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('クラウドデータサービス', 'TECHNICAL', 'DATA_MANAGEMENT', 'AWS Redshift/Athena、GCP BigQuery、Azure Synapse', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- テクニカルスキル - AI
INSERT INTO skills (name, category1, category2, description, created_at, updated_at) VALUES
('機械学習基礎', 'TECHNICAL', 'AI', '教師あり/なし学習、回帰、分類、クラスタリング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('深層学習', 'TECHNICAL', 'AI', 'ニューラルネットワーク、CNN、RNN、Transformer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('自然言語処理', 'TECHNICAL', 'AI', 'テキスト分析、BERT、GPT、LLM活用', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('コンピュータビジョン', 'TECHNICAL', 'AI', '画像認識、物体検出、セグメンテーション', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('生成AI', 'TECHNICAL', 'AI', 'LLM、画像生成、Prompt Engineering、RAG', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MLOps', 'TECHNICAL', 'AI', 'モデル運用、パイプライン自動化、モニタリング', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('特徴量エンジニアリング', 'TECHNICAL', 'AI', '特徴量設計、次元削減、前処理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('モデル評価・選択', 'TECHNICAL', 'AI', '交差検証、ハイパーパラメータチューニング、A/Bテスト', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Python (AI/ML)', 'TECHNICAL', 'AI', 'NumPy、Pandas、Scikit-learn、TensorFlow、PyTorch', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('R', 'TECHNICAL', 'AI', '統計解析、可視化、tidyverse', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AI倫理・ガバナンス', 'TECHNICAL', 'AI', 'バイアス対策、説明可能性、責任あるAI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MLプラットフォーム', 'TECHNICAL', 'AI', 'SageMaker、Vertex AI、Azure ML、Databricks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('強化学習', 'TECHNICAL', 'AI', 'Q学習、方策勾配法、深層強化学習', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('時系列分析', 'TECHNICAL', 'AI', 'ARIMA、Prophet、LSTM、予測モデル', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('推薦システム', 'TECHNICAL', 'AI', '協調フィルタリング、コンテンツベース、ハイブリッド', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AutoML', 'TECHNICAL', 'AI', '自動機械学習、H2O.ai、Google AutoML', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('エッジAI', 'TECHNICAL', 'AI', '軽量モデル、モデル圧縮、オンデバイスAI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
