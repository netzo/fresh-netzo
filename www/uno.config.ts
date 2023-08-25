import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'chip-md': 'mr-1 px-4 py-2 rounded-sm text-gray-500 bg-gray-200 font-semibold text-xs flex text-center w-max cursor-default active:bg-gray-300 transition duration-300 ease',
    'chip-sm': 'chip-md px-2 py-1',
    'chip-xs': 'chip-md px-1 py-0',
    'button-cta': 'font-bold px-4 py-3 rounded-lg border-2',
    'button-cta-primary': 'button-cta bg-primary-600 text-white border-primary-600 hover:bg-primary-500 focus:ring-primary-500',
    'button-cta-secondary': 'button-cta bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 focus:ring-gray-300',
    'button-cta-tertiary': 'button-cta bg-transparent text-gray-800 text-gray-700 border-gray-200 hover:bg-gray-100 focus:ring-gray-200',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    // see https://tailwindcolorgenerator.com/
    colors: {
      primary: {
        50: '#32b2ff',
        100: '#28a8ff',
        200: '#1e9eff',
        300: '#1494ff',
        400: '#0a8aff',
        500: '#0080ff',
        600: '#0076f5',
        700: '#006ceb',
        800: '#0062e1',
        900: '#0058d7',
      },
      secondary: {
        50: '#33fffd',
        100: '#29fff3',
        200: '#1ffee9',
        300: '#15f4df',
        400: '#0bead5',
        500: '#01e0cb',
        600: '#00d6c1',
        700: '#00ccb7',
        800: '#00c2ad',
        900: '#00b8a3',
      },
      accent: {
        50: '#ff6dae',
        100: '#ff63a4',
        200: '#ff599a',
        300: '#ff4f90',
        400: '#ff4586',
        500: '#ff3b7c',
        600: '#f53172',
        700: '#eb2768',
        800: '#e11d5e',
        900: '#d71354',
      },
    },
  },
})
