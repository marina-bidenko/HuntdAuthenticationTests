import { test, expect, Page } from '@playwright/test';
import { SignInPage } from '../../page-objects/authorization/SignInPage';
import {
  HomePageLoggedIn,
} from '../../page-objects/HomePage';
import {
  getNewPassword,
  goToSignInPage,
  gotToSignUpPage,
} from '../../helpers/login';

const faker = require('faker');
const config = require('../../config');

test.describe('Logged in', () => {
   let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = await goToSignInPage(page);
  });

  test.describe('Negative casse for registered user', () => {
    let page: Page;
    let email: string;
    let password: string;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      const signUpPage = await gotToSignUpPage(page);

      email = faker.internet.email();
      password = faker.internet.password();

      await signUpPage.login(email, password);
      await page.waitForURL(config.BaseUrl + config.succesLogin);

      const homePageIn = new HomePageLoggedIn(page);
      await homePageIn.visit();
      await homePageIn.logOut();

      await page.close();
    });

    test('Error message when password is wrong', async ({ page }) => {
      const wrongPassword = getNewPassword(password)
      await signInPage.login(email, wrongPassword);
      await page.waitForTimeout(300);
      await signInPage.assertEmailErrorMessage('Wrong credentials');
    });

    test('Error message when password is empty', async ({ page }) => {
      await signInPage.login(email, '');
      await page.waitForTimeout(300);
      await signInPage.assertPassordErrorMessage('Password is required');
    });
  });

  test.describe('Negative cases for NOT registered user', () => {
    let password: string;
    let email: string;

    test('Error message when email is not registered', async ({ page }) => {
      password = faker.internet.password();
      email = faker.internet.email();

      await signInPage.login(email, password);
      await page.waitForTimeout(300);
      await signInPage.assertEmailErrorMessage('Wrong credentials');
    });

    test('Error message when email is empty', async ({ page }) => {
      password = faker.internet.email();

      await signInPage.login('', password);
      await page.waitForTimeout(300);
      await signInPage.assertEmailErrorMessage('Email is required');
    });
  });

  test.describe('Positive cases', () => {
    let page: Page;
    let password: string;
    let email: string;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      const signUpPage = await gotToSignUpPage(page);

      email = faker.internet.email();
      password = faker.internet.password();

      await signUpPage.login(email, password);
      await page.waitForURL(config.BaseUrl + config.succesLogin);

      const homePageIn = new HomePageLoggedIn(page);
      await homePageIn.visit();
      await homePageIn.logOut();

      await page.close();
    });

    test('Sign in when user is registered', async ({ page }) => {
      await signInPage.login(email, password);
      await page.waitForURL(config.BaseUrl + config.succesLogin);
      expect(page).toHaveURL(config.BaseUrl + config.succesLogin);
    });
  });
});
