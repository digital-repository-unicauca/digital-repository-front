import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { ContractService } from 'src/app/shared/services/contract.service';

@Component({
  selector: 'app-searc-contracts',
  templateUrl: './searc-contracts.component.html',
  styleUrls: ['./searc-contracts.component.css']
})
export class SearcContractsComponent implements OnInit {

  contracts:PeriodicElement[]=[];

  constructor(
    private contractService:ContractService
  )
  {}
  ngOnInit(): void {
    //this.getAllContracts()
    // this.contractService.getAll(0,10).subscribe((response) => {
    //   console.log("Del servicio ",response)
    //   this.contracts = response.data

    // })
  }

  getAllContracts(){
    this.contractService.getAll(0,10).subscribe((response) => {
      console.log("Del servicio ",response)
      this.contracts = response.data.data

    })
  }
}
