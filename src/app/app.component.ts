import { Component } from '@angular/core';
import { MDCTopAppBar } from '@material/top-app-bar';
import { Irc } from './chat/classes/irc';
import { Interface } from './chat/classes/interface';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog'; 
import { AbstractComponent } from './chat/classes/abstract.component';    
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent extends AbstractComponent {
  title = 'front';
  sidebarLeft = true;
  sidebarRight = true;
  sidebarContent = true;  
  
  constructor(public router: Router, public notifier: NotifierService, public dialog : MatDialog) {
    super();
    this.interface.dialog = dialog;
    Irc.getInstance();
    
    this.interface.router = router;  
    this.interface.notifier = notifier;  
    const topAppBarElement: HTMLElement | null = document.querySelector('.mdc-top-app-bar');
    if(topAppBarElement) {
        const topAppBar = new MDCTopAppBar(topAppBarElement);
    }   
  }
      
}
