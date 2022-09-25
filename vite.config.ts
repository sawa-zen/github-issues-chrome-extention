import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from "@crxjs/vite-plugin"

const manifest = defineManifest({
  manifest_version: 3,
  name: 'GitHub issues storypoint',
  version: '1.0.0',
  icons: {
    '128': "icon_128.png"
  },
  action: {
    default_popup: 'index.html',
  },
  permissions: ['storage'],
  content_scripts: [
    {
      matches: [
        "https://github.com/orgs/*/projects/*",
        "https://github.com/orgs/*/projects/*/views/*"
      ],
      js: ["src/content_script/main.ts"]
    }
  ],
})


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  // define: {
  //   global: 'window',
  // },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@react-native-picker/picker': 'react-native-web-picker'
    },
  },
})
