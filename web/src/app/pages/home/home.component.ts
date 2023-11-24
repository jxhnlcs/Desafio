import { Component } from '@angular/core';
import { CepService } from '../../services/cep.service';

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
  consultas: { cep: string; radius: number }[] = [];

  constructor(private cepService: CepService) {}

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onBuscar(): void {
    if (this.centerCep && this.radiusKm) {
      const findCepsDto = {
        userCep: this.centerCep,
        radius: this.radiusKm,
      };
  
      this.cepService.findCepsInRadius(findCepsDto).subscribe(
        (result: any[]) => {
          // Verificar se cada item tem as propriedades 'cep' e 'radius'
          if (result.every(item => item.hasOwnProperty('cep') && item.hasOwnProperty('radius'))) {
            // Mapear os objetos para incluir 'cep' e 'radius'
            this.cepsInRadius = result.map(item => `${item.cep} ${item.radius} KM`);
            console.log('CEPs no raio:', this.cepsInRadius);
            this.closeModal()
          } else {
            console.error('As propriedades "cep" ou "radius" estão ausentes em um ou mais itens.');
          }
        },
        (error) => {
          console.error('Erro ao buscar CEPs:', error);
        }
      );
    } else {
      console.error('Por favor, informe o CEP e o raio em KM.');
    }
  }
  
  consultarModal(): void {
    if (this.modalCep && this.modalRadius) {
      const findCepsDto = {
        userCep: this.modalCep,
        radius: this.modalRadius,
      };

      // Simulando a chamada do serviço e atualizando o histórico
      this.cepsInRadius = [this.modalCep]; // Simulação, substitua pelo chamada ao serviço real
      this.consultas.unshift({ cep: this.modalCep, radius: this.modalRadius });

      this.closeModal();
    } else {
      console.error('Por favor, informe o CEP e o raio em KM.');
    }
  }
}