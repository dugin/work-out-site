import { UserModel } from './user';
import { SportsModel } from './sports';
import { AddressModel } from './address';
export class EventsModel {

    public name: string;
    public date: string;
    public time: { start: string, end: string };
    public place: string;
    public description: string;
    public participants: { min: number, max: number };
    public isHappening: boolean;
    public address: AddressModel;
    public sport: SportsModel;
    public users: Array<UserModel>;
    public corporateID: string;
    

    constructor() {
        this.init();
    }

    init() {

        this.name = ''
        this.date = ''
        this.time = { start: '', end: '' };
        this.place = ''
        this.description = ''
        this.participants = { min: null, max: null };
        this.isHappening = true;
        this.address = new AddressModel();
        this.sport = new SportsModel()
        this.users = new Array<UserModel>();
        this.corporateID = '';

    }

}
