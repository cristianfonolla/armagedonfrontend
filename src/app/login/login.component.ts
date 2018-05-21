import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {loginInfo} from "../Constants/loginInfo";
import {AuthService} from "../auth-service.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    error: boolean = false;
    loading = false;
    loadingR = false;
    signinForm: FormGroup;
    signinFormR: FormGroup;
    submitted = false;
    register: boolean = false;
    userId: any;
    authCode: any;
    authCodeApi: any;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.initForm();
        this.initFormR();
    }

    onRegister(bool) {
        if(!bool) {
            this.register = true;
        } else {
            this.register = false;
        }
    }

    sendAuthCode() {
        this.authService.validateAuthCode(this.userId, this.authCode).subscribe(r => {
            console.log(r);
           if(r['redcode'] === 0) {
               localStorage.setItem("loggedIn",'true');
               localStorage.setItem("user_id", r['user_id']);
               loginInfo.username = this.signinForm.value.username;
               loginInfo.userid = this.userId;
               this.authService.loginSuccess.next(true);
               this.signinFormR.setValue({name: '', password: '', email: ''});
           }
            this.authCode = '';
        });
    }

    /**
     * Envia petición de login. Se obtiene un token en caso de identificación correcta
     */
    onSubmit() {
        this.submitted = false;
        this.loading = true;
        this.authService.login(this.signinForm.value.username, this.signinForm.value.password).subscribe(r => {
            // console.log(r);
            if(r['redcode'] === 0) {
                this.authService.loginSuccess.next(true);
                localStorage.setItem("loggedIn",'true');
                localStorage.setItem("user_id",r['user_id']);
                loginInfo.username = this.signinForm.value.username;
                loginInfo.userid = r['user_id'];
                this.submitted = true;
            } else {
                this.error = true;
            }
            this.loading = false;
        });

        this.signinForm.setValue({username: this.signinForm.value.username, password: ''});
    }

    onSubmitRegister() {
        this.submitted = false;
        this.loading = true;
        this.authService.register(this.signinFormR.value.name, this.signinFormR.value.password, this.signinFormR.value.email).subscribe(r => {
            console.log(r);
            if(r['redcode'] === 0) {
                this.userId = r['user_id'];

                this.submitted = true;
                // this.register = false;
            } else {
                this.error = true;
            }
            this.loading = false;
        });
    }

    /**
     * Inicializa el formulario
     */
    private initForm() {
        this.signinForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
        });
    }

    private initFormR() {
        this.signinFormR = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.email]),
            'password': new FormControl(null, [Validators.required]),
        });
    }

}
