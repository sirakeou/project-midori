import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PersonalProfileRepository } from './PersonalProfileRepository';
import * as dbModule from './database';

import type { PersonalProfileInsert } from '../entities/user';
import type { PersonalProfileRow } from './database/types';
import {
    TimePreference,
    InstructionStyle,
    WorkLifeBalance,
    PrivateConversation,
    LunchStyle,
    Drinking,
    OfficeEvent,
    type WorkPreferences,
} from '../entities/enums';

// Mock database module
vi.mock('./database', () => ({
    getDatabase: vi.fn(),
}));

describe('PersonalProfileRepository', () => {
    let repository: PersonalProfileRepository;
    const mockDb = {
        path: 'test.db',
        select: vi.fn(),
        execute: vi.fn(),
        close: vi.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new PersonalProfileRepository();
        vi.mocked(dbModule.getDatabase).mockResolvedValue(mockDb);
    });

    describe('getLatestPersonalProfile', () => {
        it('最新のプロフィールを取得できる（work_preferencesあり）', async () => {
            const mockWorkPreferences: WorkPreferences = {
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.DETAILED,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.ACTIVE,
            };

            const mockRow: PersonalProfileRow = {
                id: 1,
                employee_id: 'E001',
                photo_path: '/photos/e001.jpg',
                career: 'Software Engineer for 5 years',
                hobbies: 'Reading, Hiking',
                self_introduction: 'Hello!',
                triggers: 'Coffee breaks',
                work_preferences: JSON.stringify(mockWorkPreferences),
                updated_at: '2023-01-01',
                created_at: '2023-01-01',
            };

            mockDb.select.mockResolvedValue([mockRow]);

            const result = await repository.getLatestPersonalProfile('E001');

            expect(result).toEqual({
                id: 1,
                employee_id: 'E001',
                photo_path: '/photos/e001.jpg',
                career: 'Software Engineer for 5 years',
                hobbies: 'Reading, Hiking',
                self_introduction: 'Hello!',
                triggers: 'Coffee breaks',
                work_preferences: mockWorkPreferences,
                updated_at: '2023-01-01',
                created_at: '2023-01-01',
            });

            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM personal_profiles WHERE employee_id = ? ORDER BY updated_at DESC LIMIT 1',
                ['E001']
            );
        });

        it('work_preferencesがnullのプロフィールを取得できる', async () => {
            const mockRow: PersonalProfileRow = {
                id: 2,
                employee_id: 'E002',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: null,
                updated_at: '2023-02-01',
                created_at: '2023-02-01',
            };

            mockDb.select.mockResolvedValue([mockRow]);

            const result = await repository.getLatestPersonalProfile('E002');

            expect(result).toEqual({
                id: 2,
                employee_id: 'E002',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: null,
                updated_at: '2023-02-01',
                created_at: '2023-02-01',
            });
        });

        it('プロフィールが存在しない場合はnullを返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getLatestPersonalProfile('E999');

            expect(result).toBeNull();
        });

        it('work_preferencesが無効なJSONの場合はnullになる', async () => {
            const mockRow: PersonalProfileRow = {
                id: 3,
                employee_id: 'E003',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: 'invalid json',
                updated_at: '2023-03-01',
                created_at: '2023-03-01',
            };

            mockDb.select.mockResolvedValue([mockRow]);

            const result = await repository.getLatestPersonalProfile('E003');

            expect(result?.work_preferences).toBeNull();
        });
    });

    describe('createPersonalProfile', () => {
        it('プロフィールを作成できる（work_preferencesあり）', async () => {
            const mockWorkPreferences: WorkPreferences = {
                timePreference: TimePreference.EVENING,
                instructionStyle: InstructionStyle.ROUGH,
                workLifeBalance: WorkLifeBalance.WORK_FOCUSED,
                privateConversation: PrivateConversation.PROFESSIONAL,
                lunchStyle: LunchStyle.QUICK,
                drinking: Drinking.DISLIKE,
                officeEvent: OfficeEvent.SEPARATE,
            };

            const newProfile: PersonalProfileInsert = {
                employee_id: 'E001',
                photo_path: '/photos/e001.jpg',
                career: 'Engineer',
                hobbies: 'Gaming',
                self_introduction: 'Hi there!',
                triggers: 'Morning coffee',
                work_preferences: mockWorkPreferences,
                updated_at: '2023-01-01T00:00:00Z',
            };

            await repository.createPersonalProfile(newProfile);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO personal_profiles (employee_id, photo_path, career, hobbies, self_introduction, triggers, work_preferences, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    'E001',
                    '/photos/e001.jpg',
                    'Engineer',
                    'Gaming',
                    'Hi there!',
                    'Morning coffee',
                    JSON.stringify(mockWorkPreferences),
                    '2023-01-01T00:00:00Z',
                ]
            );
        });

        it('プロフィールを作成できる（work_preferencesがnull）', async () => {
            const newProfile: PersonalProfileInsert = {
                employee_id: 'E002',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: null,
                updated_at: '2023-02-01T00:00:00Z',
            };

            await repository.createPersonalProfile(newProfile);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO personal_profiles (employee_id, photo_path, career, hobbies, self_introduction, triggers, work_preferences, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    'E002',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    '2023-02-01T00:00:00Z',
                ]
            );
        });

        it('updated_atがない場合は現在時刻を使用する', async () => {
            const newProfile = {
                employee_id: 'E003',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: null,
            } as PersonalProfileInsert;

            await repository.createPersonalProfile(newProfile);

            expect(mockDb.execute).toHaveBeenCalled();
            const callArgs = mockDb.execute.mock.calls[0][1];
            // updated_atが設定されていることを確認（最後の引数）
            expect(callArgs[7]).toBeDefined();
            expect(typeof callArgs[7]).toBe('string');
            // ISO日付形式であることを確認
            expect(new Date(callArgs[7]).toISOString()).toBe(callArgs[7]);
        });

        it('部分的に埋められたwork_preferencesを作成できる', async () => {
            const partialWorkPreferences: WorkPreferences = {
                timePreference: TimePreference.MORNING,
                instructionStyle: null,
                workLifeBalance: null,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: null,
                drinking: null,
                officeEvent: null,
            };

            const newProfile: PersonalProfileInsert = {
                employee_id: 'E004',
                photo_path: null,
                career: null,
                hobbies: null,
                self_introduction: null,
                triggers: null,
                work_preferences: partialWorkPreferences,
                updated_at: '2023-04-01T00:00:00Z',
            };

            await repository.createPersonalProfile(newProfile);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO personal_profiles (employee_id, photo_path, career, hobbies, self_introduction, triggers, work_preferences, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    'E004',
                    null,
                    null,
                    null,
                    null,
                    null,
                    JSON.stringify(partialWorkPreferences),
                    '2023-04-01T00:00:00Z',
                ]
            );
        });
    });

    describe('getPersonalProfileHistory', () => {
        it('プロフィール履歴を取得できる', async () => {
            const mockWorkPreferences1: WorkPreferences = {
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.DETAILED,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.ACTIVE,
            };

            const mockWorkPreferences2: WorkPreferences = {
                timePreference: TimePreference.EVENING,
                instructionStyle: InstructionStyle.ROUGH,
                workLifeBalance: WorkLifeBalance.WORK_FOCUSED,
                privateConversation: PrivateConversation.PROFESSIONAL,
                lunchStyle: LunchStyle.QUICK,
                drinking: Drinking.DISLIKE,
                officeEvent: OfficeEvent.SEPARATE,
            };

            const mockRows: PersonalProfileRow[] = [
                {
                    id: 2,
                    employee_id: 'E001',
                    photo_path: '/photos/new.jpg',
                    career: 'Updated career',
                    hobbies: 'Updated hobbies',
                    self_introduction: 'Updated intro',
                    triggers: 'Updated triggers',
                    work_preferences: JSON.stringify(mockWorkPreferences2),
                    updated_at: '2023-02-01',
                    created_at: '2023-02-01',
                },
                {
                    id: 1,
                    employee_id: 'E001',
                    photo_path: '/photos/old.jpg',
                    career: 'Old career',
                    hobbies: 'Old hobbies',
                    self_introduction: 'Old intro',
                    triggers: 'Old triggers',
                    work_preferences: JSON.stringify(mockWorkPreferences1),
                    updated_at: '2023-01-01',
                    created_at: '2023-01-01',
                },
            ];

            mockDb.select.mockResolvedValue(mockRows);

            const result = await repository.getPersonalProfileHistory('E001');

            expect(result).toHaveLength(2);
            expect(result[0].work_preferences).toEqual(mockWorkPreferences2);
            expect(result[1].work_preferences).toEqual(mockWorkPreferences1);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM personal_profiles WHERE employee_id = ? ORDER BY updated_at DESC',
                ['E001']
            );
        });

        it('履歴がない場合は空配列を返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getPersonalProfileHistory('E999');

            expect(result).toEqual([]);
        });

        it('work_preferencesがnullの履歴を取得できる', async () => {
            const mockRows: PersonalProfileRow[] = [
                {
                    id: 1,
                    employee_id: 'E002',
                    photo_path: null,
                    career: null,
                    hobbies: null,
                    self_introduction: null,
                    triggers: null,
                    work_preferences: null,
                    updated_at: '2023-01-01',
                    created_at: '2023-01-01',
                },
            ];

            mockDb.select.mockResolvedValue(mockRows);

            const result = await repository.getPersonalProfileHistory('E002');

            expect(result).toHaveLength(1);
            expect(result[0].work_preferences).toBeNull();
        });
    });

    describe('deletePersonalProfile', () => {
        it('プロフィールを削除できる', async () => {
            await repository.deletePersonalProfile(1);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'DELETE FROM personal_profiles WHERE id = ?',
                [1]
            );
        });
    });
});
