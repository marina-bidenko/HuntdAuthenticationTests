import { Page, Locator, expect } from '@playwright/test';
import BaseAuthPage from './BaseAuthorizationPage';

/**
 * Class representing the sign-up page.
 * Extends the BaseAuthPage class.
 */
export class SignUpPage extends BaseAuthPage {
  readonly alreadyHaveAccountButton: Locator;// Locator for the "Already have an account?" button element
  readonly repeatPasswordInput: Locator; // Locator for the repeat password input element
  readonly repeatPasswordError: Locator; // Locator for the repeat password error message element

  constructor(page: Page) {
    super(page);
    this.repeatPasswordInput = this.page.locator('#repeatPassword');
    this.repeatPasswordError = this.page.locator('.mt-4').last();
    this.alreadyHaveAccountButton = this.page.locator(
      '.typography_text__zLYFG > a',
    );
  }

  /**
   * Performs the sign-up action by typing the email, password, and repeat password credentials,
   * and then clicking the submit button.
   * If repeatPassword is not provided, it uses the same value as the password.
   * @param email - The email for sign-up.
   * @param password - The password for sign-up.
   * @param repeatPassword - The repeat password for sign-up (optional).
   */
  async login(email: string, password: string);
  async login(email: string, password: string, repeatPassword: string);
  async login(email: string, password: string, repeatPassword?: string) {
    await this.typeCredentials(email, password);
    await this.repeatPasswordInput.type(
      repeatPassword !== undefined ? repeatPassword : password,
    );
    await this.submitClick();
  }

 /**
   * Asserts that the repeat password error message contains the expected error message.
   * @param errorMessage - The expected error message.
   */
  async assertRepetPasswordErrorMessage(errorMessage: string) {
    expect(this.repeatPasswordError).toContainText(errorMessage);
  }
}
