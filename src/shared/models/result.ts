export class Result<T = any>  {
    result!: T;
    code : number = 0 ;
    success : boolean = false ;
    message : string = '' ;
}