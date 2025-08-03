"use strict"
/* EASY:
A local gym wants to implement an "exercise of the day" program where there is a free class for that day that promotes a certain exercise. 
The gym needs some backend logic to update its system to reflect which exercise will be promoted that day. 
Write a function that will take as an input the name of an exercise and console log a message like Today's exercise: running
Write one function that can dynamically print the value of the exercise for that day, and it must be closure.
// Output: Today's exercise: Running
  console.log(exercise("Running")); 
// Output: Today's exercise: Swimming
  console.log(exercise("Swimming"));
// Output: Today's exercise: Dancing
  console.log(exercise("Dancing")); 
// Output: Today's exercise: Fencing
  console.log(exercise("Fencing")); 
*/ 

// outer function // 
function exerciseTracker (){
//inner function 
return function(exerciseName) {
    const message = `Today's exercise: ${exerciseName}`; 
    return message; // return the message using (exerciseName)
};
}

/* call exerciseTracker() to get our closure function 
this is our closure, exerciseTracker() runs and give us back the inner function 
we store that inner function in the variable called "exercise" 
*/

const exercise = exerciseTracker();
//calling the closure function with different exercise names 
console.log(exercise("Running")); 
console.log(exercise("Swimming"));
console.log(exercise("Dancing")); 
console.log(exercise("Fencing")); 


//Closure is a function inside of a function// 


/* MEDIUM: 
Write a function that will allow you to calculate how many slices of pizza x each person y would get if they shared evenly. 
The function should return an interpolated string like Each person gets 4.00 slices of pizza; from our 8-slice pizza x being a decimal in case there is no way to split the pizza evenly.
// Output: Each person gets 4 slices of pizza; from our 8 slice pizza
  console.log(sharePizza(8, 2)); 
// Output: Each person gets 2.67 slices of pizza; from our 8 slice pizza
  console.log(sharePizza(8, 3)); 
// Output: Each person gets 1.05 slices of pizza; from our 21 slice pizza
  console.log(sharePizza(21, 20));
// Output:Each person gets 3.33 slices of pizza; from our 10 slice pizza
  console.log(sharePizza(10, 3)); 
*/


function sharePizza(sliceOfPizza, people) {
const slicePerPerson = Math.floor((sliceOfPizza / people)*100) /100; 
// The expression Math.floor(value * 100) / 100 is used to round a number down to two decimal places 
    return `Each person gets ${slicePerPerson} slices of pizza; from our ${sliceOfPizza} slice pizza`;

}
    console.log(sharePizza(8, 2)); // Output: Each person gets 4 slices of pizza; from our 8 slice pizza
    console.log(sharePizza(8, 3)); // Output: Each person gets 2.67 slices of pizza; from our 8 slice pizza
    console.log(sharePizza(21, 20)); // Output: Each person gets 1.05 slices of pizza; from our 21 slice pizza
    console.log(sharePizza(10, 3));  // Output:Each person gets 3.33 slices of pizza; from our 10 slice pizza

/*
 string interpolation is the process of replacing placeholders with values in a string literal.

First: we need to create a function name: sharepizza
  
Second: we need parameters (sliceOfPizza->how many slice we have, people->number of people sharing)
   (parameters: placeholder for a values that a function needs in order to do its job)
  
Thrid: We use division to find out the result of how many slice per person can get 

Return: is use to get result from a function, without the return, it will be undefined on the console. 

*/


/* 
HARD:
Inside a closure, create an object called PII (Personally Identifiable Information)that cannot be accessed directly. 
The object should have at least two properties: name and SSN.
 Only the name property should be accessible, and it should be called through a public function. The SSN property should not be accessible at all.
 Creating private objects and private properties helps you control who has access to what data and helps you prevent people who shouldn't see important info 
 like social security numbers from getting access to the data. You can use 'getName' or other get methods to access data that people might need. 
 For example, people addressing a package or email may need a customer's name, but they definitely shouldn't have access to their SSN.
// Output: Undefined
  console.log(patient2.names); 
// Output: Undefined
  console.log(patient2.ssn); 
//  Output: John
  console.log(patient2.getName());
 // Output: 123-45-6789
  console.log(patient2.getSSN()); 
*/


// public interface

// Factory function that creates a patient object with private PII data
function createPatient(name, ssn) {
  // Private PII object - cannot be accessed from outside the closure
  const PII = {
    name: name,
    SSN: ssn
  };
  
  // Return an object with only the public methods we want to expose
  return {
    // Public method to access name - this is allowed
    getName: function() {
      return PII.name;
    }, 

    getSSN: function(){
      return PII.SSN;
    }
  };
}

// Create a patient 
const patient2 = createPatient("John", "123-45-6789");

// Test the encapsulation
console.log(patient2.names);     // Output: undefined (property doesn't exist)
console.log(patient2.ssn);       // Output: undefined (property doesn't exist)
console.log(patient2.getName()); // Output: "John" (accessible through public method)
console.log(patient2.getSSN()); // Output: "123-45-6789")  


/* VERY HARD: 
Object prototype chain and prototypal inheritance exercise.
Create a Person constructor that has three properties: name, job, and age.
Give the Person an 'exercise' method that console logs whatever you want, e.g. "Running is fun! - said no one ever".
Give the Person a 'fetchJob' method that console logs the person's name and job, e.g. "Brad is a back-end developer".
Create a Programmer constructor that inherits all the members from Person with an additional 'languages' property that is passed in and a busy property that is NOT passed in and is set to true by default.
Give the Programmer a 'completeTask' method that updates the busy property on that programmer to be false. Also, give the Programmer an 'acceptNewTask' method that updates the busy property on that programmer to be true.
Give the Programmer an 'offerNewTask' method that console logs one thing if the programmer is busy and another if the programmer is not, e.g., should initially log out "Mark can't accept any new tasks right now." and "Mark would love to take on a new responsibility." if the programmer is not busy.
Give the Programmer 'learnLanguage' and 'listLanguages' methods that add new languages to the programmer and list off all languages the programmer knows.
Test it out - can you create different programmers and run all the methods on them? Does each programmer maintain their own properties properly and independently of the other programmers? Bonus - ES6 Syntax: Use ES6 Syntax in your answer. Feel free to add new methods or properties to incorporate the syntax.
*/

/* Notes:
constructor = special method defining the properties and method of objects.
We use a constructor function when we want to create multiple objects with the same
same structure but different values. 
class = (ES6 feauture) provides a more strcutured and cleaner way to work with objects 
compared to traditional constructor function. 
*/


//step 1: Create a Person constructor that has three properties: name, job, and age.
// Person class
class Person {
  constructor(name, job, age) {
    this.name = name;
    this.job = job;
    this.age = age;
  }

// step 2: 
// Give the Person an 'exercise' method that console logs whatever you want, e.g. "Running is fun! - said no one ever".
// Give the Person a 'fetchJob' method that console logs the person's name and job, e.g. "Brad is a back-end developer".

  exercise() {
    console.log("Running is fun! - said no one ever");
  }

  fetchJob() {
    console.log(`${this.name} is a ${this.job}`);
  }
}

// Programmer class extends Person
// extends: is used in class declarations or class expressions to create a class that is a child of another class.
// super() -> calls the Person construtor, so we dont repeat code. 
class Programmer extends Person {
  constructor(name, job, age, languages) {
    super(name, job, age); // Inherit from Person
    this.languages = languages; // Array of programming languages
    this.busy = true; // Default value
  }

  completeTask() {
    this.busy = false;
  }

  acceptNewTask() {
    this.busy = true;
  }

  offerNewTask() {
    if (this.busy) {
      console.log(`${this.name} can't accept any new tasks right now.`);
    } else {
      console.log(`${this.name} would love to take on a new responsibility.`);
    }
  }

  learnLanguage(newLanguage) {
    this.languages.push(newLanguage);
  }

  listLanguage() {
    return `${this.name} knows: ${this.languages.join(", ")}`;
  }
}

/* Note: why use class and constructor -> 
The construtor is like a blueprint that runs when you make a new person, exercise() and fetechJob() are
reusable methods tied to all Person Objects. 
Instance: an object created from a constructor */


// Create Person instance
const person1 = new Person("Harold", "Backend Engineer", 20);

// Create Programmer instances
const c1 = new Programmer("Liana", "DevOps", 35, ["HTML", "C#", "LUA"]);
const c2 = new Programmer("Edwin", "Janitor", 55, ["HTML", "SASS", "Ruby"]);
const c3 = new Programmer("Manny", "SysOps", 31, ["HTML", "CSS", "JS", "R"]);

// Learn new languages
c1.learnLanguage("CSS");
c2.learnLanguage("C++");
c3.learnLanguage("JAVA");

// List known languages
console.log(c1.listLanguage()); // Liana knows: HTML, C#, LUA, CSS
console.log(c2.listLanguage()); // Edwin knows: 
console.log(c3.listLanguage()); // Manny knows: 

// Log each object
console.log(person1);
console.log(c1);
console.log(c2);
console.log(c3);

// Use Person methods
person1.exercise();    // Running is fun! - said no one ever
person1.fetchJob();    // Harold is a Backend Engineer

// Task behavior
c1.offerNewTask();     // Liana can't accept...
c1.completeTask();     // Mark Liana as not busy
c1.offerNewTask();     // Liana would love to take on a new responsibility.


// It's like sovling an equation by adding only what's needed, and using class to save time and avoid repating codes by allowing use to reuse code. 