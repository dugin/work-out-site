import { UserModel } from './../../model/user';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();

  users = new Array<UserModel>();
  noData: boolean;

  constructor(
    public firebaseService: FirebaseService
  ) { 
     moment.locale('pt-BR');
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }



  ngOnInit() {
    this.getUsers();
  }

  onAcceptEmployee(user) {
    this.firebaseService.getRequestUser(user.corporateID, user.id)
      .update({ isApproved: 1 })

  }
  onRejectEmployee(user) {

    this.firebaseService.getRequestUser(user.corporateID, user.id)
      .update({ isApproved: -1 })

  }

   sortEventsByDate() {
  
     
    return this.users.sort((a, b) => {

      let date1 = moment(a.timestamp, "HH:mm D-M-YYYY");
      let date2 = moment(b.timestamp, "HH:mm D-M-YYYY");


      if (date1.isAfter(date2))
        return 1
      else if (date1.isSame(date2))
        return 0

      else -1
    })
  }



  getUsers() {

    this.firebaseService.getRequestUsers('-KcF-tBV05Gt9bi-j0-_')
      .subscribe((data) => {



        this.users = [];
        let i = 0;
        data.forEach(requestUser => {


          if (requestUser.isApproved == 0)
            this.firebaseService.getUser(requestUser.$key)
              .subscribe((user) => {

                user.id = user.$key;

                user.timestamp = requestUser.timestamp;

                this.users.push(<UserModel>user);


                if (i == data.length - 1 && this.users.length == 0)
                  this.noData = true;
                else
                  this.noData = false;

                
                  this.sortEventsByDate();

                i++;

              });


                if (i == data.length - 1 && this.users.length == 0)
                  this.noData = true;
                else
                  this.noData = false;

                i++;



        });




      })

  }

}
