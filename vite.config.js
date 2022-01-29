import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import graphql from "@rollup/plugin-graphql";


export default defineConfig({
  plugins: [vue(), nodePolyfills(), graphql()]
})
