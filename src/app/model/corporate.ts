import { AddressModel } from './address';
import { WeekModel } from './time';

export class CorporateModel {

    constructor(
        public name: string,
        public cnpj: string,
        public employeeAmount: number,
        public logoURL: string,
        public bannerURL: string,
        public address: AddressModel,
        public departaments: Array<string>,
        public admins: Array<string>,
        public schedule: Array<WeekModel>,
    ) { }
}
