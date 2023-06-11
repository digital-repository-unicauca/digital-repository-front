import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="custom-dialog-wrapper">
      <h2 mat-dialog-title>Nuevo Documento</h2>
      <mat-dialog-content>
      <form>
  <h2>Tipo de Documento</h2>
  <mat-form-field>
    <input matInput type="text" [(ngModel)]="tipoDocumento" name="tipoDocumento" required>
  </mat-form-field>
  <h2>Nombre del Documento:</h2>
  <mat-form-field>
    <input matInput type="text" [(ngModel)]="nombreDocumento" name="nombreDocumento" required>
  </mat-form-field>
  <h2>Fecha de Expedición:</h2>
  <mat-form-field>
    <input matInput [matDatepicker]="picker" placeholder="Seleccione una fecha" [(ngModel)]="fechaExpedicion" name="fechaExpedicion" required>
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  <h2>Subir Archivo:</h2>
<div class="mat-form-field">
  <i class="fa-sharp fa-solid fa-folder-plus"></i>
  <input type="file" name="archivoSeleccionado" (change)="onFileSelected($event)" required>
</div>

</form>

      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Cancelar</button>
        <button mat-raised-button color="primary" (click)="guardarInformacion()">Guardar</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None // Desactivar la encapsulación de estilos
})
export class DialogComponent {
  tipoDocumento: string = '';
  nombreDocumento: string = '';
  fechaExpedicion: Date | null = null;
  archivoSeleccionado: File | null = null;

  guardarInformacion() {
    if (this.tipoDocumento && this.nombreDocumento && this.fechaExpedicion && this.archivoSeleccionado) {
      // Aquí puedes guardar la información en la forma que desees
      console.log('Información guardada:');
      console.log('Tipo de Documento:', this.tipoDocumento);
      console.log('Nombre del Documento:', this.nombreDocumento);
      console.log('Fecha de Expedición:', this.fechaExpedicion);
      console.log('Archivo Seleccionado:', this.archivoSeleccionado);
    } else {
      console.log('Faltan campos por completar');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Aquí puedes realizar acciones con el archivo seleccionado, como subirlo a un servidor, procesarlo, etc.
  }
}



