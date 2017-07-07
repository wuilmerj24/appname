import { Component } from '@angular/core';
import { NavController, AlertController,LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ControladorSqlite} from '../../providers/controlador-sqlite';
import {ProviderUsuario} from '../../providers/provider-usuario';
import {Sesion} from '../sesion/sesion'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login:FormGroup;
  public datosUser:any;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,public controladorSqlite:ControladorSqlite, public alertCtrl:AlertController,public loadingCtrl: LoadingController,public providerUsuario:ProviderUsuario) {
    this.login=this.createMyForm();
  }

  private createMyForm(){
    return this.formBuilder.group({
      usuario:['',Validators.required],
      clave:['',Validators.required]
    })
  }

  iniciarSesion(){
    this.controladorSqlite.createTabla('usuario','id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, clave TEXT')
    let datos="tipo=iniciarSesion&usuario="+this.providerUsuario.usuario+"&clave="+this.providerUsuario.clave;
    let userDatos:any;
    this.providerUsuario.usuario=this.login.value.usuario;
    this.providerUsuario.clave=this.login.value.clave;
    this.providerUsuario.http.post(this.providerUsuario.url,datos,this.providerUsuario.options).map(res => res.json()).subscribe(data => {
      if(data[0].result=='OK'){
        userDatos={
          'usuario':this.login.value.usuario,
          'clave':this.login.value.clave
        }
        this.controladorSqlite.addUser(userDatos).then((res)=>{
          console.log("tabla creada")
          this.navCtrl.push(Sesion);
        },(err)=>{
        console.log("Error insertarUsuario: "+err)
        })

      }else if(data[0].result=='NO'){

      }
    },err =>{
      console.log("Error inicio de sesion"+JSON.stringify(err))
    });
  }

  ionViewDidLoad() {
    console.log("home page")
  }


ionViewDidEnter(){
    this.controladorSqlite.consultarUsuario().then((res)=>{
      this.datosUser = [];
      console.log(res.rows.length)
      if(res.rows.length==0){

      }else{
        for(let i=0;i<res.rows.length;i++){
          this.datosUser.push({
            id: res.rows.item(i).id,
            usuario: res.rows.item(i).usuario,
            clave: res.rows.item(i).clave,
          });
        }
        let loading = this.loadingCtrl.create({
          content: 'Cargando usuario Por favor espera...',
          duration: 5000
        });
        loading.onDidDismiss(() => {
          this.navCtrl.push(Sesion);
        });
        loading.present();
      }
    },(err)=>{
      //error al consultar la base de datos
    })
  }
}
