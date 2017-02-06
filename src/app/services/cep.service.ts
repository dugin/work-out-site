import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CepModel } from '../model/cep'
import {AddressModel} from '../model/address';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class CepService {

  private cepUrl = 'https://viacep.com.br/ws/';

  constructor(private http: Http) { }


  getCep(cep: string): Observable<AddressModel> {

    // ...using get request
    return this.http.get(this.cepUrl + '' + cep + '/json/')
      // ...and calling .json() on the response to return data
      .map((res: Response) => this.cepToAddress(res.json()))
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  private cepToAddress(cep: CepModel){

   let address =  new AddressModel();

   address.city =cep.localidade;
   address.country = 'Brasil';
   address.neighborhood = cep.bairro;
   address.state =  cep.uf;
   address.street = cep.logradouro;
   address.zipCode = cep.cep;

   return address;
  }


}
