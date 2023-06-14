import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogComponent {
  myForm!: FormGroup;

  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  constructor(private fb: FormBuilder, public dialog: MatDialog,public dialogRef: MatDialogRef<DialogComponent>) {}

openDialog(enterAnimationDuration: string, exitAnimationDuration: string, ): void {

  const Dialog1 =  this.dialog.open(DialogAnimation, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
  });

  Dialog1.afterClosed().subscribe((result) => {
    if (result === 'Si') {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  });

}


  ngOnInit() {
    this.myForm = this.fb.group({
      tipoDocumento: [''],
      nombreDocumento: [''],
      fechaExpedicion: [''],
      archivoSeleccionado: [''],
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

  SendDataonChange(event: any) {}

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
  constructor(public dialogRef: MatDialogRef<DialogAnimation>) {}
}
