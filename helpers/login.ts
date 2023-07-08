import { Page } from '@playwright/test';
import { SignInPage } from '../page-objects/authorization/SignInPage';
import { SignUpPage } from '../page-objects/authorization/SignUpPage';
import { HomePageLoggedOut } from '../page-objects/HomePage';

const config = require('../config');
const faker = require('faker');

// Function to navigate to the Home page
export async function goToHomePage(page: Page) {
  const homePage = new HomePageLoggedOut(page);
  await homePage.visit();
  await page.waitForTimeout(300);
  return homePage;
}

// Function to navigate to the Sign-in page
export async function goToSignInPage(page: Page) {
  const homePage = await goToHomePage(page);
  await homePage.clickOnSignIn();
  await page.waitForURL(config.BaseUrl + 'sign-in');
  return new SignInPage(page);
}

// Function to navigate to the Sign-up page
export async function gotToSignUpPage(page: Page) {
  const homePage = await goToHomePage(page);
  await homePage.clickOnSignUp();
  await page.waitForURL(config.BaseUrl + 'sign-up');
  return new SignUpPage(page);
}

// Function to generate a new password different from the existing one
export function getNewPassword(oldPassword: string): string {
  let password: string;
  do {
    password = faker.internet.password();
  } while (oldPassword === password);

  return password;
}
