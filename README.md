# HuntdAuthenticationTests

## About
An automated testing project for huntd's login and authorization using Playwright and Allure. It aims to streamline testing and generate detailed reports on test results.

## Instalation
- Node.js, Java, JDK must be already installed
````bash
- git clone https://github.com/marina-bidenko/HuntdAuthenticationTests.git
- cd HuntdAuthenticationTests
- npm install
````

## Run
Run all tests and create allure report
````bash 
npm test:report 
````

### Docker
````bash
 - docker build -t huntd-auth-test .
 - docker run -p 9323:9323 huntd-auth-test
````
You can see results on https://locallhost.com:9323

