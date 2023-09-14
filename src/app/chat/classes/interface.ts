import { ChatComponent } from "../chat.component";
import { User } from "./user";
import { Room } from "./room";
import { Irc } from "./irc";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';


export class Interface {

    public dialog: any = {};
    public components: any = {};
    public rooms: any[] = [];
    public queries: any[] = [];
    public selectedItem: string = "info";    
    public users: any = {};
    public avaiableRooms: any[] = [];
    public avaiableRoomsTable: any;
    public chatContent: any = {"info":[]};    
    public selectedRoom: Room | null = null
    public static instance: Interface; 
    public instances: any = {};
    public router:any;
    public notifier:any;
    public connectedUser : User|null = null;
    public irc: Irc = Irc?.getInstance();
    public canRegisterNickname = false;
    public canAuthNickname = false;
    public ignoreList : string [] = [];
    public section = "chat";    
    
    public static getInstance(): Interface {
        if (!Interface.instance) {
            Interface.instance = new Interface();         
        }

        return Interface.instance;
    }

    public changeSelectedItem(name: string) {
        this.selectedItem = name;        
    }
    
   
    
    updateUser(newnick: string) {        
        this.connectedUser = new User(newnick);
        this.irc.sendToIrc("ns info "+newnick);
    }
}
