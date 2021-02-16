import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms'; 
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private loginSvc: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    var username = this.loginForm.value["username"];
    var password = this.loginForm.value["password"];
    this.loginSvc.login(username, password).subscribe((data: Response) => {
      if(data.Result) {
        this.message = data.Message;
        this.loginForm.reset();
        window.location.href = data.RedirectURL;
        
      } else {
        this.message = data.Message;        
        this.loginForm.reset();
        window.alert(data.Message);
      }
    });
  }

}

export class Response {
  Result: boolean;
  Message: string;
  RedirectURL: string;
}