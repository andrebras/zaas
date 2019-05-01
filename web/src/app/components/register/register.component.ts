import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.register(
			this.registerForm.value.email,
			this.registerForm.value.password,
			this.registerForm.value.passwordConfirmation
		);
  }

}
