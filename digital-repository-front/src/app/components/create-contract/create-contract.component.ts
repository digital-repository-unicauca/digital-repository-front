import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';


@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent {
  filas: any[] = [];
  acordeonAbierto = false;

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

  constructor(private dialog: MatDialog) { }

  abrirVentanaEmergente() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', // Especifica el ancho deseado
      height: '600px', // Especifica la altura deseada
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes realizar acciones después de cerrar el diálogo, si es necesario
      console.log('Diálogo cerrado');
    });
  }

  abrirVentanaEmergenteEdit() {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px', // ancho deseado
      height: '600px', // altura deseada
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
    });
  }

  eliminarItem() {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmacion) {
      
    }
  }

}
