import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() calcelRegister = new EventEmitter();
  model: any = {};
  constructor(private autservice: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.autservice.register(this.model).subscribe(next => {
      console.log('registration successful');
    }, error => {
        console.log(error);
    });
  }
  cancel() {
    this.calcelRegister.emit(false);
    console.log('cancelled');
  }

}
