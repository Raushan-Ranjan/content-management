import { UtilsService } from './../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.css']
})
export class BlogListingComponent implements OnInit {
  blogList:any[] = [];
  loginDetails:any;
  query:string =''
  sort:string = '';

  constructor(private service: UtilsService) { }

  ngOnInit(): void {
   this.onListingBlog();
  }

  onListingBlog(sort = ''){
    this.service.getListingFn(sort).subscribe(res => {
      this.loginDetails = {...res.user}
      this.blogList = res.blog;
      this.service.blogListing = res.blog;
      this.service.loginDetails = res.user;
    })
  }
  
  onSearch(data:string){
  this.query = data;
  }

  onSort(data:any){
   this.onListingBlog(data);
  }
}
