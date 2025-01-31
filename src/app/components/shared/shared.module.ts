import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [HeaderComponent], //declare shared modules here
  exports: [HeaderComponent], // declare shared modules here to export them.
  imports: [CommonModule, IonicModule],
})
export class SharedModule {}