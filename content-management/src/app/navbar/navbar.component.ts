import { Router } from '@angular/router';
import { UtilsService } from './../utils.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //  loginDetails:any;
  @Input() loginDetails:any;
  @Output() searchFilter = new EventEmitter();
  @Output() sortFilter = new EventEmitter();
  search:any;
  sort:string = 'ASC';

  constructor(private service:UtilsService,private router: Router) { }

  ngOnInit(): void {
  }

  modelChangeFn(data:any){    
      this.searchFilter.emit(data);
  }

  OnLogout(){
   localStorage.clear();
   this.router.navigate(['/'])
  }

  onSort(){
    this.sortFilter.emit(this.sort);
   if(this.sort === 'ASC'){
      this.sort = 'DSC';
   }else{
     this.sort = 'ASC';
   }
  }

}
