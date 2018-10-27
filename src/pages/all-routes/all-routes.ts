import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';
import { RouteSelectPage } from '../route-select/route-select';

/**
 * Generated class for the AllRoutesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-routes',
  templateUrl: 'all-routes.html',
})
export class AllRoutesPage {

  routes = [];

  searchTerm: any = '';
  searching: any = false;
  resultsFound: any = true;
  searchRoutesResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public busProvider: BusStopsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllRoutesPage');
    this.getRoutes();
  }

  getRoutes()
  {
    let data = this.busProvider.getRoutes();

    if(data)
    {
      for(let i=0; i<data.numberofresults; i++)
      {
        this.routes.push(data.results[i]);
        console.log(data.results[i]);
      }
    }
  }

  searchRoutes()
  {
    if(this.searchTerm.length < 1)
    {
      console.log("search term is less than 1");
      this.resultsFound = true;
      this.routes= [];
      this.busProvider.getRoutes();
    }
    else
    {
      console.log("search term is over 1");
      this.routes = [];
      this.searching = true;
      this.routes =  this.busProvider.searchRoutes(this.searchTerm);
      if(this.routes.length < 1)
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

  toGoRouteSelect(route)
  {
    this.navCtrl.push(RouteSelectPage, {route: route});
  }

}
