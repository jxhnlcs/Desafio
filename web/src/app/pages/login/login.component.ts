import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input()
  email: string = '';
  @Input()
  password: string = '';

  constructor(private loginService: loginService, private router: Router) {}

  onLogin(): void {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password)
        .subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Erro ao efetuar login:', error);
          }
        );
    } else {
      console.error('Por favor, forneça e-mail e senha.');
    }
  }
}