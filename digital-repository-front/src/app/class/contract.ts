import { Collection } from "./collection";

export class Contract {
    id!: number;
    reference!: String;
    singinDate!: Date | null;
    initialDate!: Date | null;
    finalDate!: Date | null;
    status!: String;
    subject !: String;
    vendor: String = "";
    modalityId !: number;
    contractTypeId !: number;
    modalityContractType!:number;
    collections!:Collection[] | [];

    constructor(idContract :number){
      this.id=idContract;
    }

}
