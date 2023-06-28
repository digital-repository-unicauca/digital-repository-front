export class Collection{
  id: Number | null = new Number();
  contractId: Number = new Number();
  isLocalRequerid: Boolean = new Boolean();
  createUser : String = new String();

  constructor(id:Number, contractId:Number, isLocalRequerid:Boolean, createUser:String){
    this.id = id;
    this.contractId=contractId;
    this.isLocalRequerid = isLocalRequerid;
    this.createUser= createUser;
  }
}
