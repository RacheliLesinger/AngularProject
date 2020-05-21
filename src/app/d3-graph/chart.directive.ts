
import { AfterContentInit,Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

// import * as d3 from 'd3';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Directive({
  selector: '[appChart]',
  
})

export class ChartDirective implements OnInit {
  

  @Input() tutorialPerLecturer : any[];
 
//   @ViewChild('chart',{static:false})  private chartContainer: ElementRef;
//  private margin = {top: 20, right: 20, bottom: 30, left: 50};
private width: number;
    private height: number;
    private margin = {top: 20, right: 20, bottom: 30, left: 40};

    private x: any;
    private y: any;
    private svg: any;
    private g: any;
  
  constructor( private el: ElementRef ){
     
  }

  
  ngOnInit() {
   console.log("i am in directive")
   console.log(this.tutorialPerLecturer)
   this.initSvg();
   this.initAxis(this.tutorialPerLecturer);
   this.drawAxis();
   this.drawBars(this.tutorialPerLecturer);
// if (!this.tutorialPerLecturer)  { return; }

// this.createChart();
    
}
ngOnChanges(changes) {
    // if (changes.data) {
    //     this.initSvg();
    //     this.initAxis(changes.data.currentValue);
    //     this.drawAxis();
    //     this.drawBars(changes.data.currentValue);
    // }
}
private initSvg() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxis(data: Array<any>) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d) => d.lecturer));
    this.y.domain([0, d3Array.max(data, (d) => d.count)]);
}

private drawAxis() {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y).ticks(1))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');
}

private drawBars(data) {
    this.g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => this.x(d.lecturer) )
        .attr('y', (d) => this.y(d.count) )
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.height - this.y(d.count) );
}
//   private initSvg() {
  
//       this.color = d3Scale.scaleOrdinal()
//           .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
//       this.arc = d3Shape.arc()
//           .outerRadius(this.radius - 10)
//           .innerRadius(0);
//       this.labelArc = d3Shape.arc()
//           .outerRadius(this.radius - 40)
//           .innerRadius(this.radius - 40);
//       this.pie = d3Shape.pie()
//           .sort(null)
//           .value((d: any) => d.count);
//       this.svg = d3.select(this.el.nativeElement)
//           .append('g')
//           .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
//           this.el.nativeElement.style.height="500";
//           this.el.nativeElement.style.width="960";
//   }

//   private drawPie() {
      
//     let g = this.svg.selectAll('.arc').data(this.pie(this.tutorialPerLecturer)).enter().append('g')
//       .attr('class', 'arc');
//     g.append('path').attr('d', this.arc)
//       .style('fill', (d: any) =>this.color(d.lecturer) );
//   g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')' )
//       .attr('dy', '.35em')
//       .text((d: any) => (d.lecturer +" "+ d.count));

     
      

    // private createChart(): void {
        
    //     d3.select('svg').remove();
        
    
    //     const element = this.chartContainer.nativeElement;
    //     const data = this.tutorialPerLecturer;
    
    //     const svg = d3.select(element).append('svg')
    //         .attr('width', element.offsetWidth)
    //         .attr('height', element.offsetHeight);
    
    //     const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    //     const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
    
    //     const x = d3
    //       .scaleBand()
    //       .rangeRound([0, contentWidth])
    //       .padding(0.1)
    //       .domain(data.map(d => d.lecturer));
    
    //     const y = d3
    //       .scaleLinear()
    //       .rangeRound([contentHeight, 0])
    //       .domain([0, d3.max(data, d => d.count)]);
    
    //     const g = svg.append('g')
    //       .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
    //     g.append('g')
    //       .attr('class', 'axis axis--x')
    //       .attr('transform', 'translate(0,' + contentHeight + ')')
    //       .call(d3.axisBottom(x));
    
    //     g.append('g')
    //       .attr('class', 'axis axis--y')
    //       .call(d3.axisLeft(y).ticks(10, '%'))
    //       .append('text')
    //         .attr('transform', 'rotate(-90)')
    //         .attr('y', 6)
    //         .attr('dy', '0.71em')
    //         .attr('text-anchor', 'end')
    //         .text('Num Of Tutorial');
    
    //     g.selectAll('.bar')
    //       .data(data)
    //       .enter().append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', d => x(d.lecturer))
    //         .attr('y', d => y(d.count))
    //         .attr('width', x.bandwidth())
    //         .attr('height', d => contentHeight - y(d.count));
    //   }
    //   onResize() {
    //     this.createChart();
    //   }
}
