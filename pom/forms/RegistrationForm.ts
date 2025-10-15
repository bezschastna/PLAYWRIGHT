import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class RegistrationForm extends BasePage {

    public readonly registrationTitle: Locator = this.page.locator('//h4[@class="modal-title"]');
}