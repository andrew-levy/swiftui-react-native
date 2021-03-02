import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const MAIN_SRC = 'src/index.ts';
const NAVIGATION_SRC = 'src/navigation/index.ts';
const MAIN_BUNDLE = 'dist/main';
const NAVIGATION_BUNDLE = 'dist/navigation';

const bundle = (input, config) => ({
  ...config,
  input,
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle(MAIN_SRC, {
    plugins: [esbuild()],
    output: {
      file: `${MAIN_BUNDLE}.js`,
      format: 'cjs',
      sourcemap: true,
    },
  }),
  bundle(MAIN_SRC, {
    plugins: [dts()],
    output: {
      file: `${MAIN_BUNDLE}.d.ts`,
      format: 'es',
    },
  }),
  bundle(NAVIGATION_SRC, {
    plugins: [esbuild()],
    output: {
      file: `${NAVIGATION_BUNDLE}.js`,
      format: 'cjs',
      sourcemap: true,
    },
  }),
  bundle(NAVIGATION_SRC, {
    plugins: [dts()],
    output: {
      file: `${NAVIGATION_BUNDLE}.d.ts`,
      format: 'es',
    },
  }),
];
