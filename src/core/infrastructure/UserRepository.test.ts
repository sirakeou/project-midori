import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepository } from './UserRepository';
import * as dbModule from './database';
import { Position } from '../entities/enums';

// Mock database module
vi.mock('./database', () => ({
    getDatabase: vi.fn(),
    executeTransaction: vi.fn(),
}));

describe('UserRepository', () => {
    let repository: UserRepository;
    const mockDb = {
        path: 'test.db',
        select: vi.fn(),
        execute: vi.fn(),
        close: vi.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new UserRepository();
        // Setup getDatabase to return mockDb
        vi.mocked(dbModule.getDatabase).mockResolvedValue(mockDb);
    });

    describe('getUser', () => {
        it('returns user when found', async () => {
            const mockUser = {
                employee_id: '1',
                name: 'Test User',
                position: Position.ANALYST,
                created_at: '2023-01-01',
                updated_at: '2023-01-01'
            };
            mockDb.select.mockResolvedValue([mockUser]);

            const result = await repository.getUser('1');
            expect(result).toEqual(mockUser);
            expect(mockDb.select).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM users'),
                ['1']
            );
        });

        it('returns null when not found', async () => {
            mockDb.select.mockResolvedValue([]);
            const result = await repository.getUser('999');
            expect(result).toBeNull();
        });
    });

    describe('createUser', () => {
        it('executes insert query', async () => {
            const newUser = {
                employee_id: '2',
                name: 'New User',
                position: Position.MANAGER
            };

            await repository.createUser(newUser);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO users'),
                ['2', 'New User', Position.MANAGER]
            );
        });
    });
});
