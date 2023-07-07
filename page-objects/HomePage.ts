import { Locator, Page } from '@playwright/test';
import { HeaderLoggedIn, HeaderLoggedOut } from './components/Header';
import { BasicPage } from './BasicPage';

class HomePageLoggedOut extends BasicPage {
  readonly header: HeaderLoggedOut;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLoggedOut(page);
  }

  async visit() {
    await this.goToHomePage();
  }

  async clickOnSignIn() {
    await this.header.signInButton.click();
  }

  async clickOnSignUp() {
    await this.header.signUpButton.click();
  }
}

class HomePageLoggedIn extends BasicPage {
  readonly header: HeaderLoggedIn;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLoggedIn(page);
  }

  async visit() {
    await this.goToHomePage();
  }

  async clickOnProfileButton() {
    await this.header.profileButton.click();
  }

  async LogOut() {
    await this.clickOnProfileButton();
    const signOutButton = this.page.locator('.MenuLinks_logOut__GjZ6');
    await signOutButton.click();
  }
}

export { HomePageLoggedOut, HomePageLoggedIn };
