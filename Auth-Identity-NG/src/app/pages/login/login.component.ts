import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services.service';
import { jwtDecode } from 'jwt-decode';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  title = 'identity-cient';

  constructor(private readonly translocoService: TranslocoService){
    this.translocoService.translate('title')
    this.translocoService.translate('form.firstName')
  }

  public languagesList: 
    Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/images/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      imgUrl: '/assets/images/russia.png',
      code: 'ru',
      name: 'Russian',
      shorthand: 'RU',
    },
    {
      imgUrl: '/assets/images/uzbekistan.png',
      code: 'uz',
      name: 'Uzbekistan',
      shorthand: 'UZB',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fl'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }

  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  decodedToken: any | null;
  tokenKey = 'token' 
  roles: string[] = [];
  tokenDecoded : any;
  
  login(){
    this.authService.login(this.form.value).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.decodedToken = jwtDecode(localStorage.getItem(this.tokenKey)!)
          console.log('rollar kelishi kere');
            if(this.decodedToken.role == 'Admin'){
              console.log('admin-test');
              console.log(this.decodedToken.role);
              this.router.navigate(['/users'])
            }
            else if(this.decodedToken.role == 'Student'){
              console.log('student-test');
              console.log(this.decodedToken.role);
              this.router.navigate(['/student-profile'])
            }
          
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'

          })

        },
        error: (err) => {
          
          console.log(err);

          this.matSnackBar.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          })
        }
        
      }
    )
  }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });

      this.tokenDecoded = jwtDecode(localStorage.getItem(this.tokenKey)!)
      console.log('decoded token');
      console.log(this.tokenDecoded);
      console.log('data kelyabdi');
        console.log(Date.now());

      if(this.tokenDecoded.exp * 1000 < Date.now()){
        this.router.navigate(['/register'])
      }
    }
}
