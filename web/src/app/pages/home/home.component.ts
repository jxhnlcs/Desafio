import { Component } from '@angular/core';
import { CepService } from '../../services/cep.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { simulatedCepsData } from '../../models/SimulatedCepsData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  centerCep: string = '';
  radiusKm: number = 0;
  cepsInRadius: string[] = [];
  showModal: boolean = false;
  modalCep: string = '';
  modalRadius: number = 0;

  simulatedCepsData = simulatedCepsData;

  constructor(private cepService: CepService) { }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  //Buscando do array

  // onBuscar(): void {
  //   if (this.isValidCepFormat(this.centerCep) && this.radiusKm > 0) {
  //     // Simule a chamada do serviço usando dados simulados
  //     of(this.simulatedCepsData).subscribe(
  //       (result: any[]) => {
  //         if (result.every(item => item.hasOwnProperty('cep') && item.hasOwnProperty('radius'))) {
  //           this.cepsInRadius = result.map(item => `${item.cep} ${item.radius}KM`);
  //           console.log(this.cepsInRadius)
  //           this.showSuccessAlert();
  //           this.clearModalFields();
  //           this.closeModal();
  //         } else {
  //           console.error('As propriedades "cep" ou "radius" estão ausentes em um ou mais itens.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Erro ao buscar CEPs:', error);
  //       }
  //     );
  //   } else {
  //     this.showAlert('Por favor, adicione um CEP válido no formato "xxxxx-xxx" e um valor válido para o raio.');
  //   }
  // }

  onBuscar(): void {
    if (this.isValidCepFormat(this.centerCep) && this.radiusKm > 0) {
      const findCepsDto = {
        userCep: this.centerCep,
        radius: this.radiusKm,
      };

      this.cepService.findCepsInRadius(findCepsDto).subscribe(
        (result: any[]) => {
          if (result.every(item => item.hasOwnProperty('cep') && item.hasOwnProperty('radius'))) {
            if (result.length > 0) {
              this.cepsInRadius = result.map(item => `${item.cep}⠀⠀ ${item.radius}KM`);
              this.showSuccessAlert();
              this.clearModalFields();
              this.closeModal();
            } else {
              this.clearModalFields();
              this.closeModal();
            }
          } else {
            console.error('As propriedades "cep" ou "radius" estão ausentes em um ou mais itens.');
          }
        },
        (error) => {
          console.error('Erro ao buscar CEPs:', error);

          if (error.status === 404) {
            this.showNoCepsFoundAlert();
          } else {
          }
        }
      );
    } else {
      this.showAlert('Por favor, adicione um CEP válido no formato "xxxxx-xxx" e um valor válido para o raio.');
    }
  }

  showNoCepsFoundAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'Nenhum CEP encontrado',
      text: 'Desculpe, nenhum CEP foi encontrado no raio fornecido. Tente ajustar os parâmetros da pesquisa.',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  isValidCepFormat(cep: string): boolean {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  }

  clearModalFields(): void {
    this.centerCep = '';
    this.radiusKm = 0;
  }

  showAlert(message: string): void {
    Swal.fire({
      icon: 'warning',
      title: message,
    });
  }

  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Consulta efetuada com sucesso',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }
}