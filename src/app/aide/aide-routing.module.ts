import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AideHomeComponent } from './home/home.component';
import { AideAComponent } from './pages/aide-a/aide-a.component';

const routes: Routes = [
    { path: 'aide', component: AideHomeComponent },
    { path: 'aide/comment-se-connecter-sur-votre-chat', component: AideAComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AideRoutingModule { }
