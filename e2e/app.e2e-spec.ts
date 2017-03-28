import { SAMRECIPEPage } from './app.po';

describe('samrecipe App', () => {
  let page: SAMRECIPEPage;

  beforeEach(() => {
    page = new SAMRECIPEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
