import { Abstract } from './abstract';

export class User extends Abstract {
    
    public name: string | null = null;
    public password: string | null = null;
    public mode: string = "tn";
    public isAuth: boolean = false;
    public autoJoin:[] = [];    
    public aList:[] = [];
    public static instance : User;
    
    
    constructor(nickname: string, password: string | null = null) {
        super();
        this.name = nickname;        
        this.password = password;
    }
    
    addAutoJoin() {
    }
    removeAutoJoin(){
    }
    
    getAlist() {
    }
    
    addMode(mode: string) {
        if(this.mode.indexOf(mode) == -1) {
            this.mode = this.mode + mode;
        }
        this.irc.sendToIrc("ns"," set mode +" + mode); 
        return this.mode
    }
    
    removeMode(mode: string) {
        if(this.mode.indexOf(mode) != -1) {        
            this.mode = this.mode.replace(mode,"");
        }
        this.irc.sendToIrc("ns"," set mode -" + mode); 
        return this.mode;
    }
      
    identify(nickname:string, password:string) {        
        this.irc.sendToIrc("ns identify "+password);
    }
    
    register(nickname:string, password:string) {        
        this.irc.sendToIrc("ns register "+password);
    }
}
