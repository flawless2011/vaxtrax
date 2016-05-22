export class VaxtraxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vaxtrax-app h1')).getText();
  }
}
