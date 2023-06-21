import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewer-dialog',
  templateUrl: './pdf-viewer-dialog.component.html',
  styleUrls: ['./pdf-viewer-dialog.component.css']
})
export class PdfViewerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { pdfUrl: string }){}
}
