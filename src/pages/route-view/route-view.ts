import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';
import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';
import { RouteMapPage } from '../route-map/route-map';

/**
 * Generated class for the RouteViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-view',
  templateUrl: 'route-view.html',
})
export class RouteViewPage {

  route;
  origin;
  destination;
  stops;

  constructor(public navCtrl: NavController, public navParams: NavParams, public busStops: BusStopsProvider) {

    this.route =  this.navParams.get('route');
    this.origin =  this.navParams.get('origin');
    this.destination =  this.navParams.get('destination');
    this.stops =  this.navParams.get('stops');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteViewPage');
  }

  viewBusStop(stopid, fullname, operators, latitude, longitude)
  {
    let stopToView = this.busStops.getStopOperators(stopid);
    this.navCtrl.push(ViewBusStopPage, {route: this.route, stopid: stopid, fullname: stopToView[0].fullname, operators: stopToView[0].operators[0].routes, latitude: stopToView[0].latitude, longitude: stopToView[0].longitude});
  }

  viewRouteOnMap()
  {
    this.navCtrl.push(RouteMapPage, {route: this.route, stops: this.stops})
  }

}
