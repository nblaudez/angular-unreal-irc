import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../classes/abstract.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PopupKickComponent } from './popup/popup-kick/popup-kick.component';

@Component({
  selector: 'chat-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserlistComponent extends AbstractComponent{

    public isOperator = false;
    
    constructor(public dialog: MatDialog) {
        super();
    }

        
    setMode(mode: string ,user:any) {
        this.irc.sendToIrc('mode '+this.interface.selectedItem+' '+mode+' '+user.nickname);
    }

    openQuery(nickname: string) {
        this.interface.queries.push({"nickname":nickname, "status": "read","type":"query"});
    }    
    
    ban(nickname: string) {
        let channel = this.interface.selectedItem;
        
        let dialogRef = this.dialog.open(PopupKickComponent, {
            data: {
                nickname: nickname,
                channel: channel    
            },
        });
        let obj = this;
        dialogRef.afterClosed().subscribe(reason => {                                    
            obj.irc.whoisNicknameToBan = nickname;
            obj.irc.sendToIrc('whois '+nickname);                        
            obj.irc.sendToIrc("kick "+channel +' '+nickname+ ' '+reason);                        
        });
    }
        
    ignore(nickname: string) {    
        this.interface.ignoreList.push(nickname);
        this.interface.notifier.notify("success",nickname+ "à été ajouté à la liste d'ignore");
    }
    designore(nickname: string) {    
        this.interface.ignoreList = this.interface.ignoreList.filter((anickname, i) => anickname != nickname);;
        this.interface.notifier.notify("success",nickname+ "à été enlevé de la liste d'ignore");
    }
    
    kick(nickname: string) {
        let channel = this.interface.selectedItem;
        
        let dialogRef = this.dialog.open(PopupKickComponent, {
            data: {
                nickname: nickname,
                channel: channel    
            },
        });
        let obj = this;
        dialogRef.afterClosed().subscribe(reason => {            
            obj.irc.sendToIrc("kick "+channel +' '+nickname+ ' '+reason);                        
        });
    }
}
