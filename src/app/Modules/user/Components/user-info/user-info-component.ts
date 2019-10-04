import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../../Models/User';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute} from '@angular/router';
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
  isEditProfile = false;
  formObj = {
    email: '',
    personalData: new PersonalData('', '', '', null,
      new PersonalAddress('', '', '', '', ''))
  };

  constructor(private userService: UserService) {
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
}
