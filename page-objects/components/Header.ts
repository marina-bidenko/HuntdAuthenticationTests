import { Locator, Page } from '@playwright/test';

abstract class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly switcher: Locator;
  readonly candidatesTab: Locator;
  readonly jobsTab: Locator;
  protected navigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.locator('nav');
    this.logo = page.locator('a.logo');
    this.switcher = page.locator('.Swithcher_swithcherButton__iC_Xa');
    this.candidatesTab = this.navigation.locator('text=Candidates');
    this.jobsTab = this.navigation.locator('text=Jobs');
  }
}

class HeaderLoggedIn extends Header {
  readonly chatsTab: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    super(page);
    this.chatsTab = this.navigation.locator('text=Chats');
    this.profileButton = this.page.locator('header').locator('text=Profile');
  }
}

class HeaderLoggedOut extends Header {
  readonly signInButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.locator('header').locator('text=Sign In');
    this.signUpButton = page.locator('header').locator('text=Sign Up');
  }
}

export { HeaderLoggedIn, HeaderLoggedOut };
