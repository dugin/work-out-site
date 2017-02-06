import { AdminModel } from './../model/admin';
import { Observable, Observer } from 'rxjs/Rx';
import { CorporateModel } from './../model/corporate';
import { Injectable, Inject } from '@angular/core';
import { FirebaseApp, AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class FirebaseService {

  sports: FirebaseListObservable<any[]>;

  admin : FirebaseObjectObservable<any>;

  constructor(
    @Inject(FirebaseApp) public firebaseApp: firebase.app.App,
    public af: AngularFire
  ) {

    this.getSports();
  }

  getAdmin(corporateID: string, adminID: string) {
    this.admin = this.af.database.object('corporate/' + corporateID + '/admins/' + adminID);
    return this.admin;
  }

  updateAdmin(admin: any){
    return  this.admin.update(admin);
  }

  pushAdmin(admin: any){
    return  this.af.database.list('admins')
      .push(admin);
  }

  getCorporateName(corporateID: string) {
    return this.af.database.object('corporate/' + corporateID + '/name');
  }

  createUserWithEmailAndPassword(email: string, password: string) {

    return this.firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  }

  uploadAdminProfilePic(imgFile: File, corporateName: string, adminName: string): Observable<string> {



    let uploadTask = this.firebaseApp.storage()
      .ref()
      .child('admin/')
      .child(this.setFileName(corporateName) + '/')
      .child(this.setFileName(adminName))
      .put(imgFile);

    return new Observable<string>((observer: Observer<string>) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null,
        (error) => {
          console.log(error);

          observer.error(error);

        }, () => {
          observer.next(uploadTask.snapshot.downloadURL);

        })
    })

  }


  private getSports() {

    this.sports = this.af.database.list('sports');

  }

   pushCorporate(corporate: CorporateModel) {

    return this.af.database.list('corporate')
      .push(corporate)

  }

  uploadFile(corporateName: string, imgFile: File, isLogo: boolean): Observable<string> {
    console.log(this.setFileName(corporateName));


    let uploadTask = this.firebaseApp.storage()
      .ref()
      .child('corporate/')
      .child(this.setFileName(corporateName) + '/')
      .child(isLogo ? 'logo' : 'banner')
      .put(imgFile);

    return new Observable<string>((observer: Observer<string>) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null,
        (error) => {
          console.log(error);

          observer.error(error);

        }, () => {
          observer.next(uploadTask.snapshot.downloadURL);

        })
    })

  }

  private setFileName(corporateName: string): string {

    return corporateName.replace(/\s+/g, '').replace(/\//g, "-").toLowerCase();
  }



}
