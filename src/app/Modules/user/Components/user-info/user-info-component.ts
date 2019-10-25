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

  sendData(alert: HTMLDivElement) {
    const regExpUsernameSurname = new RegExp('\\w[A-Za-zА-Яа-яёЁЇїІіЄєҐґ]{3,12}');
    if (this.formObj.personalData.name.match(regExpUsernameSurname) && this.formObj.personalData.surname.match(regExpUsernameSurname)
      && this.formObj.personalData.address.country.match(regExpUsernameSurname)
      && this.formObj.personalData.address.city.match(regExpUsernameSurname)
      && (this.formObj.personalData.address.region.match(regExpUsernameSurname) || this.formObj.personalData.address.region === '')
      && this.formObj.personalData.address.street.match(regExpUsernameSurname)
      && this.formObj.personalData.phoneNumber.match('3?8?[\\(]?0[0-9]{2}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}')
      && (this.formObj.personalData.address.number.match('[0-9]{1,6}([a-zA-Z0-9- ]{1,7})?') || this.formObj.personalData.address.number === '')) {
      this.userService.addUserInfo(this.formObj.personalData).subscribe((res) => {
        this.isEditProfile = false;
      });
    } else {
      alert.style.display = 'block';
      this.alertMassage = 'Invalid data try again';
    }
  }

  editProfile() {
    this.isEditProfile = true;
  }

  uploadFile(files, imginp) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result;
      imginp.src = img;
    };
    reader.readAsDataURL(files.item(0));
    this.formObj.personalData.picture = files.item(0);
  }

  changePassword(value: string, value2: string, value3: string, alert: HTMLDivElement) {
    const regExpPassword = new RegExp('\\w[A-Za-z0-9]{6,12}');
    this.alert = alert;
    if (value === '' || value2 === '' && value3 === '') {
      this.alertMassage = 'You have to fill in all the fields';
      this.alert.style.display = 'block';
    } else {
      if (value.match(regExpPassword) && value.match(regExpPassword)) {
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
      } else {
        this.alertMassage = 'Password should contains 6-12 letters(Roman)';
        this.alert.style.display = 'block';
      }

    }
  }
}
