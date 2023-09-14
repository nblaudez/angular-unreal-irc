import { Component } from '@angular/core';
import { AbstractComponent } from './classes/abstract.component';
import { PopupAuthComponent } from "./leftsidebar/popup/popup-auth/popup-auth.component";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

type message = {
    raw: any;
    tags: any;
    prefix: string;
    command: string;
    params: any;
};

interface roomInterface {
    roomName : string;
    nbUsers : number;
    topic : string;
}      
  
@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent extends AbstractComponent {
  
  sidebarLeft = true;
  sidebarRight = true;
  sidebarContent = true;
  section = 'all';
    
  constructor(public dialog: MatDialog) {
    super();
    
    this.interface.components["chat"] = this
  }

  display(section: string) {
    this.section = section
  }
  
  public openNickAuthPopup() {  
            
        const dialogRef = this.dialog.open(PopupAuthComponent, {});

        dialogRef.afterClosed().subscribe((result: string) => {
          this.irc.sendToIrc("ns identify "+result);
        });
          
  }
}
