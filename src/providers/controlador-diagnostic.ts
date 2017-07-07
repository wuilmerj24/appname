import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class ControladorDiagnostic {

  constructor(public http: Http,private diagnostic: Diagnostic,public plt: Platform,private network: Network) {
    console.log('Hello ControladorDiagnostic Provider');
    this.plt.ready().then(() => {

    });
  }

  conexion(){
    this.network.onConnect().subscribe(() => {
      console.log('network connected!: ');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }

}
