import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {

  @Input() showToast: any;
  @Input() noData = false;

  constructor() { }

  ngOnInit(): void {
  }

}
