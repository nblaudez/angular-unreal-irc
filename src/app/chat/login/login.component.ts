import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractComponent } from '../classes/abstract.component';

@Component({
    selector: 'chat-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends AbstractComponent {

    public username : string;
    public password : string = "";//"tch4tus3r852";

    constructor(public router: Router, public route: ActivatedRoute) {
        super();
        let number = Math.floor(Math.random() * 10000);
        this.username = "Guest"+number;
        this.router = router;
        
        if(this.route.snapshot.paramMap.get('room')) {
            let room = '#'+this.route.snapshot.paramMap.get('room');            
            localStorage.setItem('roomToJoin', room);                       
        } 
    }
    public connect() {        
        this.irc.config.nick = this.username;
        this.irc.config.password = this.password;
        this.irc.connect();        
        this.router.navigate(["chat/room/cafe"]);
    }
}