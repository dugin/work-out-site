export class WeekModel {


    constructor(
        public weekDay: string,
        public weekDay_short: string,
        public time: Array<TimeModel>


    ) { }
}

export class TimeModel {

    public start: string;
    public end: string

    constructor(
    ) { 
        this.init();
        }

    init() {
        this.start = '';
        this.end = '';
    }
}