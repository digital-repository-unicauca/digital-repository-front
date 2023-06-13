import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent {
  filas: any[] = [];
  acordeonAbierto = false;

  constructor(private dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimation, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Si') {
        for (let i = 0; i < this.filas.length; i++) {
          const fila = this.filas[i];
          this.eliminarItem(fila);
        }
      }
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

  eliminarItem(index: number): void {
    this.filas.splice(index, 1);
  }

  abrirVentanaEmergente() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', // Especifica el ancho deseado
      height: '600px', // Especifica la altura deseada
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Aquí puedes realizar acciones después de cerrar el diálogo, si es necesario
      console.log('Diálogo cerrado');
    });
  }

  abrirVentanaEmergenteEdit() {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px', // ancho deseado
      height: '600px', // altura deseada
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado');
    });
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
