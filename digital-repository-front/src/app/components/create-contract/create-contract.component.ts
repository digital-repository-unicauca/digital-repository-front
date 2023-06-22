import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
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
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
import { Fila } from 'src/app/class/models/Fila';
@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  filas: any[] = [];
  doc:Fila=new Fila();
  acordeonAbierto = false;
  myForm: FormGroup = new FormGroup({});
  Spqr: string | undefined;
  radicado!: String;
  rad!: String;

  
  pipe = new DatePipe('en-US');
  contractsType: ContractType[] = [];
  modalityContractType: modalityContractType[] = [];
  modalityType: Modality[] = [];
  contractType: ContractType = new ContractType();
  modality: Modality = new Modality();
  newContract: Contract = new Contract();
  date: Date = new Date();
  initialDate: Date = new Date();

  textoDeInput!: string;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private contrSv: ContractService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.loadContractType();
    this.loadModalityType();
    //this.loadRadicado()
    this.myForm = this.fb.group({
      //ncRadicado: ['', Validators.required],
      ncInitialDate: ['', Validators.required],
      //(/^\w+$/)             Expresion regular que permite numeros y letras sin espacios
      ncNroContract: ['',Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/),Validators.max(9999),Validators.min(1)])],
      ncContractType: ['', Validators.required],
      ncModalityType: ['', Validators.required],
      ncVendor: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
      ncSubject: ['', Validators.required],
    });

    this.Spqr = this.myForm.value.traOficioNum;

    this.newContract = new Contract();
    //this.modality = new Modality();
  }
  pdfUrl='';
  openPdfViewerDialog(i:number) {
    this.pdfUrl=this.filas[i].url
    console.log(this.pdfUrl)
    const dialogRef = this.dialog.open(PdfViewerDialogComponent, {
      width: '800px',
      height: '600px',
      data: { pdfUrl: this.pdfUrl }
    });
  }
  public loadModalityContractType() {
    this.contrSv.getModalityContractType(
      this.newContract.contractTypeId,this.newContract.modalityId ).subscribe((response) => {
      console.log('Del servicio ', response);
      this.modalityContractType = response.data.data as modalityContractType[];
    });
  }

  public loadModalityType() {
    this.contrSv.getModalityType().subscribe((response) => {
      console.log('Del servicio ', response);
      this.modalityType = response.data.data as Modality[];
    });
  }

  public loadContractType() {
    this.contrSv.getContractType().subscribe((response) => {
      console.log('Del servicio ', response);
      this.contractsType = response.data.data as ContractType[];
    });
  }

  public loadRadicado() {
    return (this.radicado =
      '5.5-31.' +
      this.myForm.value.ncContractType +
      '/' +
      this.myForm.value.ncNroContract);
    console.log('Numero de referencia ' + this.newContract.reference);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimation, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Si') {
        for (let i = 0; i < this.filas.length; i++) {
          const fila = this.filas[i];
          this.eliminarItem(fila);
        }
      }
    });
  }

  agregarFila() {
    const nuevaFila = {
      documento: 'Documento',
      invitacion: 'Invitación',
      fecha: 'Fecha',
      
    };
    this.filas.push(nuevaFila);
    this.acordeonAbierto = false;
    setTimeout(() => {
      this.acordeonAbierto = true;
    }, 0);
  }

  eliminarItem(index: number): void {
    this.filas.splice(index, 1);
  }

  abrirVentanaEmergente() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', // Especifica el ancho deseado
      height: '600px', // Especifica la altura deseada
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Aquí puedes realizar acciones después de cerrar el diálogo, si es necesario
      //console.log('Diálogo cerrado',result);
     this.doc=result;
      this.filas.push(this.doc)
      console.log("filas ",this.filas)
    });
  }

  abrirVentanaEmergenteEdit(i:number) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px', // ancho deseado
      height: '600px', // altura deseada
      data: {
        Object: this.filas[i],
      },
    },);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado');
    });
  }

  //Validación de campos del formulario
  get ncNroContractInvalid(){
    return (this.myForm.get('ncNroContract')?.invalid && this.myForm.get('ncNroContract')?.touched);
  }

  get ncInitialDateInvalid(){
    return this.myForm.get('ncInitialDate')?.invalid && this.myForm.get('ncInitialDate')?.touched;
  }

  get ncContractTypeInvalid(){
    return this.myForm.get('ncContractType')?.invalid && this.myForm.get('ncContractType')?.touched;
  }

  get ncModalityTypeInvalid(){
    return this.myForm.get('ncModalityType')?.invalid && this.myForm.get('ncModalityType')?.touched;
  }

  get ncVendorInvalid(){
    return this.myForm.get('ncVendor')?.invalid && this.myForm.get('ncVendor')?.touched;
  }

  get ncSubjectInvalid(){
    return this.myForm.get('ncSubject')?.invalid && this.myForm.get('ncSubject')?.touched;
  }


  public fillContract() {
    this.date = new Date();
    this.initialDate = new Date(this.myForm.value.ncInitialDate);
    //console.log('Nuevo Signing date FIILLL CONTRACR' + this.initialDate);
    //this.newContract.id = this.myForm.value.id;
    this.newContract.reference = this.loadRadicado();
    //this.newContract.singinDate = this.date;
    this.newContract.singinDate = this.date;
    this.newContract.initialDate = this.initialDate;

    this.newContract.finalDate = null;
    this.newContract.status = 'ACTIVO';
    this.newContract.subject = this.myForm.value.ncSubject;
    this.newContract.vendor = this.myForm.value.ncVendor;
    console.log('Nuevo Contrato ModalityType' + this.newContract.modalityId);
    console.log('Nuevo Contrato contractType' + this.newContract.contractTypeId);
    this.newContract.modalityId = this.myForm.value.ncModalityType;
    this.newContract.contractTypeId = this.myForm.value.ncContractType;
  }
//Mostrar el siguiente formulario
  moveToNextStep() {
    this.stepper.next();
  }

  public async submitFormulario() {

    if (this.myForm.invalid) {
      return Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }

    this.fillContract();

    if(await this.contrSv.addContract(this.newContract)){
      this.moveToNextStep();
    }

    if (!this.contrSv.addContract(this.newContract)) {
      alert('No se pudo agregar la peticion');
    } else {
      alert('Peticion agregada correctamente');
    }
  }

}



@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animation.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimation {
  constructor(public dialogRef: MatDialogRef<DialogAnimation>) {}
}