# Test Automation training from jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file  
  `npx playwright show-trace trace.zip`
- run tests form exact file  
  `npx playwright test tests/login.spec.ts`

### Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- enable video on fail
  ```javascript
  use: {
      video: {'retain-on-failure'},
  },
  ```
- enable Trace Viewer on fial
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

### Playwright snippets

- import:
  ```typescript
  import { test, expect } from "@playwright/test";
  ```
- test:
  ```typescript
  test("test description", async ({ page }) => {
    //your code
  });
  ```
- describe:
  ```typescript
  test.describe("Group description", () => {
    //your code
  });
  ```
- hook beforeEach:
  ```typescript
  test.beforeEach(async ({ page }) => {
    //your code
  });
  ```
- running given test: `test.only`
