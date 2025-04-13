import { Page, Locator, expect } from '@playwright/test';

export class PlaceOrerPage{

    public page: Page;
    public totalPrice: Locator;
    public nameField: Locator;
    public countryField: Locator;
    public cityField: Locator;
    public creditCardField: Locator;
    public monthField: Locator;
    public yearField: Locator;
    public purchaseButton: Locator;


    constructor(page: Page){
        this.page = page;
        this.totalPrice = page.locator('#totalm');
        this.nameField = page.locator('#name');
        this.countryField = page.locator('#country');
        this.cityField = page.locator('#city');
        this.creditCardField = page.locator('#card');
        this.monthField = page.locator('#month');
        this.yearField = page.locator('#year');
        this.purchaseButton = page.getByRole('button', {name: 'Purchase'})
    }



}