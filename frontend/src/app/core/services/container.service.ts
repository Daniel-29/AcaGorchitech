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
import {
  Container,
  CreateContainer,
  ContainerResponse,
} from "../interfaces/container";
import Swal from "sweetalert2";
@Injectable({
  providedIn: "root",
})
export class ContainerService {
  private readonly _URL = environment.api;
  private readonly _CONTAINERS = "container/records";
  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getContainers(httpParams?: HttpParams): Promise<ContainerResponse> {
    httpParams != undefined ? null : (httpParams = new HttpParams());
    httpParams = httpParams?.append("filter", 'deleted=""');

    httpParams = httpParams?.append(
      "expand",
      "id_scope,id_network,id_image,id_volumen"
    );
    return new Promise((resolve, reject) => {
      this._http
        .get<ContainerResponse>(this._URL + this._CONTAINERS, { params: httpParams })
        .pipe(
          take(1),
          catchError((error) => {
            this.errorHandle(error);
            return EMPTY;
          }),
          map((response: ContainerResponse) => {
            resolve(response);
          })
        )
        .subscribe();
    });
  }
  createContainer(register: any): Observable<any> {
    console.log(register);
    let url = `${this._URL}${this._CONTAINERS}`;
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

  updateContainer(register: Container): Observable<any> {
    let url = `${this._URL}${this._CONTAINERS}/${register.id}/`;
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

  deleteContainer(register: any): Observable<any> {
    let url = `${this._URL}${this._CONTAINERS}/${register.id}/`;
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
  updateStatus(register: any): Observable<any> {
    let url = `${this._URL}${this._CONTAINERS}/${register.id}/`;
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
