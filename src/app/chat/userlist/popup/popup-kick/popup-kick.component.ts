import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-kick',
  templateUrl: './popup-kick.component.html',
  styleUrls: ['./popup-kick.component.scss']
})
export class PopupKickComponent {

    public reason:string="";   
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: {nickname: string, channel: string}) { }
}
