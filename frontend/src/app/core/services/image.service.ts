import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { Observable, EMPTY } from "rxjs";
import { take, catchError, map } from "rxjs/operators";
import { ActionResponse } from "../interfaces/common";
import { Image, CreateImage, ImageResponse } from "../interfaces/image";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root",
})
export class ImageService {
  private readonly _URL = environment.api;
  private readonly _IMAGES = "image/records";
  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getImages(): Promise<ImageResponse> {
    return new Promise((resolve, reject) => {
      this._http
        .get<ImageResponse>(this._URL + this._IMAGES)
        .pipe(
          take(1),
          catchError((error) => {
            this.errorHandle(error);
            return EMPTY;
          }),
          map((response: ImageResponse) => {
            resolve(response);
          })
        )
        .subscribe();
    });
  }
  createImage(register: CreateImage): Observable<any> {
    console.log(register);
    let url = `${this._URL}${this._IMAGES}`;
    return this._http.post<ActionResponse>(url, register).pipe(
      take(1),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un error al agregar el registro",
        });
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  updateImage(register: Image): Observable<any> {
    let url = `${this._URL}${this._IMAGES}/${register.id}/`;
    return this._http.patch<ActionResponse>(url, register).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  deleteImage(id: Number): Observable<any> {
    let url = `${this._URL}${this._IMAGES}/${id}/`;
    return this._http.delete<ActionResponse>(url).pipe(
      take(1),
      catchError((error) => {
        this.errorHandle(error);
        return EMPTY;
      }),
      map((Response: any) => {
        return Response;
      })
    );
  }

  successHandle(status: string, code: number, message: string): void {
    this._toastr.success(code + status, message);
  }

  showInfo(status: string, code: number, message: string): void {
    const success = [200, 201, 202, 203, 206, 206];
    const error = [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];
    const warning = [
      400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
    ];

    if (success.includes(code)) {
      this._toastr.success(code + "-" + status, message);
    } else if (error.includes(code)) {
      this._toastr.error(code + "-" + status, message);
    } else if (warning.includes(code)) {
      this._toastr.warning(code + "-" + status, message);
    }
  }
  errorHandle(error: HttpErrorResponse) {
    this._toastr.error(error.statusText, error.status.toString());
  }
}
