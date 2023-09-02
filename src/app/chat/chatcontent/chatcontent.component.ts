import { Component,ViewEncapsulation,  AfterViewInit } from '@angular/core';
import { AbstractComponent } from '../classes/abstract.component';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'chat-content',
  templateUrl: './chatcontent.component.html',
  styleUrls: ['./chatcontent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatcontentComponent extends AbstractComponent implements AfterViewInit {

    constructor(public router: Router, public route: ActivatedRoute) {
        super();
    }
    
    ngAfterViewInit() {
        if(this.irc.isConnected != true) {
           this.router.navigate(['/']);
        }         
        let room = localStorage.getItem('roomToJoin') as string;                    
        this.interface.selectedItem = room;
    }    
}
