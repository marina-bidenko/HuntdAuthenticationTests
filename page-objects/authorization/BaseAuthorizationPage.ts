import { Page, Locator, expect } from '@playwright/test';
import { BasicPage } from '../BasicPage';

export default abstract class BaseAuthPage extends BasicPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitSingInButton: Locator;

  readonly emailError: Locator;
  readonly passwordError: Locator;

  readonly googleButton: Locator;
  readonly linkedInButton: Locator;
  readonly gitHubButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitSingInButton = this.page.locator('form > button');

    this.emailError = this.page.locator('.mt-4').first();
    this.passwordError = this.page.locator('.mt-4').nth(1);

    this.googleButton = this.page.locator('.icon-google');
    this.linkedInButton = this.page.locator('.icon-linkedin');
    this.gitHubButton = this.page.locator('.icon-github');
  }

  async typeCredentials(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
  }

  async submitClick() {
    await this.submitSingInButton.click()
  }

  async assertEmailErrorMessage(errorMessage: string) {
    expect(this.emailError).toContainText(errorMessage);
  }

  async assertPassordErrorMessage(errorMessage: string) {
    expect(this.passwordError).toContainText(errorMessage);
  }
}
