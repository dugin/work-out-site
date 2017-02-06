import { AdminModel } from './../../model/admin';
import { SportsModel } from './../../model/sports';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { MaskUtil } from '../../util/mask.util';
import { CepService } from '../../services/cep.service';
import { CorporateModel } from '../../model/corporate';
import { AddressModel } from '../../model/address';
import { WeekModel } from '../../model/time';
import { TimeModel } from '../../model/time';
import { MaterializeAction } from 'angular2-materialize';

declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public CNPJmask = MaskUtil.getCNPJ();
  public CEPmask = MaskUtil.getCEP();
  public Timemask = MaskUtil.getTime();

  isError: boolean;
  modalActions = new EventEmitter<string | MaterializeAction>();
  logoPath: string;
  bannerPath: string;
  corporate: CorporateModel = new CorporateModel();
  isSportsSelected: boolean;
  sports: Array<any>;
  departaments = new Array<{ value: '' }>();
  logoFile: File;
  bannerFile: File;


  showCepLoading: boolean;
  focusFields = new Array<boolean>(6);

  constructor(
    public registerService: RegisterService,
    public cepService: CepService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {

    this.initializeObj();

    this.firebaseService.sports.subscribe((arr) => {
      this.sports = arr;
    })


  }

  onSportChecked(i) {

    if (this.sports[i].isChecked)
      this.sports[i].isChecked = false;

    else
      this.sports[i].isChecked = true;

  }
  change(event) {
    console.log(event);


  }

  initializeObj() {


    this.focusFields = this.focusFields.fill(false);
    this.departaments.push({ value: '' });

    this.corporate.schedule.push(new WeekModel('Segunda', 'seg', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Terça', 'ter', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Quarta', 'qua', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Quinta', 'qui', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Sexta', 'sex', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Sábado', 'sab', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Domingo', 'dom', new Array<TimeModel>()));

    this.corporate.admins.push(new AdminModel());


  }

  onNewTime(i: number) {

    this.corporate.schedule[i].time.push(new TimeModel());

  }
  onNewAdmin() {
    this.corporate.admins.push(new AdminModel());
  }

  onNewDepartament() {
    this.departaments.push({ value: '' });
  }

  getLogo(event) {

    this.getFile(event, true)

  }

  getFile(event, isLogoPath: boolean) {

    if (isLogoPath)
      this.logoFile = event.srcElement.files[0];
    else
      this.bannerFile = event.srcElement.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {

      if (isLogoPath)
        this.logoPath = e.target.result;
      else
        this.bannerPath = e.target.result;
    };

    reader.readAsDataURL(event.srcElement.files[0]);

  }

  getBanner(event) {

    this.getFile(event, false)

  }

  onCEPChange(event: string) {

    this.corporate.address.zipCode = event;


    if (this.lastCharIsNumber())
      this.getCep();


  }

  lastCharIsNumber() {

    return !isNaN(parseInt(this.corporate.address.zipCode.charAt(this.corporate.address.zipCode.length - 1), 10))
  }

  focus() {

    for (let i = 0; i < this.focusFields.length; i++)
      setTimeout(() => {

        this.focusFields[i] = true;

      }, i * 100)
  }

  getCep() {

    this.showCepLoading = true;

    this.cepService.getCep(this.corporate.address.zipCode)
      .subscribe((addressModel) => {

        this.corporate.address = addressModel;

        this.showCepLoading = false;
        this.focus();


      })
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }


  onSubmit() {

    this.sports.forEach(sport => {

      if (sport.isChecked)
        this.corporate.sports.push(new SportsModel(sport.icon, sport.image, sport.name, null, sport.$key ));
    });

    this.departaments.forEach(dpt => {
      this.corporate.departaments.push(dpt.value)
    });


    this.firebaseService.uploadFile(this.corporate.name, this.logoFile, true)
      .subscribe((downloadURL) => {

        this.corporate.logo = downloadURL

        this.firebaseService.uploadFile(this.corporate.name, this.bannerFile, false)
          .subscribe((downloadURL) => {

            this.corporate.image = downloadURL;
            console.dir(this.corporate)
            this.firebaseService.pushCorporate(this.corporate)
              .then((resolve) => {
                this.isError = false;
                this.openModal()

              },
              (reject) => {
                this.isError = true;
                this.openModal()


              })
          })

      })


  }




}
