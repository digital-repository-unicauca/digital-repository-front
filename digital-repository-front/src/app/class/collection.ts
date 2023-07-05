import { ContractualDocumentType } from "./ContractualDocumentType";
import { Fila } from "./models/Fila";

export class Collection {
  contractId !:number| null ;
  contractualDocumentId !:number | null;
  createTime !: Date | null;
  createUser !: string | null;
  documents !: Fila[] ;
  id !: number;
  localRequerid !: boolean;
  updateTime !: Date | null
  updateUser !: string | null;

  // constructor(id:Number, contractId:Number, isLocalRequerid:Boolean, createUser:String){
  //   this.id = id;
  //   this.contractId=contractId;
  //   this.isLocalRequerid = isLocalRequerid;
  //   this.createUser= createUser;
  // }
}
