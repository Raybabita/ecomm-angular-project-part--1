import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerData') && val.url.includes('seller')) {
          console.log('In seller area')
          this.menuType = 'sellerData';
        } else {
          console.log('outside seller area')
          this.menuType = 'default';
        }
      }
    })
  }

}
