import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage'; 
import { uiActions } from '../utils/uiActions';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage'
import {ProductPage} from '../pages/ProductPage';
import { Verifications } from '../utils/verifications';
import { PlaceOrerPage } from '../pages/PlaceOrderPage';

export class UserFlows{
    public page: Page;
    public homePage: HomePage;
    public actions: uiActions;
    public validateObj: Verifications
    public registerObj: RegisterPage;
    public loginObj: LoginPage;
    public cartObj: CartPage;
    public productObj: ProductPage;
    public placeOrderObj: PlaceOrerPage;


    constructor(page: Page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.actions = new uiActions(page);
        this.validateObj = new Verifications(page);
        this.registerObj = new RegisterPage(page)
        this.loginObj = new LoginPage(page);
        this.cartObj = new CartPage(page);
        this.productObj = new ProductPage(page);
        this.placeOrderObj = new PlaceOrerPage(page);
    }

    async registerUser(userName: string, password: string) {
        await this.actions.click(this.homePage.signupButton);

        await this.actions.fillText(this.registerObj.userNameField, userName);
        await this.actions.fillText(this.registerObj.passwordField, password);
        await this.actions.click(this.registerObj.registerButton);
    }

 

    async login(userName: string, password: string){
        await this.actions.click(this.homePage.loginButton);
        await this.actions.fillText(this.loginObj.userNameField, userName);
        await this.actions.fillText(this.loginObj.passwordField, password);
        await this.actions.click(this.loginObj.loginButton);
        await expect(this.page.getByText(`Welcome ${userName}`, {exact: true})).toBeVisible();
    }

    async addItems(item_names: string[]){
        const prices: {[id: string]: number} = {};
        this.page.on('dialog', async dialog => {
            dialog.accept().catch(() => {});
        });
        for(const item_name of item_names) {
            let product: Locator | undefined = undefined;
            while(product === undefined) {
                product = await this.homePage.findProduct(item_name);
                if(product === undefined) {
                    //move to next page if element not found. in case no more pages will throw
                    await this.actions.click(this.homePage.nextPageButton);
                    await this.page.waitForTimeout(1000);
                    continue;
                }
                await this.actions.click(product);
                prices[item_name] = await this.actions.extractNumber(this.productObj.productPrice);
                const popupPromise = this.page.waitForEvent('dialog');
                await this.actions.click(this.productObj.addToCartButton);
                await popupPromise;
                await this.actions.click(this.homePage.homeLink);
                await this.actions.waitForElement(this.homePage.cardBlock);
            }
        }
        return prices;
    }

    async validateCart(product_prices: {[id: string]: number}, expected_sum: number){
        await this.actions.click(this.homePage.cartButton);
        await expect(this.cartObj.productList).toHaveCount(Object.values(product_prices).length);
        const cart_length = await this.cartObj.productList.count();
        let actual_price = 0;
        for(let i = 0; i < cart_length; ++i ){
            const item = this.cartObj.productList.nth(i);
            const cell = item.getByRole('cell');
            const name = await cell.nth(1).innerText();
            const price = parseInt(await cell.nth(2).innerText());
            expect(product_prices[name]).toBe(price);
            actual_price += price;
            
        }
        expect(actual_price).toBe(expected_sum);
        await this.validateObj.assertInnerTextIsEqual(this.cartObj.totalPrice , expected_sum.toString());
        await this.actions.click(this.cartObj.placeOrderButton);
        
    }

     

    async purchase(name: string , country: string, city: string,
        creditCard: string,month: string,year: string ,expected_sum: number){
        await this.cartObj.placeOrderButton.click({ force: true });
        const actual_sum = await this.actions.extractNumber(this.placeOrderObj.totalPrice)
        expect(actual_sum).toBe(expected_sum);

        await this.actions.fillText(this.placeOrderObj.nameField, name);
        await this.actions.fillText(this.placeOrderObj.countryField, country);
        await this.actions.fillText(this.placeOrderObj.cityField, city);
        await this.actions.fillText(this.placeOrderObj.creditCardField, creditCard);
        await this.actions.fillText(this.placeOrderObj.monthField, month);
        await this.actions.fillText(this.placeOrderObj.yearField, year);
        await this.actions.click(this.placeOrderObj.purchaseButton);
    }
}