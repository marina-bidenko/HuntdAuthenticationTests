import { Locator, Page } from '@playwright/test';
import { HeaderLoggedIn, HeaderLoggedOut } from './components/Header';
import { BasicPage } from './BasicPage';

/**
 * Class representing the Home page when logged out.
 * Extends the BasicPage class.
 */
class HomePageLoggedOut extends BasicPage {
  readonly header: HeaderLoggedOut; // The HeaderLoggedOut component associated with the page

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLoggedOut(page); // Creates a new instance of the HeaderLoggedOut class
  }

  /**
   * Visits the home page by navigating to it.
   * Calls the goToHomePage method inherited from the BasicPage class.
   */
  async visit() {
    await this.goToHomePage();
  }

  /**
   * Clicks on the sign-in button in the header.
   * Calls the click method on the signInButton of the header.
   */
  async clickOnSignIn() {
    await this.header.signInButton.click();
  }

  /**
   * Clicks on the sign-up button in the header.
   * Calls the click method on the signUpButton of the header.
   */
  async clickOnSignUp() {
    await this.header.signUpButton.click();
  }
}

/**
 * Class representing the home page when logged in.
 * Extends the BasicPage class.
 */
class HomePageLoggedIn extends BasicPage {
  readonly header: HeaderLoggedIn; // The HeaderLoggedIn component associated with the page

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLoggedIn(page); // Creates a new instance of the HeaderLoggedIn class
  }

  /**
   * Visits the home page by navigating to it.
   * Calls the goToHomePage method inherited from the BasicPage class.
   */
  async visit() {
    await this.goToHomePage();
  }

  /**
   * Clicks on the profile button in the header.
   * Calls the click method on the profileButton of the header.
   */
  async clickOnProfileButton() {
    await this.header.profileButton.click();
  }

  // Logs out by clicking on the profile button and then the sign out button.
  async logOut() {
    await this.clickOnProfileButton();
    await this.page.waitForTimeout(300)
    const signOutButton = this.page.getByRole('button', {name:'Sign out'});
    await signOutButton.click();
  }
}

export { HomePageLoggedOut, HomePageLoggedIn };
