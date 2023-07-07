import { Page } from '@playwright/test';
import { Header } from './components/Header';

const config = require('../config')

export abstract class BasicPage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto(config.BaseUrl);
  }
}
