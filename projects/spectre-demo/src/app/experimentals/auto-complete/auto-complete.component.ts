import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  public values = [
    {
      'name': 'Israel',
      'dial_code': '+972',
      'code': 'IL'
    },
    {
      'name': 'Australia',
      'dial_code': '+61',
      'code': 'AU'
    }
  ];

  public countries = [
    {
      'name': 'Israel',
      'dial_code': '+972',
      'code': 'IL'
    },
    {
      'name': 'Australia',
      'dial_code': '+61',
      'code': 'AU'
    },

    {
      'name': 'Bhutan',
      'dial_code': '+975',
      'code': 'BT'
    },

    {
      'name': 'Czech Republic',
      'dial_code': '+420',
      'code': 'CZ'
    },
    {
      'name': 'Denmark',
      'dial_code': '+45',
      'code': 'DK'
    },

    {
      'name': 'India',
      'dial_code': '+91',
      'code': 'IN'
    },
    {
      'name': 'Nigeria',
      'dial_code': '+234',
      'code': 'NG'
    },
    {
      'name': 'Trinidad and Tobago',
      'dial_code': '+1 868',
      'code': 'TT'
    },
    {
      'name': 'Russia',
      'dial_code': '+7',
      'code': 'RU'
    },
    {
      'name': 'Saint Lucia',
      'dial_code': '+1 758',
      'code': 'LC'
    },
    {
      'name': 'Virgin Islands, U.S.',
      'dial_code': '+1 340',
      'code': 'VI'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
