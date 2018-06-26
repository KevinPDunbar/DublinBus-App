import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  ILatLng,
  BaseArrayClass
} from '@ionic-native/google-maps';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public busProvider: BusStopsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopMapPage');
    
    this.getBusStops();
    this.loadMap();
  }

  getBusStops()
    {
        let data = this.busProvider.getBusStops();
        
        if(data)
        {
        for(let i=0; i<data.numberofresults; i++)
            {
                this.busStops.push(data.results[i]);
            }
        } 
    }

 /* loadMap(){
 

    this.map = new GoogleMap('map', {
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
          lat: 53.3498,
          lng: -6.2603
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

   

    
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
       this.populateMap();

    });

  }


  populateMap()
  {

    this.map.addMarker({
        title: '',
        icon: 'blue',
        position: {
          lat: 53.3498,
          lng: -6.2603,
        }
      }).then((marker: Marker) => {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { console.log('Marker clicked...'); });
    });



    for(let i=0; i<100; i++)
    {
       let marker = this.map.addMarker({
            title: this.busStops[i].fullname,
            icon: 'blue',
            position: {
              lat: this.busStops[i].latitude,
              lng: this.busStops[i].longitude
            }
          }).then((marker) => {
            marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { console.log('Marker clicked'); })
            })
            .catch(err => console.log(err));

        
    } 

  }


} */

loadMap() {

    let POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([

    ]);

    for(let i=0; i<100; i++)
    {
        POINTS.push({position: {lat:this.busStops[i].latitude, lng:this.busStops[i].longitude},
        iconData: 'blue',
        title: this.busStops[i].fullname,
        stopid: this.busStops[i].stopid,
        operators: this.busStops[i].operators[0].routes });
    }

    let POINTS2: BaseArrayClass<any> = new BaseArrayClass<any>([
      {
        position: {lat:41.79883, lng:140.75675},
        iconData: "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/24/Number-2-icon.png"
      },
      {
        position: {lat:41.799240000000005, lng:140.75875000000002},
        iconData: "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/24/Number-2-icon.png"
      },
      {
        position: {lat:41.797650000000004, lng:140.75905},
        iconData: {
          url: "http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/48/Number-3-icon.png",
          size: {
            width: 24,
            height: 24
          }
        }
      },
      {
        position: {lat:41.79637, lng:140.76018000000002},
        title: "4",
        iconData: "blue"
      },
      {
        position: {lat:41.79567, lng:140.75845},
        title: "5",
        iconData:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACVUlEQVRIS8WWjVXCMBRGwwTqBMIEuAG4ARuIE6gTKBOgEyAT4AbABjKBMIE/C+h3m6S2pWlJ8BzfOTkpad6770teEzom3bZy/VbrpYTopDjJZ6w2c77X6p9j46SCUXvuYDxHq04BZ2rPHXa3y/DRqlPAmdqZW+hrkMZEq44F52q3oGTdrjEpqmPBudoxKVBVKqsU1THgPbW+klNUt4GHCn6idqEGuMveerUeXFGtNTCvah9qaz+n2gMmKMGBnLrfjPFcMirZ7231XUF19RUJkIhPZqXnT8AM9Osy62v0VPihUqIfjWwx1RkJvbxIpjArhabfbEJ6zQYwysiiT3CW8kJ6Q4BgqMALEnqVNAqQZGSkM/R7nMOBLhZ/B/ZQeg9V/1EsrpLy5dIqP8aAXV6WlQIlZrWq/wzeBK0DM3Y0vA0aAh8FPwTaBC7B2W8+qUOMT4l9dYUUrJK2k4tCOHl7O7zK+Xx69nbWU/iebgKz1+9E+OYPToR1fqOe+SquujeBWdzlYGBPohhjW9b2lGbRa72bwLdyml5d2auvaPyeTOzIw4MxzCkal8h8no3cqT3WJd0ExuFmOjXmlhRIXbnfKZQ7hfJ4HDTM8wVIMi6xJ01y3mV8E5glGlDRGIEKS75DrAtFn/0DA3x/b0ddZbPgGt23JnBW0agpKPzUGCvhoT4iv1HG9Zodtc6HGBTYnoXAXc3UR5SbBwK1d8y+8RUAzxNwU2orOwQeyolF/lLT7mUqQ8BqCj4Bt+j1lR0Cs3Sopt8GFLYNF/2JU7K2k6stePL7fwP/AER2xy+mY1/QAAAAAElFTkSuQmCC"
      }/*,
      {
        title: "6",
        position: {lat:41.794470000000004, lng:140.75714000000002},
        iconData: window.location.href.replace(/\/([^\/]+)$/, "") + "/../images/number-6-icon.png"
      },
      {
        position: {lat:41.795010000000005, lng:140.75611},
        iconData: "cdvfile://"   // The cdvfile:// protocol is acceptable.
      },
      {
        position: {lat:41.79477000000001, lng:140.75484},
        iconData: "file://"   // The file:// protocol is also acceptable.
      },
      {
        position: {lat:41.79576, lng:140.75475},
        iconData: "/path/to/image/file"  // Absolute path is also acceptable.
      }
      */
    ]);

    let bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      console.log(data);
      return data.position;
    });

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
            lat: 53.3498,
            lng: -6.2603
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
    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      data.icon = 'yellow';
      let marker: Marker = this.map.addMarkerSync(data);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onInfoClick);
    });

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
    let that = this;
    that.navCtrl.push(ViewBusStopPage, {stopid: marker.get('stopid'), fullname: marker.get('title'), operators: marker.get('operators'), latitude: marker.get('latitude'), longitude: marker.get('longitude')});
    
  }

  

}



