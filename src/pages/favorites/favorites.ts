import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites = [];

  canReorder: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, public alertCtrl: AlertController) {

    this.nativeStorage.getItem('favorites')
    .then(
      data => this.favorites = data,
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  goToBusStopPage(stopId, fullname, operators, latitude, longitude)
  {
    console.log("StopId: " + stopId);
    console.log("fullname: " + fullname);
    console.log("operators: " + operators);

    this.navCtrl.push(ViewBusStopPage, {stopid: stopId, fullname: fullname, operators: operators, latitude: latitude, longitude: longitude});
  }

  editNickname(stopid)
  {
    let nickname;
    let stopidToCheck = stopid;
    console.log("Stopid: " + stopidToCheck);

    const prompt = this.alertCtrl.create({
      title: 'Nickname',
      message: "Enter a name for this bus stop",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log("nick: " + data.title);
            this.saveNickname(data.title, stopidToCheck);
          }
        }
      ]
    });
    prompt.present();
  
  }

  saveNickname(nickname, stopToCheck)
  {
    console.log("nickname to save: " + nickname);
    console.log("Stop to check: " + stopToCheck);

    for(let i=0; i<this.favorites.length; i++)
    {
      if(this.favorites[i].stopid === stopToCheck)
      {
        console.log("Favorite Found");
        this.favorites[i].nickname = nickname;

        this.nativeStorage.setItem('favorites', this.favorites)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
      }
    }
    
  }

  removeFavorite(stopId)
  {
    let stopToRemove = stopId;
  
    let updated = this.favorites.filter(function(el) {
      return el.stopid !== stopToRemove;
    });

      this.favorites = updated;
      this.nativeStorage.setItem('favorites', this.favorites)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  reorderItems(indexes) {
    let element = this.favorites[indexes.from];
    this.favorites.splice(indexes.from, 1);
    this.favorites.splice(indexes.to, 0, element);

    this.nativeStorage.setItem('favorites', this.favorites)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  toggleReorder() {

    console.log("TOGGLE")
    if(this.canReorder === true)
    {
      this.canReorder = false;
      console.log("reorder false")
    }
    else if(this.canReorder === false)
    {
      this.canReorder = true;
      console.log("reorder true");
    }
  }

}
