import { test, expect } from '@playwright/test';
import { SignInPage } from '../../page-objects/authorization/SignInPage';
import { SignUpPage } from '../../page-objects/authorization/SignUpPage';
import {
  HomePageLoggedOut,
  HomePageLoggedIn,
} from '../../page-objects/HomePage';

const faker = require('faker');
const config = require('../../config')

test.describe('Log out', () => {
  let homePage: HomePageLoggedOut;
  let email: string;
  let password: string;
  let homePageIn: HomePageLoggedIn;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePageLoggedOut(page);
    homePageIn = new HomePageLoggedIn(page);
    await homePage.visit();

    homePage.clickOnSignUp();
    await page.waitForTimeout(300);
    let signUpPage = new SignUpPage(page);

    email = faker.internet.email();
    password = faker.internet.password();

    await signUpPage.login(email, password);
    await page.waitForTimeout(300)
  });

  test.only('Should logged out user', async ({ page }) => {
    
    await homePage.visit()
    await homePageIn.logOut();
    await page.waitForTimeout(300)

    expect(page).toHaveURL(config.BaseUrl + 'sign-in');
  });
});
