import { useMemo } from 'react'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'
import type { LatestSkillAssessment } from '@/core'
import { SkillCategory1 } from '@/core'

interface TechnicalSkillsListProps {
    skills: LatestSkillAssessment[]
}

// カテゴリの表示順序を定義
const CATEGORY_ORDER = ['STRATEGY', 'DATA_MANAGEMENT', 'AI'] as const

// カテゴリの設定（デザインシステムの定義色に準拠）
const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
    STRATEGY: { label: '戦略', color: 'var(--color-primary)' },
    DATA_MANAGEMENT: { label: 'データマネジメント', color: 'var(--color-primary)' },
    AI: { label: 'AI', color: 'var(--color-primary)' },
}

/**
 * レベルに応じた色を取得する
 * デザインシステムで定義されたGreenカラーパレットを使用
 */
function getLevelColor(level: number, baseHsl: string): string {
    // レベルに応じてGreenカラーパレットから色を選択
    const colorMap: Record<number, string> = {
        1: 'var(--color-green-100)', // 最も明るい
        2: 'var(--color-green-300)',
        3: 'var(--color-green-500)',
        4: 'var(--color-green-700)',
        5: 'var(--color-green-900)', // 最も濃い
    }

    // プライマリーカラーの場合はレベル別の色を返す
    if (baseHsl.includes('var(--color-primary)')) {
        return colorMap[level] || 'var(--color-green-600)'
    }

    return baseHsl
}

// スキルレベルのリングチャートコンポーネント
function SkillLevelRing({ level, color }: { level: number; color: string }) {
    const levelColor = getLevelColor(level, color)

    const chartData = [
        { name: '達成', value: level, fill: levelColor },
        { name: '未達成', value: 5 - level, fill: 'var(--color-muted)' },
    ]

    return (
        <div className="relative w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={35}
                        startAngle={90}
                        endAngle={450}
                        paddingAngle={0}
                        dataKey="value"
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: levelColor }}>
                    {level}
                </span>
            </div>
        </div>
    )
}

export function TechnicalSkillsList({ skills }: TechnicalSkillsListProps) {
    const technicalSkills = useMemo(() => {
        // テクニカルスキルでレベル1以上のものをフィルタリングし、レベルの高い順に最大8つまで表示
        return skills
            .filter((skill) => skill.category1 === SkillCategory1.TECHNICAL && skill.level >= 1)
            .sort((a, b) => b.level - a.level) // レベルの高い順
            .slice(0, 8) // 上位8つ
    }, [skills])

    // カテゴリ別にグループ化（定義された順序で必ず表示）
    const categorizedSkills = useMemo(() => {
        const categoryMap = new Map<string, LatestSkillAssessment[]>()

        // 定義されたカテゴリを初期化
        CATEGORY_ORDER.forEach((category) => {
            categoryMap.set(category, [])
        })

        // スキルをカテゴリ別に振り分け
        technicalSkills.forEach((skill) => {
            const category = skill.category2
            if (category && categoryMap.has(category)) {
                categoryMap.get(category)!.push(skill)
            }
        })

        // 定義された順序でカテゴリを返す
        return CATEGORY_ORDER.map((categoryKey) => ({
            categoryKey,
            categoryLabel: CATEGORY_CONFIG[categoryKey].label,
            color: CATEGORY_CONFIG[categoryKey].color,
            skills: categoryMap.get(categoryKey) || [],
        }))
    }, [technicalSkills])

    if (technicalSkills.length === 0) {
        return (
            <div className="bg-card rounded-lg shadow-sm border text-card-foreground h-full">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-foreground">テクニカルスキル</h2>
                </div>
                <div className="px-6 py-8 text-center text-muted-foreground">
                    テクニカルスキルが登録されていません
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card rounded-lg shadow-sm border text-card-foreground h-full">
            <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                    テクニカルスキル
                </h2>
            </div>
            <div className="px-6 py-6 space-y-6">
                {categorizedSkills.map((category) => (
                    <div key={category.categoryKey} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: category.color }}
                            />
                            <h3 className="font-semibold text-base">{category.categoryLabel}</h3>
                        </div>
                        {category.skills.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.skill_id}
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <SkillLevelRing level={skill.level} color={category.color} />
                                        <div className="text-center w-full">
                                            <h4 className="font-medium text-sm">{skill.skill_name}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground pl-5">該当なし</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
