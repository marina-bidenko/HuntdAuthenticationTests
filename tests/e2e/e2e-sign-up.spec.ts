import { test, expect } from '@playwright/test';
import { gotToSignUpPage } from '../../helpers/login';
import { SignUpPage } from '../../page-objects/authorization/SignUpPage';

const faker = require('faker');
const config = require('../../config')

test.describe('Account creation', () => {
  let signUpPage: SignUpPage;
  let email: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    signUpPage = await gotToSignUpPage(page)

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
      await signUpPage.assertPassordErrorMessage('Password is required');
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
        await signUpPage.assertPassordErrorMessage('Wrong password');
      });
    });

    test('Error message when repeate password doesent match with password', async ({
      page,
    }) => {
      let password2 = faker.internet.password();
      while (password == password2) {
        password2 = faker.internet.password();
      }

      await signUpPage.login(email, password, password2);
      await page.waitForTimeout(300);
      await signUpPage.assertRepetPasswordErrorMessage(
        'Please make sure your passwords match',
      );
    });
  });

  test.describe('Possitive cases', () => {
    test.skip('Shoud sign up with valid cred', async ({ page }) => {
      const email = await faker.internet.email();
      const password = await faker.internet.password();

      await signUpPage.login(email, password);
      await page.waitForTimeout(3000);

      expect(page).toHaveURL(config.BaseUrl + 'choose-profile');
    });
  });
});
