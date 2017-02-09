import { element } from 'protractor';
import { SportsModel } from './../../../../model/sports';
import { UserModel } from './../../../../model/user';
import { FirebaseService } from './../../../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { labels: { fontColor: "black", fontSize: 12 } },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "black",
          fontSize: 12,
           stepSize: 1,
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "black",
          fontSize: 12,
         
          beginAtZero: true
        }
      }]
    }

  }

  // lineChart
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;


  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  corporateID = '-KcF-tBV05Gt9bi-j0-_';

  users =  new Array<UserModel>();
  timeMap = new Map<string, Array<SportsModel>>();

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getUserFromCorporate();
  }

  getUserFromCorporate() {
    this.firebaseService.getCorporateEmployees(this.corporateID)

        .subscribe((data) => {
         

          data.forEach(userID => {

            this.firebaseService.getUser(userID.$value)
         
              .subscribe((element) => {
             
             
                this.users.push(element);
                if (data.length == this.users.length)
                this.getSchedule();

                  
              })


          });
       
     
         });
       
       

       

      
  }



  getSchedule() {

    
    

    this.users.forEach(user => {
     

      if (user.schedules)
        user.schedules.forEach(sch => {

          

          sch.time.forEach(time => {


            let key = sch.weekDay_short + ': ' + time.start + '-' + time.end;

            if (this.timeMap.has(key)) {

              this.timeMap.set(key, this.timeMap.get(key).concat(user.sports));


            }
            else {
              this.timeMap.set(key, user.sports);

            }

          });
        });
    });


    let i = 0;

    let sMap = new Array<Map<string, number>>();


    this.lineChartLabels = new Array<string>();

    this.timeMap.forEach((sports, key) => {
   
      this.lineChartLabels[i] = key;

      let sportsArr = Array<number>()

      let map = new Map<string, number>();

      sports.forEach((sport, key2) => {

       
        
        if (map.has(sport.name)) {
          map.set(sport.name, map.get(sport.name) + 1);
          
        }
        else
          map.set(sport.name, 1);

      });

        sMap.push(map);

      i++;
    })

   
    let  z = 0;
    
 let nameMap= new Map<string,number[]>();
    
    
     this.lineChartData = new Array<string>();

    sMap.forEach((sportMap) => {

      sportMap.forEach((count, name) => {

         console.log(name +' === '+count);

         if(nameMap.has(name)){

          let aux = nameMap.get(name);
          aux[z] = count;

         nameMap.set(name, aux)
       }
       else{
         let x = Array<number>(sMap.length);
         x.fill(0);
         x[z] = count;
           nameMap.set(name, x);
       }
        
      })
   
      console.log( '---------');

      
    z++
    });


    
 console.log( '++++++++');
   console.log( '++++++++');

    let j=0;
nameMap.forEach((name, key) => {



  console.log(key +': '+name);
  

              this.lineChartData[j] = {
                 data: name, label:key 
                };
                j++
           
});


  }

}
