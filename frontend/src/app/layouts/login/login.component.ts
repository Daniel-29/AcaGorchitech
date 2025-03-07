import { Component, HostBinding, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
  ],
})
export class LoginComponent implements OnInit {
  ///////////////////////////////////////////////////////////////////////////////
  /* constructor  */
  constructor(private _authService: AuthService,private router:Router) {}
  loginForm!: FormGroup;

  ///////////////////////////////////////////////////////////////////////////////
  /* implements  */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  /* Methods */
  onSendLoginForm(): void {
    this._authService
      .onAutenticateCredentials(this.loginForm.getRawValue())
      .subscribe((Response) => {
        localStorage.setItem('user', JSON.stringify(Response));
        this._authService.onSetToken(Response.token);
        this.router.navigate(["/home"]);
      });
  }
}
