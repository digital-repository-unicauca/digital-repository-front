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
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
  encapsulation: ViewEncapsulation.None, // Desactivar la encapsulación de estilos
})
export class DialogEditComponent {

  pdfUrl = '';
  myForm!: FormGroup;
  doc: Fila = new Fila();
  nuevaFila:Fila=new Fila();
  selectedFile: File | undefined;
  //Fechas
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: string | null;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.doc = data;
    this.dialogRef.disableClose = true;
 
  }


  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    

    if (this.myForm.invalid) {
      return Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }else{
      const dialogRef = this.dialog.open(DialogAnimation, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Si') {
            this.dialogRef.close(this.nuevaFila);
        }
      });
    }
  }

  ngOnInit() {
  
    this.myForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      expeditionDate: ['', Validators.required],
      file: ['', Validators.required],
    });
   
    this.fillForm();
  

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

  public async fillForm() {
    //Llena los campos del formulario
    
    this.nuevaFila=this.doc
    console.log('documento   ',this.nuevaFila);
    this.todayWithPipe = this.pipe.transform(this.nuevaFila.expeditionDate, 'yyyy-MM-dd');
    this.myForm.patchValue({ expeditionDate: this.todayWithPipe });
    this.myForm.patchValue({
      type: this.nuevaFila.type,
      name: this.nuevaFila.name,
    });
    await new Promise(f => setTimeout(f, 1000));
  }

  //Accesor para los campos del formulario
  public get f(): any {
    return this.myForm.controls;
  }

  SendDataonChange(event: any) { }


  fillDocument(){
    this.nuevaFila.name=this.myForm.value.name;
    this.nuevaFila.url=this.pdfUrl;
    this.nuevaFila.type=this.myForm.value.type;
    this.nuevaFila.expeditionDate=this.myForm.value.expeditionDate;
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
  constructor(public dialogRef: MatDialogRef<DialogAnimation>) { }
}
