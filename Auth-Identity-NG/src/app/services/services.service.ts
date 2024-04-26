import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, ObservedValueOf, map } from 'rxjs';
import { LoginResponse } from '../interfaces/login-responce';
import { registerRequest } from '../interfaces/register-request';
import { registerResponce } from '../interfaces/register-responce';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;
  tokenKey: string = 'token';
  token: any | null
  router = inject(Router)

  login(data: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}Auth/Login`, data).pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey, response.token)
        }
        this.router.navigate(['/home'])
        return response
      })
    );
  }

  register(data: registerRequest): Observable<registerResponce>{
    return this.http.post<registerResponce>(`${this.apiUrl}Auth/Register`, data).pipe(
      map((responce) =>{
        if (responce.isSuccess) {
          console.log("qilichdek qilichbek")
        }
        this.router.navigate(['/home'])
        return responce;
      })
    )
  }

  logout(){
    this.token = localStorage.getItem(this.tokenKey)
    if (this.token == '') {
      return false;
    }
    localStorage.setItem(this.tokenKey, '');
    return true;
  }
}
