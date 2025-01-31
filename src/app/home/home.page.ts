import { Component } from '@angular/core';

import { SettingsService } from '../services/settings.service';

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
  interval: any;
  animate: Boolean = false;
  available_notes: String[] = [];
  marker_left: String = '0%';
  marker_top: String = '0%';

  fret_board = "../../assets/fret-board.png";

  constructor(public settings: SettingsService) {}

  start() {
    this.playing = true;
    this.switchNote(); // Immediately switch to a new note and string when starting.
    this.interval = setInterval(() => {
      this.switchNote(); // Schedule the switchNote function to be called periodically.
    }, this.settings.seconds * 1000);
  }

  setAvailableNotes() {
    var possible_notes = ["A","B","C","D","E","F","G"];

    if (this.settings.sharps) {
      const more_notes = ["A#", "C#", "D#", "F#", "G#"];
      possible_notes = possible_notes.concat(more_notes);
    }
    if (this.settings.flats) {
      const more_notes = ["Bb", "Db", "Eb","Gb","Ab"];
      possible_notes = possible_notes.concat(more_notes);
    }
    this.available_notes = possible_notes;
  }

  stop() {
    this.playing = false;
    clearInterval(this.interval); // Stop the periodic execution of switchNote.
    this.note = "";
    this.string = "";
    this.oldNote = "";
    this.oldString = "";
  }

  setMarkerString(string:number) {

    //Top Values: String 1: 0, String 2: 14.5%, String 3: 29.5%, String 4: 44.5%, String 5: 59.5%, String 6: 74.5%
    const string_values: number[] = [0, 14.5, 29.5, 44.5, 59.5, 74.5];
    this.marker_top = String(string_values[string] + '%');
  }

  setMarkerFret(note:String, string:number) {
    //Left Values: Fret 1: 5% Fret 2  13% Fret 3  21%  Fret 4  29% Fret 5 36.5% Fret 6 45% Fret 7 52% Fret 8 60% Fret 9 68% Fret 10 76%  Fret 11 84%
    const flatToSharp = [
      { flat: "Ab", sharp: "G#"},
      { flat: "Bb", sharp: "A#"},
      { flat: "Db", sharp: "C#"},
      { flat: "Eb", sharp: "D#"},
      { flat: "Gb", sharp: "F#"}
    ]
    //if the note is a flat, convert it to a sharp. 
    if (note.endsWith(note.charAt(note.length - 1))) {
      for (let i = 0; i<flatToSharp.length;i++) {
        if (flatToSharp[i].flat == note) {
          console.log("Converting " + note + " to " + flatToSharp[i].sharp);
          note = flatToSharp[i].sharp;
          break;
        }
      }
    }
    const tuning: String[] = ["E", "B", "G", "D", "A", "E"];
    const all_notes: String[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    let stringPostion = all_notes.indexOf(tuning[string]);
    let notePosition = all_notes.indexOf(note);
    let fret = 0;
    if (stringPostion == notePosition) {
      //open string
    }
    else if (stringPostion < notePosition) {
      fret = notePosition - stringPostion;

    }
    else {
      fret = (12 - stringPostion) + notePosition;
    }
    
    //Left Values: Fret 1: 5% Fret 2  13% Fret 3  21%  Fret 4  29% Fret 5 36.5% Fret 6 45% Fret 7 52% Fret 8 60% Fret 9 68% Fret 10 76%  Fret 11 84%
    const positions: String[] = ["0%", "5%", "13%", "21%", "29%", "36.5%", "45%", "52%", "60%", "68%", "76%", "84%"];
    this.marker_left = positions[fret];
  }

  switchNote() {
    //set all possible notes
    if (this.available_notes.length == 0) {
      this.setAvailableNotes();
    }

    const possible_strings = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    const randomString = Math.floor(Math.random() * possible_strings.length);
    const randomNote = Math.floor(Math.random() * this.available_notes.length);

    // Set the marker to the correct String
    if (this.settings.visual_note)
      this.setMarkerString(randomString);

    // Set the new string and note values.
    this.string = possible_strings[randomString];
    this.note = this.available_notes[randomNote];

    if (this.settings.visual_note)
      this.setMarkerFret(this.note, randomString);

    // Get rid of last note
    this.available_notes.splice(randomNote, 1);

    this.animate = true; // Trigger the animation for the old note and string.

    setTimeout(() => {
      this.animate = false; // Reset animation state after the animation completes.

      // Update oldString and oldNote to the current string and note values.
      this.oldString = this.string;
      this.oldNote = this.note;

    }, 750); // Duration of the animation in milliseconds.
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key == ' ') {
      if (this.playing) {
        this.stop();
      }
      else {
        this.start();
      }
    }

  }
}
