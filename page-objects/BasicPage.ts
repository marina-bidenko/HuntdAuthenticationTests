import { Page } from '@playwright/test';
import { Header } from './components/Header';

export abstract class BasicPage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto('https://huntd.tech/');
  }
}
