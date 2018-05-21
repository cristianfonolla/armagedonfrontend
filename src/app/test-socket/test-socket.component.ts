import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { TestWebSocketService } from "../test-web-socket.service";

@Component({
  selector: 'app-test-socket',
  templateUrl: './test-socket.component.html',
  styleUrls: ['./test-socket.component.css']
})
export class TestSocketComponent {
    // private socketSubscription: Subscription
    // test: string;
    //
    // constructor(private service: TestWebSocketService) {}
    // // constructor() {}
    //
    //
    // pipo() {
    //
    //     this.service.connect();
    //
    //     this.service.send('connected!')
    //
    //     this.socketSubscription = this.service.messages.subscribe((message: string) => {
    //         console.log(message);
    //     })
    // }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // ngOnInit() {
    //     // this.socket.connect()
    //
    //     // this.socketSubscription = this.socket.messages.subscribe((message: string) => {
    //     //     this.test = message
    //     // })
    //     // console.log(this.socketSubscription)
    //
    //     // send message to server, if the socket is not connected it will be sent
    //     // as soon as the connection becomes available thanks to QueueingSubject
    //     // this.socket.send('hello')
    // }
    // //
    // // pipo() {
    // //
    // //     this.socket.send('hella')
    // //
    // // }
    // //
    // // pipa() {
    // //
    // //     // this.socket.connect()
    // //     console.log('CONECTED!')
    // //     this.socket.send('connected!')
    // //
    // //     this.socketSubscription = this.socket.messages.subscribe((message: string) => {
    // //         this.test = message
    // //         console.log(message.toString())
    // //     })
    // //
    // // }
    // //
    // // close() {
    // //     this.socketSubscription.unsubscribe()
    // //     console.log('disconnected')
    // // }
    // //


}

