import { Component, NgZone, PACKAGE_ROOT_URL } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
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
import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';
import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';


/**
 * Generated class for the StopMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stop-map',
  templateUrl: 'stop-map.html',
})
export class StopMapPage {

  map: GoogleMap;
  busStops = [];
  marks = [];
  currentLat;
  currentLng;
  newMarkers: BaseArrayClass<any> = new BaseArrayClass<any>([]);
  POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([]);


  data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public busProvider: BusStopsProvider, public zone: NgZone, private geo: Geolocation, private http: Http) {

    this.geo.getCurrentPosition().then((resp) => {
        this.currentLat = resp.coords.latitude
        this.currentLng = resp.coords.longitude
        this.loadMap();
       }).catch((error) => {
         console.log('Error getting location', error);
         this.currentLat = 53.3498;
         this.currentLng = 6.2603;
         this.loadMap();
       });

       this.data = this.busProvider.getBusStops();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopMapPage');
    //this.getBusStops();
    //this.loadMap();
  }

  getBusStops()
    {

        let url = 'http://dublinbus.ie/Templates/Public/RoutePlannerService/RTPIMapHandler.ashx?ne=53.650000,-6.000000&sw=53.050000,-6.700000&zoom=13&czoom=16&rjson=true';
        
        this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          
          console.log("ssss: " + data);
          //i<data.points.length

          for(let i=0; i<100; i++)
          {
            this.busStops.push(data.points[i]);
            console.log("DATA: " + data.points[i].lat);
          }

          this.loadMap();
        });
        
        
        /*let data = this.busProvider.getBusStops();
        
        if(data)
        {
        for(let i=0; i<data.numberofresults; i++)
            {
                this.busStops.push(data.results[i]);
            }
        } */
    }

loadMap() {

   

   
    for(let i=0; i<this.busStops.length; i++)
    {
        this.POINTS.push({position: {lat:this.busStops[i].lat, lng:this.busStops[i].lng},
        //iconData: 'assets/imgs/bus-marker-dark.png',
        iconData: {
            url: "assets/imgs/bus-marker-dark.png",
            size: {
              width: 25,
              height: 25
            }
          }, 
        animation: 'DROP',
        title: this.busStops[i].address,
        stopid: this.busStops[i].stopnumber });
    } 

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
            lat: this.currentLat,
            lng: this.currentLng
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

    //this.loadMarkers();

 this.POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      data.icon = 'assets/imgs/bus-marker-dark.png';
      let marker: Marker = this.map.addMarkerSync(data);
      marker.setAnimation('drop');
      let iconData: any = marker.get('iconData');
      marker.setIcon(iconData);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onInfoClick);

   

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
                    'tilt': 60,
                    'zoom': 18,
                    'bearing': 140,
                    'duration': 5000 // = 5 sec.
                  });

               }).catch((error) => {
                 console.log('Error getting location', error);
                 
               });
        
        });


    this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe(
       (data) => {
           this.map.addListenerOnce('idle')
           {
            console.log("MAP WAS DRAGGED AND ENED");
            console.log("lat: " + this.map.getCameraPosition().target.lat);
            console.log("lng: " + this.map.getCameraPosition().target.lng);

            this.loadMarkers();
           }
            
       }
    );

  }

  placeMarkers()
    {
        for(let i=0; i<this.busStops.length; i++)
        {
            this.POINTS.push({position: {lat:this.busStops[i].latitude, lng:this.busStops[i].longitude},
            //iconData: 'assets/imgs/bus-marker-dark.png',
            iconData: {
                url: "assets/imgs/bus-marker-dark.png",
                size: {
                width: 25,
                height: 25
                }
            }, 
            animation: 'DROP',
            title: this.busStops[i].address,
            stopid: this.busStops[i].stopnumber });
        } 

        this.POINTS.forEach((data: any) => {
            data.disableAutoPan = true;
            data.icon = 'assets/imgs/bus-marker-dark.png';
            let marker: Marker = this.map.addMarkerSync(data);
            marker.setAnimation('drop');
            let iconData: any = marker.get('iconData');
            marker.setIcon(iconData);
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
            //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onInfoClick);
        })
        
    }
  
  loadMarkers(){
 
    let bounds = this.map.getVisibleRegion();

    let zoom = this.map.getCameraZoom()

    
    this.busStops = [];
        
        if(this.data)
        {
        for(let i=0; i<this.data.numberofresults; i++)
            {
                let latlng = new LatLng(parseFloat(this.data.results[i].latitude) , parseFloat(this.data.results[i].longitude));
                if(bounds.contains(latlng))
                {
                    //The marker is within the current view
                    console.log("TRUE");
                    this.busStops.push(this.data.results[i])
                } 
                else if(i == this.data.numberofresults - 1)
                {
                    this.placeMarkers();
                } 
                else
                {
                    console.log("FALSE");
                }
                
            }
        }
    
}
  
  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
    let iconData: any = marker.get('iconData');
    console.log("Marker Clicked Boi " + marker.get('title') + " stopid: " + marker.get('stopid'));
    marker.setIcon(iconData);
  }

  onInfoClick(params: any) {
    let marker: Marker = <Marker>params[1];
    let iconData: any = marker.get('iconData');
    console.log("INFO WINDOW CLICKED");
    marker.setIcon(iconData); 
    }
  
}



