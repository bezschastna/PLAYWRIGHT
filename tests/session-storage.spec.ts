import { test, expect } from '@playwright/test';

test('Get session storage', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Guest log in').click();
    await expect(page.locator('h1')).toHaveText('Garage');
    const parsedData = await page.evaluate(() => {
        return window.sessionStorage.getItem('guestData');
    })

    const obj = JSON.parse(parsedData!);
    expect(obj.cars).toHaveLength(0);

    console.log(parsedData);
})

test('Set session storage', async ({ page }) => {
    const guestData =
    {
        "expenses": [],
        "cars": [
            {
                "id": 1,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png",
                "initialMileage": 53,
                "updatedMileageAt": "2025-10-21T16:54:50.530Z",
                "carCreatedAt": "2025-10-21T16:54:50.530Z",
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 53
            },
            {
                "id": 2,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png",
                "initialMileage": 532523,
                "updatedMileageAt": "2025-10-21T16:54:53.748Z",
                "carCreatedAt": "2025-10-21T16:54:53.748Z",
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 532523
            }
        ],
        "nextCarId": 3,
        "nextExpenseId": 1
    }

    await page.goto('/');

    await page.evaluate((data) => {
        return window.sessionStorage.setItem('guestData', JSON.stringify(data));
    }, guestData);

    await page.getByText('Guest log in').click();
    await expect(page.locator('h1')).toHaveText('Garage');
})
