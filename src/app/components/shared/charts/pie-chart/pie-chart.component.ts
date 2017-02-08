import { FirebaseService } from './../../../../services/firebase.service';
import { PieChartFilterModel } from './../../../../model/pie-chart-filter';
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

  dataReady = false;
  corporateID = '-KcF-tBV05Gt9bi-j0-_';

  public filter: PieChartFilterModel;

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.initPieChart();
    this.initFilter();
    this.getRequestUsers();

  }

  getRequestUsers() {
    this.firebaseService.getRequestUsers(this.corporateID)
      .subscribe((data) => {

        data.forEach(userRequest => {



          if (userRequest.isApproved == 0)
            this.pieChartData[1]++;
          else if (userRequest.isApproved == 1)
            this.pieChartData[0]++;


        });
        this.getCoporateEmployeesAmount();
      })

  }

  getCoporateEmployeesAmount() {
    this.firebaseService.getCoporateEmployeesAmount(this.corporateID)
      .subscribe((data) => {
        this.pieChartData.forEach(element => {
          console.log('dado: ' + element);

        });
        this.pieChartData[2] = data.$value - this.pieChartData[1] - this.pieChartData[0];
        this.dataReady = true;
      })
  }


  private initFilter() {
    this.filter = new PieChartFilterModel('both', 'all', 'TODOS', [18, 90])
  }

  private initPieChart() {

    this.pieChartLabels = ['Cadastro Realizado', 'Entrou na Plataforma', 'Não Fizeram Cadastro'];
    this.pieChartData = [0, 0, 0];
    this.pieChartType = 'pie';
    this.pieChartColors = [{
      backgroundColor: ["#c62828", "#f44336", "#e57373"]

    }];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { labels: { fontColor: "black", fontSize: 12 } },


    }

  }

  onApply() {
    console.dir(this.filter);
  }

}
