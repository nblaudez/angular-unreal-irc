import { Component } from '@angular/core';
import { AbstractComponent } from "../../../classes/abstract.component";
@Component({
  selector: 'popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss']
})
export class PopupRegisterComponent extends AbstractComponent{

    public password: string|null=null;
    public passwordConfirmation: string|null=null;
    public passwordMissMatch = false;
    
    register() : boolean{
        if(this.password != this.passwordConfirmation || this.password?.length == 0) {
            this.passwordMissMatch = true;
            return false;
        }
        
        return true;
    }
}

