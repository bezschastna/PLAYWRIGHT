import { test as base, Page } from '@playwright/test';

type sizePages = {
    pageSmall: Page;
    pageMedium: Page;
    pageBig: Page;
};

export const test = base.extend<sizePages>({
    pageSmall: async ({ page }, use) => {
        console.log('Before test log');
        await page.setViewportSize({ width: 300, height: 300 });
        await use(page);
        console.log('After test log');
    },
    pageMedium: async ({ page }, use) => {
        console.log('Before test log');
        await page.setViewportSize({ width: 700, height: 700 });
        await use(page);
        console.log('After test log');
    },
    pageBig: async ({ page }, use) => {
        console.log('Before test log');
        await page.setViewportSize({ width: 1300, height: 1300 });
        await use(page);
        console.log('After test log');
    },

});
export { expect } from '@playwright/test';