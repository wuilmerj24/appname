import { HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { SQLite} from '@ionic-native/sqlite';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Sesion} from '../pages/sesion/sesion';

import {ControladorDiagnostic} from '../providers/controlador-diagnostic';
import {ControladorSqlite} from '../providers/controlador-sqlite';
import {ProviderUsuario} from '../providers/provider-usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Sesion
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Sesion
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    SQLite,
    Diagnostic,
    ControladorDiagnostic,
    ControladorSqlite,
    ProviderUsuario,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
