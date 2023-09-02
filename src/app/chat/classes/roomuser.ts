import { Abstract } from './abstract';

export class RoomUser extends Abstract {
    
    public nickname: string;    
    public roomname: string;    
    
    public isOwner = false;
    public isAdmin = false;
    public isOp = false;
    public isHop = false;
    public isVoice = false;
    
    constructor(nickname: string, roomname: string) {
        super();
        
        this.nickname = nickname;
        this.roomname = roomname;
    }
    
}
