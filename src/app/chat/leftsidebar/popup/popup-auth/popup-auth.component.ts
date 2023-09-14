import { Component } from '@angular/core';
import { AbstractComponent } from "../../../classes/abstract.component";

@Component({
  selector: 'popup-auth',
  templateUrl: './popup-auth.component.html',
  styleUrls: ['./popup-auth.component.scss']
})
export class PopupAuthComponent extends AbstractComponent {

    public password:string | null = null;
    
}
