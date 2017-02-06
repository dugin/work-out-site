export class AddressModel {

    public zipCode: string;
    public street: string;
    public number: number;
    public complement: string;
    public neighborhood: string;
    public city: string;
    public state: string;
    public country: string;
    public cordinates: { lat: number; lon: number }

    constructor(
    ) {
        this.init();
    }

    init() {

        this.zipCode = '';
        this.street = '';
        this.number = null;
        this.complement = '';
        this.neighborhood = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.cordinates = { lat: null, lon: null };


    }
}