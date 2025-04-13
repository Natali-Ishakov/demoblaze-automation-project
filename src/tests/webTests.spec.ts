    import { test, expect } from '@playwright/test';
    import {UserFlows} from '../workFlows/UserFlows';

    test.describe('Web Tests', ()=>{

        test.beforeEach(async({page})=>{
        
            await page.goto('https://www.demoblaze.com/');
            await expect(page).toHaveURL('https://www.demoblaze.com/');
            await expect(page).toHaveTitle('STORE');

        })

        test('register user', async({page})=>{
            const userFlows = new UserFlows(page);
            await userFlows.registerUser('natali1994', '123456')

        })

        test('User login and purchase process', async({page})=>{
            const userFlows = new UserFlows(page);
            await userFlows.login('natali1994', '123456');
        })

        test('addProduct', async({page})=>{
            const userFlows = new UserFlows(page);
            await userFlows.login('natali1994', '123456');

            const item_names = ['Nexus 6', 'MacBook Pro'];
            const product_prices =  await userFlows.addItems(item_names);
            const expected_sum = Object.values(product_prices).reduce((sum, price) => sum + price);
            await userFlows.validateCart(product_prices, expected_sum);
            await userFlows.purchase('natali', 'Israel','Tel Aviv','123456', '5','2027',expected_sum);
        })
    })
