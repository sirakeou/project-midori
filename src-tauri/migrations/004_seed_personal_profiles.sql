-- 「私の説明書」テストデータ
-- 20人の社員に対応するプロフィールデータ

INSERT INTO personal_profiles (
  employee_id,
  photo_path,
  career,
  hobbies,
  self_introduction,
  triggers,
  work_preferences,
  updated_at,
  created_at
) VALUES
-- ========================================
-- パートナー（2人）
-- ========================================
-- 100001: 山田太郎 - プロフィール写真あり、全項目入力
(
  '100001',
  'personal-profiles/100001/a1b2c3d4-e5f6-4789-a0b1-a2d3e4f5a6b7.png',
  '大手金融機関での15年以上のキャリアを経て、戦略コンサルタントとして独立。銀行・証券業界を中心に、DX推進やIT戦略立案を支援してきました。',
  '週末は登山とカメラが趣味。最近はドローン撮影にも挑戦中です。',
  '論理的思考を大切にしながらも、チームメンバーとのコミュニケーションを重視します。データに基づいた意思決定を心がけています。',
  '締め切り直前の大幅な仕様変更は避けてほしいです。計画的な進行を好みます。',
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": "DISLIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100002: 佐藤花子 - プロフィール写真あり、全項目入力
(
  '100002',
  'personal-profiles/100002/b2c3d4e5-f6a7-4890-b1c2-a3e4f5a6b7c8.jpg',
  '製造業向けAI/DXコンサルタント。自動車メーカーでの生産管理システム導入や、機械学習を活用した品質予測モデル構築に従事。',
  '料理とヨガが趣味。健康的なライフスタイルを心がけています。',
  '新しい技術に積極的にチャレンジするタイプです。チームで協力しながら目標達成を目指すのが好きです。',
  '長時間の会議は苦手です。ポイントを絞った効率的なミーティングを希望します。',
  '{"timePreference": "MORNING", "instructionStyle": "ROUGH", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": "LIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- ========================================
-- シニアマネージャー（3人）
-- ========================================
-- 100003: 鈴木一郎 - プロフィール写真あり、一部項目のみ
(
  '100003',
  'personal-profiles/100003/c3d4e5f6-a7b8-4901-a2d3-e4f5a6b7c8d9.png',
  '小売業界でのデータアーキテクト経験15年。大規模データウェアハウスの設計・構築を多数手掛けてきました。',
  NULL,
  '技術的な課題解決に情熱を持っています。データベース設計が得意です。',
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "DETAILED", "workLifeBalance": "WORK_FOCUSED", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100004: 田中美咲 - プロフィール写真なし、全項目入力
(
  '100004',
  NULL,
  '医療業界でのAIエンジニア。医療画像解析や疾患予測モデルの開発に携わってきました。',
  '読書と美術館巡りが好きです。アート作品からインスピレーションを得ています。',
  '丁寧なコミュニケーションを心がけています。技術的な議論を通じて学ぶことが好きです。',
  '急な予定変更はストレスになります。事前の調整をお願いします。',
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": null, "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100005: 高橋健太 - プロフィール写真なし、最小限の情報
(
  '100005',
  NULL,
  '通信業界でのITコンサルタント経験10年。',
  NULL,
  NULL,
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "ROUGH", "workLifeBalance": "WORK_FOCUSED", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": "DISLIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- ========================================
-- マネージャー（4人）
-- ========================================
-- 100006: 伊藤愛 - プロフィール写真あり
(
  '100006',
  'personal-profiles/100006/e5f6a7b8-c9d0-4123-a4f5-a6b7c8d9e0f1.jpg',
  'エネルギー業界でのデータエンジニア。データ基盤構築とETL処理の最適化を担当。',
  'ランニングとガーデニングが趣味です。',
  '効率的な仕事の進め方を常に考えています。チーム全体の生産性向上を目指します。',
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100007: 渡辺翔太 - プロフィール写真あり、全項目入力
(
  '100007',
  'personal-profiles/100007/f6a7b8c9-d0e1-4234-b5a6-b7c8d9e0f1a2.png',
  '広告業界でのMLエンジニア。推薦システムやユーザー行動予測モデルの開発を担当。',
  'サッカー観戦とゲームが趣味。週末はフットサルで汗を流しています。',
  '新しい技術のキャッチアップが早いです。実験的なプロジェクトにも積極的に挑戦します。',
  '曖昧な要件のまま進めるのは苦手です。最初にゴールを明確にしたいです。',
  '{"timePreference": "EVENING", "instructionStyle": "ROUGH", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": "LIKE", "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100008: 中村優子 - プロフィール写真なし、一部項目のみ
(
  '100008',
  NULL,
  '不動産業界でのBIスペシャリスト。ダッシュボード構築とデータ可視化を専門としています。',
  'ピアノとガーデニングが趣味です。',
  'データを分かりやすく伝えることを大切にしています。',
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": "LIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100009: 小林大輔 - プロフィール写真あり、全項目入力
(
  '100009',
  'personal-profiles/100009/a7b8c9d0-e1f2-4345-a6b7-a8d9e0f1a2b3.png',
  '銀行・証券業界でのPMO。大規模システム導入プロジェクトを複数成功に導いてきました。',
  'ゴルフと読書が趣味。ビジネス書を中心に月5冊は読んでいます。',
  '計画的な進行を重視します。リスクを事前に洗い出し、対策を立てることが得意です。',
  '根拠のない楽観論は苦手です。データと事実に基づいた議論を好みます。',
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "WORK_FOCUSED", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- ========================================
-- シニアスタッフ（5人）
-- ========================================
-- 100010: 加藤梨花 - プロフィール写真あり、全項目入力
(
  '100010',
  'personal-profiles/100010/d4e5f6a7-b8c9-4012-a3e4-b5a6b7c8d9e0.jpg',
  '教育業界でのデータサイエンティスト。学習データ分析や成績予測モデルの構築を担当。',
  '旅行とカフェ巡りが趣味。新しい場所を発見するのが好きです。',
  '好奇心旺盛で、新しいことを学ぶのが大好きです。データから意味を見出すことにやりがいを感じます。',
  '単調な作業の繰り返しは苦手です。創造的な仕事を好みます。',
  '{"timePreference": "MORNING", "instructionStyle": "ROUGH", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": "LIKE", "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100011: 吉田直樹 - プロフィール写真なし、一部項目のみ
(
  '100011',
  NULL,
  '物流業界でのデータエンジニア。ETLパイプライン構築とビッグデータ基盤の運用を担当。',
  NULL,
  '堅実な仕事を心がけています。品質を重視します。',
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100012: 山本さくら - プロフィール写真あり
(
  '100012',
  'personal-profiles/100012/b8c9d0e1-f2a3-4456-b7c8-a9e0f1a2b3c4.png',
  '観光業界でのBIコンサルタント。ダッシュボード構築とデータ可視化を専門としています。',
  '温泉巡りと写真撮影が趣味です。全国の温泉地を巡るのが楽しみです。',
  'コミュニケーションを大切にしています。チームワークを重視します。',
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "ROUGH", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": "LIKE", "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100013: 松本隼人 - プロフィール写真なし、一部項目のみ
(
  '100013',
  NULL,
  'ゲーム業界でのAIエンジニア。深層学習を活用したゲームAIの開発を担当。',
  'ゲーム開発と音楽制作が趣味です。',
  NULL,
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "ROUGH", "workLifeBalance": "WORK_FOCUSED", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": "DISLIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100014: 井上瑞希 - プロフィール写真あり、全項目入力
(
  '100014',
  'personal-profiles/100014/c9d0e1f2-a3b4-4567-a8d9-b0f1a2b3c4d5.png',
  '製造業でのITコンサルタント。DX推進と業務プロセス改革を支援してきました。',
  '英会話とジョギングが趣味。TOEICは900点以上です。',
  'グローバルな視点を持つことを心がけています。論理的な思考を大切にします。',
  '感情的な議論は避けたいです。冷静な対話を好みます。',
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- ========================================
-- スタッフ（4人）
-- ========================================
-- 100015: 木村拓也 - プロフィール写真なし、work_preferencesのみ
(
  '100015',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100016: 林麻衣 - プロフィール写真あり、一部項目のみ
(
  '100016',
  'personal-profiles/100016/d0e1f2a3-b4c5-4678-a9e0-b1a2b3c4d5e6.png',
  '化学業界でのデータエンジニア。データ基盤構築を担当しています。',
  'ハイキングと料理が趣味です。',
  NULL,
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": null, "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100017: 清水陽介 - プロフィール写真なし、一部項目のみ
(
  '100017',
  NULL,
  'フィンテック業界でのMLエンジニア。時系列データ分析と予測モデル構築を担当。',
  NULL,
  '数学とプログラミングが好きです。技術的な深掘りを楽しみます。',
  NULL,
  '{"timePreference": "EVENING", "instructionStyle": "ROUGH", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": "DISLIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100018: 森野あかり - プロフィール写真なし、一部項目のみ
(
  '100018',
  NULL,
  '医療業界でのBIアナリスト。医療データの可視化と分析を担当。',
  NULL,
  'データの正確性を重視します。丁寧な仕事を心がけています。',
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "PROFESSIONAL", "lunchStyle": "QUICK", "drinking": "DISLIKE", "officeEvent": "SEPARATE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- ========================================
-- ジュニアスタッフ（2人）
-- ========================================
-- 100019: 池田蓮 - プロフィール写真なし、最小限の情報
(
  '100019',
  NULL,
  '新卒入社1年目。データ分析の基礎を学んでいます。',
  NULL,
  NULL,
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": null, "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
-- 100020: 斎藤結衣 - プロフィール写真あり、一部項目のみ
(
  '100020',
  'personal-profiles/100020/e1f2a3b4-c5d6-4789-a0f1-b2b3c4d5e6f7.png',
  '新卒入社1年目。データエンジニアリングの基礎を学んでいます。',
  'アニメとイラスト制作が趣味です。',
  NULL,
  NULL,
  '{"timePreference": "MORNING", "instructionStyle": "DETAILED", "workLifeBalance": "BALANCE", "privateConversation": "FRIENDLY", "lunchStyle": "ENJOY", "drinking": null, "officeEvent": "ACTIVE"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- テストデータ統計
-- 総レコード数: 20人分（全員）
-- プロフィール写真あり: 11人 (100001, 100002, 100003, 100006, 100007, 100009, 100010, 100012, 100014, 100016, 100020)
-- プロフィール写真なし: 9人 (100004, 100005, 100008, 100011, 100013, 100015, 100017, 100018, 100019)
-- 全項目入力: 7人 (100001, 100002, 100004, 100007, 100009, 100010, 100014)
-- 一部項目のみ: 11人 (100003, 100006, 100008, 100011, 100012, 100013, 100016, 100017, 100018, 100020)
-- 最小限の情報: 2人 (100005, 100015, 100019)
