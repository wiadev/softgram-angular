import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

const NEW_ROUTER_NAME = 'new';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id: string;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.appService.getTeams().subscribe(teams => this.teams = teams);
  }

  ngOnInit() {
    this._createForm();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== NEW_ROUTER_NAME) {
      this.appService.getMemberById(this.id).subscribe(member => {
        this._updateFormWithMember(member);
      });
    }
  }

  ngOnChanges() {}

  _updateFormWithMember(member: Member) {
    const { firstName, lastName, jobTitle, team, status } = member;
    this.memberForm.patchValue({
      firstName,
      lastName,
      jobTitle,
      team,
      status,
    });
  }

  _createForm() {
    this.memberForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      jobTitle: [null, Validators.required],
      team: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.id !== NEW_ROUTER_NAME) {
      this.appService.updateMemeber(this.id, this.memberModel).subscribe(() => this._goToMemebers());
    } else {
      this.appService.addMember(this.memberModel).subscribe(() => this._goToMemebers());
    }
  }

  _goToMemebers() {
    this.router.navigateByUrl('/members');
  }
}
