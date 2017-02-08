import { UserModel } from './../../model/user';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';



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
  ) { }

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



  getUsers() {

    this.firebaseService.getRequestUsers('-KcF-tBV05Gt9bi-j0-_')
      .subscribe((data) => {

        console.log(data);


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
