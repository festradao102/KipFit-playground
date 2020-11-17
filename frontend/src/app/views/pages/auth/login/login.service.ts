import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AccountService} from './account.service';
import {Login} from './login.model';
import {AuthServerProvider} from './auth-jwt.service';
import {Account} from './account.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private authServerProvider: AuthServerProvider) {}

    login(credentials: Login): Observable<void> {
       // return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
        return this.authServerProvider.login(credentials);
    }

    logout(): void {
      //  this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
        this.authServerProvider.logout();
    }
}
