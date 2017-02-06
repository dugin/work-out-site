import { Router, ActivatedRoute } from '@angular/router';
import { AdminModel } from './../../model/admin';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';


@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  admin: AdminModel = new AdminModel();
  profilePicPath: string;
  profilePicFile: File;
  adminID: string;
  corporateID: string;
  corporateName: string;


  isError: boolean;
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

  }




  ngOnInit() {
    this.fetchIDs();

  }



  fetchIDs() {

    this.activatedRoute.params.subscribe((p) => {

      let param: string = p['id'];
      
      console.log(param);
      

      if (param == null) {
        this.router.navigateByUrl('main');
      }

     
        this.adminID = param.substring(0, param.indexOf('-'));
        this.corporateID = param.substring(param.indexOf('-'));

        this.getAdminFromFirebase();
        this.getCorporateName();

      

    })




  }

  getCorporateName() {

    this.firebaseService.getCorporateName(this.corporateID)
      .subscribe((data) => this.corporateName = data.$value)

  }

  getAdminFromFirebase() {

    this.firebaseService.getAdmin(this.corporateID, this.adminID)
      .subscribe((data) => {

        if(!data.$exists())
           this.router.navigateByUrl('main');
        

        this.admin.email = data.email;
        this.admin.permission = data.permission;
        this.admin.corporateID = this.corporateID;

        console.log(data);


      })

  }

  onRegister() {

    this.firebaseService.createUserWithEmailAndPassword(this.admin.email, this.admin.password)
      .then((success) => {
        console.log(success);

        this.firebaseService.uploadAdminProfilePic(this.profilePicFile, this.corporateName, this.admin.name)
          .subscribe((imgURL) => {

            this.admin.profilePic = imgURL;

            this.firebaseService.updateAdmin(this.admin)
              .then((resolve) => {

                this.firebaseService.pushAdmin(this.admin)
                  .then(success => {

                    console.log(success);
                    this.isError = false;
                    this.openModal();

                  })
                  .catch(err => {
                    this.isError = true;
                    this.openModal();

                  })
              })
              .catch(err => {
                this.isError = true;
                this.openModal();

              })

          },
          (err => {
            this.isError = true;
            this.openModal();
          }))

      })
      .catch(err => {
        this.isError = true;
        this.openModal();

      })

  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  getLogo(event) {

    this.getFile(event)

  }


  getFile(event) {

    this.profilePicFile = event.srcElement.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {

      console.log(e);


      this.profilePicPath = e.target.result;

    };

    reader.readAsDataURL(this.profilePicFile);

  }

}
