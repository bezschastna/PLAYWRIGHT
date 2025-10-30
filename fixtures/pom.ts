import { test as base} from '@playwright/test';
import AddCarForm from '../pom/forms/AddCarForm';
import GaragePage from '../pom/pages/GaragePage';


type pom = {
    addCarForm: AddCarForm;
    garagePage: GaragePage;

};

export const test = base.extend<pom>({
    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await garagePage.navigate();
        await garagePage.clickAddCarButton();
        await use(garagePage);
    },

    addCarForm: async ({ page }, use) => {
        let addCarForm = new AddCarForm(page);
        await use(addCarForm);
    },


});
export { expect } from '@playwright/test';