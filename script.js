    //Create variables for spans in html

    document.addEventListener("DOMContentLoaded", function () {
    let span_man = document.getElementById("newgame_spanMan");
    let span_word = document.getElementById('newgame_word');
    let span_button = document.getElementById("newgame_spanButton");
    let home = document.getElementById("home");
    let new_game = document.getElementById("newgame");

    //Assign words in an array, along with total no. of lives

    let words_arr = ["man", "army", "able","about","account","acid","across","act","addition","adjustment","advertisement","Breytenbach"];
    let lives = 7;
    let word;

    //Functioning for navigation bar

    function nav_bar(id_name) {
        let content = document.getElementsByClassName("content");
        for (let i = 0; i < content.length; i++) {
            content[i].style.display = "none";
        }
        id_name.style.display = "block";
    }

    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let target = document.querySelector(link.getAttribute("href"));
            nav_bar(target);
            if (target === new_game) {
                begin_new_game();
            }
        });
    });

    // Start new game by assigning mystery word and resetting all values

    function begin_new_game() {
       span_word.innerText = "";
        span_man.innerText = `No. of lives left: ${lives}`;
        let mystery_word = def_mystery_word();
        word=mystery_word.toUpperCase()
        createButtons();
    }

    // Define mystery word

    function def_mystery_word() {
        let index = Math.floor(Math.random() * words_arr.length);
        let mystery_word = words_arr[index];
        for (let i = 0; i < mystery_word.length; i++) {
            const term = " __";
            span_word.innerText += term;
        }
        return mystery_word;
    }

    // Create buttons to be used

    function createButtons() {
        let char = 'A';
        span_button.innerHTML = "";
        for (let i = 0; i < 26; i++) {
            const button = document.createElement('button');
            button.innerText = char;
            button.id = 'button' + char;
            span_button.appendChild(button);
            char = String.fromCharCode(char.charCodeAt(0) + 1);
            button.addEventListener('click', function () {
                verify(button);
            });
        }
    }

    // Verify if button clicked represents letter present in mystery word

    function verify(button) {
        let letter = button.innerText;
        let matched = false;
        let guess = span_word.innerText.split(' ');

        for (let i = 0; i < word.length; i++) {
            if (letter === word.charAt(i)) {
                guess[i]=letter;
                matched = true;
            } 
        }

        span_word.innerText = guess.join(' '); 
        
//If not present, reduce lives
        if (!matched) {
            reduce_lives();
        } 
//Check if winning condition is met
        else if (span_word.innerText.replace(/ /g, "") === word) {
        document.getElementById('newgame_word').innerText = word;
        win_game()
        }
//Disable clicked button
        fade_out(button);
    }

    // Reduce lives
    function reduce_lives() {
        lives--;
        span_man.innerText = `No. of lives left: ${lives}`;
        if (lives <= 0) {
            end();
        }
    }

    // End the game in case of a loss
    function end() {
        alert("You lost the game. The word was: " + word);
        lives=7
        begin_new_game();
    }

    // End the game in case of a win
    function win_game() {
        span_word.innerHTML+=`<p> Congrats you won the game <p> <p> To start a new game, click on the "new game" navigation bar</p>`;
        lives=7;
        span_man.innerText= "";
        span_button.innerHTML = "";
    }

    // Disable button
    function fade_out(button)
    {
        button.disabled =true;
    }

    // Reset nav bar at home
    nav_bar(home);
});
