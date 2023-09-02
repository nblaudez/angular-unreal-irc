import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotifierModule } from 'angular-notifier';

import { ChatRoutingModule } from './chat-routing.module';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { QuerylistComponent } from './querylist/querylist.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ChatcontentComponent } from './chatcontent/chatcontent.component';
import { MessageboxComponent } from './messagebox/messagebox.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ActionlistComponent } from './actionlist/actionlist.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { PopupAuthComponent } from './leftsidebar/popup/popup-auth/popup-auth.component';
import { PopupRegisterComponent } from './leftsidebar/popup/popup-register/popup-register.component';
import { RoomlistPopupRegisterComponent } from './roomlist/popup/popup-register/roomlist-popup-register.component';
import { PopupKickComponent } from './userlist/popup/popup-kick/popup-kick.component';

import { PageModule } from './page/page.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PartenairesComponent } from './partenaires/partenaires.component';


@NgModule({
  declarations: [  
    ChatComponent,
    RoomlistComponent,
    QuerylistComponent,
    LeftsidebarComponent,
    UserlistComponent,
    ChatcontentComponent,
    MessageboxComponent,    
    TopbarComponent,
    ActionlistComponent,
    RightsidebarComponent,
    LoginComponent,    
    PopupAuthComponent,
    PopupRegisterComponent,
    RoomlistPopupRegisterComponent,
    PopupKickComponent,
    PartenairesComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatToolbarModule, 
    MatCheckboxModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    PageModule,
    NotifierModule
  ],
  exports:[
    ChatComponent,
    RoomlistComponent,
    QuerylistComponent,
    LeftsidebarComponent,
    UserlistComponent,
    ChatcontentComponent,
    MessageboxComponent,    
    TopbarComponent,
    ActionlistComponent,
    RightsidebarComponent,
    LoginComponent,    
    PopupAuthComponent,
    PopupRegisterComponent    
  ]
})
export class ChatModule { }
