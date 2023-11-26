import { Component, OnInit } from '@angular/core';
import { authService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: string = '';

  constructor(
    private authService: authService, 
    private jwtHelper: JwtHelperService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      this.name = decodedToken.name;
    }
  }

  onLogout(): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você será desconectado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.name = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);

        Swal.fire('Desconectado!', 'Você foi desconectado com sucesso.', 'success');
      }
    });
  }
}