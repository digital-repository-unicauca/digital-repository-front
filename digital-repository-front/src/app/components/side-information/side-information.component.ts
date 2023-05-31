import { Component,OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Contact } from 'lucide-angular';
import { Contract } from 'src/app/class/contract';
import { ContractService } from 'src/app/services/contract.service';
@Component({
  selector: 'app-side-information',
  templateUrl: './side-information.component.html',
  styleUrls: ['./side-information.component.css'],

})

export class SideInformationComponent implements OnInit {
  panelOpenState = false;
  // contract:Contract[] =[];
  contract:Contract= new Contract()
  response:Response[]=[];
  constructor(private service:ContractService){}

  ngOnInit(): void {

    this.getContract();


  }


   getContract(){

    var id = JSON.parse(localStorage.getItem('id') || '1');
    this.service.getContract(id).subscribe((response) => {;
      console.log(response)
      this.contract= response.data;
      console.log(id,this.contract)
    });

  }

}
