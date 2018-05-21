import {Component, enableProdMode, EventEmitter, OnInit, Output} from '@angular/core';
import { TestWebSocketService } from "./test-web-socket.service";
import { Subscription } from 'rxjs/Subscription'
import {AuthService} from "./auth-service.service";
import {loginInfo} from "./Constants/loginInfo";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loggedIn: boolean;
    register: boolean;
    cpuAvg: any;
    memAvg: any;
    netAvg: any;

    ngAfterViewInit() {
        const val = localStorage.getItem("loggedIn");
        const id = localStorage.getItem("user_id");
        if(val === 'true') {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }

        if(id) {
            loginInfo.userid = parseInt(id);
        }

        if(val === 'true' && id) {
            this.authService.getAverage(id, '1').subscribe(res => {
                this.cpuAvg = res['average'];
            });

            this.authService.getAverage(id, '2').subscribe(res => {
                this.memAvg = res['average'];
            });

            this.authService.getAverage(id, '3').subscribe(res => {
                this.netAvg = res['average'];
            });
        }

    }

    logout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user_id");
        this.authService.loginSuccess.next(false);
        this.authService.logout().subscribe(res => {
            console.log(res);
        });
    }

    ngOnInit(): void {
        this.authService.loginSuccess.subscribe(res => {
            this.loggedIn = res;
        });

        this.service.connect();
        this.getJson()
    }

    cpu: string = "cpu";
    mem: string = "mem";
    net: string = "net";
    initArr: string[];
    initArrMem: string[];
    initArrNet: string[];
    checkCpu: boolean = false;
    checkMem: boolean = false;
    checkNet: boolean = false;

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    constructor(private service: TestWebSocketService, private authService: AuthService) {
    }

    jsonJson = {
        'cpu': 0,
        'mem': 0,
        'net': 0
    };
    private socketSubscription: Subscription;

    asa(type) {

        switch(type) {

            case 'cpu':

                this.checkMem = false;
                this.checkNet = false;

                if (!this.checkCpu) {
                    this.checkCpu = true;
                } else {
                    this.checkCpu = false;
                }
                break;
            case 'mem':

                this.checkCpu = false;
                this.checkNet = false;

                if (!this.checkMem) {
                    this.checkMem = true;
                } else {
                    this.checkMem = false;
                }
                break;
            case 'net':

                this.checkCpu = false;
                this.checkMem = false;

                if (!this.checkNet) {
                    this.checkNet = true;
                } else {
                    this.checkNet = false;
                }
                break;
        }
    }

    getJson(){

        // this.service.send('connected!')

        this.socketSubscription = this.service.messages.subscribe((message: string) => {

            // console.log(message)

            var arr = message.split('-');

            if (arr[0] == '@') {

                arr.splice(0,1);

                this.initArr = arr;

            } else if (arr[0] == '#') {

                arr.splice(0,1);

                this.initArrMem = arr;

            } else if (arr[0] == '$') {

                arr.splice(0,1);

                this.initArrNet = arr;

            } else {

                let json = {
                    'cpu': arr[0],
                    'mem': arr[1],
                    'net': arr[2]
                };

                let jsonstring = JSON.stringify(json)

                this.jsonJson = JSON.parse(jsonstring);

                // console.log(arr);

            }
        })
    }
}
