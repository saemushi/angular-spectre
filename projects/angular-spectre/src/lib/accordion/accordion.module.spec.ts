import { NgsAccordionModule } from './accordion.module';

describe('AccordionsModule', () => {
  let accordionModule: NgsAccordionModule;

  beforeEach(() => {
    accordionModule = new NgsAccordionModule();
  });

  it('should create an instance', () => {
    expect(accordionModule).toBeTruthy();
  });
});
