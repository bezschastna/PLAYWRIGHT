import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class SignInForm extends BasePage {

    public readonly emailField: Locator = this.page.locator('//input[@id="signinEmail"]');
    public readonly passwordField: Locator = this.page.locator('//input[@id="signinPassword"]');
    private readonly loginButton: Locator = this.page.locator('//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]');
    public readonly errorMessage: Locator = this.page.locator('//div[@class="invalid-feedback"]//p');
    private readonly registrationButton: Locator = this.page.getByRole('button', { name: 'Registration' });
    private readonly forgotPasswordButton: Locator = this.page.getByRole('button', { name: 'Forgot password' });

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async blurOnField(field: Locator): Promise<void> {
        await field.blur();
    }

    async focusOnField(field: Locator): Promise<void> {
        await field.focus();
    }

    async clickRegistrationButton(): Promise<void> {
        await this.registrationButton.click();
    }

    async clickForgotPasswordButton(): Promise<void> {
        await this.forgotPasswordButton.click();
    }

}

