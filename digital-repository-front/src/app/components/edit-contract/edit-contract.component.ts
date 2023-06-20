import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/class/contract';
import { ContractService } from 'src/app/services/contract.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent {
  
  contract:Contract= new Contract()
  idContract:number=1
  activeMenu = false;
  myForm!: FormGroup;
  pipe: DatePipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  isChecked = true;
  status!:string;
  constructor(
    private contractService:ContractService, private fb: FormBuilder,
    ){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      radicado:[{value: '', disabled: true}, Validators.required],
      idVendor: [{value: ''}, Validators.required],
      DateExp: [{value: '',}, Validators.required],
      DateEnd: [{value: ''}, Validators.required],
      
    });
    //
    if(this.isChecked){
      this.status="Habilitado"
    }else{
      this.status="Inhabilitado"
    }

  console.log(this.myForm.controls)
    this.contractService.cart$.subscribe(idContract =>{
      this.idContract= idContract
      this.getContract();
      this.fillForm();
    })
  
  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  //
  onToggleChange(event: MatSlideToggleChange) {
    this.isChecked = event.checked;
    if(this.isChecked){
      this.status="Habilitado"
    }else{
      this.status="Inhabilitado"
    }
    console.log(this.isChecked)
  }

   async getContract(){

    //var id = JSON.parse(localStorage.getItem('id') || '1');
    this.contractService.getContract(this.idContract).subscribe((response) => {;
      console.log(response)
      this.contract= response.data;
      console.log(this.idContract,this.contract)
      
    });
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));
  }

  async fillForm(){
      //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));
    //Llena los campos del formulario de fechas
    this.todayWithPipe = this.pipe.transform(this.contract.finalDate, 'yyyy-MM-dd');
    this.myForm.patchValue({ DateEnd: this.todayWithPipe });
    this.todayWithPipe = this.pipe.transform(this.contract.initialDate, 'yyyy-MM-dd');
console.log(this.todayWithPipe)
    this.myForm.patchValue({
      radicado: this.contract.reference, 
      idVendor: this.contract.vendor,
      DateExp: this.todayWithPipe,
    });
  }

  public llenarEntidad(){
    this.contract.reference = this.myForm.value.radicado;
    this.contract.vendor = this.myForm.value.vendor;
    this.contract.finalDate=this.myForm.value.DateEnd;
    this.contract.initialDate=this.myForm.value.DateExp;
  }
}
