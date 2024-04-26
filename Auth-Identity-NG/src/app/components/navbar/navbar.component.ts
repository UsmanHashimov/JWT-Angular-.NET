import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../../services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  checkToken: boolean = false;

  logoutt() {
    this.checkToken = this.authService.logout()
    if(!this.checkToken) {
      this.matSnackBar.open('Login or register', 'Close', {
        duration: 5000,
        horizontalPosition: 'center'
        }
      )
      return;
    }
    console.log('logout done!')
    this.matSnackBar.open('Logged out succesfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'center'
      }
    )
  }

  
}
