// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',


  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

 
use: {
  headless: false,
  trace: 'on-first-retry',
  storageState: 'storageState.json',   // ⭐ add this
},
  // ⭐ Run ONLY Chrome browser
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',   // 👉 this makes it real Google Chrome
      },
    },
  ],
});