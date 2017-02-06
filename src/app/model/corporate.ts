import { AdminModel } from './admin';
import { SportsModel } from './sports';
import { AddressModel } from './address';
import { WeekModel } from './time';

export class CorporateModel {
    public name: string;
    public CNPJ: string;
    public numEmployees: number;
    public logo: string;
    public image: string;
    public address: AddressModel;
    public departaments: Array<string>;
    public admins: Array<AdminModel>;
    public schedule: Array<WeekModel>;
    public sports: Array<SportsModel>;


    constructor(

    ) {
        this.init();
    }


    init() {
        this.name = ''
        this.CNPJ = ''
        this.numEmployees = null
        this.logo = ''
        this.image = ''
        this.address = new AddressModel();
        this.departaments = new Array<string>();
        this.admins = new Array<AdminModel>();
        this.schedule = new Array<WeekModel>();
        this.sports = new Array<SportsModel>();
    }
}
