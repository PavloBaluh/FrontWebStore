import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import {DataService} from '../../../../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('alert', {static: true}) alert: ElementRef;
  currentInput: HTMLInputElement;
  errorMassage: string;

  @HostListener('document:click', ['$event.target'])
  click(trg) {
    if (!(trg === this.currentInput) && (this.currentInput != null)) {
      this.currentInput.style.borderColor = '#eaeaea';
    }
  }


  constructor(private service: UserService, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  showBorder(inp1: HTMLInputElement, inp2: HTMLInputElement) {
    this.currentInput = inp1;
    inp1.style.borderColor = 'DeepSkyBlue';
    inp2.style.borderColor = '#eaeaea';
  }

  login(username: string, password: string) {
    const regExpUsername = new RegExp('\\w[A-Za-z0-9А-Яа-яёЁЇїІіЄєҐґ]{2,12}');
    if (regExpUsername.test(username) && regExpUsername.test(password)) {
      this.service.login(username, password).subscribe((res) => {
        if (res.headers.get('Authorization') != null) {
          localStorage.setItem('_key_', res.headers.get('Authorization'));
          this.dataService.UserAucentication.next(username);
          this.router.navigate(['']);

        } else {
          this.errorMassage = 'Incorrect username or password';
          this.alert.nativeElement.style.display = 'block';
        }
      });
    } else {
      this.errorMassage = 'Invalid username or password';
      this.alert.nativeElement.style.display = 'block';
    }

  }
}
