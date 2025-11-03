import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class RestoreAccessForm extends BasePage {

    public readonly restoreAccessTitle: Locator = this.page.locator('//h4[@class="modal-title"]');
}