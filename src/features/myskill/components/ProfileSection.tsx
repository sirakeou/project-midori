import { User as UserIcon, Briefcase, Heart, User as UserProfileIcon, AlertTriangle, Clock } from 'lucide-react'
import type { User, PersonalProfile } from '@/core'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { TimePreference, InstructionStyle, WorkLifeBalance, PrivateConversation, LunchStyle, Drinking, OfficeEvent } from '@/core'

interface ProfileSectionProps {
    user: User | null
    profile: PersonalProfile | null
}

// 働き方の表示用ヘルパー
// WorkPreferences Helper 2 (Simple 3-segment toggle look)
const WorkPrefItem = ({ label, left, right, current, leftVal, rightVal }: { label: string, left: string, right: string, current: string | null, leftVal: string, rightVal: string }) => {
    const isLeft = current === leftVal;
    const isRight = current === rightVal;

    return (
        <div className="flex flex-col py-3 border-b border-border last:border-0 gap-2">
            <span className="text-sm text-foreground">{label}</span>
            <div className="flex bg-muted rounded-lg p-1 w-full gap-1">
                <div className={`px-2 py-1.5 text-xs rounded-md transition-all flex-1 text-center ${isLeft ? 'bg-background text-primary shadow-sm font-medium' : 'text-muted-foreground'}`}>
                    {left}
                </div>
                <div className={`px-2 py-1.5 text-xs rounded-md transition-all flex-1 text-center ${isRight ? 'bg-background text-primary shadow-sm font-medium' : 'text-muted-foreground'}`}>
                    {right}
                </div>
            </div>
        </div>
    )
}

export function ProfileSection({ user, profile }: ProfileSectionProps) {
    if (!user) return null

    return (
        <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
            {/* ユーザー基本情報エリア */}
            <div className="p-6 border-b bg-linear-to-br from-primary/5 to-background">
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                        {/* プレースホルダー画像: グレー背景 + UserIcon */}
                        <div className="w-24 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                            <UserIcon className="w-12 h-12" />
                        </div>
                    </div>
                    <div className="flex-1 pt-2">
                        <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">社員番号：{user.employee_id}</p>
                        <div className="mt-3 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {user.position}
                        </div>
                    </div>
                </div>
            </div>

            {/* 私の説明書エリア (アコーディオン) */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                    私の説明書
                </h3>

                <Accordion type="multiple" className="w-full space-y-4" defaultValue={['career', 'hobbies', 'self_introduction', 'triggers']}>

                    <AccordionItem value="career" className="border rounded-lg bg-muted/30 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-2 text-foreground">
                                <Briefcase className="w-5 h-5 text-primary" />
                                <span className="font-semibold">これまでのキャリア</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {profile?.career || <span className="text-muted-foreground italic">未入力です</span>}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="hobbies" className="border rounded-lg bg-muted/30 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-2 text-foreground">
                                <Heart className="w-5 h-5 text-primary" />
                                <span className="font-semibold">趣味</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {profile?.hobbies || <span className="text-muted-foreground italic">未入力です</span>}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="self_introduction" className="border rounded-lg bg-muted/30 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-2 text-foreground">
                                <UserProfileIcon className="w-5 h-5 text-primary" />
                                <span className="font-semibold">自分はこんな人</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {profile?.self_introduction || <span className="text-muted-foreground italic">未入力です</span>}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="triggers" className="border rounded-lg bg-muted/30 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-2 text-foreground">
                                <AlertTriangle className="w-5 h-5 text-primary" />
                                <span className="font-semibold">地雷はこれ</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {profile?.triggers || <span className="text-muted-foreground italic">未入力です</span>}
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

                {/* 働き方セクション */}
                <div className="mt-8 border rounded-lg bg-card p-4">
                    <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        働き方
                    </h4>
                    <div className="space-y-0">
                        <WorkPrefItem
                            label="朝型 / 夜型"
                            left="朝型"
                            right="夜型"
                            current={profile?.work_preferences?.timePreference || null}
                            leftVal={TimePreference.MORNING}
                            rightVal={TimePreference.EVENING}
                        />
                        <WorkPrefItem
                            label="指示の受け方"
                            left="細かい指示"
                            right="ざっくり"
                            current={profile?.work_preferences?.instructionStyle || null}
                            leftVal={InstructionStyle.DETAILED}
                            rightVal={InstructionStyle.ROUGH}
                        />
                        <WorkPrefItem
                            label="仕事と生活"
                            left="WLB重視"
                            right="仕事優先"
                            current={profile?.work_preferences?.workLifeBalance || null}
                            leftVal={WorkLifeBalance.BALANCE}
                            rightVal={WorkLifeBalance.WORK_FOCUSED}
                        />
                        <WorkPrefItem
                            label="雑談"
                            left="話OK"
                            right="仕事のみ"
                            current={profile?.work_preferences?.privateConversation || null}
                            leftVal={PrivateConversation.FRIENDLY}
                            rightVal={PrivateConversation.PROFESSIONAL}
                        />
                        <WorkPrefItem
                            label="ランチ"
                            left="楽しむ"
                            right="簡単に"
                            current={profile?.work_preferences?.lunchStyle || null}
                            leftVal={LunchStyle.ENJOY}
                            rightVal={LunchStyle.QUICK}
                        />
                        <WorkPrefItem
                            label="飲み会"
                            left="好き"
                            right="苦手"
                            current={profile?.work_preferences?.drinking || null}
                            leftVal={Drinking.LIKE}
                            rightVal={Drinking.DISLIKE}
                        />
                        <WorkPrefItem
                            label="休日イベント"
                            left="OK"
                            right="公私分ける"
                            current={profile?.work_preferences?.officeEvent || null}
                            leftVal={OfficeEvent.ACTIVE}
                            rightVal={OfficeEvent.SEPARATE}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
