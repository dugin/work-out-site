import { WeekModel } from './time';
import { SportsModel } from './sports';

export class UserModel{
    public id: string;
    public name: string;
    public emailCorporate: string;
    public role: string;
    public profilePic: string;
    public height: number;
    public weight: number;
    public bmi: number;
    public frequency: number;
    public points: number;
    public departament: string;
    public sports: Array<SportsModel>;
    public schedules: Array<WeekModel>;
    public corporateID: string;
    public timestamp? : string;

    constructor(){

    }

    
}