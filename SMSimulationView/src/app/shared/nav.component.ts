import { Component } from '@angular/core';
import { Service } from '../shared/services/service';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html'
})
export class NavComponent {

    constructor(private service: Service) {
       
    }
}
