import { ChatComponent } from "../chat.component";
import { RoomInterface } from "./room.interface";
import { MessageInterface } from "./message.interface";
import { Interface } from "./interface";
import { User } from "./user";
import { Room } from "./room";
import { RoomUser } from "./roomuser";
import { RoomUserList } from "./roomuserlist";

declare var $: any;

export class Irc {

    isConnected = false;    
    isOperator = true;
    ws: any;
    static interface: Interface = Interface.getInstance();
    connectedUser : User | null = null;
    whoisNicknameToBan: string | null = null;
    config = {
        server: {
            id: 'tchat-1',
            name: 'Tchat server',
            webSocketUrl: 'wss://irc.tchat.cafe:7002',
            channels: ["#cafe"],
            timestamp: 0,
            hidden: false
        },
        nick: 'tchatuser',
        password: '',
        host: 'localhost',
        user: 'tchat-user',
        info: 'tchat-user',
        version: 'tchat.cafe 1.0 - https://www.tchat.cafe/',
        joinChannels: ["#cafe"]
    };    
    vars : any = {"channelInfo":false};

    public static instance: Irc;

    setUser(nickname:string, password : string | null = null) {
        this.connectedUser = new User(nickname, password);
    }

    public static getInstance(): Irc {
        if (!Irc.instance) {
            Irc.instance = new Irc();
        }
        
        return Irc.instance;
    }

    public connect() {        
        this.ws = new WebSocket(this.config.server.webSocketUrl);
        let obj = this;        
        let password = (obj.config.password != "") ? obj.config.password : null; 
        let user = new User(obj.config.nick, password);
        Irc.interface.connectedUser = user;
        this.connectedUser = user;
        
        this.ws.onopen = function() {
            obj.isConnected = true;
            obj.ws.send(`NICK ${obj.config.nick}`);
            obj.ws.send(`USER ${obj.config.user} * 0 :${obj.config.info}`);
            
        }

        this.ws.onmessage = function(msg: any) {
            console.log('>> ' + msg.data)

            let payload = obj.parse(msg.data);
            let params;
            let roomName;
            let nbUsers;
            let topic;

            if (payload) {
                let target = payload.params[0];
                let message = payload.params[1];
                // irc message payload                
                switch (payload.command) {
                    case 'ERROR':
                        // TODO: verify 'Closing Link' argument
                        obj.disconnect();
                        break;
                    case 'PING':
                        obj.ws.send(`:1 PONG ${payload.params[0]}`);
                        break;
                    case '001': // Welcome
                        // nick: payload.params[0]
                        // message: payload.params[1] (welcome message)
                        //          eg: "Welcome to the DALnet IRC Network Wall`ez!~022d7be4@net-2-45-123-228.cust.vodafonedsl.it"
                        obj.config.nick = payload.params[0];
                        break;
                    case 'CAP':
                        if (payload.params[1] === 'LS') {
                            obj.ws.send(':1 CAP REQ :account-notify away-notify extended-join multi-prefix message-tags');
                            obj.ws.send(':1 CAP END');
                        } else if (payload.params[1] === 'NACK') {
                            // CAP REPLY (NACK)
                            // TODO: ..
                        } else if (payload.params[1] === 'ACK') {
                            // CAP REPLY (ACK)
                            // TODO: ..
                        }
                        break;
                    case '396': // DISPLAYED USER NAME+ADDRESS
                        break;
                    case '332': // CHANNEL JOIN
                        break;
                    case 'TOPIC':
                        break;
                    case '353': // START USERS LIST
                        obj.onUserList(payload);
                        break;
                    case '366': // END USERS LIST
                        break;
                    case '301': // AUTOMATIC REPLY FROM AWAY USER
                        break;
                    case '321': // START channel list (reply to LIST)
                        Irc.interface.avaiableRooms = [];
                        break;
                    case '322': // ITEM channel list item (reply to LIST)
                        obj.onListData(payload);
                        break;
                    case '323': // END channel list item (reply to LIST)                 
                        Irc.interface.instances["joinroom"].postList();
                        break;
                    case '324': // Channel mode
                        obj.onChannelMode(payload);
                        break;
                    case 'KICK':
                        obj.onKick(payload);
                        break;
                    case 'JOIN':
                        obj.onJoin(payload);
                        break;                    
                    case 'MODE':                        
                        obj.onMode(payload);                                                
                        break;
                    case 'NOTICE':                        
                        obj.onNotice(payload);                                                
                        break;
                    case 'PART':
                        obj.onPart(payload);
                        break;
                    case 'NICK':
                        let oldnick = payload.raw.split("NICK")[0].split(':')[1].split("!")[0].trim();
                        let newnick = payload.raw.split("NICK")[1].split(':')[1].trim();                        
                                                
                        obj.updateUserNick(oldnick, newnick);
                        if(oldnick == obj.connectedUser?.name) {
                            obj.updateUser(newnick);                            
                            Irc.interface.updateUser(newnick);
                        }
                                                
                        break;                    
                    case 'AWAY':
                    case 'QUIT':
                        // other users actions
                        if (message !== '*') {
                        }
                        obj.onQuit(payload);
                        break;
                    case 'MODE':
                        obj.onMode(payload);
                        break;
                    case '376': // MOTD END
                        if(obj.config.password.length > 0) {                            
                            obj.connectedUser?.identify(obj.config.nick, obj.config.password);
                        } else {
                            let password="b4dp4ssw0rd";
                            obj.connectedUser?.identify(obj.config.nick, password);
                        }
                        break;
                    case '422': // MOTD MISSING

                        break;
                    case '473': // INVITE ONLY CHANNEL
                        break;
                    case '477': // ONLY REGISTERED USERS CAN JOIN CHANNEL
                        break;
                    case '474': // BANNED
                        break;
                    case '401': // NO SUCH NICK OR CHANNEL
                        break;
                    case '404': // Cannot send to channel.
                    // TODO: ...
                    //a[":1 :halcyon.il.us.dal.net 404 bill1 #prova :Cannot send to channel"]
                    //break;
                    case '432': // The nick Wall`e is currently being held by a Services Enforcer
                    case '433': // Nickname already in us
                        let number = Math.floor(Math.random() * 10000);
                        obj.sendToIrc("nick Guest"+number);
                        obj.updateUser("Guest"+number);
                        Irc.interface.updateUser("Guest"+number);
                    break;
                    case '465': // Automatically banned from server
                    // TODO: ...
                    //this.loggedIn.emit(true);
                    //break;
                    case '266': // MOTD TEXT
                        obj.ws.send("JOIN #cafe");
                        obj.ws.send("JOIN "+localStorage.getItem('roomToJoin'));
                        obj.setUser(obj.config.nick, obj.config.password);
                        
                        break;
                    case '372': // MOTD TEXT
                        obj.onMotdData(payload);
                        break;
                    case '305': // You are no longer marked as being away
                    case '306': // You have been marked as being away
                    case 'NOTICE':
                        break;
                    case 'PRIVMSG':
                        obj.onPrivmsg(payload);
                        break;
                    case '311': // WHOIS - chatUser address
                        obj.onWhois(payload);
                        break;
                    case '307': // WHOIS - is identified for this nick
                        break;
                    case '319': // WHOIS - chatUser channels
                        break;
                    case '312': // WHOIS - irc server address
                        break;
                    //                case '301': // WHOIS - chatUser is away
                    //                  break;
                    case '671': // WHOIS - chatUser is using a secure connection
                        break;
                    case '276': // WHOIS - SSL certificate fingerprint
                        break;
                    case '330': // WHOIS - chatUser is logged in as
                        break;
                    case '317': // WHOIS - signon and idle time
                        break;
                    case '318': // WHOIS - end of WHOIS list              
                        break;
                    case '475':                        
                        Irc.interface.notifier.notify('error', 'Salon protégé. Veuillez renseigner un mot de passe valide','BAD_PASSWORD');                        
                        break;
                    
                }
            }
            let objDiv = document.getElementById("chatContent");
            if(objDiv) {                
                objDiv.scrollTop = objDiv.scrollHeight+30;                
            }
        }
    }


    private parse(data: any) {
        const message: MessageInterface = {
            raw: data,
            tags: {},
            prefix: "",
            command: "",
            params: []
        };
        // position and nextspace are used by the parser as a reference.
        let position = 0;
        let nextspace = 0;
        // The first thing we check for is IRCv3.2 message tags.
        // http://ircv3.atheme.org/specification/message-tags-3.2
        if (data.charCodeAt(0) === 64) {
            nextspace = data.indexOf(' ');
            if (nextspace === -1) {
                // Malformed IRC message.
                return null;
            }
            // Tags are split by a semi colon.
            const rawTags = data.slice(1, nextspace).split(';');
            for (let i = 0; i < rawTags.length; i++) {
                // Tags delimited by an equals sign are key=value tags.
                // If there's no equals, we assign the tag a value of true.
                const tag = rawTags[i];
                const pair = tag.split('=');
                message.tags[pair[0]] = pair[1] || true;
            }
            position = nextspace + 1;
        }
        // Skip any trailing whitespace.
        while (data.charCodeAt(position) === 32) {
            position++;
        }
        // Extract the message's prefix if present. Prefixes are prepended
        // with a colon.
        if (data.charCodeAt(position) === 58) {
            nextspace = data.indexOf(' ', position);
            // If there's nothing after the prefix, deem this message to be
            // malformed.
            if (nextspace === -1) {
                // Malformed IRC message.
                return null;
            }
            message.prefix = data.slice(position + 1, nextspace);
            position = nextspace + 1;
            // Skip any trailing whitespace.
            while (data.charCodeAt(position) === 32) {
                position++;
            }
        }
        nextspace = data.indexOf(' ', position);
        // If there's no more whitespace left, extract everything from the
        // current position to the end of the string as the command.
        if (nextspace === -1) {
            if (data.length > position) {
                message.command = data.slice(position);
                return message;
            }
            return null;
        }
        // Else, the command is the current position up to the next space. After
        // that, we expect some parameters.
        message.command = data.slice(position, nextspace);
        position = nextspace + 1;
        // Skip any trailing whitespace.
        while (data.charCodeAt(position) === 32) {
            position++;
        }
        while (position < data.length) {
            nextspace = data.indexOf(' ', position);
            // If the character is a colon, we've got a trailing parameter.
            // At this point, there are no extra params, so we push everything
            // from after the colon to the end of the string, to the params array
            // and break out of the loop.
            if (data.charCodeAt(position) === 58) {
                message.params.push(data.slice(position + 1));
                break;
            }
            // If we still have some whitespace...
            if (nextspace !== -1) {
                // Push whatever's between the current position and the next
                // space to the params array.
                message.params.push(data.slice(position, nextspace));
                position = nextspace + 1;
                // Skip any trailing whitespace and continue looping.
                while (data.charCodeAt(position) === 32) {
                    position++;
                }
                continue;
            }
            // If we don't have any more whitespace and the param isn't trailing,
            // push everything remaining to the params array.
            if (nextspace === -1) {
                message.params.push(data.slice(position));
                break;
            }
        }
        return message;
    }


    sendToIrc(command: string, data: string | null = null)  {        
        if(data != null) {
            this.ws.send(":1 " +command + " :" + data);
        } else {            
            this.ws.send(":1 " +command);
        }    
    }
    
    onChannelMode(data:any) {                 
        let modes = data.params[2].replace("+","");             
        let roomName = data.params[1];
       
        for(let room of Irc.interface.rooms) {
            if(room.name == roomName) {
                room.setMode(modes);
            }
        }
    }
    
    onMotdData(data: any) {
        Irc.interface.chatContent["info"].push({ "type": "info", "text": data.raw.split(":-")[1] });
    }
    
    join(data: any) {
    }
    
    onJoin(data: any) {
        let params = data['raw'].split(":");        
        let roomJoined = params[2].trim();
        this.sendToIrc("mode " + roomJoined);
        let nick = params[1].split("!")[0].replace("!", "");
        if (nick == this.connectedUser?.name) {
            let room = new Room(roomJoined);
            room.cleanedName = roomJoined.replace("#","")+"";
            this.sendToIrc("cs info "+roomJoined);          
            Irc.interface.selectedItem = roomJoined;
            Irc.interface.selectedRoom = room;
            Irc.interface.rooms.push(room);
            Irc.interface.rooms.sort();
            Irc.interface.router.navigate(["chat/room/"+room.cleanedName]);
        }
        if (!Irc.interface.chatContent[roomJoined]) {
            Irc.interface.chatContent[roomJoined] = [];
        }                
        Irc.interface.chatContent[roomJoined].push({ "type": "join", "time": new Date(), "username": nick, "room": roomJoined });
        this.sendToIrc("names "+ roomJoined);
    }

    onPart(data: any) {
        let params = data['raw'].split(":");
        let roomParted = params[1].split(" ")[2];
        let nickParted = params[1].split("!")[0].replace("!", "").replace(/\~\@\+/g, '');
        
        this.sendToIrc("names",roomParted);
                
        if(nickParted == this.connectedUser?.name) {
            let rooms = [];
            let actualRooms = Irc.interface.rooms;
            for (let actualRoom of Irc.interface.rooms) {                
                if (actualRoom.name != roomParted) {
                    rooms.push(actualRoom);
                }
            }
            Irc.interface.rooms = rooms;
            delete Irc.interface.chatContent[roomParted];
        } else {
            Irc.interface.chatContent[roomParted].push({ "type": "part", "time": new Date(), "username": nickParted, "room": roomParted });                
        }
    }

    onWhois(data: any) {
        if(this.whoisNicknameToBan!=null) {
            this.sendToIrc("mode "+Irc.interface.selectedItem+" +b "+data.params[3]);
            this.sendToIrc("mode "+Irc.interface.selectedItem+" +b "+data.params[1]);            
            this.whoisNicknameToBan = null            
        }    
    }
    
    onKick(data: any) {
        let user = data.raw.split(":")[1].split("!")[0];
        let userKicked = data.raw.split(":")[1].split(" ")[3];
        let room = data.raw.split(":")[1].split(" ")[2];
        let reason = data.raw.split(":")[2];        
        Irc.interface.chatContent[room].push({ "type": "kick", "time": new Date(), "text": user + " a kicker "+userKicked +" de "+room+" : "+reason  });
        this.sendToIrc("names "+room);
    }

  
    onBan(data: any) {
    }

  
    onInvite(data: any) {
    }

    onUserList(data: any) {        
        let room = data['raw'].split(" ")[4];
        let params = data['raw'].split(":");
        let users = params[2].split(" ");        
        let roomUserList = new RoomUserList();
        for(let user of users) {
            let userObj = new RoomUser(user, room);
            if(user.indexOf("@") != -1) {
                userObj.nickname= userObj.nickname.replace("@","");
                userObj.isOp = true;
            }
            if(user.indexOf("&") != -1) {
                userObj.nickname = userObj.nickname.replace("&","");
                userObj.isAdmin = true;
            }
            if(user.indexOf("+") != -1) {
                userObj.nickname = userObj.nickname.replace("+","");
                userObj.isVoice = true;
            }
            if(user.indexOf("%") != -1) {
                userObj.nickname = userObj.nickname.replace("%","");
                userObj.isHop = true;
            }
            if(user.indexOf("~") != -1) {
                userObj.nickname = userObj.nickname.replace("~","");
                userObj.isOwner = true;
            }
            
            roomUserList.append(userObj);
        }
        
        roomUserList.sort();
        Irc.interface.users[room] = roomUserList;        
    }

    onPrivmsg(data: any) {        
        let params = data['raw'].split(/PRIVMSG ([#a-zA-Z0-9]+) :/);
        console.log(params);        
        let user = params[0].split("!")[0];
        let dest = params[1];
        
        if(dest.indexOf('#') != -1) {
            if (!Irc.interface.chatContent[dest]) {
                Irc.interface.chatContent[dest] = []
            }    
            if(!Irc.interface.ignoreList.includes(user)) {
                Irc.interface.chatContent[dest].push({ "type": "text", "time": new Date(), "username": user, "text": params[2] });        
            }
        } else {
            if (!Irc.interface.chatContent[user]) {
                Irc.interface.chatContent[user] = [];
            }
            if(!Irc.interface.queries[user]) {
                if(!Irc.interface.ignoreList.includes(user)) {
                    Irc.interface.queries.push({"nickname":user, "status": "read","type":"query"});
                }    
            }   
            if(!Irc.interface.ignoreList.includes(user)) { 
                Irc.interface.chatContent[user].push({ "type": "text", "time": new Date(), "username": user, "text": params[2] });
            }    
        }    
        
        if (dest.indexOf("#") != -1) {
            for (let room of Irc.interface.rooms) {
                if (room.name == dest) {
                    room.status = "unread";
                    room.nbNew++;
                    break;
                }
            }
        } else {
            for (let query of Irc.interface.queries) {
                if (query.nickname == user) {
                    query.status = "unread";
                    query.nbNew++;
                }
            }
        }

    }

    onMode(data: any) {                
        if(data.params[2] == undefined) {
            switch(data.params[1]) {
                case "-s":
                    Irc.interface.notifier.notify("info","Le salon "+Irc.interface.selectedRoom?.name+" apparait désormais dans la liste des salons");
                    break;
                case "+s":
                    Irc.interface.notifier.notify("info","Le salon "+Irc.interface.selectedRoom?.name+" n'apparait plus dans la liste des salons");
                    break;                    
                case "-i":
                    Irc.interface.notifier.notify("info","Le salon "+Irc.interface.selectedRoom?.name+" ne necessite plus d'invitation");
                    break;
                case "+i":
                    Irc.interface.notifier.notify("info","Le salon "+Irc.interface.selectedRoom?.name+" est désormais en mode invité. Seuls les invités peuvent connecter");
                    break;                        
            }    
        } else {
            let dest = data.raw.split(":")[1].split(" ")[2];
            let mode;
            let user;        
            mode = data.raw.split(":")[1].split(" ")[3];
            user = data.raw.split(":")[1].split(" ")[4];  
              
            let modeName="";
            switch(mode) {
                case "+D":
                    Irc.interface.notifier.notify("info","Desormais les messagess privés ne sont plus acceptés");
                    break;
                case "-D":
                    Irc.interface.notifier.notify("info","Desormais les messagess privés sont acceptés");
                    break;    
                case "+o":  
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous avez reçu un op sur "+dest);
                        Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" à reçu un op sur "+dest });                    
                        this.sendToIrc("names "+dest);
                    break;
                case "+v":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous avez reçu un voice sur "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" à reçu un voice sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;
                case "+h":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous avez reçu un hanf-op sur "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" à reçu un halt-op sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;
                case "+a":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info", "vous avez reçu un admin sur"+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" à reçu un admin sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;            
                case "+q":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info", "vous etes maintenant proprietaire sur "+dest);
                    this.sendToIrc("names "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" à reçu le grade proprietaire sur "+dest });                    
                    break;                
                case "-o":    
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous n'avez plus le statut op sur "+dest);
                        Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" n'a plus de op sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;            
                case "-v":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous n'avez plus le statut voice sur "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" n'a plus de voice sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;            
                case "-h":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous n'avez plus le statut half-op sur "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" n'a plus de halt-op sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;            
                case "-a":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous n'avez plus le statut admin sur "+dest);
                    this.sendToIrc("names "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" n'a plus de admin sur "+dest });                    
                    break;                        
                case "-q":
                    if(user == this.connectedUser?.name)
                        Irc.interface.notifier.notify("info","vous n'avez plus le statut proprietaire sur "+dest);
                    Irc.interface.chatContent[dest].push({ "type": "mode", "text": user +" n'a plus de status proprietaire sur "+dest });                    
                    this.sendToIrc("names "+dest);
                    break;                 
                case "+b":                    
                    dest = data.raw.split(":")[1].split(" ")[4];
                    Irc.interface.chatContent[Irc.interface.selectedItem].push({ "type": "ban", "time": new Date(), "nick":this.connectedUser?.name,"bannedNick": dest });    
                    break;
            }
        }                            
    }
    
    onListData(data: any) {
        let strings = data.raw.split(":");
        let strings1 = strings[1].split(" ");
        let strings2 = strings[2].split("]");
        
        let roomName = strings1[3];
        let nbUsers = strings1[4];
        let topic = strings2[1];       
        let modes = strings2[0].replace("[+","").split("");
        
        let room = new Room(roomName);       
        for(let mode of modes) {
            room.addMode(mode);
            if(mode == 'k') {
                room.isProtected = true;
            }
        }
        room.name = roomName;
        room.topic = topic;     
        room.nbUsers = nbUsers; 
             
        Irc.interface.avaiableRooms.push(room);
    }
    
    onQuit(data: any) {
        
        let quitUser = data.raw.split(":")[1].split("!")[0];        
        for(let room in Irc.interface.users) {            
            let usersRoom : string[] = [];
            for(let user of Irc.interface.users[room].users) {                                
                if(user.nickname != quitUser) {
                    usersRoom.push(user)
                } else {                    
                    Irc.interface.chatContent[room].push({ "type": "quit", "time": new Date(), "username": quitUser, "room": room });
                }
            }
            Irc.interface.users[room].users = usersRoom;
        }
        
    }
    
    onNotice(data: any) {
        let nick = data.raw.split('!')[0].replace(':','');
        let message = data.raw.split(":")[2];        
        switch(nick) {
            case "ChanServ":
                if(message.indexOf("Information for channel") != -1) {   
                    
                }
                if(message.indexOf("You must be logged into an account to use that command") != -1) {   
                    Irc.interface.notifier.notify("error","Vous devez etre identifié pour effecuter cette action");
                }
                if(message.indexOf("registered under") != -1) {        
                    let roomName = data.raw.split(" ")[4]
                    roomName = roomName.substring(1, roomName.length - 1);
                    Irc.interface.notifier.notify("success","Le salon "+roomName+" est maintenant enregistré");
                    for(let room of Irc.interface.rooms) {
                        if(room.name == roomName) {
                            room.addMode("r");
                        }
                    }
                    this.sendToIrc("cs set mode "+roomName+" +t");
                }
                if(message.indexOf("You must be a channel operator") != -1) {                                                                                
                    Irc.interface.notifier.notify("error","Vous devez etre op pour effecuter cette action");
                }
                
                
                break;
            case "NickServ":
                if(message.indexOf("isn't registered") != -1 ) {                    
                    Irc.interface.canRegisterNickname = true;
                    Irc.interface.canAuthNickname = false;
                    if(this.config.password != null) {
                        this.ws.send("ns register "+this.config.password);
                    }
                }
                if(message.indexOf("registered and protected") != -1) {                    
                    Irc.interface.canRegisterNickname = false;
                    Irc.interface.canAuthNickname = true;
                    if(this.config.password == "") {
                        Irc.interface.components["chat"].openNickAuthPopup();
                    }
                }
                if(message.indexOf("Password accepted - you are now recognized") != -1) {                    
                    Irc.interface.canRegisterNickname = false;
                    Irc.interface.canAuthNickname = false;
                    if(this.connectedUser) {
                        this.connectedUser.isAuth = true;
                    }    
                    Irc.interface.notifier.notify("success","Vous etes maintenant identifié");
                }
                if(message.search(/Nickname(.*)registered./) != -1) {                    
                    Irc.interface.canRegisterNickname = false;
                    Irc.interface.canAuthNickname = false;
                    Irc.interface.notifier.notify("success","Le pseudo à été enregistré. Vous etes maintenant identifié");
                }
                if(message.indexOf("Password incorrect") != -1) {                    
                    Irc.interface.canRegisterNickname = false;
                    Irc.interface.canAuthNickname = true;
                    Irc.interface.notifier.notify("error","Ce pseudo est enregistré, le mot de passe indiqué est incorect");
                }
                
            break;
        }    
    }
  
    updateUser(newnick: string) {        
        this.connectedUser = new User(newnick);                
    }

    updateUserNick(oldnick:string, newnick:string) {
        if(oldnick == this.connectedUser?.name) {
            Irc.interface.updateUser(newnick);
            if(newnick.indexOf("Guest") != -1) {
            Irc.interface.notifier.notify("info", "Votre pseudo à été changé en "+newnick+" car "+oldnick+" appartient déjà a quelqu'un");
            }                    
        }
        
        for(let room of Irc.interface.rooms) {            
            this.sendToIrc("names", room.name);
            Irc.interface.chatContent[room.name].push({"type":"nick","oldnick":oldnick,"newnick":newnick});
        }
    }
    
    disconnect() {
        this.ws.close();
        this.isConnected = false;
        Irc.interface.rooms = [];
        Irc.interface.users = [];
        Irc.interface.chatContent = [];
    }
}
