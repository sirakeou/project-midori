
import type { User } from '../core/entities/user';
import type { Skill } from '../core/entities/skillMaster';
import type { LatestSkillAssessment, SkillAssessment } from '../core/entities/skillAssessment';
import type { PersonalProfileRow } from '../core/infrastructure/database/types';
import {
    Position,
    SkillCategory1,
    SkillCategory2,
} from '../core/entities/enums';

/**
 * Mock database implementation for browser environment
 */
export class MockDatabase {
    path: string = 'memory';

    private users: User[] = [
        {
            employee_id: '100001',
            name: '山田 太郎',
            position: Position.CONSULTANT,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            employee_id: '100002',
            name: '佐藤 花子',
            position: Position.MANAGER,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ];

    private skills: Skill[] = [
        {
            id: 1,
            name: 'React',
            category1: SkillCategory1.TECHNICAL,
            category2: SkillCategory2.AI,
            description: 'Frontend library',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 2,
            name: 'TypeScript',
            category1: SkillCategory1.TECHNICAL,
            category2: SkillCategory2.DATA_MANAGEMENT,
            description: 'Typed JavaScript',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 3,
            name: 'Strategic Planning',
            category1: SkillCategory1.BUSINESS,
            category2: null,
            description: 'Corporate strategy',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ];

    private assessments: SkillAssessment[] = [
        {
            id: 1,
            employee_id: '100001',
            skill_id: 1,
            level: 4,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        },
        {
            id: 2,
            employee_id: '100001',
            skill_id: 2,
            level: 3,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        }
    ];

    private profiles: PersonalProfileRow[] = [
        {
            id: 1,
            employee_id: '100001',
            photo_path: null,
            career: 'Major tech company -> Current company',
            hobbies: 'Reading, Cycling',
            self_introduction: 'I specialize in frontend development.',
            triggers: 'Wanted to work in a dynamic environment.',
            work_preferences: JSON.stringify({ remote: true, flexible: true }),
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        }
    ];

    async close(): Promise<boolean> {
        return true;
    }

    /**
     * Mock select method
     */
    async select<T>(query: string, params?: unknown[]): Promise<T> {
        console.log('[MockDB] select', query, params);

        // Simple routing based on query content

        // Users
        if (query.includes('FROM users WHERE employee_id = ?')) {
            const id = params?.[0];
            return this.users.filter(u => u.employee_id === id) as unknown as T;
        }

        if (query.includes('FROM users')) {
            return this.users as unknown as T;
        }

        // Skills
        if (query.includes('FROM skills WHERE id = ?')) {
            const id = params?.[0];
            return this.skills.filter(s => s.id === id) as unknown as T;
        }

        if (query.includes('FROM skills WHERE category1 = ?')) {
            const cat1 = params?.[0];
            if (query.includes('AND category2 = ?')) {
                const cat2 = params?.[1];
                return this.skills.filter(s => s.category1 === cat1 && s.category2 === cat2) as unknown as T;
            }
            return this.skills.filter(s => s.category1 === cat1) as unknown as T;
        }

        if (query.includes('FROM skills')) {
            return this.skills as unknown as T;
        }

        // Latest Skill Assessments (View simulation)
        if (query.includes('FROM latest_skill_assessments WHERE employee_id = ?')) {
            const empId = params?.[0];
            const result: LatestSkillAssessment[] = this.assessments
                .filter(a => a.employee_id === empId)
                .map(a => {
                    const skill = this.skills.find(s => s.id === a.skill_id);
                    return {
                        id: a.id,
                        employee_id: a.employee_id,
                        skill_id: a.skill_id,
                        level: a.level,
                        updated_at: a.updated_at,
                        skill_name: skill?.name || '',
                        category1: skill?.category1 || SkillCategory1.TECHNICAL, // Default or fallback
                        category2: skill?.category2 || null,
                    };
                });
            return result as unknown as T;
        }

        // Personal Profiles
        if (query.includes('FROM personal_profiles WHERE employee_id = ?')) {
            const empId = params?.[0];
            return this.profiles.filter(p => p.employee_id === empId) as unknown as T;
        }

        // Default empty array for other selects
        return [] as unknown as T;
    }

    /**
     * Mock execute method
     */
    async execute(query: string, params?: unknown[]): Promise<void> {
        console.log('[MockDB] execute', query, params);
        // In a real mock, we would update the internal arrays here
        // For now, just logging is enough as we are mainly fixing read issues
        if (query.startsWith('INSERT INTO skills')) {
            // Mock insert skill
            this.skills.push({
                id: this.skills.length + 1,
                name: params?.[0] as string,
                category1: params?.[1] as SkillCategory1,
                category2: params?.[2] as SkillCategory2 | null,
                description: params?.[3] as string | null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
        }
        return Promise.resolve();
    }
}
