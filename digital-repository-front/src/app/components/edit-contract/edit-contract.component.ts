import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/class/contract';
import { ContractService } from 'src/app/services/contract.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { responseDocument } from 'src/app/class/models/responseDocument';
import { UpdateContract } from 'src/app/class/models/UpdateContract';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent {
  initialDate:Date = new Date();
  endDate:Date = new Date();
  contract:Contract= new Contract();
  updateContract:UpdateContract= new UpdateContract();
  response:responseDocument=new responseDocument();
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
      Subject:[{value: ''}, Validators.required],
      
      ncVendor: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
      ncSubject: ['', Validators.required],
      ncInitialDate: ['', Validators.required],
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
      //console.log(response)
      this.contract= response.data;
      //console.log(this.idContract,this.contract)
      
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
      Subject: this.contract.subject
    });
    if(this.contract.status=='ACTIVO'){
      this.isChecked=true;

    }else{
      this.isChecked=false;
    }
  }

  public fillContract(){
    this.updateContract.reference = this.contract.reference;
    //this.contract.vendor = null;
    this.updateContract.id=this.contract.id;
    this.initialDate = new Date(this.myForm.value.DateExp);
    this.endDate=new Date(this.myForm.value.DateEnd);
    this.updateContract.finalDate=this.endDate;
    this.updateContract.initialDate=this.initialDate;
    this.updateContract.subject=this.myForm.value.Subject;
    if(this.isChecked){
      this.updateContract.status= 'ACTVIO'
    }else{
      this.updateContract.status= 'INACTIVO'
    }
    //console.log('estado contrato' + this. updateContract.status);
  }

  async submitFormulario() {
    this.fillContract();
      //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
   await new Promise(f => setTimeout(f, 1000));
    console.log(this.updateContract);

  this.contractService.update(this.updateContract).subscribe((res) => {
    console.log(res);
    this.response.status=res.status;
    this.response.data=res.data;
    }
  );
   console.log(this.response.status)

    if (this.response.status==200) {
      alert('Peticion actualizar  correctamente');
    } else {
      alert('No se pudo actualizar la peticion');
    }
  }

}
