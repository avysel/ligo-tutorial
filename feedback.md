# Ligo feedback

Note:
All the following tests were executed with

```
ligo --version
0.53.0
```

And also selected `0.53.0` in the dropdown list on the top left corner of the website.


## The Taco Shop smart contract

#### Populating our storage

How `ligo-compile`in shell can access to `init_storage` defined in Ligo? Where `init_storage` should be defined?


#### Providing another Access Function for Buying Tacos

Many new things in the code example, but no explanation.

#### Making Sure We Get Paid for Our Tacos

Please provide some explanation about `include`: relative vs absolute path? from http? from repository? ...

## Ligo documentation

### Introduction to LIGO

#### Runnable code snippets

No explanation of `evaluate-call`

No description of the CLI parameters and how to use them, the different values...

### Language basics 

#### Types > Built in types

https://ligolang.org/docs/language-basics/types

Only a link to an .ml file on the gitlab. Difficult to understand.
Why don't we have a simple list of types?

for example, the difference between `int` and `nat` is never clearly explained.

#### Types > Annotations

The annotation example is very difficult to understand for a beginner. The use of annotation is difficult to find in these many code lines.

#### Constants & variables > Constants

The example that can be evaluate with `ligo run evaluate-expr` does not work

```
ligo run evaluate-expr const.jsligo --entry-point age      
File "const.jsligo", line 1, character 0 to line 7, character 1:
  1 | let x = a => {
  2 |   const age = 25;
  3 |   {
  4 |    const age = 3; // does not give an error
  5 |    return age;
  6 |   }
  7 | };

Toplevel let declaration are silently change to const declaration.

File "const.jsligo", line 2, characters 8-11:
  1 | let x = a => {
  2 |   const age = 25;
  3 |   {
:
Warning: unused variable "age".
Hint: replace it by "_age" to prevent this warning.

File "const.jsligo", line 1, characters 8-9:
  1 | let x = a => {
  2 |   const age = 25;
:
Warning: unused variable "a".
Hint: replace it by "_a" to prevent this warning.


Variable "age" not found.
```
#### Constants & variables > variables

The example that can be evaluate with `ligo run evaluate-call` does not work

```
 ligo run evaluate-call add.jsligo '(1,1)' --entry-point add 
File "add.jsligo", line 1, character 0 to line 5, character 1:
  1 | let add = (a: int, b: int): int => {
  2 |   let c = a;
  3 |   c = c + b;
  4 |   return c
  5 | }

Toplevel let declaration are silently change to const declaration.

Ill-formed expression.
At this point, one of the following is expected:
 * a closing parenthesis ')', if definining a parenthesized expression
 * a closing parenthesis ')' after the parameters, if defining a function expression.
alexandre@MacBook-Pro-de-Alexandre ligo-tutorial % 
```

#### Strings & bytes > bytes

Why bytes variables doesn't have type in jsligo but they have the `bytes` type in other syntaxes?

`const b : bytes = 0x7070` in PascaLigo

vs

`let b = 0x7070;` in JsLigo

#### Functions > Declaring functions

```
ligo run evaluate-call blockless.jsligo '(1,2)' --entry-point add 
File "blockless.jsligo", line 1, characters 0-35:
  1 | let add = (a: int, b: int) => a + b;

Toplevel let declaration are silently change to const declaration.

Ill-formed expression.
At this point, one of the following is expected:
 * a closing parenthesis ')', if definining a parenthesized expression
 * a closing parenthesis ')' after the parameters, if defining a function expression.
```

#### Booleans & conditionals > Conditionals

In JsLigo flavor, the example uses a file named `cond.religo`

And the example does not work:

```
ligo run evaluate-call cond.jsligo '21n' --entry-point compare
File "cond.jsligo", line 3, character 0 to line 10, character 1:
  2 | 
  3 | let compare = n => {
  4 |   if (n < (10 as nat)) { 
  5 |     return Small (); 
  6 |   } 
  7 |   else { 
  8 |     return Large (); 
  9 |   };
 10 | };

Toplevel let declaration are silently change to const declaration.

Wrong nat syntax.
Example: "12334 as nat".
```
#### Iteration > General iteration

```
ligo run evaluate-call gcd.jsligo '(2n*2n*3n*11n, 2n*2n*2n*3n*3n*5n*7n)' --entry-point gcd

File "gcd.jsligo", line 9, character 0 to line 15, character 1:
  8 | 
  9 | let gcd2 = (x: nat,y: nat) : nat => {
 10 |   if (x < y) {
 11 |     return iter (y, x);
 12 |   } else {
 13 |     return iter (x, y);
 14 |   }
 15 | };

Toplevel let declaration are silently change to const declaration.

File "gcd.jsligo", line 1, character 0 to line 7, character 1:
  1 | let iter = (x: nat,y: nat): nat => {
  2 |   if (y == (0 as nat)) {
  3 |     return x;
  4 |   } else {
  5 |     return iter (y, x % y);
  6 |   };
  7 | };
  8 | 

Toplevel let declaration are silently change to const declaration.

Wrong nat syntax.
Example: "12334 as nat".
```

#### Iteration > for of loops

```
ligo run evaluate-call collection.jsligo --entry-point sum_list 'list [1;2;3]'
File "collection.jsligo", line 1, character 0 to line 7, character 1:
  1 | let sum_list = (l : list<int>) => {
  2 |   let total = 0;
  3 |   for (const i of l) {
  4 |     total = total + i
  5 |   }
  6 |   return total
  7 | }

Toplevel let declaration are silently change to const declaration.

Ill-formed selection in a tuple.
At this point, a closing bracket ']' is expected.
```

And the same for `sum_set`

For `sump_map`:
```
ligo run evaluate-call collection.jsligo --entry-point sum_map 'map ["1"->1; "2"->2; "3"->3]'
```

Got
```
Invalid symbol: "->".
Hint: Check the LIGO syntax you use.
```