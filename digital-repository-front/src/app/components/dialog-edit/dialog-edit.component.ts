import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Fila } from 'src/app/class/models/Fila';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogEditComponent {

  myForm!: FormGroup;
  doc: Fila = new Fila();
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.doc = data;
  }


  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimation, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      expeditionDate: ['', Validators.required],
      file: ['', Validators.required],
    });
    console.log(this.doc);

    this.rellenarForm();

    //this.pqr = new PQRSF();
  }

  async rellenarForm() {
    //Dormir el hilo principal sino el pendejo se pasa de vrga y pasa derecho
    await new Promise(f => setTimeout(f, 1000));
    //Llena los campos del formulario
    this.todayWithPipe = this.pipe.transform(this.doc.expeditionDate, 'yyyy-MM-dd');
    this.myForm.patchValue({ expeditionDate: this.todayWithPipe });
    this.myForm.patchValue({
      type: this.doc.type,
      name: this.doc.name,
      file: this.doc.url,
    });
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
  constructor(public dialogRef: MatDialogRef<DialogAnimation>) { }
}
