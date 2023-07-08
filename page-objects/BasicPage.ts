import { Page } from '@playwright/test';
import { Header } from './components/Header';

const config = require('../config')

/**
 * Abstract class representing a basic page.
 * Provides common functionality for page classes.
 */
export abstract class BasicPage {
  readonly page: Page; // The Playwright Page object associated with the page
  readonly header: Header; // The Header component associated with the page

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the Home page.
   * Goes to the base URL specified in the config file.
   */
  async goToHomePage() {
    await this.page.goto(config.BaseUrl);
  }
}
