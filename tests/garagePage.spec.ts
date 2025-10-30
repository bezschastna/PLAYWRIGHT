import { test, expect } from '../fixtures/pom';


test.use({ storageState: '.auth/testUser.json' });

    test('Verify that user can add a car to the garage', async ({ addCarForm, garagePage }) => {
        await addCarForm.selectBrand('Ford');
        await addCarForm.selectModel('Focus');
        await addCarForm.enterMileage('555');
        await addCarForm.clickAddButton();
        await expect(garagePage.firstCarInList).toHaveText('Ford Focus');
    });