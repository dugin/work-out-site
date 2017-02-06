import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [20, 25, 20, 15, 15, 21, 28], label: 'Abaixo do Peso' },
    { data: [50, 55, 60, 65, 70, 65, 60], label: 'Normal' },
    { data: [30, 20, 20, 20, 15, 14, 12], label: 'Acima do Peso' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
