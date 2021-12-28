import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  local: Storage = localStorage;
  session: Storage = sessionStorage;
  doSignOut() {
    this.local.removeItem("emailLogin")
    this.local.removeItem("tokenLogin")
    this.session.removeItem("emailLogin")
    this.session.removeItem("tokenLogin")
    window.location.href = '/';
  }


}
