import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReglementComponent } from './reglement/reglement.component';
import { PhilosophieComponent } from './philosophie/philosophie.component';

const routes: Routes = [    
    { path: 'reglement', component: ReglementComponent },
    { path: 'philosophie', component: PhilosophieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
