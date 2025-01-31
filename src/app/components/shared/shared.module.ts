import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from '../header-bar/header-bar.component';

@NgModule({
  declarations: [HeaderBarComponent], //declare shared modules here
  exports: [HeaderBarComponent], // declare shared modules here to export them.
  imports: [CommonModule, IonicModule],
})
export class SharedModule {}