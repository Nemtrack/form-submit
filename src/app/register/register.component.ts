import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../shared/partner/partner.service';
import { Partner } from '../shared/partner/partner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.form = new FormGroup({
      partnerName: new FormControl(),
      partnerEmail: new FormControl(),
    });
  }

  partner?: Partner;
  submitted = false;

  form: FormGroup = new FormGroup({});

  register() {
    if (this.form) {
      // console.log(this.partnerName.value);
      // console.log(this.partnerEmail.value);

      this.partner = new Partner(0, '', '');
      this.partner.partnerName = this.partnerName?.value;
      this.partner.partnerEmail = this.partnerEmail?.value;
      this.submitted = true;
      this.save();
    }
  }

  save() {
    this.partnerService.createPartner(this.partner).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.partner = new Partner(
      0,
      this.partnerName?.value,
      this.partnerEmail?.value
    );
  }

  get partnerName() {
    return this.form.get('partnerName');
  }

  get partnerEmail() {
    return this.form.get('partnerEmail');
  }
}
