import { Component,OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Contact } from 'lucide-angular';
import { CheckList } from 'src/app/class/CheckList';
import { Contract } from 'src/app/class/contract';
import { ResultItem } from 'src/app/class/models/ResultItem';
import { ContractService } from 'src/app/services/contract.service';
import { DocumentService } from 'src/app/services/document.service';
import { SideInformationDocumentsService } from 'src/app/services/side-information-documents.service';

@Component({
  selector: 'app-side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css'],

})

export class SideInformationComponent implements OnInit {
  panelOpenState = false;
  contract:Contract= new Contract(0)
  idContract:number=1
  activeMenu = false;
  checklist: CheckList[] = [];
  precontractualDocumentList=[]
  documentsList:ResultItem[]=[];
  precontractualDocuments:ResultItem[]=[];
  contractualDocuments:ResultItem[]=[];
  postcontractualDocuments:ResultItem[]=[];
  constructor(
    private contractService:ContractService,
    private documentService:DocumentService,
    private sideInformationDocumentService: SideInformationDocumentsService
    ){}

  ngOnInit(): void {


    this.contractService.cart$.subscribe(idContract =>{
      this.idContract= idContract
      this.getContract();
    })

  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getContract(){

    //var id = JSON.parse(localStorage.getItem('id') || '1');
    this.contractService.getContract(this.idContract).subscribe((response) => {;
      this.contract= response.data;
      this.getChecklist(this.contract.modalityContractType)
      console.log("sideInformation",this.idContract,this.contract)
    });

  }

  getChecklist(idModalityContractType:number){
    this.documentService.getCheckList(idModalityContractType).subscribe((response) => {
        this.checklist = response.data as CheckList[];
        console.log("checklist ", this.checklist)
        this.documentsList= this.sideInformationDocumentService.getDocumentsChecklist(this.checklist,this.contract.collections)
        this.precontractualDocuments = this.documentsList.filter(item => item.subdirectory === '0')
        this.contractualDocuments = this.documentsList.filter(item => item.subdirectory === '1')
        this.postcontractualDocuments = this.documentsList.filter(item => item.subdirectory === '2')
      });
  }

}
