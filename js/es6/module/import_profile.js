import {firstName, lastName, year, multiply, foo} from './profile.js';

function setName() {
  console.log(firstName + ' ' + lastName);
}
setName();
console.log(multiply(2, 3));

console.log(foo);