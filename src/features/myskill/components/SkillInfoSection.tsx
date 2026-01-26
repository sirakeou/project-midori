import type { LatestSkillAssessment } from '@/core'
import { SkillCategory1 } from '@/core'
import { BusinessSkillsList } from './BusinessSkillsList'
import { IndustrySkillsList } from './IndustrySkillsList'
import { TechnicalSkillsList } from './TechnicalSkillsList'

interface SkillInfoSectionProps {
    skills: LatestSkillAssessment[]
}

export function SkillInfoSection({ skills }: SkillInfoSectionProps) {
    const businessSkills = skills.filter(
        (s) => s.category1 === SkillCategory1.BUSINESS
    )
    const industrySkills = skills.filter(
        (s) => s.category1 === SkillCategory1.INDUSTRY
    )
    const technicalSkills = skills.filter(
        (s) => s.category1 === SkillCategory1.TECHNICAL
    )

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col gap-6">
                {/* 上段: ビジネスとインダストリー */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BusinessSkillsList skills={businessSkills} />
                    <IndustrySkillsList skills={industrySkills} />
                </div>

                {/* 下段: テクニカル */}
                <div className="w-full">
                    <TechnicalSkillsList skills={technicalSkills} />
                </div>
            </div>
        </div>
    )
}
