import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckJwtService } from './check-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyJwtService implements CanActivate  {
  constructor(private checkJwtSer: CheckJwtService, private router: Router) {}
  canActivate() {
    if (!this.checkJwtSer.checkLogin()) {
      this.router.navigateByUrl('/login');
    } else {
      return true;
    }
    return false;
  }
}
