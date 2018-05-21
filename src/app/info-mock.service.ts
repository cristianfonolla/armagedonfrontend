import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { of } from "rxjs/observable/of";


@Injectable()
export class InfoMockService {

    constructor() {}

    subscribe(): Observable<string> {

        var randomCpu = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        var randomMem = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        var randomNet = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

      var json = {
              'cpu': randomCpu,
              'mem': randomMem,
              'net': randomNet
          }

        return of(JSON.stringify(json));

    }

}


// Observable.interval(1500).subscribe(x => {
//     randomCpu = Math.floor(Math.random() * (101 - 1 + 1)) + 1;
//     randomMem = Math.floor(Math.random() * (101 - 1 + 1)) + 1;
//     randomNet = Math.floor(Math.random() * (101 - 1 + 1)) + 1;
//
//     // json = {
//     //     'cpu': randomCpu,
//     //     'mem': randomMem,
//     //     'net': randomNet
//     // }
//
//     console.log(randomCpu)
//     console.log(randomMem)
//     console.log(randomNet)
// });