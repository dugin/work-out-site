import { UserModel } from './../../../model/user';
import { SportsModel } from './../../../model/sports';
import { FirebaseService } from './../../../services/firebase.service';
import { EventsModel } from './../../../model/events';
import { AddressModel } from './../../../model/address';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { MaskUtil } from '../../../util/mask.util';
import { CepService } from '../../../services/cep.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
declare var $: any;
import * as _ from "lodash";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  focusFields = new Array<boolean>(6);

  corporateID = '-KcF-tBV05Gt9bi-j0-_';



  isNewEvent: boolean = true;

  showCepLoading: boolean;
  public CEPmask = MaskUtil.getCEP();
  public timeMask = MaskUtil.getTime();
  dateOptions = this.getDefaultPickaDateOption();
  sports = new Array<SportsModel>();
  sportID: number;
  weekDay = '';
  event = new EventsModel();
  events = new Array<EventsModel>();
  noDate = false;
  isHappeningCount: number;

  usersID = new Array<string[]>();

  constructor(
    public cepService: CepService,
    public firebaseService: FirebaseService,
    public sanitizer: DomSanitizer,
  ) {
    moment.locale('pt-BR');
  }


  ngOnInit() {

    this.getCorporateSports();
    this.getEvents();


  }



  getCorporateSports() {
    this.firebaseService.getCorporateSports(this.corporateID)
      .subscribe((data) => {


        this.sports = data;
      });


  }


  onCancelEvent(eventKey: string) {

    this.setCanceledEvent(eventKey)

  }

  setCanceledEvent(eventKey: string) {

    this.firebaseService.setEventCanceled(this.corporateID, eventKey, false)

  }


  getEvents() {
    this.firebaseService.getEvent(this.corporateID)
      .subscribe((data) => {



        this.events = data;

        this.sortEventsByDate();

        this.getUsersInEvent();
      })


  }

  sortEventsByDate() {
    return this.events.sort((a, b) => {

      let date1 = moment(a.date, "DD MMMM, YYYY HH'h'mm");
      let date2 = moment(b.date, "DD MMMM, YYYY HH'h'mm");

      if (date1.isAfter(date2))
        return 1
      else if (date1.isSame(date2))
        return 0

      else -1
    })
  }

  getUsersInEvent() {

    let clear = true;

    this.usersID = new Array<string[]>();
    this.isHappeningCount = 0;

    this.events.forEach((event, i) => {

      if (event.isHappening)
        this.isHappeningCount++;


      if (event.users)
        this.usersID.push(_.cloneDeep(<any[]>event.users));
      else
        this.usersID[i] = new Array<string>();


      if (clear)
        event.users = new Array<UserModel>()
      else
        clear = false;

      this.usersID[i] = this.usersID[i].filter((element) => {
        return element !== undefined;
      });

      this.usersID[i].forEach(userID => {

        this.firebaseService.getUser(userID)
          .subscribe((user) => {

            event.users.push(user);

          })

      });




    });






  }



  private getDefaultPickaDateOption() {
    return {
      monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      formatSubmit: 'dd/mm/yyyy',
      today: 'Hoje',
      clear: 'Limpar',
      close: 'Fechar',
      closeOnSelect: true,
      showMonthsShort: true
    };
  }
  onCEPChange(event: string) {

    this.event.address.zipCode = event;


    if (this.lastCharIsNumber())
      this.getCep();


  }
  lastCharIsNumber() {

    return !isNaN(parseInt(this.event.address.zipCode.charAt(this.event.address.zipCode.length - 1), 10))
  }
  focus() {

    for (let i = 0; i < this.focusFields.length; i++)
      setTimeout(() => {

        this.focusFields[i] = true;

      }, i * 100)
  }

  getCep() {

    this.showCepLoading = true;

    this.cepService.getCep(this.event.address.zipCode)
      .subscribe((addressModel) => {

        this.event.address = addressModel;

        this.showCepLoading = false;
        this.focus();


      })
  }

  onCloseFilter() {

  }

  onHelper() {

    this.isNewEvent = false;
  }

  onNewEvent() {
    this.isNewEvent = true;

  }

  onDatePickerChange(event) {
    this.weekDay = moment(event, "DD MMMM, YYYY").format('ddd');


  }

  setSportModel() {

    this.event.sport.icon = this.sports[this.sportID].icon;
    this.event.sport.image = this.sports[this.sportID].image;
    this.event.sport.name = this.sports[this.sportID].name;
    this.event.sport.id = this.sports[this.sportID].id;


  }

  onCreateEvent() {



    this.setSportModel();

    this.firebaseService.pushEvent(this.corporateID, this.event)
      .then((resolve) => {

        this.event = new EventsModel();


      })

  }



}
