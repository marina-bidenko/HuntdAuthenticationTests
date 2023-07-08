import { Page, Locator, expect } from '@playwright/test';
import { BasicPage } from '../BasicPage';

/**
 * Abstract class representing a base authentication page.
 * Extends the BasicPage class.
 */
export default abstract class BaseAuthPage extends BasicPage {
  readonly emailInput: Locator;// Locator for the email input element
  readonly passwordInput: Locator; // Locator for the password input element
  readonly submitSingInButton: Locator; // Locator for the submit sign-in button element

  readonly emailError: Locator; // Locator for the email error message element
  readonly passwordError: Locator; // Locator for the password error message element

  readonly googleButton: Locator; // Locator for the Google button element
  readonly linkedInButton: Locator; // Locator for the LinkedIn button element
  readonly gitHubButton: Locator; // Locator for the GitHub button element

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

  /**
   * Types the email and password credentials into the corresponding input fields.
   * @param email - The email to be typed.
   * @param password - The password to be typed.
   */
  async typeCredentials(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
  }

  // Clicks the submit sign-in button.
  async submitClick() {
    await this.submitSingInButton.click()
  }

  /**
   * Asserts that the email error message contains the expected error message.
   * @param errorMessage - The expected error message.
   */
  async assertEmailErrorMessage(errorMessage: string) {
    expect(this.emailError).toContainText(errorMessage);
  }

  /**
   * Asserts that the password error message contains the expected error message.
   * @param errorMessage - The expected error message.
   */
  async assertPasswordErrorMessage(errorMessage: string) {
    expect(this.passwordError).toContainText(errorMessage);
  }
}
