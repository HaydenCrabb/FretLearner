import { Component, OnInit } from '@angular/core';
import { IonRange, RangeCustomEvent } from '@ionic/angular';

import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  seconds:number = 1;

  constructor(public settings: SettingsService) { 
    this.seconds = this.settings.seconds;
  }

  ngOnInit() {
  }

  rangeChange(event: RangeCustomEvent) {
    this.seconds = Number(event.detail.value);
    this.settings.changeSeconds(this.seconds); // Update the interval timing based on user input.
  }
}
