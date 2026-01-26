// アプリケーション全体で使用される共通の列挙型定義
// これらはビジネスルールとして複数のドメインで共有される

/**
 * 役職
 * ユーザー、スキル評価、組織管理など複数のドメインで使用
 */
export const Position = {
  ANALYST: 'ANALYST',
  CONSULTANT: 'CONSULTANT',
  SENIOR_CONSULTANT: 'SENIOR_CONSULTANT',
  MANAGER: 'MANAGER',
  SENIOR_MANAGER: 'SENIOR_MANAGER',
  DIRECTOR: 'DIRECTOR',
  PARTNER: 'PARTNER',
} as const;

export type Position = typeof Position[keyof typeof Position];

/**
 * スキルカテゴリ1（大分類）
 * スキル分類のビジネスルール
 */
export const SkillCategory1 = {
  BUSINESS: 'BUSINESS',
  INDUSTRY: 'INDUSTRY',
  TECHNICAL: 'TECHNICAL',
} as const;

export type SkillCategory1 = typeof SkillCategory1[keyof typeof SkillCategory1];

/**
 * スキルカテゴリ2（中分類）
 * TECHNICALカテゴリの詳細分類
 */
export const SkillCategory2 = {
  STRATEGY: 'STRATEGY',
  DATA_MANAGEMENT: 'DATA_MANAGEMENT',
  AI: 'AI',
} as const;

export type SkillCategory2 = typeof SkillCategory2[keyof typeof SkillCategory2];

/**
 * 働き方の選択肢: 時間帯の好み
 */
export const TimePreference = {
  MORNING: 'MORNING',
  EVENING: 'EVENING',
} as const;

export type TimePreference = typeof TimePreference[keyof typeof TimePreference];

/**
 * 働き方の選択肢: 指示のスタイル
 */
export const InstructionStyle = {
  DETAILED: 'DETAILED',
  ROUGH: 'ROUGH',
} as const;

export type InstructionStyle = typeof InstructionStyle[keyof typeof InstructionStyle];

/**
 * 働き方の選択肢: ワークライフバランス
 */
export const WorkLifeBalance = {
  BALANCE: 'BALANCE',
  WORK_FOCUSED: 'WORK_FOCUSED',
} as const;

export type WorkLifeBalance = typeof WorkLifeBalance[keyof typeof WorkLifeBalance];

/**
 * 働き方の選択肢: プライベートな会話
 */
export const PrivateConversation = {
  FRIENDLY: 'FRIENDLY',
  PROFESSIONAL: 'PROFESSIONAL',
} as const;

export type PrivateConversation = typeof PrivateConversation[keyof typeof PrivateConversation];

/**
 * 働き方の選択肢: ランチスタイル
 */
export const LunchStyle = {
  ENJOY: 'ENJOY',
  QUICK: 'QUICK',
} as const;

export type LunchStyle = typeof LunchStyle[keyof typeof LunchStyle];

/**
 * 働き方の選択肢: 飲み会
 */
export const Drinking = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE',
} as const;

export type Drinking = typeof Drinking[keyof typeof Drinking];

/**
 * 働き方の選択肢: 社内イベント
 */
export const OfficeEvent = {
  ACTIVE: 'ACTIVE',
  SEPARATE: 'SEPARATE',
} as const;

export type OfficeEvent = typeof OfficeEvent[keyof typeof OfficeEvent];

/**
 * 働き方の選択
 * 個人プロフィールで使用される働き方に関する設定
 */
export interface WorkPreferences {
  timePreference: TimePreference | null;
  instructionStyle: InstructionStyle | null;
  workLifeBalance: WorkLifeBalance | null;
  privateConversation: PrivateConversation | null;
  lunchStyle: LunchStyle | null;
  drinking: Drinking | null;
  officeEvent: OfficeEvent | null;
}
