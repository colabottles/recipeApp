import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toast: Toast | null = null;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }
}
