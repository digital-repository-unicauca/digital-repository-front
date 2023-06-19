import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilaService } from 'src/app/services/fila.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogComponent {
  myForm!: FormGroup;
  nuevaFila: any[] = [];
  filas: any[] = [];
  nuevaFilaEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  acordeonAbierto = false;
  constructor(private fb: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, private filaService: FilaService) {
    this.filaService.obtenerFilas().subscribe(filas => {
      this.filas = filas;
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,): void {

    const Dialog1 = this.dialog.open(DialogAnimation, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    Dialog1.afterClosed().subscribe((result) => {
      if (result === 'Si') {
        if (this.dialogRef) {

          const name = this.myForm.value.name;
          const type = this.myForm.value.type;
          const date = this.myForm.value.date;
          const file = this.myForm.value.file;

          const nuevaFila = {
            name: name,
            type: type,
            date: date,
            file: file
          };


          this.nuevaFila.push(nuevaFila);


          this.nuevaFilaEvent.emit(this.nuevaFila);

          this.agregarFila();



          this.dialogRef.close();
        }
      }
    });
  }


  agregarFila() {
    this.filaService.agregarFila(this.nuevaFila);
    this.acordeonAbierto = false;
    setTimeout(() => {
      this.acordeonAbierto = true;
    }, 0);
  }



  ngOnInit() {
    this.myForm = this.fb.group({
      type: [''],
      name: [''],
      date: [''],
      file: [''],
    });

    //this.rellenarForm();

    //this.pqr = new PQRSF();
  }

  public async rellenarForm() {
    var id = JSON.parse(localStorage.getItem('id') || '3');
    //(await this.pqrSv.getPqr(id)).subscribe((data) => (
    //this.pqr = data)
    //);
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise((f) => setTimeout(f, 1000));

    //Llena los campos del formulario

    //Llena los campos del formulario de fechas
    //this.todayWithPipe = this.pipe.transform(this.pqr.fechaExpedicion, 'yyyy-MM-dd');
    this.myForm.patchValue({ fechaExpedicion: this.todayWithPipe });
  }

  //Accesor para los campos del formulario
  public get f(): any {
    return this.myForm.controls;
  }

  SendDataonChange(event: any) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Aquí puedes realizar acciones con el archivo seleccionado, como subirlo a un servidor, procesarlo, etc.
  }

}



@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animation.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimation {
  constructor(public dialogRef: MatDialogRef<DialogAnimation>, private filaService: FilaService) { }

}
