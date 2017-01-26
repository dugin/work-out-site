export class AddressModel {

    constructor(
        public cep: string,
        public street: string,
        public number: number,
        public complement: string,
        public neighbor: string,
        public city: string,
        public state: string,
        public country: string
       
    ){}
}