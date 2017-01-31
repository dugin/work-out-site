import { Injectable, Inject } from '@angular/core';
import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class FirebaseService {

  sports: FirebaseListObservable<any[]>;

  constructor(
    @Inject(FirebaseApp) public firebaseApp: firebase.app.App,
    public af: AngularFire
  ) {

    this.getSports();
  }


  private getSports() {

    this.sports = this.af.database.list('sports');

  }

}
