import {Component, OnInit} from '@angular/core';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

@Component({
  selector: 'vaxtrax-leftnav',
  templateUrl: './leftnav.component.html',
  directives: [MD_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES]
})
export class LeftNavComponent implements OnInit {

  public ngOnInit(): void {
    //TODO
  }

}
