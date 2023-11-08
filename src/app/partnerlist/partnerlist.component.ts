import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PartnerService } from '../shared/partner/partner.service';

@Component({
  selector: 'app-partnerlist',
  templateUrl: './partnerlist.component.html',
})
export class PartnerlistComponent implements OnInit {
  partners: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private partnerservice: PartnerService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    this.partnerservice.getPartnerList().subscribe((data) => {
      this.partners = data;
    });
  }

  deletePartner(id: number) {}

  // reloadData() {
  //   this.partners=this.partnerservice.getPartnerList();
  // }
}
