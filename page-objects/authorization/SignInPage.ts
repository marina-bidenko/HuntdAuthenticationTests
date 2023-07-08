import { Page } from '@playwright/test';
import BaseAuthPage from './BaseAuthorizationPage';

/**
 * Class representing the sign-in page.
 * Extends the BaseAuthPage class.
 */
export class SignInPage extends BaseAuthPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Performs the login action by typing the email and password credentials,
   * and then clicking the submit button.
   * @param email - The email for login.
   * @param password - The password for login.
   */
  async login(email: string, password: string) {
    await this.typeCredentials(email, password);
    await this.submitClick();
  }
}
