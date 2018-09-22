import { NgsDirectivesModule } from './directives.module';

describe('TooltipModule', () => {
  let tooltipModule: NgsDirectivesModule;

  beforeEach(() => {
    tooltipModule = new NgsDirectivesModule();
  });

  it('should create an instance', () => {
    expect(tooltipModule).toBeTruthy();
  });
});
