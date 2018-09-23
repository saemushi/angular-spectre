import { NgsAutoCompleteModule } from './auto-complete.module';

describe('AutoCompleteModule', () => {
  let autoCompleteModule: NgsAutoCompleteModule;

  beforeEach(() => {
    autoCompleteModule = new NgsAutoCompleteModule();
  });

  it('should create an instance', () => {
    expect(autoCompleteModule).toBeTruthy();
  });
});
