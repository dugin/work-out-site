export class SportsModel {

    constructor(
        public icon: string,
        public image: string,
        public name: string,
        public isChecked: boolean,
        public id: string
    ){
        isChecked = false;
    }
}
