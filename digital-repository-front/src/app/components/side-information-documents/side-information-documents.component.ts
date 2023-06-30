import { Component,Input, SimpleChanges, } from '@angular/core';
import { ResultItem } from 'src/app/class/models/ResultItem';
@Component({
  selector: 'app-side-information-documents',
  templateUrl: './side-information-documents.component.html',
  styleUrls: ['./side-information-documents.component.css']
})
export class SideInformationDocumentsComponent {

  documentosFaltantes: ResultItem[] = []
  documentosExistentes: ResultItem[] = []


  @Input() contractualDocumentTypes: ResultItem[] = [];

  ngOnInit(){


  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['contractualDocumentTypes']) {
      console.log('Cambios detectados en contractualDocumentTypes', changes['contractualDocumentTypes'].currentValue);
      this.contractualDocumentTypes = changes['contractualDocumentTypes'].currentValue
      
      this.documentosExistentes = this.contractualDocumentTypes.filter(item => item.hasDocuments === true);
      this.documentosFaltantes = this.contractualDocumentTypes.filter(item => item.hasDocuments === false);
    }
  }


}
