import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

   public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {labels:{fontColor:"black", fontSize: 12}},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 12,
                       
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 12,
                        stepSize: 1,
                        beginAtZero:true
                    }
                }]
            }

  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Futebol'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Basquete'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Volei de Praia'}
  ];
  public lineChartLabels:Array<any> = ['Seg: 6h-8h', 'Seg: 19h-21h', 'Ter: 18h-20h', 'Qua: 10h-12h', 'Qua: 18h-20h', 'Qui: 15h-17h', 'Sex: 7h-9h'];

  public lineChartColors:Array<any> = [
    { // light grey
      backgroundColor: 'rgba(212,216,223,0.2)',
      borderColor: 'rgba(212,216,223,1)',
      pointBackgroundColor: 'rgba(212,216,223,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(212,216,223,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // black
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderColor: 'rgba(0,0,33,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit() {
  }

}
