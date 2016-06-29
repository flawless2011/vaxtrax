import { VaxtraxPage } from './app.po';

describe('vaxtrax App', function() {
  let page: VaxtraxPage;

  beforeEach(() => {
    page = new VaxtraxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
