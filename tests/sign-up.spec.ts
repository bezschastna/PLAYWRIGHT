import { test, expect } from '@playwright/test';

let email: string;
test.describe("Sign up verification", () => {

    test.beforeEach(async ({ page }) => {
        email = `aqa-bezschastna.yuliia+${Date.now()}@gmail.com`
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    })

    test('Verify possibility to sign up with valid data', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await page.getByRole('button', { name: 'Register' }).click();
        await page.waitForTimeout(8000);
        await expect(page.getByRole('heading', { name: 'Garage' })).toHaveCount(1);
        await expect(page.locator('#userNavDropdown')).toHaveCount(1)
    })

    test('Verify possibility of closing "Registration" dialog', async({page}) => {
        await page.getByRole('button', {name: 'Close'}).click();
        await page.waitForTimeout(500);
        await expect(page.getByRole('heading', { name: 'Registration' })).toHaveCount(0);
    })

    test('Verify it is impossible to sign up with an existing email', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await page.getByRole('button', { name: 'Register' }).click();
        await page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]').click()
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('//form[@class="ng-dirty ng-touched ng-valid"]//p')).toHaveText('User already exists');
        await expect(page.getByRole('heading', { name: 'Garage' })).toHaveCount(0);
        await expect(page.locator('#userNavDropdown')).toHaveCount(0);
    })

    test('Verify there is no error message when entering 2 character in the "Name" field', async({page}) => {
        await page.locator('#signupName').fill('Na');
        await page.locator('#signupName').blur();

        
    })



})