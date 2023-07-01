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
import { Fila } from 'src/app/class/models/Fila';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogComponent {
  pdfUrl = '';
  myForm!: FormGroup;
  nuevaFila:Fila=new Fila();
  filas: any[] = [];
  nuevaFilaEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  acordeonAbierto = false;
  constructor(
    private toastrSvc:ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,): void {

    // const Dialog1 = this.dialog.open(DialogAnimation, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });

    // Dialog1.afterClosed().subscribe((result) => {
    //   if (result === 'Si') {
    //     if (this.dialogRef) {

    //       const name = this.myForm.value.name;
    //       const type = this.myForm.value.type;
    //       const date = this.myForm.value.date;
    //       const file = this.myForm.value.file;

    //       const nuevaFila = {
    //         name: name,
    //         type: type,
    //         date: date,
    //         file: file
    //       };


    //       this.nuevaFila.push(nuevaFila);


    //       this.nuevaFilaEvent.emit(this.nuevaFila);

    //       this.agregarFila();



    //       this.dialogRef.close();
    //     }
    //   }
    // });
    if (this.myForm.invalid) {
      return Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
    if(this.nuevaFila.url!=null){
      this.toastrSvc.success('Documento creado exitosamente.', '');
      this.dialogRef.close(this.nuevaFila);

    }else{
      this.toastrSvc.error(`Debe seleccionar un documento.`);
    }
    
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      type: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      expeditionDate: ['', Validators.required],
      file: ['', Validators.required],
    });
  

  }
  
  get nameInvalid() {
    return this.myForm.get('name')?.invalid && this.myForm.get('name')?.touched;
  }
  get expeditionDateInvalid() {
    return this.myForm.get('expeditionDate')?.invalid && this.myForm.get('expeditionDate')?.touched;
  }
  get fileInvalid() {
    return this.myForm.get('file')?.invalid && this.myForm.get('file')?.touched;
  }
  fillDocument(){
    this.nuevaFila.name=this.myForm.value.name;
    this.nuevaFila.url=this.pdfUrl;
    this.nuevaFila.type=this.myForm.value.type;
    this.nuevaFila.expeditionDate=this.myForm.value.expeditionDate;
    console.log(this.nuevaFila)
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.pdfUrl = URL.createObjectURL(file);
      console.log(this.pdfUrl)
    }
    this.fillDocument();
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
