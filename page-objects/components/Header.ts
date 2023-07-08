import { Locator, Page } from '@playwright/test';

/**
 * Abstract class representing the header of a page.
 * Provides common functionality and locators for header components.
 */
abstract class Header {
  readonly page: Page; // The Playwright Page object associated with the page
  readonly logo: Locator; // Locator for the logo element
  readonly switcher: Locator; // Locator for the switcher element
  readonly candidatesTab: Locator; // Locator for the candidates tab element
  readonly jobsTab: Locator; // Locator for the jobs tab element
  protected navigation: Locator; // Locator for the navigation element

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.locator('nav');
    this.logo = page.locator('a.logo');
    this.switcher = page.locator('.Swithcher_swithcherButton__iC_Xa');
    this.candidatesTab = this.navigation.locator('text=Candidates');
    this.jobsTab = this.navigation.locator('text=Jobs');
  }
}

/**
 * Class representing the header when logged in.
 * Extends the Header class.
 */
class HeaderLoggedIn extends Header {
  readonly chatsTab: Locator; // Locator for the chats tab element
  readonly profileButton: Locator; // Locator for the profile button element

  constructor(page: Page) {
    super(page);
    this.chatsTab = this.navigation.locator('text=Chats');
    this.profileButton = this.page.locator('header').getByRole('button', {name: 'Profile'});
  }
}

/**
 * Class representing the header when logged out.
 * Extends the Header class.
 */
class HeaderLoggedOut extends Header {
  readonly signInButton: Locator;// Locator for the sign-in button element
  readonly signUpButton: Locator; // Locator for the sign-up button element

  /**
   * Constructs a new instance of the HeaderLoggedOut class.
   * @param page - The Playwright Page object for the page.
   */
  constructor(page: Page) {
    super(page);
    this.signInButton = page.locator('header').locator('text=Sign In');
    this.signUpButton = page.locator('header').locator('text=Sign Up');
  }
}

export { HeaderLoggedIn, HeaderLoggedOut, Header };
