import { describe, it, expect } from 'vitest';
import { parseWorkPreferences, stringifyWorkPreferences } from './types';
import type { WorkPreferences } from '../../entities/enums';
import {
    TimePreference,
    InstructionStyle,
    WorkLifeBalance,
    PrivateConversation,
    LunchStyle,
    Drinking,
    OfficeEvent,
} from '../../entities/enums';

describe('database/types', () => {
    describe('parseWorkPreferences', () => {
        it('正しいJSON文字列をパースできる', () => {
            const json = JSON.stringify({
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.DETAILED,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.ACTIVE,
            });

            const result = parseWorkPreferences(json);

            expect(result).toEqual({
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.DETAILED,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.ACTIVE,
            });
        });

        it('null値をすべて含むJSONをパースできる', () => {
            const json = JSON.stringify({
                timePreference: null,
                instructionStyle: null,
                workLifeBalance: null,
                privateConversation: null,
                lunchStyle: null,
                drinking: null,
                officeEvent: null,
            });

            const result = parseWorkPreferences(json);

            expect(result).toEqual({
                timePreference: null,
                instructionStyle: null,
                workLifeBalance: null,
                privateConversation: null,
                lunchStyle: null,
                drinking: null,
                officeEvent: null,
            });
        });

        it('null入力に対してnullを返す', () => {
            const result = parseWorkPreferences(null);
            expect(result).toBeNull();
        });

        it('無効なJSON文字列に対してnullを返す', () => {
            const result = parseWorkPreferences('invalid json');
            expect(result).toBeNull();
        });

        it('空文字列に対してnullを返す', () => {
            const result = parseWorkPreferences('');
            expect(result).toBeNull();
        });

        it('部分的に埋められたJSONをパースできる', () => {
            const json = JSON.stringify({
                timePreference: TimePreference.EVENING,
                instructionStyle: null,
                workLifeBalance: WorkLifeBalance.WORK_FOCUSED,
                privateConversation: null,
                lunchStyle: null,
                drinking: Drinking.DISLIKE,
                officeEvent: null,
            });

            const result = parseWorkPreferences(json);

            expect(result).toEqual({
                timePreference: TimePreference.EVENING,
                instructionStyle: null,
                workLifeBalance: WorkLifeBalance.WORK_FOCUSED,
                privateConversation: null,
                lunchStyle: null,
                drinking: Drinking.DISLIKE,
                officeEvent: null,
            });
        });
    });

    describe('stringifyWorkPreferences', () => {
        it('WorkPreferencesオブジェクトをJSON文字列に変換できる', () => {
            const prefs: WorkPreferences = {
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.ROUGH,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.PROFESSIONAL,
                lunchStyle: LunchStyle.QUICK,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.SEPARATE,
            };

            const result = stringifyWorkPreferences(prefs);

            expect(result).toBe(JSON.stringify(prefs));
            // パース可能であることを確認
            expect(JSON.parse(result!)).toEqual(prefs);
        });

        it('null値をすべて含むオブジェクトをJSON文字列に変換できる', () => {
            const prefs: WorkPreferences = {
                timePreference: null,
                instructionStyle: null,
                workLifeBalance: null,
                privateConversation: null,
                lunchStyle: null,
                drinking: null,
                officeEvent: null,
            };

            const result = stringifyWorkPreferences(prefs);

            expect(result).toBe(JSON.stringify(prefs));
            expect(JSON.parse(result!)).toEqual(prefs);
        });

        it('null入力に対してnullを返す', () => {
            const result = stringifyWorkPreferences(null);
            expect(result).toBeNull();
        });

        it('部分的に埋められたオブジェクトをJSON文字列に変換できる', () => {
            const prefs: WorkPreferences = {
                timePreference: TimePreference.EVENING,
                instructionStyle: null,
                workLifeBalance: null,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: null,
                officeEvent: null,
            };

            const result = stringifyWorkPreferences(prefs);

            expect(result).toBe(JSON.stringify(prefs));
            expect(JSON.parse(result!)).toEqual(prefs);
        });
    });

    describe('往復変換', () => {
        it('stringify -> parse の往復変換で元のデータが復元される', () => {
            const original: WorkPreferences = {
                timePreference: TimePreference.MORNING,
                instructionStyle: InstructionStyle.DETAILED,
                workLifeBalance: WorkLifeBalance.WORK_FOCUSED,
                privateConversation: PrivateConversation.PROFESSIONAL,
                lunchStyle: LunchStyle.QUICK,
                drinking: Drinking.DISLIKE,
                officeEvent: OfficeEvent.ACTIVE,
            };

            const json = stringifyWorkPreferences(original);
            const parsed = parseWorkPreferences(json);

            expect(parsed).toEqual(original);
        });

        it('parse -> stringify の往復変換で元のJSON文字列が復元される', () => {
            const originalJson = JSON.stringify({
                timePreference: TimePreference.EVENING,
                instructionStyle: InstructionStyle.ROUGH,
                workLifeBalance: WorkLifeBalance.BALANCE,
                privateConversation: PrivateConversation.FRIENDLY,
                lunchStyle: LunchStyle.ENJOY,
                drinking: Drinking.LIKE,
                officeEvent: OfficeEvent.SEPARATE,
            });

            const parsed = parseWorkPreferences(originalJson);
            const stringified = stringifyWorkPreferences(parsed);

            expect(stringified).toBe(originalJson);
        });
    });
});
