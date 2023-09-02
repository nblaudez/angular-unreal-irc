import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AbstractComponent } from './../classes/abstract.component';
import { Router } from '@angular/router';
@Component({
  selector: 'chat-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent extends AbstractComponent {
    
    constructor(public router: Router) {
        super();
    }
}
