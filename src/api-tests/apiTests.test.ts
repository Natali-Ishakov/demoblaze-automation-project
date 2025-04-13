import axios from 'axios';
import { describe, test, expect } from '@jest/globals';

const baseUrl = 'https://api.demoblaze.com';
const username = 'natali1994';
const password = 'MTIzNDU2';

describe('Demoblaze API Tests', () => {
  let itemId: string;
  let authToken: string;

  test('Login with existing user', async () => {
    const res = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();
    authToken = res.data.split('Auth_token: ')[1];
  });

  test('Add Nexus 6 to cart via API', async () => {
    itemId = Date.now().toString();

    const payload = {
      id: itemId,
      cookie: authToken,
      prod_id: '3',
      flag: 'true'
    };

    const res = await axios.post(`${baseUrl}/addtocart`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(res.status).toBe(200);
  });

  test('Validate cart contains Nexus 6 with correct info', async () => {
    const viewCartPayload = {
      cookie: authToken,
      flag: 'true'
    };
    const viewCartResponse = await axios.post(`${baseUrl}/viewcart`, viewCartPayload,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    expect(viewCartResponse.status).toBe(200)
    const items = viewCartResponse.data.Items;
    expect(items.length).toBe(1);
    const prod_id = items[0].prod_id;
    expect(prod_id).toBe('3');

    const view_res = await axios.post(`${baseUrl}/view`, {
      id: prod_id,
    }, {
      headers: {
      'Content-Type': 'application/json'
      }
    });

    expect(view_res.status).toBe(200);
    expect(view_res.data.id).toBe(3);
    expect(view_res.data.title).toBe('Nexus 6');
    expect(view_res.data.price).toBe(650);

  });

  test('Clean up - delete item from cart', async () => {
    const res = await axios.post(`${baseUrl}/deleteitem`, {
      cookie: username,
      id: itemId,
    });

    expect(res.data).toBe('Item deleted.');
  });
});
