import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class GaragePage extends BasePage {

    private readonly logOutButton: Locator = this.page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]');
    public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly myProfileButton: Locator = this.page.locator('//button[@id="userNavDropdown"]');

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}