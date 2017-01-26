import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { MaskUtil } from '../../util/mask.util';
import { CepService } from '../../services/cep.service';
import { CorporateModel } from '../../model/corporate';
import { AddressModel } from '../../model/address';
import { WeekModel } from '../../model/time';
import { TimeModel } from '../../model/time';
declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public CNPJmask = MaskUtil.getCNPJ();
  public CEPmask = MaskUtil.getCEP();
  public Timemask = MaskUtil.getTime();

  logoPath: string;
  bannerPath: string;
  corporate: CorporateModel;

  showCepLoading: boolean;
  focusFields = new Array<boolean>(6);

  constructor(
    public registerService: RegisterService,
    public cepService: CepService
  ) { }

  ngOnInit() {

    this.initializeObj();
  }


  initializeObj() {

    this.corporate = new CorporateModel('', '', null, '', '', new AddressModel('', '', null, '', '', '', '', ''), new Array<string>(), new Array<string>(), new Array<WeekModel>());
    this.focusFields = this.focusFields.fill(false);

    this.corporate.schedule.push(new WeekModel('Segunda', 'seg', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Terça', 'ter', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Quarta', 'qua', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Quinta', 'qui', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Sexta', 'sex', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Sábado', 'sab', new Array<TimeModel>()));
    this.corporate.schedule.push(new WeekModel('Domingo', 'dom', new Array<TimeModel>()));

    this.corporate.departaments.push('');
    this.corporate.admins.push('');


  }

  getLogo(event) {


    let reader = new FileReader();

    reader.onload = (e: any) => {

      this.logoPath = e.target.result;
    };

    reader.readAsDataURL(event.srcElement.files[0]);


  }

  getBanner(event) {
    let reader = new FileReader();

    reader.onload = (e: any) => {

      this.bannerPath = e.target.result;
    };

    reader.readAsDataURL(event.srcElement.files[0]);

  }

  onCEPChange(event: string) {

    this.corporate.address.cep = event;


    if (this.lastCharIsNumber())
      this.getCep();


  }

  lastCharIsNumber() {

    return !isNaN(parseInt(this.corporate.address.cep.charAt(this.corporate.address.cep.length - 1), 10))
  }

  focus() {

    for (let i = 0; i < this.focusFields.length; i++)
      setTimeout(() => {

        this.focusFields[i] = true;

      }, i * 100)
  }

  getCep() {

    this.showCepLoading = true;

    this.cepService.getCep(this.corporate.address.cep)
      .subscribe((addressModel) => {

        this.corporate.address = addressModel;

        this.showCepLoading = false;
        this.focus();


      })
  }


}
