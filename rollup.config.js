
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const MAIN_BUNDLE = 'dist/main'
const NAVIGATION_BUNDLE = 'dist/navigation'

const bundle = (input, config) => ({
  ...config,
  input,
  external: id => !/^[./]/.test(id),
})

export default [
  bundle('src/index.ts', {
    plugins: [
      replace({
        preventAssignment: false,
        delimiters: ['', ''],
        '../../assets': './assets',
      }),
      esbuild()
    ],
    output: [
      {
        file: `${MAIN_BUNDLE}.js`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  }),
  bundle('src/index.ts', {
    plugins: [dts()],
    output: {
      file: `${MAIN_BUNDLE}.d.ts`,
      format: 'es',
    },
  }),
  bundle('src/navigation/index.ts', {
    plugins: [esbuild()],
    output: [
      {
        file: `${NAVIGATION_BUNDLE}.js`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  }),
  bundle('src/navigation/index.ts', {
    plugins: [dts()],
    output: {
      file: `${NAVIGATION_BUNDLE}.d.ts`,
      format: 'es',
    },
  })
]
