import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

    fileToUpload: File = null;


    constructor(private httpClient: HttpClient) { }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        this.postFile(this.fileToUpload).subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    postFile(fileToUpload: File): Observable<any> {
        return this.httpClient.get('https://api.imageresizer.io/v1/images/iDAl1?key=de1290257dd2adde8f6bcaea64dfda9d2157d7e3')
            .map(res => res);

    }

  ngOnInit() {
  }

}
