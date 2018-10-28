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

/**
 * Generated class for the ViewStopMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-stop-map',
  templateUrl: 'view-stop-map.html',
})
export class ViewStopMapPage {

  stopid;
  fullname;
  operators;
  latitude;
  longitude;

  map: GoogleMap;
  busStops = [];
  marks = [];
  currentLat;
  currentLng;
  newMarkers: BaseArrayClass<any> = new BaseArrayClass<any>([]);
  POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([]);

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation) {

    this.stopid = this.navParams.get('stopid');

    this.fullname = this.navParams.get('fullname');
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');
    this.operators = this.navParams.get('operators');
    this.geo.getCurrentPosition().then((resp) => {
        this.currentLat = resp.coords.latitude
        this.currentLng = resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
         this.currentLat = 53.3498;
         this.currentLng = 6.2603;
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewStopMapPage');
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

    this.map = GoogleMaps.create('map', {
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
            lat: this.latitude,
            lng: this.longitude
          },
          'tilt': 30,
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

    let marker: Marker = this.map.addMarkerSync({
        title: this.fullname,
        icon: '#1abc9c',
        stopid: this.stopid,
        operators: this.operators,
        latitude: this.latitude,
        longitude: this.longitude,
        animation: 'DROP',
        position: {
          lat: this.latitude,
          lng: this.longitude
        }
      });
      //marker.setAnimation('drop');
      //let iconData: any = marker.get('iconData');
      //marker.setIcon(iconData);
      //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onInfoClick);

   

   /* marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
        (data) => {
            console.log("new method clicked");
            this.navCtrl.push(ViewBusStopPage, {fullname: marker.get('title'), stopid: marker.get('stopid'), operators: marker.get('operators'), latitude: marker.get('latitude'), longitude: marker.get('longitude')});
            this.map.destroy();
    });*/

    this.map.addEventListener(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(
    (data) => {
        console.log("BUTTON CLICKED");

        this.geo.getCurrentPosition().then((resp) => {
            this.currentLat = resp.coords.latitude
            this.currentLng = resp.coords.longitude

            let pos = {'lat':resp.coords.latitude, 'lng':resp.coords.longitude}
            
            this.map.animateCamera({
                'target': pos,
                //'tilt': 60,
                'zoom': 17,
                //'bearing': 140,
                'duration': 400
                });

            }).catch((error) => {
                console.log('Error getting location', error);
                
            });
    
    });

  }

  /*onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
    //let iconData: any = marker.get('iconData');
    console.log("Marker Clicked Boi " + marker.get('title') + " stopid: " + marker.get('stopid'));
    //marker.setIcon(iconData);
  } */

  /*onInfoClick(params: any) {
    let marker: Marker = <Marker>params[1];
    //let iconData: any = marker.get('iconData');
    console.log("INFO WINDOW CLICKED");
    //marker.setIcon(iconData); 
    }*/

}
