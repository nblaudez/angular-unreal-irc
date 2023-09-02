import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AideRoutingModule } from './aide-routing.module';
import { AideHomeComponent } from './home/home.component';
import { AideAComponent } from './pages/aide-a/aide-a.component';


@NgModule({
  declarations: [
    AideHomeComponent,
    AideAComponent
  ],
  imports: [
    CommonModule,
    AideRoutingModule
  ]
})
export class AideModule { }
