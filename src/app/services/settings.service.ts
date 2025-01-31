import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  seconds: number = 15;
  sharps: Boolean = true;
  flats: Boolean = true;
  visual_note: Boolean = true;

  constructor() { }


  changeSeconds(new_seconds:number) {
    this.seconds = new_seconds;
  }

  toggleSharps() {
    this.sharps = !this.sharps;
  }
  toggleFlats() {
    this.flats = !this.flats;
  }

  toggleVisual() {
    this.visual_note = !this.visual_note;
  }

  save() {
    //save the settings to a cookie
  }
}
