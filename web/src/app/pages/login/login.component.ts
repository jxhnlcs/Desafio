import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
            // Adiciona o SweetAlert ao fazer login com sucesso
            Swal.fire({
              icon: 'success',
              title: 'Login feito com sucesso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            }).then((result) => {
              this.router.navigate(['/home']);
            });
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
      this.authService.signup(this.signupName, this.signupEmail, this.signupPassword)
        .subscribe(
          () => {
            this.signupName = '';
            this.signupEmail = '';
            this.signupPassword = '';

            Swal.fire('Cadastro concluído com sucesso!', '', 'success')
              .then(() => {
                location.reload();
              });
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