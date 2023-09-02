import { Component } from '@angular/core';
import { AbstractComponent } from "../../../classes/abstract.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'roomlist-popup-register',
  templateUrl: './roomlist-popup-register.component.html',
  styleUrls: ['./roomlist-popup-register.component.scss']
})
export class RoomlistPopupRegisterComponent extends AbstractComponent {

    public description: string|null=null;
 
    constructor(public dialog: MatDialog) {
        super()
    }
}

