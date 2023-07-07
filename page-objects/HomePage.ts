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

  async logOut() {
    await this.clickOnProfileButton();
    await this.page.waitForTimeout(300)
    const signOutButton = this.page.getByRole('button', {name:'Sign out'});
    await signOutButton.click();
  }
}

export { HomePageLoggedOut, HomePageLoggedIn };
