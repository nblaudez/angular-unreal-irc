import { Component } from '@angular/core';
import { AbstractComponent } from './classes/abstract.component';


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
    
  constructor() {
      super();       
  }
  
  display(section: string) {
    this.section = section
  }
}
