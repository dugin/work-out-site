import { PieChartFilterModel } from './../../../model/pie-chart-filter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  // Pie Chart
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  public pieChartColors: any[];
  public chartOptions: any;



  public filter: PieChartFilterModel;

  constructor() { }

  ngOnInit() {
    this.initPieChart();
    this.initFilter();


  }

  private initFilter() {
    this.filter = new PieChartFilterModel('both', 'all', 'TODOS', [18, 90])
  }

  private initPieChart() {

    this.pieChartLabels = ['Cadastro Realizado', 'Entrou na Plataforma', 'Não Fizeram Cadastro'];
    this.pieChartData = [250, 150, 600];
    this.pieChartType = 'pie';
    this.pieChartColors = [{ 
      backgroundColor: ["rgb(244, 67, 54)",  "rgba(244, 67, 54, .5)","#434a54"],
      borderColor: ["rgb(244, 67, 54)",  "rgba(244, 67, 54, .5)","#434a54"]
    }];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {labels:{fontColor:"white", fontSize: 12}},
       

    }

  }

  onApply() {
    console.dir(this.filter);
  }

}
