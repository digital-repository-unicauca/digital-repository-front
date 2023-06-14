import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';

import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

import { ContractType } from 'src/app/class/models/ContractType';
import { Modality } from 'src/app/class/models/Modality';
import { ContractService } from 'src/app/services/contract.service';
import { Contract } from 'src/app/class/contract';
import { DatePipe } from '@angular/common';
import { modalityContractType } from 'src/app/class/models/ModalityContractType';



@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent implements OnInit{
  Spqr:string | undefined;
  filas: any[] = [];
  acordeonAbierto = false;
  radicado!:String;
  rad!:String;

  myForm!: FormGroup;
  pipe = new DatePipe('en-US');
  nroContract!: String
  contractsType:ContractType[]=[];
  modalityContractType:modalityContractType[]=[];
  modalityType:Modality[]=[];
  contractType : ContractType = new ContractType();
  modality : Modality = new Modality();
  newContract : Contract = new Contract();

  textoDeInput!: string 



  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private contrSv: ContractService) { }
    

  ngOnInit() {
    this.loadContractType()
    this.loadModalityType()
    //this.loadRadicado()
    this.myForm = this.fb.group({
      ncRadicado:['', Validators.required],
      ncInitialDate:['', Validators.required],
      ncNroContract:['', Validators.required],
      ncContractType:[ '' , Validators.required],
      ncModalityType:[ '' , Validators.required],
      ncVendor:['', Validators.required],
      ncSubject:['', Validators.required]
    });

    this.Spqr=this.myForm.value.traOficioNum;

    this.newContract = new Contract();
    //this.modality = new Modality();

  }


  public loadModalityContractType(){
    this.contrSv.getModalityContractType().subscribe((response) => {
      console.log("Del servicio ",response)
      this.modalityContractType = response.data.data as modalityContractType[]

    })
  }

  public loadModalityType(){
    this.contrSv.getModalityType().subscribe((response) => {
      console.log("Del servicio ",response)
      this.modalityType = response.data.data as Modality[]

    })
  }

  public loadContractType(){
    this.contrSv.getContractType().subscribe((response) => {
      console.log("Del servicio ",response)
      this.contractsType = response.data.data as ContractType[]

    })
  }


  public loadRadicado(){
    return this.radicado = this.myForm.value.ncContractType+"."+this.myForm.value.ncContractType+"-"+this.myForm.value.ncNroContract;
    console.log("Numero de referencia "+this.newContract.reference);
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

  

  abrirVentanaEmergente() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', // Especifica el ancho deseado
      height: '600px', // Especifica la altura deseada
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes realizar acciones después de cerrar el diálogo, si es necesario
      console.log('Diálogo cerrado');
    });
  }


  abrirVentanaEmergenteEdit() {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px', // ancho deseado
      height: '600px', // altura deseada
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
    });
  }

  eliminarItem() {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmacion) {
      
    }
  }

  public fillContract(){
    this.newContract.id = this.myForm.value.id;
    this.newContract.contractType = this.myForm.value.ncContractType
    //this.newContract.nroContract = this.myForm.value.ncNroContract
    this.newContract.initialDate = this.pipe.transform(this.myForm.value.ncInitialDate, 'yyyy-MM-dd HH:mm:ss');
    this.newContract.reference = this.myForm.value.ncContractType+"."+this.myForm.value.ncContractType+"-"+this.myForm.value.ncNroContract;
    this.newContract.vendor = this.myForm.value.ncVendor;
    this.newContract.subject = this.myForm.value.ncSubject;
    this.newContract.modalityContractType = this.myForm.value.ncModalityType;
    
  }

  public submitFormulario(){

    this.fillContract();
    this.contrSv.addContract(this.newContract);

    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }

    this.fillContract();

    this.contrSv.addContract(this.newContract);

    if(!this.contrSv.addContract(this.newContract)){
      alert("No se pudo agregar la peticion");
    } else {
      alert("Peticion agregada correctamente");
    }
  }
  


}
