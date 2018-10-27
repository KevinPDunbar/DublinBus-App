import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  CircleOptions,
  Geocoder,
  LatLng,
  Circle,
  Marker,
  ILatLng,
  ILatLngBounds,
  LatLngBounds,
  BaseArrayClass,
  GoogleMapsMapTypeId
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';
import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';

/**
 * Generated class for the RouteMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-map',
  templateUrl: 'route-map.html',
})
export class RouteMapPage {

  route;
  stops = [];

  map: GoogleMap;
  busStops = [];
  marks = [];
  currentLat;
  currentLng;
  newMarkers: BaseArrayClass<any> = new BaseArrayClass<any>([]);
  POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([]);

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public busProvider: BusStopsProvider, public geo: Geolocation) {

    this.route = this.navParams.get('route');
    console.log("the passed in route name: " + this.navParams.get('route'));
    let stopsParam = this.navParams.get('stops');

    for(let i=0; i<stopsParam.length; i++)
    {
      this.stops.push(stopsParam[i]);
      console.log(stopsParam[i].stopid);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteMapPage');
  }

  ionViewWillEnter()
  {
    this.loadMap();
  }

  ionViewCanLeave()
  {
      this.map.remove();
      //this.map.setDiv(undefined);
  }

  loadMap() {

    this.map = GoogleMaps.create('map_canvas', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          target: {
            lat: this.stops[0].latitude,
            lng: this.stops[0].longitude
          },
          'tilt': 0,
          'zoom': 15,
          'bearing': 50
        },
        'styles': [
          {
              "featureType": "all",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "color": "#5b6571"
                  },
                  {
                      "lightness": "35"
                  }
              ]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#f3f4f4"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "weight": 0.9
                  },
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#83cead"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#fee379"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#1c1c1c"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#282828"
                  },
                  {
                      "saturation": "21"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#7fc8ed"
                  }
              ]
          }
      ]
  
          
    });


 this.POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      //data.icon = 'assets/imgs/bus-marker-dark.png';
      let marker: Marker = this.map.addMarkerSync(data);
      marker.setAnimation('drop');
      //let iconData: any = marker.get('iconData');
      //marker.setIcon(iconData);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);

    marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
        (data) => {
            console.log("new method clicked");
            this.navCtrl.push(ViewBusStopPage, {stopid: marker.get('stopid'), fullname: marker.get('title'), operators: marker.get('operators'), latitude: marker.get('latitude'), longitude: marker.get('longitude')});
    });

    });

   this.map.addEventListener(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(
        (data) => {
            console.log("BUTTON CLICKED");

            this.geo.getCurrentPosition().then((resp) => {
                this.currentLat = resp.coords.latitude
                this.currentLng = resp.coords.longitude

                let pos = {'lat':resp.coords.latitude, 'lng':resp.coords.longitude}
                
                this.map.animateCamera({
                    'target': pos,
                    'tilt': 0,
                    'zoom': 17,
                    'bearing': 140,
                    'duration': 400 //ms
                  });

               }).catch((error) => {
                 console.log('Error getting location', error);
                 
               });
        
        });
    
    this.map.addEventListener(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
            this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(
                (data) => {
                    console.log("MAP IS READY");
                    this.placeMarkers();
                    this.map.removeEventListener(GoogleMapsEvent.CAMERA_MOVE_END);
                }
            )
            
        }
    )
     

  }

  placeMarkers()
    {
        this.map.clear();
        this.POINTS.empty();
        for(let i=0; i<this.stops.length; i++)
        {
            this.POINTS.push({position: {lat:this.stops[i].latitude, lng:this.stops[i].longitude},
            //animation: 'DROP',
            title: this.stops[i].fullname,
            stopid: this.stops[i].stopid,
            //operators: this.busStops[i].operators[0].routes,
            latitude: this.stops[i].latitude,
            longitude: this.stops[i].longitude
        });
        } 

        this.POINTS.forEach((data: any) => {
            data.disableAutoPan = true;
            //data.icon = 'assets/imgs/bus-marker-dark.png';
            data.icon = '#1abc9c';
            //console.log("Marker data title: " + data.title);
            let marker: Marker = this.map.addMarkerSync(data);
            //marker.setAnimation('drop');
            //marker.setIcon(iconData);
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
            //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onInfoClick);

            marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
                (data) => {
                    let stopid = marker.get('stopid');
                    console.log("new method clicked");
                    console.log("Title: " + marker.get('title'));
                    console.log("Stop Id: " + marker.get('stopid'));
                    console.log("Operators: " + marker.get('operators'));
                    console.log("Latitude: " + marker.get('latitude'));
                    console.log("Longitude: " + marker.get('longitude'));
                    this.map.removeEventListener(GoogleMapsEvent.INFO_CLICK);
                    let stopToView = this.busProvider.getStopOperators(stopid);
                    console.log("StopId: " + stopid);
                    console.log("fullname: " + stopToView[0].fullname);
                    console.log("operators: " + stopToView[0].operators);
                    console.log("latitude: " + stopToView[0].latitude);
                    console.log("longitude: " + stopToView[0].longitude);
                    this.navCtrl.push(ViewBusStopPage, {stopid: stopid, fullname: stopToView[0].fullname, operators: stopToView[0].operators[0].routes, latitude: stopToView[0].latitude, longitude: stopToView[0].longitude});
                   // this.navCtrl.push(ViewBusStopPage, {fullname: marker.get('title'), stopid: marker.get('stopid'), operators: marker.get('operators'), latitude: marker.get('latitude'), longitude: marker.get('longitude')});
            });

        })
        
    }
  
  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
    //let iconData: any = marker.get('iconData');
    console.log("Marker Clicked Boi " + marker.get('title') + " stopid: " + marker.get('stopid'));
    //marker.setIcon(iconData);
  }

  /*onInfoClick(params: any) {
    let marker: Marker = <Marker>params[1];
    let iconData: any = marker.get('iconData');
    console.log("INFO WINDOW CLICKED");
    marker.setIcon(iconData); 
    console.log("INFO: " + marker.get('title'));
    this.goTo(marker.get('title'), marker.get('stopid'), marker.get('operators'), marker.get('latitude'), marker.get('longitude'))
    //this.navCtrl.push(ViewBusStopPage, {fullname: marker.get('title'), stopid: marker.get('stopid'), operators: marker.get('operators'), latitude: marker.get('latitude'), longitude: marker.get('longitude')});
    }

    goTo(fullname, stopid, operators, latitude, longitude)
    {
        this.navCtrl.push(ViewBusStopPage, {fullname: fullname, stopid: stopid, operators: operators, latitude: latitude, longitude: longitude});
    }*/

}
