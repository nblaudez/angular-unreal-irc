import {RoomUser} from "./roomuser";

export class RoomUserList {
    
    public users: RoomUser[] = [];
    
    append(roomuser: RoomUser) {
        this.users.push(roomuser);
    }
    
    sort() {
        this.users.sort(function(a: RoomUser, b:RoomUser):number {
            if(a.isOwner && b.isOwner) {
                if(a.nickname < b.nickname) 
                    return -1;
                else if(a.nickname == b.nickname)
                    return 0
                else return 1    
            } else if (a.isOwner && !b.isOwner) {
                return -1
            } else if(!a.isOwner && b.isOwner) {
                return 1
            }     
            
            if(a.isAdmin && b.isAdmin) {
                if(a.nickname < b.nickname) 
                    return -1;
                else if(a.nickname == b.nickname)
                    return 0
                else return 1    
            } else if (a.isAdmin && !b.isAdmin) {
                return -1
            } else if(!a.isAdmin && b.isAdmin) {
                return 1
            }     
            
            if(a.isOp && b.isOp) {
                if(a.nickname < b.nickname) 
                    return -1;
                else if(a.nickname == b.nickname)
                    return 0
                else return 1    
            } else if (a.isOp && !b.isOp) {
                return -1
            } else if(!a.isOp && b.isOp) {
                return 1
            }     
            
            if(a.isHop && b.isHop) {
                if(a.nickname < b.nickname) 
                    return -1;
                else if(a.nickname == b.nickname)
                    return 0
                else return 1    
            } else if (a.isHop && !b.isHop) {
                return -1
            } else if(!a.isHop && b.isHop) {
                return 1
            }
            
            if(a.isVoice && b.isVoice) {
                if(a.nickname < b.nickname) 
                    return -1;
                else if(a.nickname == b.nickname)
                    return 0
                else return 1    
            } else if (a.isVoice && !b.isVoice) {
                return -1
            } else if(!a.isVoice && b.isVoice) {
                return 1
            } 
            
            if(a.nickname < b.nickname) 
                return -1;
            else if(a.nickname == b.nickname)
                return 0
            else return 1        
        });        
    }
}
