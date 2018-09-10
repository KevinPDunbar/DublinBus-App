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

  searchTerm: any = '';
  searching: any = false;
  resultsFound: any = true;
  searchBusStops = [];

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

  searchStops()
  {
    if(this.searchTerm.length < 1)
    {
      console.log("search term is less than 1");
      this.resultsFound = true;
      this.busStops= [];
      this.getBusStops();
    }
    else
    {
      console.log("search term is over 1");
      this.busStops = [];
      this.searching = true;
      if(!isNaN(this.searchTerm))
      {
        console.log("search is number");
        this.busStops =  this.busProvider.searchStopsByRoute(this.searchTerm);
      }else{
        console.log("search is a string");
        this.busStops =  this.busProvider.searchStops(this.searchTerm);
      }
      
      if(this.busStops.length < 1)
      {
        console.log("No results found..");
        this.resultsFound = false;
      }
      else
      {
        this.resultsFound = true;
      }
      this.searching = false;
    }
     
  }

  goToBusStopPage(stopId, fullname, operators, latitude, longitude)
  {
    console.log("StopId: " + stopId);
    console.log("fullname: " + fullname);
    console.log("operators: " + operators[0].routes);

    this.navCtrl.push(ViewBusStopPage, {stopid: stopId, fullname: fullname, operators: operators[0].routes, latitude: latitude, longitude: longitude});
  }



}
