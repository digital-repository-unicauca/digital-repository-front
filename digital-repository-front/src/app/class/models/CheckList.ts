import { Fila } from "./Fila";

export class CheckList {
  id!: number;
  description!: string;
  isRequired!: boolean;
  subdirectory!: string;
  ordering!: number;
  createTime!: string;
  createUser!: string;
  contractualDocumentType!: {
    id: number;
    name: string;
    description: string;
    createTime: string;
    createUser: string;
  };
  modalityContractType!: number;
  filas: Fila[]= [];

}
