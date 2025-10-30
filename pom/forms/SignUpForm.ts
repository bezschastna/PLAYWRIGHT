import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class SignUpForm extends BasePage {

    public readonly nameField: Locator = this.page.locator('//input[@id="signupName"]');
    public readonly lastNameField: Locator = this.page.locator('//input[@id="signupLastName"]');
    public readonly emailField: Locator = this.page.locator('//input[@id="signupEmail"]');
    public readonly passwordField: Locator = this.page.locator('//input[@id="signupPassword"]');
    public readonly repeatPasswordField: Locator = this.page.locator('//input[@id="signupRepeatPassword"]');
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    private readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });
    public readonly modalDialog: Locator = this.page.locator('//div[@class="modal-content"]');
    public readonly errorMessageUserExists: Locator = this.page.locator('//form[@class="ng-dirty ng-touched ng-valid"]//p');
    public readonly errorMessageNameField: Locator = this.page.locator('//div[@class="form-group"][.//input[@id="signupName"]]//div[@class="invalid-feedback"]//p');
    public readonly errorMessageLastNameField: Locator = this.page.locator('//div[@class="form-group"][.//input[@id="signupLastName"]]//div[@class="invalid-feedback"]');
    public readonly errorMessageEmailField: Locator = this.page.locator('//div[@class="form-group"][.//input[@id="signupEmail"]]//div[@class="invalid-feedback"]');
    public readonly errorMessagePasswordField: Locator = this.page.locator('//div[@class="form-group"][.//input[@id="signupPassword"]]//div[@class="invalid-feedback"]');
    public readonly errorMessageRepeatPasswordField: Locator = this.page.locator('//div[@class="form-group"][.//input[@id="signupRepeatPassword"]]//div[@class="invalid-feedback"]');

    async signUp(name: string, lastName: string, email: string, password: string, repeatedPassword: string): Promise<void> {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(repeatedPassword);
        await this.clickRegisterButton();
    }

    async enterName(name: string): Promise<void> {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async enterRepeatPassword(repeatedPassword: string): Promise<void> {
        await this.repeatPasswordField.fill(repeatedPassword);
    }

    async clickRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    async clickCloseButton(): Promise<void> {
        await this.closeButton.click();
    }

    async blurOnField(field: Locator) {
        await field.blur();
    }

    async focusOnField(field: Locator) {
        await field.focus();
    }
}

