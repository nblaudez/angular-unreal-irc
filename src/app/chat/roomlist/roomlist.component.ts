import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AbstractComponent } from '../classes/abstract.component';
import { RoomInterface } from '../classes/room.interface';
import { Room } from '../classes/room';
import { RoomlistPopupRegisterComponent } from './popup/popup-register/roomlist-popup-register.component';

@Component({
    selector: 'chat-roomlist',
    templateUrl: './roomlist.component.html',
    styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent extends AbstractComponent {

    constructor(private router: Router, public dialog: MatDialog) {
        super();
    }

    leaveRoom(room: RoomInterface) {        
        this.irc.sendToIrc('PART', room.name);
        this.selectRoom({name:'#cafe'});
    }
    
    selectRoom(room: any) {
        this.router.navigate(['/chat/room/'+room.name]);
        this.interface.changeSelectedItem(room.name);        
    }
    
    goTo(room: string, data: any = null) {
        switch(room) {
            case "joinRoom":                
                this.router.navigate(['/chat/pages/room/join']);
                break;
            case "roomParameters":
                this.interface.selectedRoom = data.room;
                this.router.navigate(['/chat/pages/room/parameters']);
                break;
        }
    }
        
    
    unregisterRoom(roomName: Room) {
    }
    
    registerRoom(roomName: Room) {
        let dialogRef = this.dialog.open(RoomlistPopupRegisterComponent, {
            data: {
                roomName: roomName,
            },
        });
        let obj = this;        
        dialogRef.afterClosed().subscribe(result => {
            obj.irc.sendToIrc("cs register "+roomName.name+" "+result);
            obj.irc.sendToIrc("cs set keepmodes "+ roomName.name+ " on");
            obj.irc.sendToIrc("cs set keeptopic "+ roomName.name+ " on");
            obj.irc.sendToIrc("topic "+roomName.name+" "+result);
        });
    }    
}
