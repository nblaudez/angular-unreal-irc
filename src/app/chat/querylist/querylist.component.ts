import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../classes/abstract.component';

@Component({
    selector: 'chat-querylist',
    templateUrl: './querylist.component.html',
    styleUrls: ['./querylist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuerylistComponent extends AbstractComponent {

    public pmPermitted = true;

    setPm() {
        if(this.pmPermitted == false) {
            this.irc.sendToIrc("mode "+this.irc.connectedUser?.name+" +D");            
        } else {
            this.irc.sendToIrc("mode "+this.irc.connectedUser?.name+" -D");            
        }   
    }
    closeQuery(nickname: string) {
        console.log("### QUERy:", nickname);
        let newQueriesList = [];
        for(let query of this.interface.queries) {
            console.log("### QUERy:", nickname, query.nickname);
            if(query.nickname != nickname) {
                newQueriesList.push(query);
            }
        }
        this.interface.queries = newQueriesList;
        
        delete this.interface.chatContent[nickname];
        
        this.interface.selectedItem = '#cafe';
    }

}
