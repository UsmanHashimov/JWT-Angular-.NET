import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/services.service';

var userRouter  = false;
var adminRouter  = true;
var tokenKey = 'token';

export const loginGuard: CanActivateFn = (route, state) => {
  console.log('route keldi');
  console.log(route);

  console.log('state keldi');
  console.log(state);

  return true;
};

export const registerGuard: CanActivateFn = (route, state) => {
  return true;
};

export const usersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

 if(localStorage.getItem(tokenKey) != null) {
  const tokenDecoded: any = jwtDecode(localStorage.getItem(tokenKey)!)
  const data = tokenDecoded.role;

    if(data == 'Admin') {
      return true
    } else {
      router.navigate(['/login'])
      return false;
    }
 }
 else {
  console.log('navigate boldi');
  router.navigate(['/login'])
  return false;
 }
};

export const studentProfileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

 if(localStorage.getItem(tokenKey) != null) {
  const tokenDecoded: any = jwtDecode(localStorage.getItem(tokenKey)!)
  const data = tokenDecoded.role;

    if(data == 'Student') {
      return true
    } else {
      router.navigate(['/login'])
      return false;
    }
 }
  else {
    console.log('navigate boldi');
    router.navigate(['/login'])
    return false;
  }
};
