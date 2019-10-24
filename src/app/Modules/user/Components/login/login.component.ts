import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  isError = true;

  @HostListener('document:click', ['$event.target'])
  click(trg) {
    if (!(trg === this.currentInput) && (this.currentInput != null)) {
      this.currentInput.style.borderColor = '#eaeaea';
    }
  }


  constructor(private service: UserService, private dataService: DataService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((param) => {
      if (param[0] === 'logout') {
        this.errorMassage = 'Successfully logout';
        this.isError = false;
        this.alert.nativeElement.style.display = 'block';
        this.alert.nativeElement.style.backgroundColor = 'green';
      }

    });
  }

  showBorder(inp1: HTMLInputElement, inp2: HTMLInputElement) {
    this.currentInput = inp1;
    inp1.style.borderColor = 'DeepSkyBlue';
    inp2.style.borderColor = '#eaeaea';
  }

  login(username: string, password: string) {
    const regExpUsername = new RegExp('\\w[A-Za-z0-9]{4,12}');
    const regExpPassword = new RegExp('\\w[A-Za-z0-9]{6,12}');
    if (regExpUsername.test(username) && regExpPassword.test(password)) {
      this.service.login(username, password).subscribe((res) => {
        console.log(res);
        if (res.headers.get('Authorization') != null) {
          localStorage.setItem('_key_', res.headers.get('Authorization'));
          this.service.getAuthentication().subscribe((user) => {
            this.dataService.UserAucentication.next(user);
            this.router.navigate(['']);
          });

        } else {
          this.isError = true;
          this.errorMassage = 'Incorrect username or password';
          this.alert.nativeElement.style.display = 'block';
          this.alert.nativeElement.style.backgroundColor = 'orangered';
        }
      }, (error) => {
        this.isError = true;
        this.errorMassage = 'You are blocked';
        this.alert.nativeElement.style.display = 'block';
        this.alert.nativeElement.style.backgroundColor = 'orangered';
      });
    } else {
      this.isError = true;
      this.errorMassage = 'Invalid username or password';
      this.alert.nativeElement.style.display = 'block';
      this.alert.nativeElement.style.backgroundColor = 'orangered';
    }

  }
}
