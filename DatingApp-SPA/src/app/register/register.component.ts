import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() calcelRegister = new EventEmitter();
  model: any = {};
  constructor(private autservice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.autservice.register(this.model).subscribe(next => {
      this.alertify.success('registration successful');
    }, error => {
        this.alertify.error(error);
    });
  }
  cancel() {
    this.calcelRegister.emit(false);
  }

}
