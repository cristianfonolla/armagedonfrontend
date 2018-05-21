import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import 'rxjs/add/operator/share'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import {loginInfo} from "./Constants/loginInfo";


@Injectable()
export class TestWebSocketService {

    protected $noseque

    constructor(private http: HttpClient) {}

    private inputStream: QueueingSubject<string>
    public messages: Observable<string>
    private arr = [];

    public connect() {

        if (this.messages)
            return;

        this.messages = websocketConnect(
            'ws://localhost:8181',
            this.inputStream = new QueueingSubject<string>()
        ).messages.share()
    }

    public sendInfoToApi(type, perc) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        const options = { headers: headers };

        let body = {
            'user_id': loginInfo.userid,
            'value': perc,
            'parameter_id': type
        }

        return this.http.post(environment.endPoint + environment.updateParameter,body,options).map((res: Response) => res);
    }

    public send(message: string):void {
        this.inputStream.next(message)
    }

}