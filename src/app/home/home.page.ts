import { Component } from '@angular/core';
import { IonRange, RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  note: String = "";
  string: String = "";
  oldNote: String = "";
  oldString: String = "";
  playing: Boolean = false;
  seconds: number = 15;
  interval: any;
  animate: Boolean = false;

  constructor() {}

  start() {
    this.playing = true;
    this.switchNote();
    this.interval = setInterval(() => this.switchNote(), this.seconds * 1000);
  }

  stop() {
    this.playing = false;
    clearInterval(this.interval);
    this.note = "";
    this.string = "";
    this.oldNote = "";
    this.oldString = "";
  }

  switchNote() {
    this.animate = true; // Trigger animation
    this.oldString = this.string;
    this.oldNote = this.note;

    setTimeout(() => {
      const possible_strings = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
      const possible_notes = ["A","B","C","D","E","F","G", "A#", "C#", "D#", "F#", "G#", "Bb", "Db", "Eb","Gb","Ab"];

      const randomString = Math.floor(Math.random() * 6);
      const randomNote = Math.floor(Math.random() * 7);

      this.string = possible_strings[randomString];
      this.note = possible_notes[randomNote];

      this.animate = false; // Reset animation state
    }, 500); // Duration of the animation
  }

  rangeChange(event: RangeCustomEvent) {
    console.log(event.detail.value);
    this.seconds = Number(event.detail.value);
  }
}
