import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {environment} from "../environments/environment";

@Injectable()
export class AuthService {

    loginSuccess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // registerEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

  login(username: string, password: String) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = { headers: headers };

      const body = {
          'email': username,
          'password': password
      };

      return this.http.post(environment.endPoint + environment.login,body,options).map(res => {
          return res;
      });
  }

    getAverage(id, parameter) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers };

        return this.http.get(environment.endPoint + environment.getParameter + '/' + id + '/' + parameter ,options).map(res => {
            return res;
        });
    }

    register(name, password, email) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers };

        const body = {
            'email': email,
            'name': name,
            'password': password
        };

        return this.http.post(environment.endPoint + environment.register,body,options).map(res => {
            return res;
        });
    }

    validateAuthCode(userId, authCode) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers };

        return this.http.get(environment.endPoint + environment.authCode + '/' + userId + '/' + authCode,options).map(res => {
            return res;
        });
    }

  logout() {

      return this.http.get(environment.endPoint + environment.logout).map(res => {
          return res;
      });
  }

}
