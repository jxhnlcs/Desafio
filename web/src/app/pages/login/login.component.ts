import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  signupName: string = '';
  signupEmail: string = '';
  signupPassword: string = '';

  constructor(private authService: authService, private router: Router) { }

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
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

  onSignup(): void {
    if (this.signupName && this.signupEmail && this.signupPassword) {
      // Chama o método de cadastro do authService com os campos de cadastro
      this.authService.signup(this.signupName, this.signupEmail, this.signupPassword)
        .subscribe(
          () => {
            console.log('Cadastro bem-sucedido. Você pode fazer login agora.');
          },
          (error) => {
            console.error('Erro ao cadastrar:', error);
          }
        );
    } else {
      console.error('Por favor, forneça nome, e-mail e senha para se cadastrar.');
    }
  }
}