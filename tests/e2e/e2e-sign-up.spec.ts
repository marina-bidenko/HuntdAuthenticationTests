import { test, expect } from '@playwright/test';
import { gotToSignUpPage, getNewPassword } from '../../helpers/login';
import { SignUpPage } from '../../page-objects/authorization/SignUpPage';
import { HomePageLoggedIn } from '../../page-objects/HomePage';

const faker = require('faker');
const config = require('../../config');

test.describe('Account creation', () => {
  let signUpPage: SignUpPage;
  let email: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    signUpPage = await gotToSignUpPage(page);

    email = faker.internet.email();
    password = faker.internet.password();
  });

  test.describe('Negative cases', () => {
    test('Error message when email is empty', async ({ page }) => {
      await signUpPage.login('', password);

      await page.waitForTimeout(300);
      await signUpPage.assertEmailErrorMessage('Email is required');
    });

    /** helo<@google.com test failed can be a bug */
    ['hello', 'hello.com', 'h@g.c', 'helo<@google.com'].forEach((emailCase) => {
      test(`Error message when email is ${emailCase}`, async ({ page }) => {
        await signUpPage.login(emailCase, password);
        await page.waitForTimeout(300);
        await signUpPage.assertEmailErrorMessage('Wrong email');
      });
    });

    test('Error message when password is empty', async ({ page }) => {
      await signUpPage.login(email, '', password);
      await page.waitForTimeout(300);
      await signUpPage.assertPasswordErrorMessage('Password is required');
    });

    test('Error message when repeat password is empty', async ({ page }) => {
      await signUpPage.login(email, password, '');
      await page.waitForTimeout(300);
      await signUpPage.assertRepetPasswordErrorMessage(
        'Please repeat your password',
      );
    });

    // No validation on the site, so tests will fail
    [
      '12345aB',
      '12345678',
      'qwertyuI',
      '123456AB',
      '123456ab',
      '12345aB/',
    ].forEach(async (passwordCase) => {
      test.skip(`Error message when password is ${passwordCase}`, async ({
        page,
      }) => {
        await signUpPage.login(email, passwordCase);
        await page.waitForTimeout(300);
        await signUpPage.assertPasswordErrorMessage('Wrong password');
      });
    });

    test('Error message when repeate password doesent match with password', async ({
      page,
    }) => {
      const password2 = getNewPassword(password);

      await signUpPage.login(email, password, password2);
      await page.waitForTimeout(300);
      await signUpPage.assertRepetPasswordErrorMessage(
        'Please make sure your passwords match',
      );
    });

    test('Error message when email already exists', async ({ page }) => {
      const signUpPage = await gotToSignUpPage(page);
      await signUpPage.login(email, password);
      await page.waitForURL(config.BaseUrl + config.succesLogin);

      const homePageIn = new HomePageLoggedIn(page);
      await homePageIn.goToHomePage();
      await page.waitForURL(config.BaseUrl);
      await homePageIn.logOut();
      await page.waitForURL(config.BaseUrl + 'sign-in');

      await gotToSignUpPage(page);
      await signUpPage.login(email, password);
      await page.waitForTimeout(300);

      await signUpPage.assertEmailErrorMessage('Email is already taken.');
    });
  });

  test.describe('Possitive cases', () => {
    test('Shoud sign up with valid cred', async ({ page }) => {
      const email = await faker.internet.email();
      const password = await faker.internet.password();

      await signUpPage.login(email, password);
      await page.waitForURL(config.BaseUrl + config.succesLogin);

      expect(page).toHaveURL(config.BaseUrl + config.succesLogin);
    });
  });
});
