import { AccordionsModule } from './accordions.module';

describe('AccordionsModule', () => {
  let accordionsModule: AccordionsModule;

  beforeEach(() => {
    accordionsModule = new AccordionsModule();
  });

  it('should create an instance', () => {
    expect(accordionsModule).toBeTruthy();
  });
});
