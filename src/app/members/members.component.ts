import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this._loadMembers();
  }

  _loadMembers() {
    this.appService.getMembers().subscribe((members) => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigateByUrl('/members/new');
  }

  editMemberByID(id: number) {}

  deleteMemberById(id) {
    // should have a confirm notification to delete
    this.appService.removeMember(id).subscribe(() => {
      console.log('Removed successfully!');
      this._loadMembers();
    });
  }
}
