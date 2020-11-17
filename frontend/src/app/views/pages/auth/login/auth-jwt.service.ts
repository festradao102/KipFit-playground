import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from './login.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

type JwtToken = {
    id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    SERVER_API_URL = 'http://localhost:8080/';
    constructor(private http: HttpClient,
              //  private $localStorage: LocalStorageService,
            //    private $sessionStorage: SessionStorageService
    ) {}

    getToken(): string {
     //   return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
        return localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken') || '';
    }

    login(credentials: Login): Observable<void> {
        return this.http
            .post<JwtToken>(this.SERVER_API_URL + 'api/authenticate', credentials)
            .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
    }

    logout(): Observable<void> {
        return new Observable(observer => {
           // this.$localStorage.clear('authenticationToken');
           // this.$sessionStorage.clear('authenticationToken');
            localStorage.removeItem('authenticationToken');
            sessionStorage.removeItem('authenticationToken');
            observer.complete();
        });
    }

    private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
        const jwt = response.id_token;
        if (rememberMe) {
          //  this.$localStorage.store('authenticationToken', jwt);
            localStorage.setItem('authenticationToken', jwt);
        } else {
           // this.$sessionStorage.store('authenticationToken', jwt);
            sessionStorage.setItem('authenticationToken', jwt);
        }
    }
}
// localStorage.setItem('XXX', Valor);
