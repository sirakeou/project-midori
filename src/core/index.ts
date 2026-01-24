/**
 * インターフェース層 (interfaces/)
 *
 * 役割:
 * - データアクセスの抽象的な契約（インターフェース）を定義
 *
 * 責務:
 * - CRUD操作のメソッドシグネチャを定義
 * - 返り値の型を指定（Entity型を使用）
 * - データアクセスの契約を明確化
 */
import type { IUser } from './interfaces/IUser';
import type { ISkillMaster } from './interfaces/ISkillMaster';
import type { ISkillAssessment } from './interfaces/ISkillAssessment';
import type { IPersonalProfile } from './interfaces/IPersonalProfile';

/**
 * インフラ層 (infrastructure/)
 *
 * 役割:
 * - インターフェース層で定義された契約の具体的な実装を提供
 * - データベースや外部APIなど、実際のデータソースとの通信を担当
 *
 * 責務:
 * - SQLiteデータベースへの接続と操作（@tauri-apps/plugin-sql使用）
 * - データの永続化、取得、更新、削除の実装
 * - エラーハンドリングとデータ変換
 * - トランザクション管理（必要に応じて）
 */
import { UserRepository } from './infrastructure/UserRepository';
import { SkillMasterRepository } from './infrastructure/SkillMasterRepository';
import { SkillAssessmentRepository } from './infrastructure/SkillAssessmentRepository';
import { PersonalProfileRepository } from './infrastructure/PersonalProfileRepository';

/**
 * Repositoryインスタンス（シングルトンパターン）
 * - 型注釈をインターフェース（IUser等）にすることで、具体的な実装に依存しない
 * - 実装の詳細を隠蔽し、契約（インターフェース）のみを公開
 *
 * 使用方法:
 * - フロントエンド層やサービス層から直接インポートして使用
 * - 例: import { userRepository } from '@/core';
 * - 例: const users = await userRepository.findAll();
 */
export const userRepository: IUser = new UserRepository();
export const skillMasterRepository: ISkillMaster = new SkillMasterRepository();
export const skillAssessmentRepository: ISkillAssessment = new SkillAssessmentRepository();
export const personalProfileRepository: IPersonalProfile = new PersonalProfileRepository();

// Entityの型定義をエクスポート
export * from './entities/user';
export * from './entities/skillMaster';
export * from './entities/skillAssessment';
export * from './entities/enums';

// Repositoryインターフェースをエクスポート
export type { IUser } from './interfaces/IUser';
export type { ISkillMaster } from './interfaces/ISkillMaster';
export type { ISkillAssessment } from './interfaces/ISkillAssessment';
export type { IPersonalProfile } from './interfaces/IPersonalProfile';

