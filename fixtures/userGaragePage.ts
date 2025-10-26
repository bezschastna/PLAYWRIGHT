import { test as base, expect } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';
import AddCarForm from '../pom/forms/AddCarForm';

export const test = base.extend<{
  userGaragePage: GaragePage;
  addCarForm: AddCarForm;
}>({
 
  context: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/testUser.json' });
    await use(context);
    await context.close();
  },


 page: async ({ context }, use) => {  
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await garagePage.clickAddCarButton();
    await use(garagePage);
  },

  addCarForm: async ({ page }, use) => {
    const form = new AddCarForm(page);
    await use(form);
  },
});

export { expect };
