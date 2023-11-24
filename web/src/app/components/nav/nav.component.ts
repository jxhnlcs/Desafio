import { Component, OnInit } from '@angular/core';
import { authService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // Correção aqui
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: string = '';

  constructor(private authService: authService, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log(decodedToken)
      this.name = decodedToken.name;
    }
  }

  onLogout(): void {
    // Exibir SweetAlert de confirmação
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você será desconectado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpar as informações do usuário ao fazer logout
        this.authService.logout();
        this.name = '';

        // Redirecionar para a tela de login
        Swal.fire('Desconectado!', 'Você foi desconectado com sucesso.', 'success');
      }
    });
  }
}