import { Page } from '@playwright/test';
import { SignInPage } from '../page-objects/authorization/SignInPage';
import { SignUpPage } from '../page-objects/authorization/SignUpPage';
import { HomePageLoggedOut } from '../page-objects/HomePage';

const config = require('../config');

export async function goToHomePage(page: Page) {
  const homePage = new HomePageLoggedOut(page);
  await homePage.visit();
  await page.waitForTimeout(300);
  return homePage;
}

export async function goToSignInPage(page: Page) {
  const homePage = await goToHomePage(page);
  await homePage.clickOnSignIn();
  await page.waitForURL(config.BaseUrl + 'sign-in');
  return new SignInPage(page);
}

export async function gotToSignUpPage(page: Page) {
  const homePage = await goToHomePage(page);
  await homePage.clickOnSignUp();
  await page.waitForURL(config.BaseUrl + 'sign-up');
  return new SignUpPage(page);
}
