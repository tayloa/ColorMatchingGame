Aaron Taylor 

1) What are the advantages to writing a jQuery plugin over regular JavaScript that uses jQuery?

jQuery is already a lightweight library, but a plugin allows you to create reusable components without understanding or having to write your own JavaScript. It can simply be imported.

2) Explain how your jQuery plugin adheres to best practices in JavaScript and jQuery development.
The jQuery plugin doesn’t access things unnecessarily and detaches unused elements from the DOM. Also the HTML paired with our plugin is minimal.

3) Does anything prevent you from POSTing high scores to a server on a different domain? If so, what? If not, how would we go about it (written explanation/pseudocode is fine here)?
I don’t believe so. We would probably just need to add an AJAX post request, wrote the game data to a JSON file and send it.

 4)Now that you're used Web Storage, what other information would you store there in other Web-based applications? Is there any information you wouldn't store?
User information could be stored in local web storage. While it is secure, it would probably be unwise to store sensitive data like passwords and bank account information  
