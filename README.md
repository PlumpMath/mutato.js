mutato.js
=========

JavaScript fault injector written in JavaScript

###Demos:

+ [Simple](http://madflame991.github.io/mutato.js/examples/simple/simple.html)
+ [Canvas](http://madflame991.github.io/mutato.js/examples/worker-canvas/worker-canvas.html) - mutates code and executes it in a web worker; proof of concept on how to draw to a canvas from a web worker

###Supported mutation operators:

+ number mutator (slightly alters numeric literals)
+ comparator mutator (reqrites `<=` to `<`, `>` to `>=`, etc)
+ duplication mutator (duplicates a statement)
+ eraser mutator (removes statements)
