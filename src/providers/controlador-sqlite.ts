import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ControladorSqlite {
  public db:SQLiteObject=null;
  public isopenDB:boolean=false;
  constructor(public http: Http,public plt: Platform,private sqlite: SQLite) {
    console.log('Hello ControladorSqlite Provider');
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
      this.openDB();
    });
  }

  public openDB(){
    let me=this;
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.db=db;
    }).catch((e)=>{
      console.log(JSON.stringify(e))
    })//.catch(e => console.log(e));
  }

  public createTabla(tabla,campos){
    //id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, clave TEXT
    let sql="create table if not exists "+tabla+" ("+campos+")";
    console.log(sql)
    return this.db.executeSql(sql,[]);
  }

  public addUser(datos){
    let sql = "INSERT INTO usuario (usuario,clave) values (?,?)";
    return this.db.executeSql(sql,[datos.usuario,datos.clave]);
  }

  public addDatos(datos){
    let sql = "INSERT INTO datos (idDatos,datosA,datosB,datosC) values (?,?,?,?)";
    return this.db.executeSql(sql,[datos.idDatos,datos.datosA,datos.datosB,datos.datosC]);
  }

  public consultarUsuario(){
    let sql = "SELECT * FROM usuario";
    return this.db.executeSql(sql,{});
  }

  public consultarDatos(){
    let sql = "SELECT * FROM datos";
    return this.db.executeSql(sql,{});
  }

  public consultarDato(dato){
    let sql = "SELECT count(*) AS contador FROM datos WHERE idDatos=? ";
    return this.db.executeSql(sql,[dato]);
  }
  public eliminarTabla(tabla){
    let sql = "DROP TABLE IF EXISTS "+tabla;
    return this.db.executeSql(sql,{});
  }

  vaciarDatos(){
    let sql = "DELETE FROM datos WHERE id> ? ";
    return this.db.executeSql(sql,[0]);
  }
}
