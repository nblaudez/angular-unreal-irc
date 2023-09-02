import { Component } from '@angular/core';
import { AbstractComponent } from './../../chat/classes/abstract.component';

@Component({
  selector: 'app-aide-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AideHomeComponent extends AbstractComponent {

    public section = "0";

    constructor() {
        super()
    }
    
    help(section: string) {
        this.section = section;
    }
}
