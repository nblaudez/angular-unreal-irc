import { ChatComponent } from "../chat.component";
import { User } from "./user";
import { Room } from "./room";
import { Irc } from "./irc";

export class Interface {

    public dialogs: any = {};
    public rooms: any[] = [];
    public queries: any[] = [];
    public selectedItem: string = "info";    
    public users: any = {};
    public avaiableRooms: any[] = [];
    public avaiableRoomsTable: any;
    public chatContent: any = {"info":[]};
    public dialog: any;
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
    
    updateUserNick(oldnick:string, newnick:string) {
        if(oldnick == this.connectedUser?.name) {
            this.updateUser(newnick);
            if(newnick.indexOf("Guest") != -1) {
            this.notifier.notify("info",
                                "Votre pseudo à été changé en "+newnick+" car "+oldnick+" appartient déjà a quelqu'un");
            }                    
        }
        
        for(let room of this.rooms) {            
            this.irc.sendToIrc("names", room.name);
            this.chatContent[room.name].push({"type":"nick","oldnick":oldnick,"newnick":newnick});
        }
    }
    
    partRoom(room: string, nick: string) {
        
        if(nick == this.connectedUser?.name) {
            let rooms = [];
            let actualRooms = this.rooms;
            for (let actualRoom of this.rooms) {                
                if (actualRoom.name != room) {
                    rooms.push(actualRoom);
                }
            }
            this.rooms = rooms;
            delete this.chatContent[room];
        } else {
            this.chatContent[room].push({ "type": "part", "time": new Date(), "username": nick, "room": room });                
        }
        
    }
    
    updateUser(newnick: string) {        
        this.connectedUser = new User(newnick);
        this.irc.sendToIrc("ns info "+newnick);
    }
}
