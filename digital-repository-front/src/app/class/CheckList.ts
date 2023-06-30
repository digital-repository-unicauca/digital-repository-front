import { ContractualDocumentType } from "./ContractualDocumentType";
import { Fila } from "./models/Fila";

export class CheckList {
  id!: number;
  description!: string;
  isRequired!: boolean;
  subdirectory!: string;
  ordering!: number;
  createTime!: string;
  createUser!: string;
  contractualDocumentType!: ContractualDocumentType;
  modalityContractType!: number;
  filas: Fila[]= [];

}
