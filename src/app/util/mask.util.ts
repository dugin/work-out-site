export class MaskUtil {

    constructor(){}

   public static getCNPJ(){
        return [ /[1-9]/, /\d/,  '.',   /\d/, /\d/, /\d/, '.', /\d/,/\d/, /\d/,'/' , /\d/,/\d/, /\d/,/\d/,'-', /\d/, /\d/]

    }


    public static getCEP(){
        return [ /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/,/\d/, /\d/]

    }

     public static getTime(){
        return [ /[1-9]/, /\d/, 'h', /\d/,/\d/]

    }
}