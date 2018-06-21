import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AllBusStopsPage } from '../pages/all-bus-stops/all-bus-stops';
import { ViewBusStopPage } from '../pages/view-bus-stop/view-bus-stop';
import { FavoritesPage } from '../pages/favorites/favorites';
import { CalculateFarePage } from '../pages/calculate-fare/calculate-fare';

import { HttpModule} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { BusStopsProvider } from '../providers/bus-stops/bus-stops';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AllBusStopsPage,
    ViewBusStopPage,
    FavoritesPage,
    CalculateFarePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AllBusStopsPage,
    ViewBusStopPage,
    FavoritesPage,
    CalculateFarePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusStopsProvider
  ]
})
export class AppModule {}
