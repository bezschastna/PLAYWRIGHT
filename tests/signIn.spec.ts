import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import RegistrationForm from '../pom/forms/RegistrationForm';
import RestoreAccessForm from '../pom/forms/RestoreAccessForm';

test.describe('Sign in with POM', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let registrationForm: RegistrationForm;
    let restoreAccessForm: RestoreAccessForm;

    test.describe('Sign In tests', () => {

        test.beforeEach(async ({ page }) => {

            homePage = new HomePage(page)
            signInForm = new SignInForm(page);
            garagePage = new GaragePage(page);
            registrationForm = new RegistrationForm(page);
            restoreAccessForm = new RestoreAccessForm(page);

            await homePage.navigate();
            await homePage.openSignInForm();
        })

        test('Successful sign in', async () => {
            await signInForm.enterEmail('bezschastna.yuliia+10@gmail.com');
            await signInForm.enterPassword('123456Qwerty');
            await signInForm.clickLoginButton();
            await expect(garagePage.pageTitle).toBeVisible();
        })

        test('Sign In without email', async () => {
            await signInForm.focusOnField(signInForm.emailField);
            await signInForm.blurOnField(signInForm.emailField);
            await expect(signInForm.errorMessage).toHaveText('Email required');
        })

        test('Sign In without password', async () => {
            await signInForm.focusOnField(signInForm.passwordField);
            await signInForm.blurOnField(signInForm.passwordField);
            await expect(signInForm.errorMessage).toHaveText('Password required');
        })

        test('Open "Registration" form ', async () => {
            await signInForm.clickRegistrationButton();
            await expect(registrationForm.registrationTitle).toHaveCount(1);
            await expect(registrationForm.registrationTitle).toHaveText('Registration');

        })

        test('Open "Restore access" form ', async () => {
            await signInForm.clickForgotPasswordButton();
            await expect(restoreAccessForm.restoreAccessTitle).toHaveCount(1);
            await expect(restoreAccessForm.restoreAccessTitle).toHaveText('Restore access');
        })

        test('Screenshot testing', async () => {
            await signInForm.enterEmail('bezschastna.yuliia+10@gmail.com');
            await signInForm.enterPassword('123456Qwerty');
            await signInForm.clickLoginButton();
            await expect(garagePage.pageTitle).toBeVisible();

            await expect(garagePage.lastAddedCar).toHaveScreenshot('last-added-car.png');
        })
    })
})