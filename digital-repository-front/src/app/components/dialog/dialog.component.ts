import { Component, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
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
  s='';
  myForm!: FormGroup;
  nuevaFila:Fila=new Fila();
  filas: any[] = [];
  nuevaFilaEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;
  acordeonAbierto = false;
  selectedFile: File | undefined;
  constructor(
    private toastrSvc:ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.s=data;
      this.dialogRef.disableClose = true;
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
    this.fillForm;
  }
  
  fillForm(){
    console.log('objjjjjjj',this.s)
    this.myForm.patchValue({type:this.s})
  }
  get nameInvalid() {
    return this.myForm.get('name')?.invalid && this.myForm.get('name')?.touched;
  }
  get expeditionDateInvalid() {
    return this.myForm.get('expeditionDate')?.invalid && this.myForm.get('expeditionDate')?.touched;
  }
  get fileInvalid() {
   if (this.selectedFile && this.selectedFile.type === 'application/pdf') {
      return this.myForm.get('file')?.invalid && this.myForm.get('file')?.touched;
    } else {
      console.log('Archivo inválido. Se requiere un archivo PDF.');
      return true;
    } 
  }
  fillDocument(){
    this.nuevaFila.name=this.myForm.value.name;
    this.nuevaFila.url=this.pdfUrl;
    this.nuevaFila.type=this.myForm.value.type;
    this.nuevaFila.expeditionDate=this.myForm.value.expeditionDate;
    console.log(this.nuevaFila)
  }

  onFileSelected(event: any) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0];
    if (this.selectedFile) {
      this.pdfUrl = URL.createObjectURL(this.selectedFile);
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
