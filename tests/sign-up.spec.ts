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
        await expect(page.getByRole('heading', { name: 'Garage' })).toHaveText('Garage');
        await expect(page.locator('#userNavDropdown')).toHaveCount(1)
    })

    test('Verify possibility of closing "Registration" dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.locator('//div[@class="modal-content"]')).not.toBeVisible()
    })

    test('Verify it is impossible to sign up with an existing email', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
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

    test('Verify there is no error message when entering 2 characters in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('Na');
        await page.locator('#signupName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify there is no error message when entering 20 characters in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('NameNameNameNameName');
        await page.locator('#signupName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message when entering 1 character in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('N');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
    })

    test('Verify error message when entering 21 character in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('NameNameNameNameNameN');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
    })

    test('Verify error message when  "Name" field is empty', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name is required');
    })

    test('Verify error message when entering Cyrillic in the  "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('Юзер');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
    })

    test('Verify error message when entering symbols in the  "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('!@$%^&*');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
    })

    test('Verify there is no error message when entering internal spaces in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('Anna Maria');
        await page.locator('#signupName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message when entering spaces in the "Name" field', async ({ page }) => {
        await page.locator('#signupName').fill('     ');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
    })

    test('Verify there is no error message when entering 2 character in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('Ln');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify there is no error message when entering 20 character in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('LastnameLastnameLast');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message when entering 1 character in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('L');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
    })

    test('Verify error message when entering 21 character in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('LastnameLastnameLastL');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
    })

    test('Verify error message when "Last name" field is empty', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is required');
    })

    test('Verify error message when entering Cyrillic in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('Прізвище');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
    })

    test('Verify error message when entering spaces in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('   ');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
    })

    test('Verify there is no error message when entering internal spaces in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('Miller Clark');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message when entering symbols in the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').fill('!@$%^&*');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
    })

    test('Verify that email can contain exactly one @ symbol', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify that email can not contain @@ symbol', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email can not start from @ symbol', async ({ page }) => {
        await page.locator('#signupEmail').fill('@testgmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email can not end with @ symbol', async ({ page }) => {
        await page.locator('#signupEmail').fill('testgmail.com@');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can contain allowed characters (letters, digits, ., -, _)', async ({ page }) => {
        await page.locator('#signupEmail').fill('test-test_@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify that local-part can not start  with a dot', async ({ page }) => {
        await page.locator('#signupEmail').fill('.test@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can not end with a dot', async ({ page }) => {
        await page.locator('#signupEmail').fill('test.@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can not contain consecutive dots', async ({ page }) => {
        await page.locator('#signupEmail').fill('test..test@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that domain can not be without dots', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmailcom');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that domain parts can not contain characters other than letters, digits, and optional hyphens', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gma#!il.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that domain parts can not start with a hyphen', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@-gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that domain parts can not end with a hyphen', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmail-.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })


    test('Verify that top-level domain can not have 1 letter', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@gmail.c');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email can not contain spaces in the local-part', async ({ page }) => {
        await page.locator('#signupEmail').fill('te st@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email can not contain spaces in the domain part', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@ gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify error message when  "Email" field is empty', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
    })

    test('Verify that email can not contain Cyrillic characters in local-part', async ({ page }) => {
        await page.locator('#signupEmail').fill('test.тест@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email can contain Cyrillic characters in domain part', async ({ page }) => {
        await page.locator('#signupEmail').fill('test@меіл.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify that email exceeding maximum allowed length (255 characters) is rejected', async ({ page }) => {
        await page.locator('#signupEmail').fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@testdomainaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify that email with local-part exceeding maximum allowed length (65 characters) is rejected', async ({ page }) => {
        await page.locator('#signupEmail').fill('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abc@gmail.com');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    })

    test('Verify successful validation with 8 characters, capital and small letters in  "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify successful validation with 15 characters, capital and small letters in  "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab1234567890123');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message with 7 characters  in  "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab12345');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message with 16characters  in  "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab12345678901234');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error  message when password has valid length but lacks a capital letter', async ({ page }) => {
        await page.locator('#signupPassword').fill('b1234567');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error  message when password has valid length but lacks a small letter', async ({ page }) => {
        await page.locator('#signupPassword').fill('B1234567');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message when password has valid length but lacks a digit', async ({ page }) => {
        await page.locator('#signupPassword').fill('Aaaaaaaa');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message when "Password" field is empty', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
    })

    test('Verify that entered characters in "Password" field are masked (shown as bullets)', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await expect(page.locator('#signupPassword')).toHaveAttribute('type', 'password');
    })

    test('Verify no error message when passwords match and are valid', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await page.locator('#signupRepeatPassword').fill('Ab123456');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]')).not.toBeVisible();
    })

    test('Verify error message when "Re-enter password" field is empty', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Re-enter password required');
    })

    test('Verify error message  when passwords do not match', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await page.locator('#signupRepeatPassword').fill('Ab123457');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Passwords do not match');
    })

    test('Verify error message when passwords only differ in case sensitivity', async ({ page }) => {
        await page.locator('#signupPassword').fill('Ab123456');
        await page.locator('#signupRepeatPassword').fill('aB123456');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Passwords do not match');
    })

    test('Verify error message with 7 characters in "Re-enter password" field', async ({ page }) => {
        await page.locator('#signupRepeatPassword').fill('aB12345');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })
    test('Verify error message with 16 characters in "Re-enter password" field', async ({ page }) => {
        await page.locator('#signupRepeatPassword').fill('Ab12345678901234');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify that entered characters in "Re-enter password" field are masked (shown as bullets)', async ({ page }) => {
        await page.locator('#signupRepeatPassword').fill('Ab123456');
        await expect(page.locator('#signupRepeatPassword')).toHaveAttribute('type', 'password');
    })

    test('Verify "Register" button is enabled when all fields are valid', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled()
    })

    test('Verify "Register" button is disabled initially when all fields are empty', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('"Register" button is disabled when the "Last name" data is incorrect', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('L');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('"Register" button is disabled when the "Name" data is incorrect', async ({ page }) => {
        await page.locator('#signupName').fill('Тест');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('"Register" button is disabled when the "Email" data is incorrect', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill('testa@@gmail.com');
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('"Register" button is disabled when the "Password" and "Re-enter password" data is incorrect', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Ab12345');
        await page.locator('#signupRepeatPassword').fill('Ab1234');
        await page.locator('#signupRepeatPassword').blur()
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('Verify that "Register" button becomes enabled after correcting invalid data', async ({ page }) => {
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill('testa@@gmail.com');
        await page.locator('#signupPassword').fill('123456Qwerty');
        await page.locator('#signupRepeatPassword').fill('123456Qwerty');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
        await page.locator('#signupEmail').fill('testa@gmail.com');
        await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled()
    })
})