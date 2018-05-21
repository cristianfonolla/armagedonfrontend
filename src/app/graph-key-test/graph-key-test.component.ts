import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-key-test',
  templateUrl: './graph-key-test.component.html',
  styleUrls: ['./graph-key-test.component.css']
})
export class GraphKeyTestComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    // lineChart
    public lineChartData:Array<any> = [
        {data: [65], label: 'Series A'}
    ];
    public lineChartLabels:Array<number> = [0];
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    private num = 1;

    public randomize():void {

        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
            _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: this.lineChartData[0].label};

            var that = this;

            _lineChartData[0].data = [0];

            var pipo = setInterval(function () {

                _lineChartData[0].data.push(that.num);

                that.num++;

                that.lineChartData = _lineChartData;
                console.log(that.num)

            },1000);

            if(this.num == 15) {
                clearInterval(pipo)
            }




    }

    keyPress() {

        console.log('pipo')

    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}