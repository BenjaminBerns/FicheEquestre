import { Component } from '@angular/core';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name = "Angular bcrypt";
  // derivedKey = pbkdf2.pbkdf2Sync('password', 'salt', 1, 64, 'sha512')
  salt = bcrypt.genSaltSync(10);
  encodedPass;
  timestamp;
  key;
  rawString = "fetziLx4uNwPdhB67i1iFyVi8c3FmjhzZ";

  //   strength - any value in between 4 and 31
  // version  - values are BCryptVersion.$2A, BCryptVersion.$2Y, BCryptVersion.$2B

  constructor() {
    this.timestamp = Date.now();
    this.key = this.salt + this.timestamp;
    this.encodedPass = bcrypt.hashSync(this.rawString, this.key);
    //  console.log(this.derivedKey)
    console.log("Salted Pass:", this.encodedPass);

    let v1 = "$2b$10$OScs96LIOP/74ZnU7tY3ku.69tcRa7ZqPZT2CklianXuqVuk/r3/K";
    let v2 = "$2b$10$vkuXQEjzkuc5kpiPXYivF.8zCbhJoPwy4SUk5/9lwaUwohtfoU2Ga";
    console.log(
      "Compare passwords: ",
      bcrypt.compareSync(this.rawString, v1),
      bcrypt.compareSync(this.rawString, v2)
    );
  }
}