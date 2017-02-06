export class AdminModel {

    public email: string;
    public permission: string;
    public name: string;
    public password: string;
    public profilePic: string;
    
    public corporateID: string;


    constructor(

    ) {

        this.init()
    }

    init() {

        this.email = '';
        this.permission = '';
        this.name = '';
        this.password = '';
        
        this.corporateID = '';
        this.profilePic = '';

    }
}