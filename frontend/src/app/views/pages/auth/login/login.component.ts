import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from "../../../../core/login/login.service";
import {FormBuilder} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    returnUrl: any;
    authenticationError = false;

    loginForm = {
        username: '',
        password: '',
        rememberMe: false
    }

    constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void { }

    login(): void {
        this.loginService
            .login({
                // tslint:disable-next-line:no-non-null-assertion
                username: this.loginForm.username,
                // tslint:disable-next-line:no-non-null-assertion
                password: this.loginForm.password,
                // tslint:disable-next-line:no-non-null-assertion
                rememberMe: this.loginForm.rememberMe,
            })
            .subscribe(
                () => {
                    this.authenticationError = false;
                    this.router.navigateByUrl('dashboard');
                },
                error =>{
                    this.authenticationError = true;
                    Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Credenciales incorrectos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            );
    }

    onLoggedin(e) {
        e.preventDefault();
        localStorage.setItem('isLoggedin', 'true');
        if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
        }
    }

    requestResetPassword(): void {
        this.router.navigate(['/account/reset', 'request']);
    }
}
