import { Page, Locator } from '@playwright/test';

export class ProductPage {
    public page: Page;
    public productName: Locator;
    public addToCartButton: Locator;
    public productPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.productName = page.getByRole('heading', {name: 'Nexus 6'});
        this.productPrice = page.locator('.price-container');
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });

    }


}
