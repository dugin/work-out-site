export class SportsModel {

        public icon: string;
        public image: string;
        public name: string;
        public isChecked: boolean;
        public id: string;

    constructor(
      
    ){
      this.init() 
    }


    init(){

         this.isChecked = false;
         this.icon = '';
         this.name = '';
         this.image= '';
         this.id = '';

    }
}
