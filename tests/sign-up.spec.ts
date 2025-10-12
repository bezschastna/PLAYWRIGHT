import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/Homepage';
import SignUpForm from '../pom/forms/SignUpForm';
import GaragePage from '../pom/pages/GaragePage';

let email: string;
let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;

test.describe("Sign up verification", () => {

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        email = `aqa-bezschastna.yuliia+${Date.now()}@gmail.com`

        await homePage.navigate();
        await homePage.openSignUpForm();
    })

    test('Verify possibility to sign up with valid data', async () => {
        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');
        await expect(garagePage.pageTitle).toHaveText('Garage');
        await expect(garagePage.myProfileButton).toHaveCount(1);
    })

    test('Verify possibility of closing "Registration" dialog', async () => {
        await signUpForm.clickCloseButton();
        await expect(signUpForm.modalDialog).not.toBeVisible();
    })

    test('Verify it is impossible to sign up with an existing email', async () => {
        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');
        await expect(garagePage.pageTitle).toBeVisible();
        await garagePage.clickLogOutButton();
        await homePage.openSignUpForm();
        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');
        await expect(signUpForm.errorMessageUserExists).toHaveText('User already exists');
        await expect(garagePage.pageTitle).toHaveCount(0);
        await expect(garagePage.myProfileButton).toHaveCount(0);
    })

    test('Verify there is no error message when entering 2 characters in the "Name" field', async () => {
        await signUpForm.enterName('Na');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.errorMessageNameField).not.toBeVisible();
    })

    test('Verify there is no error message when entering 20 characters in the "Name" field', async () => {
        await signUpForm.enterName('NameNameNameNameName');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.errorMessageNameField).not.toBeVisible();
    })

    test('Verify error message when entering 1 character in the "Name" field', async () => {
        await signUpForm.enterName('N');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name has to be from 2 to 20 characters long');
    })

    test('Verify error message when entering 21 character in the "Name" field', async () => {
        await signUpForm.enterName('NameNameNameNameNameN');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name has to be from 2 to 20 characters long');
    })

    test('Verify error message when  "Name" field is empty', async () => {
        await signUpForm.focusOnField(signUpForm.nameField);
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name is required');
    })

    test('Verify error message when entering Cyrillic in the  "Name" field', async () => {
        await signUpForm.enterName('Юзер');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name is invalid');
    })

    test('Verify error message when entering symbols in the  "Name" field', async () => {
        await signUpForm.enterName('!@$%^&*');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name is invalid');
    })

    test('Verify there is no error message when entering internal spaces in the "Name" field', async () => {
        await signUpForm.enterName('Anna Maria');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.errorMessageNameField).not.toBeVisible();
    })

    test('Verify error message when entering spaces in the "Name" field', async () => {
        await signUpForm.enterName('    ');
        await signUpForm.blurOnField(signUpForm.nameField);
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageNameField).toHaveText('Name is invalid');
    })

    test('Verify there is no error message when entering 2 character in the "Last name" field', async () => {
        await signUpForm.enterLastName('Ln');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.errorMessageLastNameField).not.toBeVisible();
    })

    test('Verify there is no error message when entering 20 character in the "Last name" field', async () => {
        await signUpForm.enterLastName('LastnameLastnameLast');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.errorMessageLastNameField).not.toBeVisible();
    })

    test('Verify error message when entering 1 character in the "Last name" field', async () => {
        await signUpForm.enterLastName('L');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name has to be from 2 to 20 characters long');
    })

    test('Verify error message when entering 21 character in the "Last name" field', async () => {
        await signUpForm.enterLastName('LastnameLastnameLastL');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name has to be from 2 to 20 characters long');
    })

    test('Verify error message when "Last name" field is empty', async () => {
        await signUpForm.focusOnField(signUpForm.lastNameField);
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name is required');
    })

    test('Verify error message when entering Cyrillic in the "Last name" field', async () => {
        await signUpForm.enterLastName('Прізвище');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name is invalid');
    })

    test('Verify error message when entering spaces in the "Last name" field', async () => {
        await signUpForm.enterLastName('   ');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name is invalid');
    })

    test('Verify there is no error message when entering internal spaces in the "Last name" field', async () => {
        await signUpForm.enterLastName('Miller Clark');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.errorMessageLastNameField).not.toBeVisible();
    })

    test('Verify error message when entering symbols in the "Last name" field', async () => {
        await signUpForm.enterLastName('!@$%^&*');
        await signUpForm.blurOnField(signUpForm.lastNameField);
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageLastNameField).toHaveText('Last name is invalid');
    })

    test('Verify that email can contain exactly one @ symbol', async () => {
        await signUpForm.enterEmail('test@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.errorMessageEmailField).not.toBeVisible();
    })

    test('Verify that email can not contain @@ symbol', async () => {
        await signUpForm.enterEmail('test@@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email can not start from @ symbol', async () => {
        await signUpForm.enterEmail('@testgmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email can not end with @ symbol', async () => {
        await signUpForm.enterEmail('testgmail.com@');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can contain allowed characters (letters, digits, ., -, _)', async () => {
        await signUpForm.enterEmail('test-test_@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.errorMessageEmailField).not.toBeVisible();
    })

    test('Verify that local-part can not start  with a dot', async () => {
        await signUpForm.enterEmail('.test@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can not end with a dot', async () => {
        await signUpForm.enterEmail('test.@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that local-part can not contain consecutive dots', async () => {
        await signUpForm.enterEmail('test..test@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that domain can not be without dots', async () => {
        await signUpForm.enterEmail('test@gmailcom');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');

    })

    test('Verify that domain parts can not contain characters other than letters, digits, and optional hyphens', async () => {
        await signUpForm.enterEmail('test@gma#!il.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that domain parts can not start with a hyphen', async () => {
        await signUpForm.enterEmail('test@-gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that domain parts can not end with a hyphen', async () => {
        await signUpForm.enterEmail('test@gmail-.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that top-level domain can not have 1 letter', async () => {
        await signUpForm.enterEmail('test@gmail.c');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email can not contain spaces in the local-part', async () => {
        await signUpForm.enterEmail('te st@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email can not contain spaces in the domain part', async () => {
        await signUpForm.enterEmail('test@ gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify error message when  "Email" field is empty', async () => {
        await signUpForm.focusOnField(signUpForm.emailField);
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email required');
    })

    test('Verify that email can not contain Cyrillic characters in local-part', async () => {
        await signUpForm.enterEmail('test.тест@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email can contain Cyrillic characters in domain part', async () => {
        await signUpForm.enterEmail('test@меіл.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.errorMessageEmailField).not.toBeVisible();
    })

    test('Verify that email exceeding maximum allowed length (255 characters) is rejected', async () => {
        await signUpForm.enterEmail('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@testdomainaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify that email with local-part exceeding maximum allowed length (65 characters) is rejected', async () => {
        await signUpForm.enterEmail('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abc@gmail.com');
        await signUpForm.blurOnField(signUpForm.emailField);
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageEmailField).toHaveText('Email is incorrect');
    })

    test('Verify successful validation with 8 characters, capital and small letters in  "Password" field', async () => {
        await signUpForm.enterPassword('Ab123456');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.errorMessagePasswordField).not.toBeVisible();
    })

    test('Verify successful validation with 15 characters, capital and small letters in  "Password" field', async () => {
        await signUpForm.enterPassword('Ab1234567890123');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.errorMessagePasswordField).not.toBeVisible();
    })

    test('Verify error message with 7 characters  in  "Password" field', async () => {
        await signUpForm.enterPassword('Ab12345');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message with 16characters  in  "Password" field', async () => {
        await signUpForm.enterPassword('Ab12345678901234');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error  message when password has valid length but lacks a capital letter', async () => {
        await signUpForm.enterPassword('b1234567');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error  message when password has valid length but lacks a small letter', async () => {
        await signUpForm.enterPassword('B1234567');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message when password has valid length but lacks a digit', async () => {
        await signUpForm.enterPassword('Aaaaaaaaa');
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify error message when "Password" field is empty', async () => {
        await signUpForm.focusOnField(signUpForm.passwordField);
        await signUpForm.blurOnField(signUpForm.passwordField);
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessagePasswordField).toHaveText('Password required');
    })

    test('Verify that entered characters in "Password" field are masked (shown as bullets)', async () => {
        await signUpForm.enterPassword('Ab123456');
        await expect(signUpForm.passwordField).toHaveAttribute('type', 'password');
    })

    test('Verify no error message when passwords match and are valid', async () => {
        await signUpForm.enterPassword('Ab123456');
        await signUpForm.enterRepeatPassword('Ab123456');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.errorMessageRepeatPasswordField).not.toBeVisible();
    })

    test('Verify error message when "Re-enter password" field is empty', async () => {
        await signUpForm.enterPassword('Ab123456');
        await signUpForm.focusOnField(signUpForm.repeatPasswordField)
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageRepeatPasswordField).toHaveText('Re-enter password required');
    })

    test('Verify error message  when passwords do not match', async () => {
        await signUpForm.enterPassword('Ab123456');
        await signUpForm.enterRepeatPassword('Ab123457');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageRepeatPasswordField).toHaveText('Passwords do not match');
    })

    test('Verify error message when passwords only differ in case sensitivity', async () => {
        await signUpForm.enterPassword('Ab123456');
        await signUpForm.enterRepeatPassword('aB123456');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageRepeatPasswordField).toHaveText('Passwords do not match');
    })

    test('Verify error message with 7 characters in "Re-enter password" field', async () => {
        await signUpForm.enterRepeatPassword('aB12345');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageRepeatPasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })
    test('Verify error message with 16 characters in "Re-enter password" field', async () => {
        await signUpForm.enterRepeatPassword('Ab12345678901234');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(signUpForm.errorMessageRepeatPasswordField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Verify that entered characters in "Re-enter password" field are masked (shown as bullets)', async () => {
        await signUpForm.enterRepeatPassword('Ab123456');
        await expect(signUpForm.repeatPasswordField).toHaveAttribute('type', 'password');
    })

    test('Verify "Register" button is enabled when all fields are valid', async () => {
        await signUpForm.enterName('Name');
        await signUpForm.enterLastName('LastName');
        await signUpForm.enterEmail(email);
        await signUpForm.enterPassword('123456Qwerty');
        await signUpForm.enterRepeatPassword('123456Qwerty');
        await expect(signUpForm.registerButton).toBeEnabled();
    })

    test('Verify "Register" button is disabled initially when all fields are empty', async () => {
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('"Register" button is disabled when the "Last name" data is incorrect', async () => {
        await signUpForm.enterName('Name');
        await signUpForm.enterLastName('L');
        await signUpForm.enterEmail(email);
        await signUpForm.enterPassword('123456Qwerty');
        await signUpForm.enterRepeatPassword('123456Qwerty');
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('"Register" button is disabled when the "Name" data is incorrect', async () => {
        await signUpForm.enterName('Тест');
        await signUpForm.enterLastName('LastName');
        await signUpForm.enterEmail(email);
        await signUpForm.enterPassword('123456Qwerty');
        await signUpForm.enterRepeatPassword('123456Qwerty');
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('"Register" button is disabled when the "Email" data is incorrect', async () => {
        await signUpForm.enterName('Name');
        await signUpForm.enterLastName('LastName');
        await signUpForm.enterEmail('test@@gmail.com');
        await signUpForm.enterPassword('123456Qwerty');
        await signUpForm.enterRepeatPassword('123456Qwerty');
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('"Register" button is disabled when the "Password" and "Re-enter password" data is incorrect', async () => {
        await signUpForm.enterName('Name');
        await signUpForm.enterLastName('LastName');
        await signUpForm.enterEmail(email);
        await signUpForm.enterPassword('Ab12345');
        await signUpForm.enterRepeatPassword('Ab1234');
        await signUpForm.blurOnField(signUpForm.repeatPasswordField);
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that "Register" button becomes enabled after correcting invalid data', async () => {
        await signUpForm.enterName('Name');
        await signUpForm.enterLastName('LastName');
        await signUpForm.enterEmail('test@@gmail.com');
        await signUpForm.enterPassword('123456Qwerty');
        await signUpForm.enterRepeatPassword('123456Qwerty');
        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.enterEmail('test@gmail.com');
        await expect(signUpForm.registerButton).toBeEnabled();
    })
})
