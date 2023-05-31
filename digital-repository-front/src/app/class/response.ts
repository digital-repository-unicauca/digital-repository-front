export class Response {
    status!: number;
    userMessage!:string;
    developerMessage!:string;
    data!:{
      data:any;
      pageNo:number;
      pageSize:number;
      totalElements:number;
      totalPages:number;
    };
}
