import { Page, Locator, expect } from '@playwright/test';
import BaseAuthPage from './BaseAuthorizationPage';

class SignUpPage extends BaseAuthPage {
  readonly alreadyHaveAccountButton: Locator;
  readonly repeatPasswordInput: Locator;
  readonly repeatPasswordError: Locator;

  constructor(page: Page) {
    super(page);
    this.repeatPasswordInput = this.page.locator('#repeatePassword');
    this.repeatPasswordError = this.page.$$('.mt-4')[2];
    this.alreadyHaveAccountButton = this.page.locator(
      '.typography_text__zLYFG > a',
    );
  }

  async login(email: string, password: string, repeatPassword: string = '') {
    await this.typeCredentials(email, password);
    await this.repeatPasswordInput.type(
      repeatPassword ? repeatPassword : password,
    );
    await this.submitClick();
  }

  async assertRepetPasswordErrorMessage(errorMessage: string) {
    expect(this.repeatPasswordError).toContainText(errorMessage);
  }
}
