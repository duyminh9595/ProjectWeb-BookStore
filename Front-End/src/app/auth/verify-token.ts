import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CheckLoginService } from '../service/check-login.service';

@Injectable({
  providedIn: 'root', // ADDED providedIn root here.
})
export class VerifyToken implements CanActivate {
  constructor(private loginSer: CheckLoginService, private router: Router) {}
  canActivate() {
    if (!this.loginSer.checkLogin()) {
      this.router.navigateByUrl('/login');
    } else {
      return true;
    }
    return false;
  }
}
