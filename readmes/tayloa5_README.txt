1. What are the advantages to writing a jQuery plugin over regular JavaScript that uses jQuery?


jQuery is already a lightweight library, but with the plugin functionality you can create a reusable component.


jQuery is very lightweight. Additionally, a jQuery plugin is very portable. Someone can easily embed this plugin to their own webpage without having to know any JavaScript essentially. The only thing they would have to do (in the case of our hexed game) is copy and paste two lines of HTML and then link the JavaScript file that contains the game plugin.


2. Explain how your jQuery plugin adheres to best practices in JavaScript and jQuery development.

We made sure to keep the HTML document that the plugin appends to very clean (the page only starts off with two lines of html text that directly interface with the plugin). Secondly, we used classes and functions whenever possible to avoid duplicating code. Third, to the best of our ability we commented every neccessary piece of code and made sure that all classes and ids were semantically friendly.

3. Does anything prevent you from POSTing high scores to a server on a different domain? If so, what?

In order to post a high score to a server on different domain, we would need to consider all security factors and know that cross domain POSTing won't work on mobile browsers. However, we would probably use an AJAX POST request to post high scores to a sever on a different domain (perhaps using a combination of pHp and mysql)

-John


1.) We borrowed code to make the color slider picker from https://jqueryui.com/slider/#colorpicker
2.) I worked on connecting the sliders/user generated swatch data with the random swatch data, the "one_turn" function, advancing the turns, and general formatting.
