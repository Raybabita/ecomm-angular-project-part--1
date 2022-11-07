import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  LoginErrorMsg = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }).subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('sellerData', JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
        console.log(result);
      })
  }
  reloadSeller() {
    if (localStorage.getItem('sellerData')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: login) {
    console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length) {
          this.LoginErrorMsg.emit(false)
          localStorage.setItem('sellerData', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          console.log("login failed");
          this.LoginErrorMsg.emit(true)
        }
      })


  }

}
