import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StopMapPage } from './stop-map';

@NgModule({
  declarations: [
    StopMapPage,
  ],
  imports: [
    IonicPageModule.forChild(StopMapPage),
  ],
})
export class StopMapPageModule {}
