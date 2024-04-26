import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  form!: FormGroup;

  title = 'identity-cient';

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

  constructor( private service: AuthService, private router: Router, private fb: FormBuilder, private matSnackBar: MatSnackBar, private readonly translocoService: TranslocoService) {
    this.translocoService.translate('title')
    this.translocoService.translate('form.firstName')
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      age: ['', Validators.required],
      roles: []
    });
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    const rolesStr : string = this.form.value.roles;
    const roles : string[] = rolesStr.split(' ').map((role: string)=> role.trim());
    this.form.value.roles = roles;
    
    this.service.register(this.form.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
        this.matSnackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
      }
    });
  }
}
