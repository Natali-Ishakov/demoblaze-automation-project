import { Page, Locator } from '@playwright/test';


export class RegisterPage{
    public page: Page;
    public userNameField: Locator;
    public passwordField: Locator;
    public registerButton: Locator;
    public closeButton : Locator;


    constructor(page : Page){
        this.page = page;
        this.userNameField = page.locator('#sign-username')
        this.passwordField = page.getByRole('textbox', {name: 'Password:'});
        this.registerButton = page.getByRole('button', {name: 'Sign up'});
        this.closeButton = page.getByRole('button', {name: 'close'});
      
    }



}