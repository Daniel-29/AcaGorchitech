import { API_RESPONSE } from "./../interfaces/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthLogin, AuthResponse } from "../interfaces/auth";
import { catchError, map, take, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
    private readonly _URL = environment.api;
  private readonly _USERS = "users/auth-with-password";

  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  onAutenticateCredentials(credentials: AuthLogin): Observable<AuthResponse> {
    let cred:any = {
      identity: credentials.username,
      password: credentials.password
    }
    return this._http
      .post<AuthResponse>(this._URL + this._USERS, cred)
      .pipe(
        take(1),
        catchError((error) => {
          this.errorHandle(error);
          return EMPTY;
        })
      );
  }
  
  onSetToken(token: string): void {
    console.log("Token guardado");
    localStorage.setItem("token", token);
    console.log("Token guardado");
    
  }

  onGetToken(): any {
    console.log("Token obtenido");
    return localStorage.getItem("token") || null;
  }

  onRemoveToken(): void {
    console.log("Token removido");
    localStorage.removeItem("token")
  }

  errorHandle(error: HttpErrorResponse) {
    this._toastr.error(error.statusText, error.status.toString());
  }
}
