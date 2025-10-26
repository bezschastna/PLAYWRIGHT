import { test, expect } from '../fixtures/userGaragePage';  

    test('Verify that user can add a car to the garage', async ({ userGaragePage, addCarForm}) => {
        await addCarForm.selectBrand('Ford');
        await addCarForm.selectModel('Focus');
        await addCarForm.enterMileage('555');
        await addCarForm.clickAddButton();
        await expect(userGaragePage.firstCarInList).toHaveText('Ford Focus');
    });