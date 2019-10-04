import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.router.params.subscribe((res) => {
      this.userService.confirmRegistration(res.username).subscribe();
    });
  }

}
