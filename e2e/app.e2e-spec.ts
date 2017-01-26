import { WorkOutSitePage } from './app.po';

describe('work-out-site App', function() {
  let page: WorkOutSitePage;

  beforeEach(() => {
    page = new WorkOutSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
