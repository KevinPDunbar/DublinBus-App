import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

import { ViewStopMapPage } from '../view-stop-map/view-stop-map';
/**
 * Generated class for the ViewBusStopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-bus-stop',
  templateUrl: 'view-bus-stop.html',
})
export class ViewBusStopPage {

  stopid;
  fullname;
  operators;
  latitude;
  longitude;
  data: any;
  buses = [];
  errorCodes = [];
  favorites = [];
  isFavorite;

  realTimeAvailable: any = true;
  searching: any = false;
  notRefreshing: any = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private nativeStorage: NativeStorage) {

   this.stopid =  this.navParams.get('stopid');  
   this.fullname =  this.navParams.get('fullname');   
   this.operators =  this.navParams.get('operators'); 
   this.latitude = this.navParams.get('latitude');
   this.longitude = this.navParams.get('longitude');
  
   this.getStopInformation();

   this.nativeStorage.getItem('favorites')
  .then(
    data => {
      console.log(data)
      this.favorites = data;
      this.checkFavorites();
    },
    error => {
      console.error(error)
      this.favorites = [];
      this.isFavorite = false;
    }
  );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBusStopPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.notRefreshing = false;
    this.buses = [];
    this.errorCodes = [];
    this.getStopInformation();


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.notRefreshing = true;
    }, 2000);
  }

  checkFavorites()
  {
    if(this.favorites.length < 1)
    {
      console.log("FAVORITE IS ZERO");
      this.isFavorite = false;
    }
    else
    {
      for(let i=0; i<this.favorites.length; i++)
      {
        if(this.favorites[i].stopid === this.stopid)
        {
          this.isFavorite = true;
          console.log("Is a favorite");
          break;
        }
        else
        {
          this.isFavorite = false;
          console.log("Is Not a favorite");              
        }
      }
    }
      
  }

  getStopInformation()
  {
    this.searching = true;

    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + this.stopid + '&format=json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          this.searching = false;
          console.log(data);

          this.errorCodes.push({'errorCode' : data.errorcode});

          if(data.numberofresults < 1)
          {
            this.realTimeAvailable = false;
          }
          else
          {
            for(let i=0; i<data.numberofresults; i++)
            {
              this.realTimeAvailable = true;
              this.buses.push(data.results[i]);
            }
          }

        });
  }

  addToFavorites()
  {
    this.favorites.push({"stopid": this.stopid, "fullname": this.fullname, "operators": this.operators, "latitude": this.latitude, "longitude": this.longitude, "nickname": ''});
    
    this.checkFavorites();

    this.nativeStorage.setItem('favorites', this.favorites)
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );

  }

  removeFromFavorites()
  {
    let stopToRemove = this.stopid;
   
      let updated = this.favorites.filter(function(el) {
        return el.stopid !== stopToRemove;
    });

      this.favorites = updated;
      this.checkFavorites();
      this.nativeStorage.setItem('favorites', this.favorites)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  viewOnMap()
  {
    this.navCtrl.push(ViewStopMapPage, {fullname: this.fullname, stopid: this.stopid, operators: this.operators, latitude: this.latitude, longitude: this.longitude});
  }

}
