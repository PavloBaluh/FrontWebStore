import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('alert', {static: true}) alert: ElementRef;
  currentInput: HTMLInputElement;
  massage: string;


  @HostListener('document:click', ['$event.target'])
  click(trg) {
    if (!(trg === this.currentInput) && (this.currentInput != null)) {
      this.currentInput.style.borderColor = '#eaeaea';
    }
  }

  constructor(private router: Router, private service: UserService, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((res) => {
      console.log(res);
    });
  }


  showBorder(inp1: HTMLInputElement, inp2: HTMLInputElement, inp3: HTMLInputElement, inp4: HTMLInputElement) {
    this.currentInput = inp1;
    inp1.style.borderColor = 'DeepSkyBlue';
    inp2.style.borderColor = '#eaeaea';
    inp3.style.borderColor = '#eaeaea';
    inp4.style.borderColor = '#eaeaea';
  }

  register(email: string, username: string, password: string, passwordRepeat: string) {
    const regExpEmail = new RegExp('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$');
    const regExpUsername = new RegExp('\\w[A-Za-z0-9А-Яа-яёЁЇїІіЄєҐґ]{2,12}');
    if (regExpEmail.test(email) && regExpUsername.test(username) && regExpUsername.test(password) && password === passwordRepeat) {
      this.service.register(email, username, password).subscribe((res: boolean) => {
        if (res === false) {
          this.alert.nativeElement.style.backgroundColor = 'orangered';
          this.massage = 'Username or Email is already taken';
          this.alert.nativeElement.style.display = 'block';
        } else {
          this.massage = 'Check your email to activate account';
          this.alert.nativeElement.style.backgroundColor = 'green';
          this.alert.nativeElement.style.display = 'block';
        }
      });
    } else {
      this.alert.nativeElement.style.backgroundColor = 'orangered';
      this.massage = 'Invalid data';
      this.alert.nativeElement.style.display = 'block';
    }
  }
}
