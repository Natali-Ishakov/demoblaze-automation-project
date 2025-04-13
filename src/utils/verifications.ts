import { Locator, Page, expect } from '@playwright/test';

export class Verifications {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        
      }
  
  async assertElementExists(element: Locator): Promise<void> {
    await element.waitFor({ state: 'attached' });
    expect(await element.isVisible()).toBe(true);
  }

  async assertTextContent(element: Locator, expectedText: string): Promise<void> {
    const textContent = await element.textContent();
    expect(textContent).toContain(expectedText);
  }

  async assertElementNotVisible(element: Locator): Promise<void> {
    expect(await element.isVisible()).toBe(false);
  }

  async assertElementIsButton(element: Locator): Promise<void> {
    const tagName = await element.evaluate(el => el.tagName);
    expect(tagName).toBe('BUTTON');
  }

  async assertImageIsVisible(element: Locator): Promise<void> {
    const imgSrc = await element.getAttribute('src');
    expect(imgSrc).not.toBeNull();
    expect(await element.isVisible()).toBe(true);
  }

  async assertFieldNotEmpty(element: Locator): Promise<void> {
    const value = await element.inputValue();
    expect(value.trim()).not.toBe('');
  }

  async assertTextIsEqual(element: Locator, expectedText: string): Promise<void> {
    const textContent = await element.textContent();
    expect(textContent).toBe(expectedText);
  }

  async assertInnerTextIsEqual(element: Locator, expectedText: string): Promise<void> {
    const textContent = await element.innerText();
    expect(textContent).toBe(expectedText);
  }

}