import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';
import base64 from 'crypto-js/enc-base64';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    var dateTime = new Date();
    var token = String(dateTime.getHours()).padStart(2,"0") + String(dateTime.getMinutes()).padStart(2,"0");
    var hash = sha256(username + password);
    var hashString = base64.stringify(hash);
    return this.httpClient.post("http://localhost:8081/login", {
      token: token,
      hash: hashString,
    });
  }
}
