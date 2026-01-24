
import {
    getDatabase,
} from './index';
import {
    userRepository,
    skillMasterRepository,
    skillAssessmentRepository,
    personalProfileRepository,
} from '../../index';
import {
    Position,
    SkillCategory1,
    SkillCategory2,
} from '../../entities/enums';

/**
 * テストデータをデータベースに投入する
 */
export async function seedDatabase(): Promise<void> {
    const db = await getDatabase();

    // トランザクション開始
    await db.execute('BEGIN TRANSACTION');

    try {
        console.log('Starting database seed...');

        // 1. Users
        await userRepository.createUser({
            employee_id: '100001',
            name: '山田 太郎',
            position: Position.CONSULTANT,
        });
        await userRepository.createUser({
            employee_id: '100002',
            name: '佐藤 花子',
            position: Position.MANAGER,
        });

        // 2. Skills
        // IDはAUTOINCREMENTなので、作成後に取得するか、アプリロジックで名前検索して紐付けるのが正しいが
        // ここでは簡易的にINSERTのみ行う（ID指定はしない）

        await skillMasterRepository.createSkill({
            name: 'React',
            category1: SkillCategory1.TECHNICAL,
            category2: SkillCategory2.AI,
            description: 'Frontend library',
        });
        await skillMasterRepository.createSkill({
            name: 'TypeScript',
            category1: SkillCategory1.TECHNICAL,
            category2: SkillCategory2.DATA_MANAGEMENT,
            description: 'Typed JavaScript',
        });
        await skillMasterRepository.createSkill({
            name: 'Strategic Planning',
            category1: SkillCategory1.BUSINESS,
            category2: null,
            description: 'Corporate strategy',
        });

        // 3. SkillsのIDを取得 (名前で検索)
        // Note: 実装単純化のため、ここでは生のSQLでIDを取得して紐付ける
        const skills = await db.select<{ id: number, name: string }[]>('SELECT id, name FROM skills');
        const reactId = skills.find(s => s.name === 'React')?.id;
        const tsId = skills.find(s => s.name === 'TypeScript')?.id;

        if (reactId && tsId) {
            // 4. Skill Assessments
            const now = new Date().toISOString();
            await skillAssessmentRepository.createSkillAssessment({
                employee_id: '100001',
                skill_id: reactId,
                level: 4,
                updated_at: now,
            });
            await skillAssessmentRepository.createSkillAssessment({
                employee_id: '100001',
                skill_id: tsId,
                level: 3,
                updated_at: now,
            });
        }

        // 5. Personal Profile
        await personalProfileRepository.createPersonalProfile({
            employee_id: '100001',
            photo_path: null,
            career: 'Major tech company -> Current company',
            hobbies: 'Reading, Cycling',
            self_introduction: 'I specialize in frontend development.',
            triggers: 'Wanted to work in a dynamic environment.',
            work_preferences: null, // WorkPreferences型のオブジェクトまたはnull
            updated_at: new Date().toISOString(),
        });

        await db.execute('COMMIT');
        console.log('Database seeded successfully.');
    } catch (error) {
        await db.execute('ROLLBACK');
        console.error('Failed to seed database:', error);
        throw error;
    }
}
