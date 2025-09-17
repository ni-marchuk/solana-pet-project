import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'solana-pet-project',
  webDir: 'dist',
  plugins: {
    "StatusBar": {
      "overlaysWebView": true,
      "style": "DEFAULT",
      "backgroundColor": "#000"
    }
  }
};

export default config;
