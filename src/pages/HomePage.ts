import { Page, Locator } from '@playwright/test';
import { uiActions } from '../utils/uiActions';




export class HomePage{
    public page: Page;
    public actions: uiActions;
    public loginButton: Locator;
    public signupButton: Locator;
    public addToCartButton: Locator;
    public homeLink: Locator;
    public nextPageButton: Locator;
    public cardBlock: Locator;
    public cartButton: Locator;

    constructor(page : Page){
        this.page = page;
        this.actions = new uiActions(page);
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', {name: 'Log in'});
        this.addToCartButton = page.getByRole('link', {name: 'Add to cart'});
        this.homeLink = page.getByRole('link', {name: 'Home (current)'});
        this.nextPageButton = page.locator('#next2');
        this.cardBlock = page.locator('.card-block').first();
        this.cartButton = page.getByRole('link', {name: 'Cart', exact: true});
    }


    async findProduct(productName: string): Promise<Locator | undefined> {
        const product = this.page.getByRole('link', { name: productName });

        const isVisible = await product.isVisible().catch(() => false);
        if (!isVisible) return undefined;
        return product;      
    }

    getAddToCartButton(): Locator {
        return this.page.getByRole('link', { name: 'Add to cart' });
    }

}