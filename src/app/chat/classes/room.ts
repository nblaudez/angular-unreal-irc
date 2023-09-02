import { Abstract } from './abstract';
import { User } from './user';

export class Room extends Abstract{
    
    public name: string | null = null;
    public cleanedName: string | null = null;   
    public mode: string = "tn";
    public topic: string | null = null;
    public owner: string | null = null;
    public nbUsers : number = 0;
    public entryMsg: string | null = null;
    public users: User[]= [];
    public invites: any[] = [];
    public kicks: any[] = [];
    public bans: any[] = [];
    public modes: any = {};
    public isProtected = false;
    
    constructor(name: string) {
        super();
        this.name = name;
    }    
   
    
    setMode(mode: string) {
        this.mode = mode;
    }
    addMode(mode: string) {
        if(this.mode.indexOf(mode) == -1) {
            this.mode = this.mode + mode;
        }
        return this.mode
    }
    
    removeMode(mode: string) {
        if(this.mode.indexOf(mode) != -1) {        
            this.mode = this.mode.replace(mode,"");
        }
        
        return this.mode;
    }
    
    haveMode(mode: string) {
        if(this.mode.indexOf(mode) != -1) {        
            return true;
        } else {
            return false;
        }
    }
    
    ban(nickname: string) {
    }
    unban(nickname: string) {
    }
    
    akick(nickname: string) {
    }   
    deakick(nickname: string) {
    }
    
    invite(nickname: string) {
    }
    unvite(nickname: string) {
    }
    
    setAccess(nickname: string, access: number) {
    }
    
    register() {
    }
    
    identify() {
    }
}
