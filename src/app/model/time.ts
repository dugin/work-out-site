export class WeekModel {


    constructor(
        public weekDay: string,
        public weekDay_short: string,
        public time: Array<TimeModel>


    ) { }
}

export class TimeModel {

     constructor(
      
        public ini: string,
        public fim: string


    ) { }
}