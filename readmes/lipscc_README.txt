Chris Lipscomb's README for Homework 2

1) What are the advantages to writing a jQuery plugin over regular JavaScript that uses jQuery?
Using a jQuery plugin allows a developer to create their own jQuery functions for objects. If there is an action that is performed regularly(i.e. changing the color/style of elements) the 
code can be simplified to a single call, rather than having to type out the entire action each time. It also can be helpful to people who aren't familiar with jQuery or Javascript by 
simplifying the development process for them.

2) Explain how your jQuery plugin adheres to best practices in JavaScript and jQuery development.
All variables are very explicit in their naming, so it is easy to figure out what a variable refers to even if you aren't familiar with the code yet. The script tags were placed at the 
bottom of the page in order to improve the initial load time of the document. The code is commented very thoroughly, and is broken up into different sections of relevant code. For example,
all of the helper functions are listed at the top, then the code related to the color sliders, then the code for initializing the page/game, and finally handling the code for the game.

3) Does anything prevent you from POSTing high scores to a server on a different domain? If so, what? If not, how would we go about it (written explanation/pseudocode is fine here)?
Nothing prevents us from POSTing high scores to a server on a different domain. All we would need to do is create a form with the "action" attribute set to the address of the page on the 
other domain. If the page on the other server is written to accept the data (through a PHP script or something else), the data can be processed by the other server.

4) Now that you're used Web Storage, what other information would you store there in other Web-based applications? Is there any information you wouldn't store?
Web storage is very useful for storing information that is only needed locally. If we wanted to store a user's preferences for a website on that specific computer, we could use Web Storage.
It is not very useful for content that needs to be accessible anywhere, or by any user. For example, we wouldn't want user's to upload files and put them in web storage if the application's
use was to share these files with other users.