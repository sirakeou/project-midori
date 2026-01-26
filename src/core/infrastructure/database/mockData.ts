/**
 * 開発環境用モックデータ
 * Reactのみで起動した際に使用されるテストデータ
 *
 * データソース: src-tauri/migrations/*.sql
 */

import type { User, PersonalProfile } from '../../entities/user';
import type { Skill } from '../../entities/skillMaster';
import type { LatestSkillAssessment } from '../../entities/skillAssessment';

const MOCK_TIMESTAMP = new Date().toISOString();

/**
 * ユーザーデータ（山田太郎のみ）
 */
export const mockUsers: User[] = [
  {
    employee_id: '100001',
    name: '山田太郎',
    position: 'PARTNER',
    created_at: MOCK_TIMESTAMP,
    updated_at: MOCK_TIMESTAMP,
  },
];

/**
 * スキルマスタデータ（全件）
 * ソース: src-tauri/migrations/002_seed_skills.sql
 */
export const mockSkills: Skill[] = [
  // ビジネススキル
  { id: 1, name: 'ロジカルシンキング', category1: 'BUSINESS', category2: null, description: '論理的思考、体系的な分析、筋道を立てた思考', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 2, name: '問題解決能力', category1: 'BUSINESS', category2: null, description: '課題発見、根本原因分析、解決策立案', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 3, name: '調査・分析', category1: 'BUSINESS', category2: null, description: '情報収集、データ分析、インサイト抽出', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 4, name: 'コミュニケーション', category1: 'BUSINESS', category2: null, description: '効果的な意思疎通、傾聴、対人関係構築', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 5, name: 'ドキュメンテーション', category1: 'BUSINESS', category2: null, description: '文書作成、技術文書、報告書作成', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 6, name: 'プレゼンテーション', category1: 'BUSINESS', category2: null, description: '発表スキル、資料作成、説得力のある伝達', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - 製造業
  { id: 7, name: '自動車', category1: 'INDUSTRY', category2: null, description: '自動車製造、EV、CASE、サプライチェーン', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 8, name: '電機・電子機器', category1: 'INDUSTRY', category2: null, description: '家電、半導体、電子部品、製造プロセス', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 9, name: '産業機械', category1: 'INDUSTRY', category2: null, description: '工作機械、ロボット、FA、プラント設備', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 10, name: '化学・素材', category1: 'INDUSTRY', category2: null, description: '化学品、素材開発、プロセス産業', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 11, name: '食品・飲料', category1: 'INDUSTRY', category2: null, description: '食品製造、品質管理、衛生管理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 12, name: '医薬品・医療機器', category1: 'INDUSTRY', category2: null, description: '創薬、治験、医療機器開発、薬事', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - 金融・保険
  { id: 13, name: '銀行', category1: 'INDUSTRY', category2: null, description: '預金、融資、決済、リテール・法人バンキング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 14, name: '証券', category1: 'INDUSTRY', category2: null, description: '株式、債券、投資銀行、資産運用', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 15, name: '保険', category1: 'INDUSTRY', category2: null, description: '生命保険、損害保険、アクチュアリー', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 16, name: 'フィンテック', category1: 'INDUSTRY', category2: null, description: 'デジタル決済、ブロックチェーン、デジタル金融', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - 情報通信
  { id: 17, name: '通信キャリア', category1: 'INDUSTRY', category2: null, description: '通信インフラ、5G/6G、ネットワーク運用', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 18, name: 'ITサービス', category1: 'INDUSTRY', category2: null, description: 'SIer、コンサルティング、BPO', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 19, name: 'ソフトウェア・SaaS', category1: 'INDUSTRY', category2: null, description: 'パッケージ、クラウドサービス、サブスクリプション', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - 小売・流通
  { id: 20, name: '小売', category1: 'INDUSTRY', category2: null, description: '店舗運営、EC、オムニチャネル、商品管理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 21, name: '物流', category1: 'INDUSTRY', category2: null, description: 'サプライチェーン、倉庫管理、配送最適化', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 22, name: '卸売・商社', category1: 'INDUSTRY', category2: null, description: '貿易、調達、在庫管理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - サービス
  { id: 23, name: '医療・ヘルスケア', category1: 'INDUSTRY', category2: null, description: '病院、診療所、医療IT、ヘルステック', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 24, name: '教育', category1: 'INDUSTRY', category2: null, description: '学校、eラーニング、EdTech', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 25, name: '観光・ホスピタリティ', category1: 'INDUSTRY', category2: null, description: 'ホテル、旅行、インバウンド', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 26, name: '不動産', category1: 'INDUSTRY', category2: null, description: '不動産開発、賃貸管理、PropTech', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - 公共・インフラ
  { id: 27, name: '官公庁・自治体', category1: 'INDUSTRY', category2: null, description: '行政、公共サービス、電子政府', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 28, name: 'エネルギー', category1: 'INDUSTRY', category2: null, description: '電力、ガス、再生可能エネルギー', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 29, name: '交通・運輸', category1: 'INDUSTRY', category2: null, description: '鉄道、航空、海運、MaaS', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 30, name: '建設・土木', category1: 'INDUSTRY', category2: null, description: '建築、インフラ整備、BIM/CIM', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // インダストリスキル - メディア・エンタメ
  { id: 31, name: '放送・メディア', category1: 'INDUSTRY', category2: null, description: 'テレビ、ラジオ、ストリーミング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 32, name: '広告・マーケティング', category1: 'INDUSTRY', category2: null, description: '広告代理店、デジタルマーケティング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 33, name: 'ゲーム', category1: 'INDUSTRY', category2: null, description: 'コンシューマー、モバイル、eスポーツ', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // テクニカルスキル - 戦略
  { id: 34, name: 'ビジネス戦略立案', category1: 'TECHNICAL', category2: 'STRATEGY', description: '事業戦略、経営計画、競争戦略', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 35, name: 'DX戦略', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'デジタル変革、IT戦略、業務改革', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 36, name: 'IT戦略・ITガバナンス', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'IT投資計画、ITポートフォリオ管理、COBIT', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 37, name: 'エンタープライズアーキテクチャ', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'EA、TOGAF、業務・システム全体設計', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 38, name: '業務プロセス改革', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'BPR、業務フロー最適化、リエンジニアリング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 39, name: 'PMO', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'プロジェクト統制、標準化、ポートフォリオ管理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 40, name: 'ITコンサルティング', category1: 'TECHNICAL', category2: 'STRATEGY', description: '業務・IT課題分析、ソリューション提案', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 41, name: 'クラウド戦略', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'クラウド移行計画、マルチクラウド、FinOps', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 42, name: 'セキュリティ戦略', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'セキュリティガバナンス、リスク管理、CISO業務', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 43, name: 'データ戦略', category1: 'TECHNICAL', category2: 'STRATEGY', description: 'データ活用方針、データドリブン経営、CDO業務', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // テクニカルスキル - データマネジメント
  { id: 44, name: 'データベース設計', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'ER図、正規化、インデックス設計', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 45, name: 'SQL', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'データクエリ、結合、集計、パフォーマンスチューニング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 46, name: 'RDB管理', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'PostgreSQL、MySQL、Oracle、SQL Server', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 47, name: 'NoSQL', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'MongoDB、Cassandra、DynamoDB、Redis', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 48, name: 'データウェアハウス', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'DWH設計、スタースキーマ、Snowflake、BigQuery', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 49, name: 'ETL/ELT', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'データパイプライン、Informatica、Talend、dbt', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 50, name: 'データレイク', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'S3、Azure Data Lake、データレイク設計', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 51, name: 'データガバナンス', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'マスタデータ管理、データ品質、メタデータ管理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 52, name: 'データモデリング', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: '概念・論理・物理モデル、ディメンショナルモデリング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 53, name: 'BI・データ可視化', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'Tableau、Power BI、Looker、ダッシュボード設計', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 54, name: 'データ分析', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: '統計分析、探索的データ分析、レポーティング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 55, name: 'ビッグデータ基盤', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'Hadoop、Spark、Kafka、ストリーミング処理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 56, name: 'データカタログ', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'データディスカバリ、Collibra、Alation', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 57, name: 'データセキュリティ', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: '暗号化、アクセス制御、マスキング、GDPR/個人情報保護', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 58, name: 'クラウドデータサービス', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', description: 'AWS Redshift/Athena、GCP BigQuery、Azure Synapse', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },

  // テクニカルスキル - AI
  { id: 59, name: '機械学習基礎', category1: 'TECHNICAL', category2: 'AI', description: '教師あり/なし学習、回帰、分類、クラスタリング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 60, name: '深層学習', category1: 'TECHNICAL', category2: 'AI', description: 'ニューラルネットワーク、CNN、RNN、Transformer', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 61, name: '自然言語処理', category1: 'TECHNICAL', category2: 'AI', description: 'テキスト分析、BERT、GPT、LLM活用', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 62, name: 'コンピュータビジョン', category1: 'TECHNICAL', category2: 'AI', description: '画像認識、物体検出、セグメンテーション', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 63, name: '生成AI', category1: 'TECHNICAL', category2: 'AI', description: 'LLM、画像生成、Prompt Engineering、RAG', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 64, name: 'MLOps', category1: 'TECHNICAL', category2: 'AI', description: 'モデル運用、パイプライン自動化、モニタリング', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 65, name: '特徴量エンジニアリング', category1: 'TECHNICAL', category2: 'AI', description: '特徴量設計、次元削減、前処理', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 66, name: 'モデル評価・選択', category1: 'TECHNICAL', category2: 'AI', description: '交差検証、ハイパーパラメータチューニング、A/Bテスト', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 67, name: 'Python (AI/ML)', category1: 'TECHNICAL', category2: 'AI', description: 'NumPy、Pandas、Scikit-learn、TensorFlow、PyTorch', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 68, name: 'R', category1: 'TECHNICAL', category2: 'AI', description: '統計解析、可視化、tidyverse', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 69, name: 'AI倫理・ガバナンス', category1: 'TECHNICAL', category2: 'AI', description: 'バイアス対策、説明可能性、責任あるAI', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 70, name: 'MLプラットフォーム', category1: 'TECHNICAL', category2: 'AI', description: 'SageMaker、Vertex AI、Azure ML、Databricks', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 71, name: '強化学習', category1: 'TECHNICAL', category2: 'AI', description: 'Q学習、方策勾配法、深層強化学習', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 72, name: '時系列分析', category1: 'TECHNICAL', category2: 'AI', description: 'ARIMA、Prophet、LSTM、予測モデル', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 73, name: '推薦システム', category1: 'TECHNICAL', category2: 'AI', description: '協調フィルタリング、コンテンツベース、ハイブリッド', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 74, name: 'AutoML', category1: 'TECHNICAL', category2: 'AI', description: '自動機械学習、H2O.ai、Google AutoML', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
  { id: 75, name: 'エッジAI', category1: 'TECHNICAL', category2: 'AI', description: '軽量モデル、モデル圧縮、オンデバイスAI', created_at: MOCK_TIMESTAMP, updated_at: MOCK_TIMESTAMP },
];

/**
 * 個人プロフィールデータ（山田太郎のみ）
 * ソース: src-tauri/migrations/004_seed_personal_profiles.sql
 */
export const mockPersonalProfiles: PersonalProfile[] = [
  {
    id: 1,
    employee_id: '100001',
    photo_path: 'personal-profiles/100001/a1b2c3d4-e5f6-4789-a0b1-a2d3e4f5a6b7.png',
    career: '大手金融機関での15年以上のキャリアを経て、戦略コンサルタントとして独立。銀行・証券業界を中心に、DX推進やIT戦略立案を支援してきました。',
    hobbies: '週末は登山とカメラが趣味。最近はドローン撮影にも挑戦中です。',
    self_introduction: '論理的思考を大切にしながらも、チームメンバーとのコミュニケーションを重視します。データに基づいた意思決定を心がけています。',
    triggers: '締め切り直前の大幅な仕様変更は避けてほしいです。計画的な進行を好みます。',
    work_preferences: {
      timePreference: 'MORNING',
      instructionStyle: 'DETAILED',
      workLifeBalance: 'BALANCE',
      privateConversation: 'PROFESSIONAL',
      lunchStyle: 'QUICK',
      drinking: 'DISLIKE',
      officeEvent: 'SEPARATE',
    },
    updated_at: MOCK_TIMESTAMP,
    created_at: MOCK_TIMESTAMP,
  },
];

/**
 * 最新スキル評価データ（山田太郎のみ）
 * ソース: src-tauri/migrations/005_seed_skill_assessments.sql
 *
 * latest_skill_assessments ビューに相当（スキル情報とJOIN済み）
 */
export const mockLatestSkillAssessments: LatestSkillAssessment[] = [
  // レベル0以外のスキルのみ（山田太郎）
  { id: 1, employee_id: '100001', skill_id: 1, level: 4, skill_name: 'ロジカルシンキング', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 2, employee_id: '100001', skill_id: 2, level: 4, skill_name: '問題解決能力', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 3, employee_id: '100001', skill_id: 3, level: 4, skill_name: '調査・分析', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 4, employee_id: '100001', skill_id: 4, level: 4, skill_name: 'コミュニケーション', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 5, employee_id: '100001', skill_id: 5, level: 4, skill_name: 'ドキュメンテーション', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 6, employee_id: '100001', skill_id: 6, level: 4, skill_name: 'プレゼンテーション', category1: 'BUSINESS', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 7, employee_id: '100001', skill_id: 13, level: 4, skill_name: '銀行', category1: 'INDUSTRY', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 8, employee_id: '100001', skill_id: 14, level: 3, skill_name: '証券', category1: 'INDUSTRY', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 9, employee_id: '100001', skill_id: 15, level: 3, skill_name: '保険', category1: 'INDUSTRY', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 10, employee_id: '100001', skill_id: 16, level: 2, skill_name: 'フィンテック', category1: 'INDUSTRY', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 11, employee_id: '100001', skill_id: 18, level: 3, skill_name: 'ITサービス', category1: 'INDUSTRY', category2: null, updated_at: MOCK_TIMESTAMP },
  { id: 12, employee_id: '100001', skill_id: 34, level: 4, skill_name: 'ビジネス戦略立案', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 13, employee_id: '100001', skill_id: 35, level: 4, skill_name: 'DX戦略', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 14, employee_id: '100001', skill_id: 36, level: 4, skill_name: 'IT戦略・ITガバナンス', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 15, employee_id: '100001', skill_id: 37, level: 3, skill_name: 'エンタープライズアーキテクチャ', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 16, employee_id: '100001', skill_id: 40, level: 4, skill_name: 'ITコンサルティング', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 17, employee_id: '100001', skill_id: 43, level: 3, skill_name: 'データ戦略', category1: 'TECHNICAL', category2: 'STRATEGY', updated_at: MOCK_TIMESTAMP },
  { id: 18, employee_id: '100001', skill_id: 51, level: 3, skill_name: 'データガバナンス', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', updated_at: MOCK_TIMESTAMP },
  { id: 19, employee_id: '100001', skill_id: 53, level: 2, skill_name: 'BI・データ可視化', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', updated_at: MOCK_TIMESTAMP },
  { id: 20, employee_id: '100001', skill_id: 54, level: 3, skill_name: 'データ分析', category1: 'TECHNICAL', category2: 'DATA_MANAGEMENT', updated_at: MOCK_TIMESTAMP },
];
