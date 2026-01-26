import type { LatestSkillAssessment } from '@/core'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface IndustrySkillsListProps {
    skills: LatestSkillAssessment[]
}

export function IndustrySkillsList({ skills }: IndustrySkillsListProps) {
    // レベル1以上のスキルのみをフィルタリング
    const filteredSkills = skills.filter((skill) => skill.level >= 1)

    // rechartsのデータ形式に変換
    const chartData = filteredSkills.map((skill) => ({
        name: skill.skill_name,
        level: skill.level,
        category: skill.category1 + (skill.category2 ? ` / ${skill.category2}` : ''),
    }))

    return (
        <div className="bg-card rounded-lg shadow-sm border text-card-foreground h-full flex flex-col">
            <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-foreground">インダストリスキル</h2>
            </div>
            <div className="px-6 py-2 flex items-center justify-center flex-1 outline-none">
                {filteredSkills.length > 0 ? (
                    <ResponsiveContainer width="100%" height={chartData.length * 40 + 50} className="outline-none">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                            barSize={20}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                            <XAxis
                                type="number"
                                domain={[0, 5]}
                                ticks={[0, 1, 2, 3, 4, 5]}
                                stroke="hsl(var(--muted-foreground))"
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={100}
                                stroke="hsl(var(--muted-foreground))"
                                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                                tickFormatter={(value) => value.length > 8 ? value.substring(0, 8) + '...' : value}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--popover))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '6px',
                                    color: 'hsl(var(--popover-foreground))',
                                }}
                                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                                formatter={(value) => [`レベル ${value ?? 0}`, 'スキルレベル']}
                            />
                            <Bar
                                dataKey="level"
                                fill="hsl(var(--primary))"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="py-8 text-center text-muted-foreground">
                        インダストリスキルが登録されていません
                    </div>
                )}
            </div>
        </div>
    )
}
