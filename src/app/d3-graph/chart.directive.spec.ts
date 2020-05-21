import { ChartDirective } from './chart.directive';

describe('ChartDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
        nativeElement: document.createElement('svg')
      };
    const directive = ChartDirective;
    expect(directive).toBeTruthy();
  });
});
