export class PieChartFilterModel{


    constructor(
        public gender: string,
        public IMC: string,
        public departament: string,
        public ageRange: Array<number>
    ){}
}