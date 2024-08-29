import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'practica3',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      android: {
        // Permisos para Android
        requestPermissions: true
      }
    }
  }
};

export default config;
