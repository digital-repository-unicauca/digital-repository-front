import { Injectable } from '@angular/core';
import { CheckList } from '../class/CheckList';
import { Collection } from '../class/collection';
import { ResultItem } from '../class/models/ResultItem';

@Injectable({
  providedIn: 'root'
})


export class SideInformationDocumentsService {

  constructor() { }

  /**
   * Servicio para obtener el nombre de los elementos precontractuales con un estado que dice si ya han sido subidos o no
   *
   */

  getDocumentsChecklist(checklist: CheckList[], collection: Collection[]): ResultItem[] {

    return checklist.map(item => {
      const matchingCollection = collection.find(c => c.contractualDocumentId === item.contractualDocumentType.id);
      const hasDocuments = (matchingCollection && matchingCollection.documents.length > 0) ?? false;
      return {
        name: item.contractualDocumentType.name,
        hasDocuments: hasDocuments,
        subdirectory: item.subdirectory
      };
    });
  }
}
