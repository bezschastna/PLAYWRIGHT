import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class HomePage extends BasePage {

    private readonly signInButton: Locator = this.page.locator('//button[contains(@class, "header_signin")]');
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });

    async navigate() {
        await this.page.goto('/');
    }

    async openSignInForm(): Promise<void> {
        await this.signInButton.click();
    }

    async openSignUpForm(): Promise<void> {
        await this.signUpButton.click();
    }
}