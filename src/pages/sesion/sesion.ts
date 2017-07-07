import { Component ,ChangeDetectorRef} from '@angular/core';
import {NavController, NavParams,ActionSheetController,Platform} from 'ionic-angular';
import {ControladorSqlite} from '../../providers/controlador-sqlite';
import {ControladorDiagnostic} from '../../providers/controlador-diagnostic';
import {ProviderUsuario} from '../../providers/provider-usuario';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class Sesion {
  public otrosDatos:any;
  public resltNube:any=[];
  public contadorLocal:number;
  public contadorNube:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public controladorSqlite:ControladorSqlite,public controladorDiagnostic:ControladorDiagnostic,public actionSheetCtrl: ActionSheetController, public platform:Platform,public providerUsuario:ProviderUsuario,private network: Network, private cd: ChangeDetectorRef) {
  }

  cerrarSesion() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cerrar Sesion',
      buttons: [
        {
          text: 'Si',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.controladorSqlite.eliminarTabla('usuario').then((res)=>{
            this.platform.exitApp();
            },err =>{
              console.log("Error cerrar sesion"+JSON.stringify(err))
            });
          }
        },{
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  consultaLocal(){
    this.controladorSqlite.consultarDatos().then((res)=>{
      this.contadorLocal=res.rows.length;
      this.otrosDatos=[];
      if(res.rows.length==0){
        this.providerUsuario.consultaNube();
      }
      for(let i=0;i<res.rows.length;i++){
        this.otrosDatos.push({
          id: res.rows.item(i).id,
          datosA: res.rows.item(i).datosA,
          datosB: res.rows.item(i).datosB,
          datosC: res.rows.item(i).datosC
        });
      }
      console.log(JSON.stringify(this.otrosDatos))
      this.cd.detectChanges();
     },(err)=>{
      //error al consultar la base de datos
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sesion');
    this.controladorSqlite.createTabla('datos','id INTEGER PRIMARY KEY AUTOINCREMENT, idDatos TEXT,datosA TEXT, datosB TEXT, datosC TEXT')
  }

  ionViewDidEnter(){
    let setTimeout=setInterval(()=>{
      this.consultaLocal();
      if(this.network.type !== 'Unknown connection' && this.network.type !== 'No network connection'){
        this.providerUsuario.consultaNube();
      }
    },2000)
  }
}
