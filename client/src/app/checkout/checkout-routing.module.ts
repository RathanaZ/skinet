import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';

//initialise here
const routes: Routes = [
  {path:'', component:CheckoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    //initialise here
    RouterModule.forChild(routes)
    // CommonModule
  ],
//initialise here
  exports:[RouterModule]
})
export class CheckoutRoutingModule { }
