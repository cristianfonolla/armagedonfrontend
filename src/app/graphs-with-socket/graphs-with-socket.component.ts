import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ServerInfo} from "../server-info";
import {TestWebSocketService} from "../test-web-socket.service";
import 'rxjs/add/operator/map'
import {AuthService} from "../auth-service.service";

@Component({
    selector: 'app-graphs-with-socket',
    templateUrl: './graphs-with-socket.component.html',
    styleUrls: ['./graphs-with-socket.component.css']
})
export class GraphsWithSocketComponent implements OnInit {

    ngOnInit(): void {

        this.authService.loginSuccess.subscribe(res => {
           if (!res) {
               clearInterval(this.interval);
           }
        });

        this.refresh();
        this.choseColor(this.type);

    }

    constructor(private webSocketService: TestWebSocketService, private authService: AuthService) {
    }

    @Input() perc: string;
    @Input() type: string;
    @Input() info5: string[];
    serverInfo: ServerInfo = new ServerInfo();
    datetime: string;
    interval: any;
    check: boolean = true;
    checkInit: boolean = true;

    public lineChartData: Array<any> = [
        {data: [], label: "%"}
    ];

    public lineChartLabels: Array<any> = [];

    public initGraph(type): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        // _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: this.type + " %"};

        switch (type) {
            case 'cpu':

                if (this.checkInit) {
                    _lineChartData[0] = {data: new Array(this.serverInfo.cpuArr.length), label: 'CPU' + " %"};
                    this.serverInfo.cpuArr = this.info5;
                    _lineChartData[0].data = this.serverInfo.cpuArr;
                } else {
                    _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: 'CPU' + " %"};
                    this.addArray(this.type);
                    _lineChartData[0].data = this.serverInfo.cpuArr;
                }

                this.checkInit = false;
                break;
            case 'mem':

                if (this.checkInit) {
                    _lineChartData[0] = {data: new Array(this.serverInfo.memArr), label: 'Memory %'};
                    this.serverInfo.memArr = this.info5;
                    _lineChartData[0].data = this.serverInfo.memArr;
                } else {
                    _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: 'Memory %'};
                    this.addArray(this.type);
                    _lineChartData[0].data = this.serverInfo.memArr;
                }

                this.checkInit = false;
                break;
            case 'net':

                if (this.checkInit) {
                    _lineChartData[0] = {data: new Array(this.serverInfo.netArr), label: 'Network KB/s'};
                    this.serverInfo.netArr = this.info5;
                    _lineChartData[0].data = this.serverInfo.netArr;
                } else {
                    _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: 'Network KB/s'};
                    this.addArray(this.type);
                    _lineChartData[0].data = this.serverInfo.netArr;
                }

                this.checkInit = false;
                break;
            default:
                console.log('ERROR');
                break;
        }

        this.lineChartData = _lineChartData;

    }

    refresh() {
        var that = this;
        this.interval = setInterval(function () {
            if (that.check) {
                for (var i = 0; i < 299; i++) {
                    that.lineChartLabels.push(' ');
                }
            }
            that.check = false;
            that.initGraph(that.type);
        }, 1000);
    }

    getDate(): string {

        var currentdate = new Date();
        this.datetime = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        return this.datetime;

    }

    addArray(type) {

        switch (type) {
            case 'cpu':
                this.serverInfo.addCpu(this.perc);
                this.webSocketService.sendInfoToApi('1', this.perc).subscribe(res => {
                    // console.log(res);
                });
                break;
            case 'mem':
                this.serverInfo.addMem(this.perc);
                this.webSocketService.sendInfoToApi('2', this.perc).subscribe(res => {
                    // console.log(res)
                });
                break;
            case 'net':
                this.serverInfo.addNet(this.perc);
                this.webSocketService.sendInfoToApi('3', this.perc).subscribe(res => {
                    // console.log(res);
                });
                break;
        }

    }

    choseColor(type) {
        switch (type) {
            case 'cpu':

                let cpuColor: Array<any> = new Array(1);
                cpuColor[0] = {
                    backgroundColor: 'rgba(126,226,255,0.3)',
                    borderColor: 'rgba(126,226,255,1)',
                    pointBackgroundColor: 'rgba(148,159,177,0)',
                    pointBorderColor: 'rgba(148,159,177,0)',
                    pointHoverBackgroundColor: 'rgba(148,159,177,0)',
                    pointHoverBorderColor: 'rgba(148,159,177,0)'
                };

                this.lineChartColors = cpuColor;
                break;
            case 'mem':
                let memColor: Array<any> = new Array(1);
                memColor[0] = {
                    backgroundColor: 'rgba(0,255,0,0.3)',
                    borderColor: 'rgba(0,255,0,1)',
                    pointBackgroundColor: 'rgba(148,159,177,0)',
                    pointBorderColor: 'rgba(148,159,177,0)',
                    pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                    pointHoverBorderColor: 'rgba(148,159,177,0)'
                };

                this.lineChartColors = memColor;
                break;
            case 'net':
                let netColor: Array<any> = new Array(1);
                netColor[0] = {
                    backgroundColor: 'rgba(117, 79, 67, 0.3)',
                    borderColor: 'rgba(117, 79, 67, 1)',
                    pointBackgroundColor: 'rgba(148,159,177,0)',
                    pointBorderColor: 'rgba(148,159,177,0)',
                    pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                    pointHoverBorderColor: 'rgba(148,159,177,1)'
                };

                this.lineChartColors = netColor;
                break;
        }
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            //test
        }
    ];

}