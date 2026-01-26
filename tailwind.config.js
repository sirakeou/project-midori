import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // shadcn/ui tokens
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Legacy/Custom colors
                green: {
                    50: '#E6F5EC',
                    100: '#C2E5D1',
                    200: '#9BD4B5',
                    300: '#71C598',
                    400: '#51B883',
                    500: '#2CAC6E',
                    600: '#259D63',
                    700: '#1D8B56',
                    800: '#197A4B',
                    900: '#115A36',
                    1000: '#0C472A',
                    1100: '#08351F',
                    1200: '#032213',
                },
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
                // セマンティックカラー (Legacy mappings if needed, otherwise rely on shadcn tokens)
                success: '#259D63',
                error: '#EF4444',
                warning: '#F59E0B',
                info: '#2CAC6E',
            },
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
                mono: ['"Noto Sans Mono"', 'monospace'],
            },
            fontSize: {
                xs: '0.75rem',      // 12px
                sm: '0.875rem',     // 14px
                base: '1rem',       // 16px
                lg: '1.125rem',     // 18px
                xl: '1.25rem',      // 20px
                '2xl': '1.5rem',    // 24px
                '3xl': '1.875rem',  // 30px
                '4xl': '2.25rem',   // 36px
                '5xl': '2.8125rem', // 45px
            },
            fontWeight: {
                normal: '400',
                bold: '700',
            },
            lineHeight: {
                tight: '120%',
                normal: '140%',
                relaxed: '150%',
                loose: '175%',
            },
            borderRadius: {
                none: '0',
                sm: '0.125rem',   // 2px
                DEFAULT: '0.25rem',  // 4px
                md: '0.375rem',   // 6px
                lg: '0.5rem',     // 8px
                xl: '0.75rem',    // 12px
                '2xl': '1rem',    // 16px
                full: '9999px',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                none: 'none',
            },
            zIndex: {
                dropdown: '1000',
                sticky: '1100',
                overlay: '1200',
                modal: '1300',
                popover: '1400',
                tooltip: '1500',
            },
        },
    },
    plugins: [animate],
}
