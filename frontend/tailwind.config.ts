import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        input: 'var(--bg-input)',
        textSecondary: 'var(--text-secondary)',
        button: 'var(--bg-button)',
        card: 'var(--bg-card)',
        cardBlue: 'var(--bg-card-blue)',
        bodyColor: 'var(--bg-body-color)',
        bodyColorSecondary: 'var(--bg-body-color-secondary)',
        bodyColorTertiary: 'var(--bg-body-color-tertiary)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
