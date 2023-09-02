import { Irc } from './irc';
import { Interface } from './interface';
import { Room } from './room';
import { User } from './user';

export class Abstract {

    public irc : Irc = Irc.getInstance();
    public interface : Interface = Interface.getInstance();
    public room: Room | null= null;
    public user: User | null= null;
        
}
