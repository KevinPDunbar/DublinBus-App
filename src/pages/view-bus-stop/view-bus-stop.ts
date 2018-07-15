import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private nativeStorage: NativeStorage) {

   this.stopid =  this.navParams.get('stopid');  
   this.fullname =  this.navParams.get('fullname');   
   this.operators =  this.navParams.get('operators'); 
   this.latitude = this.navParams.get('latitude');
   this.longitude = this.navParams.get('longitude');
   console.log("Passed in Id: " + this.stopid);
   console.log("Passed in fullname: " + this.fullname);
   console.log("Passed in lat: " + this.latitude);
   console.log("Passed in long: " + this.longitude);
   //console.log("Passed in operators: " + this.operators[0].routes);
   //this.operators = this.operators[0].routes;
   this.getStopInformation();

   this.nativeStorage.getItem('favorites')
   .then(
   (data) => {
       if (data !== null) {
        this.favorites = data
        this.checkFavorites();
       }
   });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBusStopPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.buses = [];
    this.errorCodes = [];
    this.getStopInformation();


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  checkFavorites()
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

  getStopInformation()
  {
    console.log("getting bus stops...");

    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + this.stopid + '&format=json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);

          this.errorCodes.push({'errorCode' : data.errorcode});

          for(let i=0; i<data.numberofresults; i++)
          {
            this.buses.push(data.results[i]);
          }
        });
  }

  addToFavorites()
  {
    console.log("Adding to favorites, operators: " + this.operators);
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
    this.navCtrl.push(ViewStopMapPage, {fullname: this.fullname, stopid: this.stopid, latitude: this.latitude, longitude: this.longitude});
  }

}
