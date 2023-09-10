import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../classes/abstract.component';
declare var $ : any;

@Component({
  selector: 'chat-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageboxComponent extends AbstractComponent {

  public textToSend: string="";  
  public viewJoinPart = true;

  public enableJoinPart(value: boolean) {    
    if(value) {
        $('.part').show();
        $('.join').show();
        $('.kick').show();
        $('.ban').show();
        $('.mode').show();
        $('.nick').show();
    } else {
        $('.part').hide();
        $('.join').hide();
        $('.kick').hide();
        $('.ban').hide();
        $('.mode').hide();
        $('.nick').hide();
    }    
  }
    
  public sendText() {       
            
      this.irc.sendToIrc ("PRIVMSG "+this.interface.selectedItem, this.textToSend);      
      
      if(!this.interface.chatContent[this.interface.selectedItem]) {
        this.interface.chatContent[this.interface.selectedItem] = [];
      }  
      let objDiv = document.getElementById("chatContent");
      if(objDiv) {                
        objDiv.scrollTop = objDiv.scrollHeight+20;                
      }
      if(this.textToSend.length > 0) {
        this.interface.chatContent[this.interface.selectedItem].push({"type":"text","time":new Date(), "username": this.irc.config.nick, "text": this.textToSend});
        this.textToSend="";
      }
  }
}
