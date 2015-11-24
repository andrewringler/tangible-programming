# Tangible Programming

Work in progress. Creating a tangible block-based programming environment for the MIT shape displays. See [Tangible Programming](http://andrewringler.github.io/tangible-programming/) for a live demo of this repo.

Forked from [FORMation](https://github.com/xiaosquared/FORMation) by [Xiao Xiao](https://github.com/xiaosquared) and [Donald Derek](https://github.com/DonaldDerek). FORMation is scripting platform for prototyping with the shape displays of the Tangible Media Group, MIT Media Lab. Makes use of the following JavaScript libraries:
* [3js](http://threejs.org/)
* [Ace editor](https://ace.c9.io/)
* [Dat.gui](https://code.google.com/p/dat-gui/)

## How to Run

Live versions of the program:
* [CooperForm] (http://andrewringler.github.io/tangible-programming/cooperform.html) (24 x 24)
* [TransForm] (http://andrewringler.github.io/tangible-programming/transform.html) (3 islands of 16 x 24)

If you want to play with the underlying javascript, clone the repo and host it as your own local webserver.

In a terminal:
``` 
git clone git@github.com:andrewringler/tangible-programming.git && cd tangible-programming
python -m SimpleHTTPServer 8000
```
In a browser, go to localhost:8000/cooperform.html or localhost:8000/transform.html

Keyboard controls:
* _Ctrm-m_: opens and closes the browser
* _Enter_: run the current script
* _Space_: pause
* _d_: clear

## Scripting the Shape Display

xForm is the name of the virtual shape display. Each pin is addressed by its x, y position where 0, 0 is the top left corner. Heights are decimal values from 0 to 1.

### Basic Functions
Set pin at position x, y to ht
```
xForm.setPinHeight(x, y, h);
```

Set all pins to a height:
```
xForm.clearDisplay(h)
```

### Examples
The /examples folder has some sample scripts. To run, paste the code into the FORMation editor. Current examples:
* __pong.js:__ 
  * A physical pong game where the shape display moves around a real ball, with paddles controlled via the keyboard. 
  * Example of how to use Box feature to render boxes and detect collision between them

### License

The MIT License (MIT)

> <sup>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</sup>
>
> <sup>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</sup>
>
> <sup>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</sup>
