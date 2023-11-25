import { Component, OnInit } from '@angular/core';
import { HistoricService } from '../../services/historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent implements OnInit {
  historicData: any[] = [];

  constructor(private historicService: HistoricService) {}

  ngOnInit(): void {
    this.getHistoricData();
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    
    // Obtém os componentes de data e hora
    const day = date.getDate();
    const month = date.getMonth() + 1; // Mês é baseado em zero, então adicionamos 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Formatação com zeros à esquerda, se necessário
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    // Retorna a data e hora formatadas
    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getHistoricData(): void {
    this.historicService.getHistoric().subscribe(
      (data) => {
        this.historicData = data;
      },
      (error) => {
        console.error('Error fetching historic data', error);
      }
    );
  }
}