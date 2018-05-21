import { Component, OnInit, Input, Output } from '@angular/core';
import {ServerInfo} from "../server-info";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  @Input() cpuPerc: string;
  @Input() memPerc: string;
  @Input() netPerc: string;
  serverInfo: ServerInfo = new ServerInfo();
  @Output() changeJson = new EventEmitter();
  check: boolean = true;
  transcurredTimeCpu: number = 0;
  transcurredTimeMem: number = 0;
  transcurredTimeNet: number = 0;

  // cpuPerc2: string;

  initCpu() {
      //   this.cpuPerc2 = this.cpuPerc
      // console.log(this.cpuPerc2)

        // this.cpuPerc


      var that = this


      setInterval(function () {

          var currentdate = new Date();
          var datetime = currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();

          that.serverInfo.addCpu(that.cpuPerc);
          that.changeJson.emit();

          if(that.lineChartLabels.length == 12) {
              that.lineChartLabels.splice(0,1);
          }

          that.lineChartLabels.push(datetime);

          that.randomize('cpu');

      },1500);

  }

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    initMem() {

        var that = this


        setInterval(function () {

            var currentdate = new Date();
            var datetime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            that.serverInfo.addMem(that.memPerc);
            that.changeJson.emit();

            if(that.lineChartLabels.length == 12) {
                that.lineChartLabels.splice(0,1);
            }

            that.lineChartLabels.push(datetime);

            that.randomize('mem');

        },1000);

    }

    initNet() {

        var that = this


        setInterval(function () {

            var currentdate = new Date();
            var datetime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            that.serverInfo.addNet(that.netPerc);
            that.changeJson.emit();

            if(that.lineChartLabels.length == 12) {
                that.lineChartLabels.splice(0,1);
            }

            that.lineChartLabels.push(datetime);

            that.randomize('net');

        },1000);

    }

  ngOnInit() {

  }

    // lineChart
    public lineChartData:Array<any> = [
        {data: [], label: 'Series A'}
    ];


    public lineChartLabels:Array<any> = [];
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

    public randomize(type):void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }

    if(!this.check) {
        for (let i = 0; i < 40; i++) {
            this.lineChartLabels.push(i)
            console.log(this.lineChartLabels);

        }
        this.check = true
    }


    switch(type) {
        case 'cpu':
            _lineChartData[0].data = this.serverInfo.cpuArr;
            break;
        case 'mem':
            _lineChartData[0].data = this.serverInfo.memArr;
            break;
        case 'net':
            _lineChartData[0].data = this.serverInfo.netArr;
            break;
        default:
            console.log('ERROR');
            break;
    }

        this.lineChartData = _lineChartData;

    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}
