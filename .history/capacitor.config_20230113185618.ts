import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.livekatha',
  appName: 'Livekatha',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
  url: "http://192.168.1.11:8100",
  cleartext: true
}
};

export default config;
