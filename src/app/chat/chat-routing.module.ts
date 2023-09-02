import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatcontentComponent } from './chatcontent/chatcontent.component';
import { ChatComponent } from './chat.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { JoinRoomComponent } from './page/joinroom/join-room.component';
import { RoomparametersComponent } from './page/roomparameters/roomparameters.component';

const routes: Routes = [    
    { 
        path: 'partenaires', component: PartenairesComponent   
    },
    { 
        path: 'chat/room/:room', component: ChatComponent,
        children: [
            { path: '', component: ChatcontentComponent, outlet:"chat" },     
        ]
    },
    { 
        path: 'chat/pages/room/join', component: ChatComponent,
        children: [
            { path: '', component: JoinRoomComponent, outlet: "chat" },            
        ]
    },
    { 
        path: 'chat/pages/room/parameters', component: ChatComponent,
        children: [
            { path: '', component: RoomparametersComponent, outlet: "chat" },            
        ]
    }        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
