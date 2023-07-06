import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CheckList } from 'src/app/class/CheckList';

import { DocumentService } from 'src/app/services/document.service';
import { ContractService } from 'src/app/services/contract.service';
import { ToastrService } from 'ngx-toastr';
import { responseDocument } from 'src/app/class/models/responseDocument';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';

import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Fila } from 'src/app/class/models/Fila';
import { Contract } from 'src/app/class/contract';
import { modalityContractType } from 'src/app/class/models/ModalityContractType';
import { CollectionService } from 'src/app/services/collection.service';
import { switchMap } from 'rxjs';
import { Collection } from 'src/app/class/collection';
import { Router } from '@angular/router';



@Component({
  selector: 'app-documents-create-contract',
  templateUrl: './documents-create-contract.component.html',
  styleUrls: ['./documents-create-contract.component.css']
})
export class DocumentsCreateContractComponent {

  acordeonAbierto = false;
  filas: any[] = [];
  doc: Fila = new Fila();
  checkList: CheckList[] = [];
  fil: Fila = new Fila();
  collection:Collection[]=[];
  coll:Collection=new Collection();
  subdirectory1: CheckList[] = [];
  subdirectory2: CheckList[] = [];
  subdirectory3: CheckList[] = [];
  documents: Fila[]=[];
  pdfUrl = '';
  @Input() contractId: number = 0

  contract: Contract = new Contract(0);
  constructor(
    private dialog: MatDialog,
    private contratoService: ContractService,
    private documentService: DocumentService,
    private collectionService: CollectionService,
    private toastrSvc: ToastrService,
    private router: Router
  ) {

  }




  ngOnInit() {

  
    console.log("contract Id ", this.contractId)
    this.contratoService.getContractById(this.contractId).subscribe((response) => {
      this.contract = response.data
      console.log(this.contract)
    })
    this.loadCheckList();
  }
  async loadCheckList() {
    await new Promise(f => setTimeout(f, 1000));
    this.documentService.getCheckList(this.contract.modalityContractType) // after to delete la linea anterior
      .subscribe((response) => {
        // console.log('Del servicio ', response);

        this.checkList = response.data as CheckList[];
        // console.log(this.checkList);
        this.LoadSubdirectorys();
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

  public LoadSubdirectorys() {
    for (const item of this.checkList) {
      const subdirectory = item.subdirectory;

      item.filas = [];
      if (subdirectory === '0') {
        this.subdirectory1.push(item);
      } else if (subdirectory === '1') {
        this.subdirectory2.push(item);
      } else if (subdirectory === '2') {
        this.subdirectory3.push(item);
      }
    }

    console.log(this.subdirectory1)
  }

  abrirVentanaEmergente(s: String, subdirectory: number, indice: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      height: '600px',
      data: s,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.doc = result;
      if (this.doc && Object.keys(this.doc).length > 0) {
        if (subdirectory === 0) {
          console.log("Añadiendo doc a ", this.subdirectory1[indice].contractualDocumentType.name)
          this.doc.contractualDocumentId=this.subdirectory1[indice].id
          this.doc.contractId=this.contractId
          this.subdirectory1[indice].filas.push(this.doc);
        } else if (subdirectory === 1) {
          this.doc.contractId=this.contractId
          this.doc.contractualDocumentId=this.subdirectory2[indice].id
          this.subdirectory2[indice].filas.push(this.doc);
        } else if (subdirectory === 2) {
          this.doc.contractId=this.contractId
          this.doc.contractualDocumentId=this.subdirectory3[indice].id
          this.subdirectory3[indice].filas.push(this.doc);
        }
      }
    });


  }

  //Dialog Edit Document
  abrirVentanaEmergenteEdit(subdirectory: number, indice: number, j: number) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px', // ancho deseado
      height: '600px', // altura deseada
      data: this.subdirectory1[indice].filas[j],
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doc = result;
      if (this.doc && Object.keys(this.doc).length > 0) {
        if (subdirectory === 0) {
          console.log("Añadiendo doc a ", this.subdirectory1[indice].contractualDocumentType.name)
          this.subdirectory1[indice].filas[j] = this.doc;
        } else if (subdirectory === 1) {
          this.subdirectory2[indice].filas[j] = this.doc;
        } else if (subdirectory === 2) {
          this.subdirectory3[indice].filas[j] = this.doc;
        }
      }
    });
  }

  // openPdfViewerDialog(i: number) {
  openPdfViewerDialog(fila: Fila) {
    this.pdfUrl = fila.url;
    console.log(this.pdfUrl);
    const dialogRef = this.dialog.open(PdfViewerDialogComponent, {
      width: '800px',
      height: '600px',
      data: { pdfUrl: this.pdfUrl },
    });
  }

  openDialog(indice: number, filas: Fila[]): void {
    const dialogRef = this.dialog.open(DialogAnimation, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Si') {
        this.eliminarItem(indice, filas);

      }
    });
  }
  eliminarItem(index: any, filas: Fila[]): void {
    console.log(index)
    filas.splice(index, 1);
  }

 

  FillDocument(){
    for (const item of this.subdirectory1) {
      for (const i of item.filas) {
        this.documents.push(i);
      }
    }
    for (const item of this.subdirectory2) {
      for (const i of item.filas) {
        this.documents.push(i);
      }
    }
    for (const item of this.subdirectory3) {
      for (const i of item.filas) {
        this.documents.push(i);
      }
    }
    console.log(this.documents)
  }
  idCollection: number = 0;
  enviarDocumentos() {
    this.FillDocument();
    //sacar la coleccion con el id de contractualDocumentId y el contrato
    // this.collectionService.getCollectionByContractAndContractualDocument(
    //   this.contractId, 1

    // ).pipe(
    //   switchMap((response) => {
    //     return response.data.id;
    //   }),
    //   switchMap((response) => {
    //     //convertir fila a document
    //     return
    //   }),
    // )

    //crear document
    //enviar document para su creacion

    this.documentService.addDocuments(this.documents).subscribe((res) => {
      console.log(res);
      if (res.status == 200) {
        this.toastrSvc.success('Documentos guardados Correctamente', 'Documentos');
        this.router.navigate(['/searchCont']);
      }
    })
  }


}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: '../create-contract/dialog-animation.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimation {
  constructor(public dialogRef: MatDialogRef<DialogAnimation>) { }
}

