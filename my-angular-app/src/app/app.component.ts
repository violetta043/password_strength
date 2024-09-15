import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h2>Password strength</h2>
    <p>Current password: {{ password }}</p>
    <input type="password" placeholder="Input password" [(ngModel)]="password" (input)="onPasswordInput()"/>
 
    <div class="strength">
      <div [style.background-color]="section1Class"></div>
      <div [style.background-color]="section2Class"></div>
      <div [style.background-color]="section3Class"></div>
    </div>
  `,


  styleUrls:['./app.component.css'],
  imports: [FormsModule],
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {}
 password: string = '';
 section1Class: string = 'grey';
 section2Class: string = 'grey';
 section3Class: string = 'grey';

 onPasswordInput() {
  console.log('Password:', this.password);
  const lengthPassword = this.password.length;

  if(lengthPassword === 0) {
    this.setSectionClasses('grey', 'grey', 'grey');
  } else if (lengthPassword < 8) {
    this.setSectionClasses('red', 'red', 'red');
  } else {
    const strength = this.calcPasswordStrenght(this.password);
    this.updateSection(strength)
  }
  console.log('Section Classes:', this.section1Class, this.section2Class, this.section3Class); 
  this.cdr.detectChanges();
 }
 calcPasswordStrenght(password: string): string {
  const letters = /[a-zA-Z]/.test(password);
  const numbers = /\d/.test(password);
  const symbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if(letters && numbers && symbols) {
    return 'strong';
  } else if((letters && numbers) || (letters && symbols) || (numbers && symbols)) {
    return 'medium';
  } else {
    return 'weak';
  }
 }
 updateSection(strength: string) {
  if(strength === 'weak') {
    this.setSectionClasses('red', 'grey', 'grey');
  } else if (strength === 'medium') {
    this.setSectionClasses('yellow', 'yellow', 'grey');
  } else if (strength === 'strong') {
    this.setSectionClasses('green', 'green', 'green')
  }
 }

 setSectionClasses(section1: string, section2: string, section3: string) {
  this.section1Class = section1; 
  this.section2Class = section2;
  this.section3Class = section3;
 }
}

