var start_button = document.getElementById('start'),
    input_field = document.getElementById('input-field'),
    compare_button = document.getElementById('compare'),
    body = document.getElementsByTagName('body')[0],
    choix_container = document.getElementById('choix-precedents'),
    input_joueur = 0,
    input_joueur_array = [],
    choix_IA = 0,
    tentatives = 10;

function playStartAnimations() {
    start_button.classList.remove('start-in-anim');
    start_button.classList.add('start-out-anim');
    setTimeout(function() {
        input_field.classList.remove('input-field-out');
        input_field.classList.add('input-field-in');
    }, 400);
}

function playResetAnimations() {

    start_button.classList.remove('start-out-anim');
    start_button.classList.add('start-in-anim');
    setTimeout(function() {
        input_field.classList.remove('input-field-in');
        input_field.classList.add('input-field-out');
    }, 400);
}

function removePreviousHelpers() {
    var helpers = document.getElementsByClassName('helper');

    if (helpers.length > 0) {
        Array.from(helpers).forEach(function(div) {
           div.remove();
        });
    }
}

function removePreviousAlerts() {
    var alerts = document.getElementsByClassName('alert');

    if (alerts.length > 0) {
        Array.from(alerts).forEach(function(div) {
            div.remove();
        });
    }
}

function displayInput() {
    var choix = document.createElement('p');
    choix.textContent = input_joueur_array[input_joueur_array.length - 1];

    choix_container.appendChild(choix);
}

function throwAlert(message) {
    var alert_container = document.createElement('div'),
        alert_message = document.createElement('p');

    alert_container.classList.add('alert');
    alert_message.textContent = message;

    alert_container.appendChild(alert_message);
    body.appendChild(alert_container);
}

function resetGame() {
    playResetAnimations();
    start_button.innerHTML = 'Rejouer?';
    start_button.disabled = false;
    tentatives = 10;
    document.getElementById('input-joueur').value = '';
}

function compareResults() {
    var helper_message = document.createElement('p'),
        helper_tentatives = document.createElement('p'),
        helper_container = document.createElement('div'),
        helper_speech = document.createElement('i');

    helper_speech.classList.add('fas');
    helper_speech.classList.add('fa-location-arrow');
    helper_container.classList.add('helper');
    helper_tentatives.textContent = `Il vous reste ${tentatives} tentatives`;

    if (input_joueur > choix_IA) {
        helper_message.textContent = "C'est moins!";
    } else if (input_joueur < choix_IA) {
        helper_message.textContent = "C'est plus!"
    } else {
        helper_message.textContent = "Félicitations! Le nombre était: " + choix_IA;
        helper_tentatives.textContent = `Trouvé en ${10 - tentatives} tentative(s)!`;
        resetGame();
    }

    helper_container.appendChild(helper_message);
    helper_container.appendChild(helper_tentatives);
    helper_container.appendChild(helper_speech);
    body.appendChild(helper_container);
}

start_button.addEventListener('click', function() {
   playStartAnimations();
   choix_IA = 1;
   choix_IA = Math.floor(Math.random() * 100) + 1;
   start_button.disabled = 'true';
});

function startGame(e) {
    removePreviousHelpers();
    removePreviousAlerts();
    tentatives--;

    if (tentatives <= 0) {
        throwAlert("Nombre de tentatives épuisé!");
        resetGame();
        return;
    }

    input_joueur = document.getElementById('input-joueur').value;

    if (isNaN(input_joueur)) {
        throwAlert('Veuillez entrer un nombre compris entre 1 et 100');
        e.preventDefault();
        return;
    } else if (input_joueur < 1 || input_joueur > 100) {
        throwAlert('Veuillez entrer un nombre compris entre 1 et 100');
        e.preventDefault();
        return;
    }

    input_joueur_array.push(input_joueur);
    displayInput();

    compareResults();
}

compare_button.addEventListener('click', function(e) {
    startGame(e);
});
