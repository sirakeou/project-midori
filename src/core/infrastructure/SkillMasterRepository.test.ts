import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillMasterRepository } from './SkillMasterRepository';
import * as dbModule from './database';
import { SkillCategory1, SkillCategory2 } from '../entities/enums';
import type { Skill, SkillInsert, SkillUpdate } from '../entities/skillMaster';

// Mock database module
vi.mock('./database', () => ({
    getDatabase: vi.fn(),
}));

describe('SkillMasterRepository', () => {
    let repository: SkillMasterRepository;
    const mockDb = {
        path: 'test.db',
        select: vi.fn(),
        execute: vi.fn(),
        close: vi.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new SkillMasterRepository();
        vi.mocked(dbModule.getDatabase).mockResolvedValue(mockDb);
    });

    describe('getAllSkills', () => {
        it('すべてのスキルを取得できる', async () => {
            const mockSkills: Skill[] = [
                {
                    id: 1,
                    name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                    description: 'Python programming',
                    created_at: '2023-01-01',
                    updated_at: '2023-01-01',
                },
                {
                    id: 2,
                    name: 'Strategy Planning',
                    category1: SkillCategory1.BUSINESS,
                    category2: SkillCategory2.STRATEGY,
                    description: 'Strategic planning skills',
                    created_at: '2023-01-02',
                    updated_at: '2023-01-02',
                },
            ];
            mockDb.select.mockResolvedValue(mockSkills);

            const result = await repository.getAllSkills();

            expect(result).toEqual(mockSkills);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skills ORDER BY category1, category2, name'
            );
        });
    });

    describe('getSkillById', () => {
        it('IDでスキルを取得できる', async () => {
            const mockSkill: Skill = {
                id: 1,
                name: 'Python',
                category1: SkillCategory1.TECHNICAL,
                category2: SkillCategory2.AI,
                description: 'Python programming',
                created_at: '2023-01-01',
                updated_at: '2023-01-01',
            };
            mockDb.select.mockResolvedValue([mockSkill]);

            const result = await repository.getSkillById(1);

            expect(result).toEqual(mockSkill);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skills WHERE id = ?',
                [1]
            );
        });

        it('存在しないIDの場合nullを返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getSkillById(999);

            expect(result).toBeNull();
        });
    });

    describe('getSkillsByCategory', () => {
        it('category1のみでフィルタできる', async () => {
            const mockSkills: Skill[] = [
                {
                    id: 1,
                    name: 'Strategy',
                    category1: SkillCategory1.BUSINESS,
                    category2: null,
                    description: null,
                    created_at: '2023-01-01',
                    updated_at: '2023-01-01',
                },
            ];
            mockDb.select.mockResolvedValue(mockSkills);

            const result = await repository.getSkillsByCategory(
                SkillCategory1.BUSINESS
            );

            expect(result).toEqual(mockSkills);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skills WHERE category1 = ? ORDER BY name',
                [SkillCategory1.BUSINESS]
            );
        });

        it('category1とcategory2でフィルタできる', async () => {
            const mockSkills: Skill[] = [
                {
                    id: 2,
                    name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                    description: 'AI development',
                    created_at: '2023-01-01',
                    updated_at: '2023-01-01',
                },
            ];
            mockDb.select.mockResolvedValue(mockSkills);

            const result = await repository.getSkillsByCategory(
                SkillCategory1.TECHNICAL,
                SkillCategory2.AI
            );

            expect(result).toEqual(mockSkills);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skills WHERE category1 = ? AND category2 = ? ORDER BY name',
                [SkillCategory1.TECHNICAL, SkillCategory2.AI]
            );
        });

        it('category2がundefinedでもcategory1でフィルタできる', async () => {
            const mockSkills: Skill[] = [];
            mockDb.select.mockResolvedValue(mockSkills);

            await repository.getSkillsByCategory(
                SkillCategory1.INDUSTRY,
                undefined
            );

            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skills WHERE category1 = ? ORDER BY name',
                [SkillCategory1.INDUSTRY]
            );
        });
    });

    describe('createSkill', () => {
        it('スキルを作成できる', async () => {
            const newSkill: SkillInsert = {
                name: 'JavaScript',
                category1: SkillCategory1.TECHNICAL,
                category2: SkillCategory2.AI,
                description: 'JavaScript programming',
            };

            await repository.createSkill(newSkill);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO skills (name, category1, category2, description) VALUES (?, ?, ?, ?)',
                [
                    'JavaScript',
                    SkillCategory1.TECHNICAL,
                    SkillCategory2.AI,
                    'JavaScript programming',
                ]
            );
        });

        it('category2とdescriptionがnullのスキルを作成できる', async () => {
            const newSkill: SkillInsert = {
                name: 'Management',
                category1: SkillCategory1.BUSINESS,
                category2: null,
                description: null,
            };

            await repository.createSkill(newSkill);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO skills (name, category1, category2, description) VALUES (?, ?, ?, ?)',
                ['Management', SkillCategory1.BUSINESS, null, null]
            );
        });
    });

    describe('updateSkill', () => {
        it('すべてのフィールドを更新できる', async () => {
            const updates: SkillUpdate = {
                name: 'Updated Name',
                category1: SkillCategory1.BUSINESS,
                category2: SkillCategory2.STRATEGY,
                description: 'Updated description',
            };

            await repository.updateSkill(1, updates);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'UPDATE skills SET name = ?, category1 = ?, category2 = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [
                    'Updated Name',
                    SkillCategory1.BUSINESS,
                    SkillCategory2.STRATEGY,
                    'Updated description',
                    1,
                ]
            );
        });

        it('名前のみを更新できる', async () => {
            const updates: SkillUpdate = {
                name: 'New Name',
            };

            await repository.updateSkill(2, updates);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'UPDATE skills SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                ['New Name', 2]
            );
        });

        it('category1とdescriptionのみを更新できる', async () => {
            const updates: SkillUpdate = {
                category1: SkillCategory1.TECHNICAL,
                description: 'Technical skill',
            };

            await repository.updateSkill(3, updates);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'UPDATE skills SET category1 = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [SkillCategory1.TECHNICAL, 'Technical skill', 3]
            );
        });

        it('空のupdatesの場合は何も実行しない', async () => {
            const updates: SkillUpdate = {};

            await repository.updateSkill(4, updates);

            expect(mockDb.execute).not.toHaveBeenCalled();
        });

        it('undefinedのフィールドは更新対象に含まない', async () => {
            const updates: SkillUpdate = {
                name: 'Only Name',
                category1: undefined,
                category2: undefined,
                description: undefined,
            };

            await repository.updateSkill(5, updates);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'UPDATE skills SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                ['Only Name', 5]
            );
        });
    });

    describe('deleteSkill', () => {
        it('スキルを削除できる', async () => {
            await repository.deleteSkill(1);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'DELETE FROM skills WHERE id = ?',
                [1]
            );
        });
    });
});
