import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',  
  testMatch: '**/*.spec.ts',  
  use: {
    browserName: 'chromium',  
    headless: true,  
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',  
  },

  projects: [
    {
      name: 'Desktop Chromium',  
      use: { ...devices['Desktop Chrome'] },  
    },
  
  ],
});
