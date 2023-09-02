import {ChatComponent} from "../chat.component"
import { Irc } from "./irc";
import { Interface } from "./interface";

export abstract class AbstractComponent {
        
    public irc = Irc.getInstance();
    public interface = Interface.getInstance();
    
    public objectKeys = Object.keys;
    public stringToNumber = Number;
}