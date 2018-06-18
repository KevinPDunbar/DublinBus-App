import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CalculateFarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate-fare',
  templateUrl: 'calculate-fare.html',
})
export class CalculateFarePage {

  fareForm;

  routes = [];
  errorCodes = [];
  selectedRoute: any;
  selectedRouteOperator: any;
  selectedRouteOptions = [];
  selectionOption: any;
  direction: any;
  index;
  directionIndex;
  boardingStops = [];
  departureStops = [];
  selectedBoardingStop: any;
  selectedDepartureStop: any;
  fares = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuilder: FormBuilder) {

    this.fareForm = formBuilder.group({
      route: 'none',
      options: '',
      boardingStop: '',
      departureStop: '',
    })

    this.fareForm.valueChanges.subscribe(data => {
      console.log("data changed");
      console.log("selected route: " + this.fareForm.value.route);
      if(this.fareForm.value.route)
      {
        this.selectedRoute = this.fareForm.value.route;
        this.getRouteStops();
      }
      if(this.selectedRoute)
      {
        console.log("there is a route selected");
        for(let i = 0; i < this.routes.length; i++)
        {
          if(this.selectedRoute === this.routes[i].route)
          {
            console.log("selected route found: " + this.routes[i].route + "  operators: " + this.routes[i].operator)
          }
        }
      }

      if(this.fareForm.value.options)
      {
        console.log("Form Otions: " + this.fareForm.value.options);
        this.index =  this.fareForm.value.options.slice(-1)
        console.log("Index is: " + this.index);

        console.log("stops are: " + this.selectedRouteOptions[this.index].stops);
        this.boardingStops = this.selectedRouteOptions[this.index].stops;
        this.departureStops = this.selectedRouteOptions[this.index].stops;

        if(this.index <= 0)
        {
          this.directionIndex = 'I';
        }
        else if(this.index >= 1)
        {
          this.directionIndex = 'O';
        }

      }

      if(this.fareForm.value.boardingStop)
      {
        this.selectedBoardingStop = this.fareForm.value.boardingStop;
        //splice array here
      }

      if(this.fareForm.value.departureStop)
      {
        this.selectedDepartureStop = this.fareForm.value.departureStop;
      }

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculateFarePage');
    this.getRoutes();
  }

  
  getRoutes()
  {
    console.log("getting routes..");

    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/routelistinformation?&format=json')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);

          this.errorCodes.push({'errorCode' : data.errorcode});

          for(let i=0; i<data.numberofresults; i++)
          {
            if(data.results[i].operator === 'bac')
            {
              this.routes.push(data.results[i]);
            }
           
          } 
        });
  }

  getRouteStops()
  {
    console.log("getting route stops...");

    //this.selectedRouteOptions = [];

    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid=' + this.selectedRoute + '&operator=bac&format=json')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);

          for(let i=0; i < data.numberofresults; i++)
          {
            console.log(data.results[i].origin + " to " + data.results[i].destination);
            //this.selectedRouteOptions.push(data.results[i]);
            console.log("stops to push: " + data.results[i].stops);
            this.selectedRouteOptions.push({"origin": data.results[i].origin, "destination": data.results[i].destination, "stops": data.results[i].stops})
          }
          
        });
  }

  calculateFare()
  {
    console.log("direction index: " + this.directionIndex);

    this.http.get('https://dublinbus.ie/api/farecalculateservice/' + this.selectedRoute + '/' + this.directionIndex + '/' + this.selectedBoardingStop + '/' + this.selectedDepartureStop + '?format=json')
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);

     this.fares = data.Fares;
      
    });
  }


}
