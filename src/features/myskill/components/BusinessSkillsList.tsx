import type { LatestSkillAssessment } from '@/core'
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts'

interface BusinessSkillsListProps {
    skills: LatestSkillAssessment[]
}

interface CustomTickProps {
    x?: number
    y?: number
    payload?: { value: string }
    textAnchor?: 'inherit' | 'end' | 'start' | 'middle'
}

// カスタムTickコンポーネント: 長いラベルを折り返す
function CustomTick({ x, y, payload, textAnchor }: CustomTickProps) {
    const maxLength = 6 // 1行あたりの最大文字数
    const text = payload?.value || ''
    const lines: string[] = []

    // テキストを指定文字数で分割
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.substring(i, i + maxLength))
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={-(lines.length - 1) * 6} // 複数行の場合は上にずらす
                textAnchor={textAnchor}
                fill="hsl(var(--foreground))"
                fontSize={12}
            >
                {lines.map((line, index) => (
                    <tspan key={index} x={0} dy={index === 0 ? 0 : 12}>
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    )
}

interface CustomRadiusTickProps {
    x?: number
    y?: number
    payload?: { value: number }
}

// 数値軸用のカスタムTickコンポーネント: 5を非表示にする
function CustomRadiusTick({ x, y, payload }: CustomRadiusTickProps) {
    // 値が5の場合は何も表示しない
    if (payload?.value === 5) {
        return null
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize={12}
            >
                {payload?.value}
            </text>
        </g>
    )
}

export function BusinessSkillsList({ skills }: BusinessSkillsListProps) {
    const chartData = skills.map((skill) => ({
        subject: skill.skill_name,
        value: skill.level,
        fullMark: 5,
    }))

    return (
        <div className="bg-card rounded-lg shadow-sm border text-card-foreground h-full flex flex-col">
            <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                    ビジネススキル
                </h2>
            </div>
            <div className="px-6 py-2 flex items-center justify-center flex-1 outline-none">
                {skills.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        ビジネススキルが登録されていません
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={320} className="outline-none">
                        <RadarChart data={chartData} cx="50%" cy="50%" margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={<CustomTick />}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 5]}
                                tick={<CustomRadiusTick />}
                            />
                            <Radar
                                name="スキルレベル"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}
