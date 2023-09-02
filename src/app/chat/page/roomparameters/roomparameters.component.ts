import { Component, Inject } from '@angular/core';
import { AbstractComponent } from '../../classes/abstract.component';


@Component({
  selector: 'page-roomparameters',
  templateUrl: './roomparameters.component.html',
  styleUrls: ['./roomparameters.component.scss']
})
export class RoomparametersComponent extends AbstractComponent {
    public room: any;
    
    public viewOnList = true;
    public onInviteOnly = false;
    public needPassword = false;
    public chanPassword : string = "";
    
    constructor() {        
        super();        
        this.room = this.interface.selectedRoom;                         
                
        this.irc.sendToIrc("mode "+ this.room.name);
        this.irc.sendToIrc("cs info "+ this.room.name);
    }
    
    setViewOnList() {
        if(!this.viewOnList) {
            this.irc.sendToIrc("mode "+ this.room.name+ " +s");            
        } else {
            this.irc.sendToIrc("mode "+ this.room.name+ " -s");            
        }        
    }    
    
    setOnInvitOnly() {
        if(!this.onInviteOnly) {
            this.irc.sendToIrc("mode "+ this.room.name+ " -i");            
        } else {
            this.irc.sendToIrc("mode "+ this.room.name+ " +i");            
        }        
    }    
}
