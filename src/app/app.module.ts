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
import { StopMapPage } from '../pages/stop-map/stop-map';
import { ViewStopMapPage } from '../pages/view-stop-map/view-stop-map';

import { HttpModule} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { BusStopsProvider } from '../providers/bus-stops/bus-stops';
import { NewsPage } from '../pages/news/news';
import { AllRoutesPage } from '../pages/all-routes/all-routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AllBusStopsPage,
    ViewBusStopPage,
    FavoritesPage,
    CalculateFarePage,
    StopMapPage,
    ViewStopMapPage,
    NewsPage,
    AllRoutesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AllBusStopsPage,
    ViewBusStopPage,
    FavoritesPage,
    CalculateFarePage,
    StopMapPage,
    ViewStopMapPage,
    NewsPage,
    AllRoutesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusStopsProvider
  ]
})
export class AppModule {}
