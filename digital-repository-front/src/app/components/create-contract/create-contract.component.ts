import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContractType } from 'src/app/class/models/ContractType';
import { Modality } from 'src/app/class/models/Modality';
import { ContractService } from 'src/app/services/contract.service';
import { Contract } from 'src/app/class/contract';
import { DatePipe } from '@angular/common';
import { modalityContractType } from 'src/app/class/models/ModalityContractType';
import { MatStepper } from '@angular/material/stepper';
import { Fila } from 'src/app/class/models/Fila';
import { CheckList } from 'src/app/class/CheckList';

import { ToastrService } from 'ngx-toastr';
import { responseDocument } from 'src/app/class/models/responseDocument';

export class directorys {
  name!: string;
  subdirectory!: string;
}

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;


  myForm: FormGroup = new FormGroup({});
  Spqr: string | undefined;
  radicado!: String;
  rad!: String;

  pipe = new DatePipe('en-US');
  contractsType: ContractType[] = [];
  modalityContractType: modalityContractType[] = [];
  modalityTypes: Modality[] = [];

  newContract: Contract = new Contract(0);
  response: responseDocument = new responseDocument();

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private toastrSvc: ToastrService
  ) {}

  ngOnInit() {
    this.loadContractType();
    this.loadModalityType();

    this.buildForm();

    this.Spqr = this.myForm.value.traOficioNum;

    this.newContract = new Contract(0);

  }

  buildForm(){
    this.myForm = this.fb.group({
      //ncRadicado: ['', Validators.required],
      ncInitialDate: ['', Validators.required],
      //(/^\w+$/)             Expresion regular que permite numeros y letras sin espacios
      ncNroContract: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.max(9999),
          Validators.min(1),
        ]),
      ],
      ncContractType: ['', Validators.required],
      ncModalityType: ['', Validators.required],
      ncVendor: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
      ncSubject: ['', Validators.required],
    });


  }




  public loadModalityContractType() {
    this.contractService
      .getModalityContractType(
        this.newContract.contractTypeId,
        this.newContract.modalityId
      )
      .subscribe((response) => {
        console.log('Del servicio ', response);
        this.modalityContractType = response.data.data as modalityContractType[];
      });
  }
  //method return 1 Modality
  public loadModalityType() {
    this.contractService.getModalityType().subscribe((response) => {
      console.log('Del servicio tipos modalidad ', response);
      this.modalityTypes = response.data.data as Modality[];
    });
  }
  //method return 1 ContractType
  public loadContractType() {
    this.contractService.getContractType().subscribe((response) => {
      console.log('Del servicio tipos contracto', response);
      this.contractsType = response.data.data as ContractType[];
    });
  }

  public loadRadicado() {
    return (this.radicado =
      '5.5-31.' +
      this.myForm.value.ncContractType +
      '/' +
      this.myForm.value.ncNroContract);
  }

  //Form field validation create contract
  get ncNroContractInvalid() {
    return (
      this.myForm.get('ncNroContract')?.invalid &&
      this.myForm.get('ncNroContract')?.touched
    );
  }

  get ncInitialDateInvalid() {
    return (
      this.myForm.get('ncInitialDate')?.invalid &&
      this.myForm.get('ncInitialDate')?.touched
    );
  }

  get ncContractTypeInvalid() {
    return (
      this.myForm.get('ncContractType')?.invalid &&
      this.myForm.get('ncContractType')?.touched
    );
  }

  get ncModalityTypeInvalid() {
    return (
      this.myForm.get('ncModalityType')?.invalid &&
      this.myForm.get('ncModalityType')?.touched
    );
  }

  get ncVendorInvalid() {
    return (
      this.myForm.get('ncVendor')?.invalid &&
      this.myForm.get('ncVendor')?.touched
    );
  }

  get ncSubjectInvalid() {
    return (
      this.myForm.get('ncSubject')?.invalid &&
      this.myForm.get('ncSubject')?.touched
    );
  }


  //fill contract
  public fillContract() {
    this.newContract.reference = this.loadRadicado();

    this.newContract.singinDate = new Date();
    this.newContract.initialDate = new Date(this.myForm.value.ncInitialDate);

    this.newContract.finalDate = null;
    this.newContract.status = 'ACTIVO';
    this.newContract.subject = this.myForm.value.ncSubject;
    this.newContract.vendor = this.myForm.value.ncVendor;
    console.log('Nuevo Contrato ModalityType' + this.newContract.modalityId);
    console.log(
      'Nuevo Contrato contractType' + this.newContract.contractTypeId
    );
    this.newContract.modalityId = this.myForm.value.ncModalityType;
    this.newContract.contractTypeId = this.myForm.value.ncContractType;
  }
  //Mostrar el siguiente formulario
  moveToNextStep() {
    this.stepper.next();
  }
  //send request create contract
  submitFormulario() {
    if (this.myForm.invalid) {
      return Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
    
    this.fillContract();

    this.contractService.addContract(this.newContract).subscribe(
      {
        next: (res)=>{
          console.log(res)
          if (res.status == 200) {
            const id = res.data.id
            this.newContract.id= id
            this.contractService.setSelectedContractId(id);
            console.log(this.newContract)
            this.toastrSvc.success('Contrato agregado Correctamente', '');
            this.moveToNextStep();
          }
        } ,
        error: (error)=>{
           console.error(error);
           this.toastrSvc.error(`Error :  ${error.error.data.error}`);
        }

      }
    );

  }

  toastError(mensaje:string){
    this.toastrSvc.error(mensaje);
  }

}
