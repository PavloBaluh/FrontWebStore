import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../../../../Models/User';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../../Services/data.service';
import {PersonalData} from '../../../../Models/PersonalData';
import {PersonalAddress} from '../../../../Models/PersonalAddress';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  isPersonalDataPresent = false;
  isPersonalDataNotPresent = false;
  isChangePassword = false;
  isEditProfile = false;
  formObj = {
    email: '',
    personalData: new PersonalData('', '', '', null,
      new PersonalAddress('', '', '', '', ''))
  };
  alertMassage: string;
  alert: HTMLDivElement;

  constructor(private userService: UserService, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getAuthentication().subscribe((user: User) => {
      if (user.personalData === null) {
        this.isPersonalDataPresent = false;
        this.isPersonalDataNotPresent = true;
      } else {
        this.isPersonalDataNotPresent = false;
        this.isPersonalDataPresent = true;
        this.formObj.personalData = user.personalData;
        this.formObj.email = user.email;
      }
      this.formObj.email = user.email;
      $(document).ready(() => {
        $('#img-container').mouseenter(() => {
          $('.animate').fadeIn('slow', 'linear');
        });
        $('#img-container').mouseleave(() => {
          $('.animate').fadeOut('fast', 'linear');
        });
      });
    });
  }

  addData() {
    this.isPersonalDataNotPresent = false;
    this.isPersonalDataPresent = true;
    this.isEditProfile = true;
  }

  sendData() {
    this.userService.addUserInfo(this.formObj.personalData).subscribe((res) => {
      this.isEditProfile = false;
    });
  }

  editProfile() {
    this.isEditProfile = true;
  }

  uploadFile(files, imginp) {
    console.log(this.formObj.personalData.picture);
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result;
      imginp.src = img;
    };
    reader.readAsDataURL(files.item(0));
    this.formObj.personalData.picture = files.item(0);
  }

  changePassword(value: string, value2: string, value3: string, alert: HTMLDivElement) {
    this.alert = alert;
    if (value2 === value3) {
      this.userService.changePassword(value, value2).subscribe((res) => {
        if (res) {
          localStorage.setItem('_key_', '');
          this.dataService.UserAucentication.next('none');
          this.router.navigate(['login'], {queryParams: ['logout']});
        } else {
          this.alertMassage = 'Invalid password';
          this.alert.style.display = 'block';
        }
      });
    } else {
      this.alertMassage = 'You have entered a different passwords';
      this.alert.style.display = 'block';
    }
  }
  }
