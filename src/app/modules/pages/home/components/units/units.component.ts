import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  searchValue!: string;

  constructor(@Inject('dynamicData') public dynamicData: any) { }

  ngOnInit() {
    console.log(this.dynamicData);
  }


  onSearchInDataTable(): void {
    console.log(this.searchValue);
  }

}
