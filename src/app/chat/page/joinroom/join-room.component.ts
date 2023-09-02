import { Component, Inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AbstractComponent } from '../../classes/abstract.component';
import { RoomInterface } from "../../classes/room.interface";
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'page-join-room',
    templateUrl: './join-room.component.html',
    styleUrls: ['./join-room.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JoinRoomComponent extends AbstractComponent {

    public app: any;
    public roomToJoin: string = "#cafe";
    public roomPassword:string | null = null;
    public avaiableRooms: any = [];
    public displayedColumns: string[];
    public dataSource: any;
    public filterString: string = "";    
    public roomPasswordDisplay = false;
    public roomPasswords:any = {};
    
    @ViewChild(MatTable) avaiableRoomsTable!: MatTable<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(public router: Router) {
        
        super();
                
        this.displayedColumns = ['name', 'nbUsers', 'topic', 'action'];
        this.interface.instances["joinroom"] = this;    
        this.irc.sendToIrc("LIST", "");

    }

    join(selectedRoom: string | null = null, roomPassword: string | null = null) {
        
        roomPassword = (roomPassword != null) ? roomPassword : this.roomPassword;
                          
        if(roomPassword != null) {
            console.log("WWITH PASS");
            this.irc.sendToIrc("join "+ selectedRoom + " "+roomPassword);        
        } else {
            console.log("WihtOut PASS");
            this.irc.sendToIrc("join "+ selectedRoom);        
        }
        
    }

    refresh() {
        this.irc.sendToIrc("list");
    }

    postList() {        
        this.dataSource = new MatTableDataSource<RoomInterface>(this.interface.avaiableRooms);
        this.dataSource.paginator = this.paginator;                
    }

    doFilter = (value: any) => {
        this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
    }
}
