import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';
import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';

/**
 * Generated class for the AllBusStopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-bus-stops',
  templateUrl: 'all-bus-stops.html',
})
export class AllBusStopsPage {

  data: any;
  busStops = [];
  errorCodes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public busProvider: BusStopsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllBusStopsPage');
    this.getBusStops();
  }

  getBusStops()
  {
    console.log("getting bus stops...");

    let data = this.busProvider.getBusStops();

    if(data)
    {
      for(let i=0; i<data.numberofresults; i++)
          {
            this.busStops.push(data.results[i]);
          }
    }

    //this.busStops.push(this.busProvider.getBusStops().results);

    console.log(this.busProvider.getBusStops());

    /*this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?stopid=')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);

 
          this.errorCodes.push({errorCode : data.errorcode});

          for(let i=0; i<data.numberofresults; i++)
          {
            this.busStops.push(data.results[i]);
          }
        }); */
  }

  goToBusStopPage(stopId, fullname, operators)
  {
    console.log("StopId: " + stopId);
    console.log("fullname: " + fullname);
    console.log("operators: " + operators[0].routes);

    this.navCtrl.push(ViewBusStopPage, {stopid: stopId, fullname: fullname, operators: operators[0].routes});
  }



}
