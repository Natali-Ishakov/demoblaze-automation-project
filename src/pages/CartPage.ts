import { Page, Locator } from '@playwright/test';


export class CartPage{
    public page: Page;
    public placeOrderButton: Locator;
    public totalPrice: Locator;
    public productList: Locator;


    constructor(page: Page){
        this.page = page;
        this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' })
        this.totalPrice = this.page.locator('#totalp');
        this.productList = this.page.locator('.success');
    }
}