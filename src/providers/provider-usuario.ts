import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {ControladorSqlite} from '../providers/controlador-sqlite'

@Injectable()
export class ProviderUsuario {
  public url:any="http://10.42.0.1/workana/apache-cordova/backend.php";
  public headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  public options = new RequestOptions({ headers: this.headers });
  public usuario:any;
  public clave:any;
  public resltNube:any=[];
  public contadorNube:number;
  constructor(public http: Http, public controladorSqlite:ControladorSqlite) {
    console.log('Hello ProviderUsuario Provider');
  }

  consultaNube(){
    this.resltNube=[];
    let datos="tipo=sincronizar";
    let userDatos:any;
    this.http.post(this.url,datos,this.options).map(res => res.json()).subscribe(data => {
      this.contadorNube=data.length;
      this.controladorSqlite.vaciarDatos().then((res)=>{
        for(let i in data){
          this.resltNube.push({id:data[i].id,datosA:data[i].datosA,datosB:data[i].datosB,datosC:data[i].datosC});
          this.controladorSqlite.addDatos(data[i]);
        }
      },(err)=>{
        //error al consultar la base de datos
      })

      console.log("Consulta nube: "+data)
    },err =>{
      console.log("Error consulta nube"+JSON.stringify(err))
    });
  }
}
