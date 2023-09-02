import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';
import { JoinRoomComponent } from './joinroom/join-room.component';
import { RoomparametersComponent } from './roomparameters/roomparameters.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ReglementComponent } from './reglement/reglement.component';
import { PhilosophieComponent } from './philosophie/philosophie.component';

@NgModule({
  declarations: [
    JoinRoomComponent,
    RoomparametersComponent,
    ReglementComponent,
    PhilosophieComponent
  ],
  imports: [    
    CommonModule,    
    FormsModule,
    PageRoutingModule,    
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class PageModule { }
