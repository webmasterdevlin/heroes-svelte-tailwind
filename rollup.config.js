/* Compile Svelte components */
import svelte from "rollup-plugin-svelte";

/* Locate modules using the Node resolution algorithm,
	for using third party modules in node_modules */
import resolve from "rollup-plugin-node-resolve";

/* Convert CommonJS modules to ES6,
	so they can be included in a Rollup bundle */
import commonjs from "rollup-plugin-commonjs";

/* Rollup plugin for LiveReload that watches
	the bundle and reloads the page on change */
import livereload from "rollup-plugin-livereload";

/* Rollup plugin to minify generated es bundle.
	Uses terser under the hood. */
import { terser } from "rollup-plugin-terser";

/* Convert ES2015 with buble. */
import buble from "rollup-plugin-buble";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // transpile to IE11 compatible ES5
    buble(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
