import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from './../classes/abstract.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PopupRegisterComponent } from "./popup/popup-register/popup-register.component";
import { User } from "./../classes/user";

@Component({
    selector: 'chat-leftsidebar',
    templateUrl: './leftsidebar.component.html',
    styleUrls: ['./leftsidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeftsidebarComponent extends AbstractComponent {

    public newNickname: string = "nouveauPseudo";
    public updateNickname = false;


    constructor(public dialog: MatDialog) {
        super()
    }

    changeNickname() {
        if (this.newNickname.length > 0) {
            this.irc.sendToIrc("nick", this.newNickname);                        
            this.updateNickname = false
        }
    }

    auth() {
        this.interface.components["chat"].openNickAuthPopup();
    }

    register() {
        let dialogRef = this.dialog.open(PopupRegisterComponent, {
            data: {
                nickname: this.interface.connectedUser?.name,
            },
        });
        let obj = this;
        dialogRef.afterClosed().subscribe(result => {
            obj.irc.sendToIrc("ns register "+result);
        });
    }
}
