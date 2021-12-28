import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckJwtService {
  localStore: Storage = localStorage;
  session: Storage = sessionStorage;
  emailLogin: Subject<string> = new BehaviorSubject<any>(1);
  tokenLogin: Subject<string> = new BehaviorSubject<any>(1);
  constructor() { }
  checkLogin() {
    if (
      localStorage.getItem('tokenLogin') != null &&
      localStorage.getItem('emailLogin') != null
    ) {
      const email = this.localStore.getItem('emailLogin')!;
      const token = this.localStore.getItem('tokenLogin')!;
      this.emailLogin.next(email);
      this.tokenLogin.next(token);
      return true;
    }
    else if (
      sessionStorage.getItem('tokenLogin') != null &&
      sessionStorage.getItem('emailLogin') != null
    ) {
      const email = this.localStore.getItem('emailLogin')!;
      const token = this.localStore.getItem('tokenLogin')!;
      this.emailLogin.next(email);
      this.tokenLogin.next(token);
      return true;
    }
    else return false;
  }
}
