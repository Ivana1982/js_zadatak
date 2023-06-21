"use strict";

require ('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, Key, until } = require('selenium-webdriver');
const { assert, expect } = require('chai');
const HomePage = require('../pages/home.page');
const RegisterPage = require('../pages/register.page');
const LoginPage = require('../pages/login.page');
const CartPage = require('../pages/cart.page');

describe('test.qa.rs tests', function () {
    let driver;
    let pageHomePage;
    let pageRegister;
    let pageLogin;
    let pageCart;


    before(function () {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        pageHomePage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('Verifies homepage is open', async function() {
        await pageHomePage.goToPage();
        const pageTitle = await pageHomePage.getPageHeaderTitle();
        expect(pageTitle).to.contain('QA FastFood');
        expect(await pageHomePage.isBugListDivDisplayed()).to.be.true;
    });

    it('Goes to registration page', async function() {
        await pageHomePage.clickOnRegisterLink();
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://test.qa.rs/register');
    });

    it('Successfully performs registration', async function() {
        await pageRegister.getInputFirstName();
        await pageRegister.getInputLastName();
        await pageRegister.getInputEmail();

        await pageRegister.getInputUsername();
        await pageRegister.getInputPassword();
        await pageRegister.getInputPasswordConfirm();

        await pageRegister.getRegisterButton().click();

        expect(await pageHomePage.getSuccessAlertText()).to.contain('Sucess!');
    });

    it('Goes to login page and performs login', async function() {
        await pageLogin.goToPage();

        await pageLogin.fillInputUsername('irena.trifunovic');
        await pageLogin.fillInputPassword('nekalozinka1234');

        await pageLogin.clickLoginButton();

        expect(await pageHomePage.getWelcomeBackTittle()).to.contain('Welcome back');
        expect(await pageHomePage.isLogoutLinkDisplayed()).to.be.true;
    });

    it('Open shopping cart', async function() {
        await pageHomePage.clickOnViewShoppingCartLink();

        expect(await pageCart.getCurrentUrl()).to.be.eq('http://test.qa.rs/cart');
        expect(await pageCart.getPageHeaderTitle()).to.contain('Order');

    });

    it('Performs logout', async function() {
        await pageHomePage.clickOnLogoutLink();
        expect(await pageHomePage.isLoginLinkDisplayed()).to.be.true;
    });
});