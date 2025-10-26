import test, { expect } from "@playwright/test";
import HomePage from "../../pom/pages/Homepage";
import SignInForm from "../../pom/forms/SignInForm";
import GaragePage from "../../pom/pages/GaragePage";

test.describe('Login and save states', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Login and save state', async ({ page }) => {

        signInForm = new SignInForm(page);

        await signInForm.enterEmail('bezschastna.yuliia+10@gmail.com');
        await signInForm.enterPassword('123456Qwerty');
        await signInForm.clickLoginButton();
        await expect(garagePage.pageTitle).toBeVisible();
        await page.context().storageState({ path: '.auth/testUser.json' });
    })
})