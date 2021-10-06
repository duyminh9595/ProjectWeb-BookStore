import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CheckJwtService } from './check-jwt.service';

@Injectable({
  providedIn: 'root', // ADDED providedIn root here.
})
export class CheckCartExistsInlocal implements CanActivate {
  constructor(private checkJwtSer: CheckJwtService, private router: Router) {}
  canActivate() {
    if (!this.checkJwtSer.checkLogin()) {
      this.router.navigateByUrl('/login');
    } else {
      if (localStorage.getItem('itemCarts') != null) return true;
      else {
        alert('Làm gì có gì mà thành toán');
        this.router.navigateByUrl('/books');
      }
    }
    return false;
  }
}
