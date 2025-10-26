import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class AddCarForm extends BasePage {

    private readonly BrandSelector: Locator = this.page.getByLabel('Brand');
    private readonly ModelSelector: Locator = this.page.getByLabel('Model');
    private readonly MileageInput: Locator = this.page.getByRole('spinbutton', { name: 'Mileage' });
    private readonly AddButton: Locator = this.page.getByRole('button', { name: 'Add' });

    async selectBrand(brand: string): Promise<void> {
        await this.BrandSelector.selectOption(brand);
    }

    async selectModel(model: string): Promise<void> {
        await this.ModelSelector.selectOption(model);
    }

    async enterMileage(mileage: string): Promise<void> {
        await this.MileageInput.fill(mileage);
    }

    async clickAddButton(): Promise<void> {
        await this.AddButton.click();
    }       
}