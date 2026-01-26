import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillAssessmentRepository } from './SkillAssessmentRepository';
import * as dbModule from './database';
import { Position, SkillCategory1, SkillCategory2 } from '../entities/enums';
import type {
    SkillAssessment,
    LatestSkillAssessment,
    SkillAssessmentInsert,
    EmployeeSkillSummary,
} from '../entities/skillAssessment';

// Mock database module
vi.mock('./database', () => ({
    getDatabase: vi.fn(),
}));

describe('SkillAssessmentRepository', () => {
    let repository: SkillAssessmentRepository;
    const mockDb = {
        path: 'test.db',
        select: vi.fn(),
        execute: vi.fn(),
        close: vi.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new SkillAssessmentRepository();
        vi.mocked(dbModule.getDatabase).mockResolvedValue(mockDb);
    });

    describe('getEmployeeSkills', () => {
        it('特定社員の最新スキル評価を取得できる', async () => {
            const mockSkills: LatestSkillAssessment[] = [
                {
                    id: 1,
                    employee_id: 'E001',
                    skill_id: 10,
                    level: 4,
                    updated_at: '2023-01-01',
                    skill_name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                },
                {
                    id: 2,
                    employee_id: 'E001',
                    skill_id: 20,
                    level: 3,
                    updated_at: '2023-01-02',
                    skill_name: 'Strategy',
                    category1: SkillCategory1.BUSINESS,
                    category2: SkillCategory2.STRATEGY,
                },
            ];
            mockDb.select.mockResolvedValue(mockSkills);

            const result = await repository.getEmployeeSkills('E001');

            expect(result).toEqual(mockSkills);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM latest_skill_assessments WHERE employee_id = ? ORDER BY category1, skill_name',
                ['E001']
            );
        });

        it('スキル評価がない社員の場合は空配列を返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getEmployeeSkills('E999');

            expect(result).toEqual([]);
        });
    });

    describe('getEmployeesBySkill', () => {
        it('特定スキルの評価を持つ社員を取得できる', async () => {
            const mockEmployees: LatestSkillAssessment[] = [
                {
                    id: 1,
                    employee_id: 'E001',
                    skill_id: 10,
                    level: 5,
                    updated_at: '2023-01-01',
                    skill_name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                },
                {
                    id: 2,
                    employee_id: 'E002',
                    skill_id: 10,
                    level: 3,
                    updated_at: '2023-01-02',
                    skill_name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                },
            ];
            mockDb.select.mockResolvedValue(mockEmployees);

            const result = await repository.getEmployeesBySkill(10);

            expect(result).toEqual(mockEmployees);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM latest_skill_assessments WHERE skill_id = ? ORDER BY level DESC, employee_id',
                [10]
            );
        });

        it('スキル評価がないスキルの場合は空配列を返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getEmployeesBySkill(999);

            expect(result).toEqual([]);
        });
    });

    describe('createSkillAssessment', () => {
        it('スキル評価を作成できる', async () => {
            const newAssessment: SkillAssessmentInsert = {
                employee_id: 'E001',
                skill_id: 10,
                level: 4,
                updated_at: '2023-01-01T00:00:00Z',
            };

            await repository.createSkillAssessment(newAssessment);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO skill_assessments (employee_id, skill_id, level, updated_at) VALUES (?, ?, ?, ?)',
                ['E001', 10, 4, '2023-01-01T00:00:00Z']
            );
        });

        it('レベル0のスキル評価を作成できる', async () => {
            const newAssessment: SkillAssessmentInsert = {
                employee_id: 'E002',
                skill_id: 20,
                level: 0,
                updated_at: '2023-02-01T00:00:00Z',
            };

            await repository.createSkillAssessment(newAssessment);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO skill_assessments (employee_id, skill_id, level, updated_at) VALUES (?, ?, ?, ?)',
                ['E002', 20, 0, '2023-02-01T00:00:00Z']
            );
        });

        it('レベル5のスキル評価を作成できる', async () => {
            const newAssessment: SkillAssessmentInsert = {
                employee_id: 'E003',
                skill_id: 30,
                level: 5,
                updated_at: '2023-03-01T00:00:00Z',
            };

            await repository.createSkillAssessment(newAssessment);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'INSERT INTO skill_assessments (employee_id, skill_id, level, updated_at) VALUES (?, ?, ?, ?)',
                ['E003', 30, 5, '2023-03-01T00:00:00Z']
            );
        });
    });

    describe('getSkillAssessmentHistory', () => {
        it('特定社員の特定スキルの評価履歴を取得できる', async () => {
            const mockHistory: SkillAssessment[] = [
                {
                    id: 3,
                    employee_id: 'E001',
                    skill_id: 10,
                    level: 4,
                    updated_at: '2023-03-01',
                    created_at: '2023-03-01',
                },
                {
                    id: 2,
                    employee_id: 'E001',
                    skill_id: 10,
                    level: 3,
                    updated_at: '2023-02-01',
                    created_at: '2023-02-01',
                },
                {
                    id: 1,
                    employee_id: 'E001',
                    skill_id: 10,
                    level: 2,
                    updated_at: '2023-01-01',
                    created_at: '2023-01-01',
                },
            ];
            mockDb.select.mockResolvedValue(mockHistory);

            const result = await repository.getSkillAssessmentHistory('E001', 10);

            expect(result).toEqual(mockHistory);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM skill_assessments WHERE employee_id = ? AND skill_id = ? ORDER BY updated_at DESC',
                ['E001', 10]
            );
        });

        it('履歴がない場合は空配列を返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getSkillAssessmentHistory('E999', 999);

            expect(result).toEqual([]);
        });
    });

    describe('deleteSkillAssessment', () => {
        it('スキル評価を削除できる', async () => {
            await repository.deleteSkillAssessment(1);

            expect(mockDb.execute).toHaveBeenCalledWith(
                'DELETE FROM skill_assessments WHERE id = ?',
                [1]
            );
        });
    });

    describe('getEmployeeSkillSummary', () => {
        it('全社員のスキル一覧を取得できる', async () => {
            const mockSummary: EmployeeSkillSummary[] = [
                {
                    employee_id: 'E001',
                    employee_name: 'John Doe',
                    position: Position.ANALYST,
                    skill_name: 'Python',
                    category1: SkillCategory1.TECHNICAL,
                    category2: SkillCategory2.AI,
                    level: 4,
                    updated_at: '2023-01-01',
                },
                {
                    employee_id: 'E002',
                    employee_name: 'Jane Smith',
                    position: Position.MANAGER,
                    skill_name: 'Strategy',
                    category1: SkillCategory1.BUSINESS,
                    category2: SkillCategory2.STRATEGY,
                    level: 5,
                    updated_at: '2023-01-02',
                },
                {
                    employee_id: 'E003',
                    employee_name: 'Bob Johnson',
                    position: Position.CONSULTANT,
                    skill_name: null,
                    category1: null,
                    category2: null,
                    level: null,
                    updated_at: null,
                },
            ];
            mockDb.select.mockResolvedValue(mockSummary);

            const result = await repository.getEmployeeSkillSummary();

            expect(result).toEqual(mockSummary);
            expect(mockDb.select).toHaveBeenCalledWith(
                'SELECT * FROM employee_skill_summary'
            );
        });

        it('データがない場合は空配列を返す', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await repository.getEmployeeSkillSummary();

            expect(result).toEqual([]);
        });
    });
});
