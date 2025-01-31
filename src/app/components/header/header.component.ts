import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {

  @Input() page: string = "play";
  button_label: string = "Settings";

  constructor(private router: Router, public settings: SettingsService) {}

  ngOnInit() {
    if (this.page == "play") {
      this.button_label = "Settings";
    }
    else if (this.page == "settings") {
      this.button_label = "Start Playing";
    }
  }

  move() {
    if (this.page == "play") {
      this.router.navigate(['/settings']);
    }
    else if (this.page == "settings") {
      this.settings.save();
      this.router.navigate(['/home']);
    }
  }
}