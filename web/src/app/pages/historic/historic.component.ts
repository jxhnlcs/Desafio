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