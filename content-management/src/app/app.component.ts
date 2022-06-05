import { UtilsService } from './utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'content-management';
  constructor(private service:UtilsService){}

  ngOnInit(): void {
    // this.service.loginFn();
  }
}
