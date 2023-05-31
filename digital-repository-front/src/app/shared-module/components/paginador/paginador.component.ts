import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent {
  @Input() totalElements!: number;
  @Input() pageSize: number = 5;
  @Input() totalPages:number=1;
  @Output() pageChanged = new EventEmitter<number[]>();

  currentPage:number=1;

  pages:number[]=[];
  selectPageSize: number[] = [5, 10, 15, 20, 30];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalElements']){
      this.totalElements=changes['totalElements'].currentValue
      this.pages = this.fillPages();
    }
    if(changes['totalPages']){
      this.totalPages=changes['totalPages'].currentValue
    }
    if(changes['pageSize']){
      this.pageSize=changes['pageSize'].currentValue
      // console.log("Cambio PageSize ",this.pageSize)
    }

    this.pages = this.fillPages();
    // console.log("total Items ",this.totalElements, " total paginas ",this.totalPages , " Items por pagina ",this.pageSize)
}

onChangePage(page:number){
  this.currentPage=page;
  console.log("Emitiendo desde paginador",this.currentPage , " page size ",this.pageSize)
  this.emitir()
}

emitir(){

  this.pageChanged.emit([this.currentPage-1,this.pageSize]);
}


  onPreviusPage(){
    if(this.currentPage!=1){
      this.currentPage -=1;
    }
    this.emitir()
  }

  onNextPage(){
    this.currentPage += 1;
    this.emitir()
  }
  
  onSelectingPageSize(size:number){
    // console.log("size seleccionado ",size)
    this.pageSize=size
    this.emitir()
    this.fillPages()
  }

  fillPages(){

    const size =this.totalPages
    const array: number[]=[];
    for (let index = 0; index < size; index++) {
      array[index]=index+1;

    }
    return array;
  }
}
