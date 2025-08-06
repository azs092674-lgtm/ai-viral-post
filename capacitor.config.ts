import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f1b106db16f94169b39a19f7ba85d0f9',
  appName: 'ai-viral-post',
  webDir: 'dist',
  server: {
    url: 'https://f1b106db-16f9-4169-b39a-19f7ba85d0f9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;