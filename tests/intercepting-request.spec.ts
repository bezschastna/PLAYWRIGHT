import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';

test.describe('Interception', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page)
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignInForm();
        await signInForm.enterEmail('bezschastna.yuliia+10@gmail.com');
        await signInForm.enterPassword('123456Qwerty');
        await signInForm.clickLoginButton();
    })

    test('Username replacement', async ({ page }) => {
        const username = {
            "status": "ok",
            "data": {
                "userId": 279685,
                "photoFilename": "default-user.png",
                "name": "Stanislav",
                "lastName": "Taran"
            }
        }
        await page.route('**/api/users/profile', route => {
            route.fulfill({
                body: JSON.stringify(username),
            });
        });

        await garagePage.profileSideBar.click();
        await expect(garagePage.userName).toHaveText('Stanislav Taran');
    })
})