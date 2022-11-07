import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError: string = "";

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    console.log(data);
    // this.seller.userSignUp(data).subscribe((result) => {
    //   // console.log(result)
    //   if (result) {
    //     this.router.navigate(['seller-home'])
    //   }
    // });
    this.seller.userSignUp(data);

  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

  login(data: SignUp): void {
    // console.log(data);
    this.seller.userLogin(data);
    this.seller.LoginErrorMsg.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct";
      }
    })
  }

}
