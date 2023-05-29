import { Component,OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Contact } from 'lucide-angular';
import { Contract } from 'src/app/modules/contract/contract';
import { ContractService } from 'src/app/shared/services/contract.service';
@Component({
  selector: 'app-side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css'],

})

export class SideInformationComponent implements OnInit {
  panelOpenState = false;
  contract:Contract []=[];
  response:Response[]=[];
  constructor(private service:ContractService){}

  ngOnInit(): void {

    this.getContract();
  }

  
  async getContract(){
 
    var id = JSON.parse(localStorage.getItem('id') || '1');
    (await this.service.getContract(id)).subscribe((response) => {;
      this.contract= response.data;
    });
    console.log(id)
  }
 
}
