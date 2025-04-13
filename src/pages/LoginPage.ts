import { Page, Locator, expect } from '@playwright/test';

export class LoginPage{
    public page: Page;
    public userNameField: Locator;
    public passwordField: Locator;
    public loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }
}