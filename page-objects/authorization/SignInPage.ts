import { Page } from '@playwright/test';
import BaseAuthPage from './BaseAuthorizationPage';

export class SignInPage extends BaseAuthPage {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.typeCredentials(email, password);
    await this.submitClick();
  }
}
