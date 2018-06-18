import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';


/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {

    this.nativeStorage.getItem('favorites')
    .then(
      data => this.favorites = data,
      error => console.error(error)
    );

    if(this.favorites)
    {

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  goToBusStopPage(stopId, fullname, operators)
  {
    console.log("StopId: " + stopId);
    console.log("fullname: " + fullname);
    console.log("operators: " + operators);

    this.navCtrl.push(ViewBusStopPage, {stopid: stopId, fullname: fullname, operators: operators});
  }



}
