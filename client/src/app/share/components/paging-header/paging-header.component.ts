import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {

  @Input()totalCount: number = 0;
  @Input()pageNumber: number = 1 ;
  @Input()pageSize: number = 6 ;

 
  
  constructor() { 
    
  }

  ngOnInit(): void {

  }
  


}
