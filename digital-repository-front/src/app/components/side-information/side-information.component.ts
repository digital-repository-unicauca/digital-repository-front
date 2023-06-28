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
  contract:Contract= new Contract(0)
  idContract:number=1
  activeMenu = false;
  constructor(
    private contractService:ContractService
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
      console.log(response)
      this.contract= response.data;
      console.log(this.idContract,this.contract)
    });

  }

}
