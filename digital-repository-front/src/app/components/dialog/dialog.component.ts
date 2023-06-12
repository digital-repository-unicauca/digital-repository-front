import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
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
