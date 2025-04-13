import { Page, Locator } from '@playwright/test';

export class uiActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForElement(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
  }

  async click(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async fillText(element: Locator, text: string): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.fill(text);
  }

  async hover(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.hover();
  }

  async scrollToBottom(): Promise<void> {
    const bottomElement = await this.page.locator('footer'); 
    await bottomElement.scrollIntoViewIfNeeded();
  }

  async selectDropdown(element: Locator, option: string): Promise<void> {
    await element.waitFor({ state: 'visible' });
    await element.selectOption(option);
  }

  async scrollToElement(element: Locator): Promise<void> {
    await element.scrollIntoViewIfNeeded();
  }

  async extractNumber(element: Locator): Promise<number> {
    const number_str = await element.innerText()
    return parseInt(number_str?.replace(/[^0-9.]/g, ''));
  }
  
  
}