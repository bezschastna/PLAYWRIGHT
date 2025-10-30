import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class GaragePage extends BasePage {

    public readonly logOutButton: Locator = this.page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]');
    public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly myProfileButton: Locator = this.page.locator('//button[@id="userNavDropdown"]');
    public readonly lastAddedCar: Locator = this.page.locator('//li[@class="car-item"]').first();
    private readonly addCarButton: Locator = this.page.getByRole('button', {name: 'Add car'});
    public readonly firstCarInList: Locator = this.page.locator('.car_name').first(); 
    public readonly userName: Locator = this.page.locator('//p[@class="profile_name display-4"]');
    public readonly profileSideBar: Locator = this.page.locator('//div[@class="sidebar_btn-group"]/a[@href="/panel/profile"]');

    async navigate() {
        await this.page.goto('/panel/garage');
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}