import { AddressModel } from './../../../model/address';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { MaskUtil } from '../../../util/mask.util';
import { CepService } from '../../../services/cep.service';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  focusFields = new Array<boolean>(6);
 showCepLoading: boolean;
   public CEPmask = MaskUtil.getCEP();
  dateOptions = this.getDefaultPickaDateOption();
  address = new AddressModel('','',null,'','','','','');  
  constructor(
      public cepService: CepService,
  ) { }

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

    this.address.cep = event;


    if (this.lastCharIsNumber())
      this.getCep();


  }
   lastCharIsNumber() {

    return !isNaN(parseInt(this.address.cep.charAt(this.address.cep.length - 1), 10))
  }
   focus() {

    for (let i = 0; i < this.focusFields.length; i++)
      setTimeout(() => {

        this.focusFields[i] = true;

      }, i * 100)
  }

  getCep() {

    this.showCepLoading = true;

    this.cepService.getCep(this.address.cep)
      .subscribe((addressModel) => {

        this.address = addressModel;

        this.showCepLoading = false;
        this.focus();


      })
  }


  ngOnInit() {
   
  }

}
