//myJavaScript
$(document).ready(function() {

  //Quando faccio focus sulla input text_bar appare icona sent_message
  //aggiungo la classe none dal div che deve scomparire
  //tolgo classe non da div che devo mostrare
  $(document).on("focus", ".texting_bar input", function () {
    $(".rigth_switch.icon").children(".sent_icon").removeClass("none");
    $(".rigth_switch.icon").children(".mic_icon").addClass("none");
  });

  //invio il messaggio a click su icona predisposta
  $(document).on("click", ".fa-paper-plane" , function() {
    sendMessage();
  });

  //invio messaggio schiacciando su pulsante invio di tastiera
  $(document).on("keypress", ".texting_bar input", function() {
    if (event.which === 13 || event.keyCode ===13) {
      sendMessage();
    }
  });

  //cercare contatti con input search
  $(document).on("keydown", ".search_box input", function() {
    var userType = $(".search_box input").val()
    console.log(userType)
  });


//FUNZIONI
//Invia un messaggio e aggiungilo al div con classe messages_box
function sendMessage() {
  // vado a definire in una variabile quello che utente scrive in input text_area
  var messageText = $(".texting_bar input").val();

  // se input text_area non è vuoto proseguo appendendo il messaggio inviato
  if (messageText != "") {
    // indico una variabile che definisce il contenitore del testo scritto da utente
    //ovvero .square_speech che è appunto il div contenitore del tag span contenete il message_text
    var newMessageSquare = $(".templates .square_speech").clone();
    //scrivo il testo che è il val di input, ovvero ciò che utente ha scritto nel div span message_text
    newMessageSquare.children(".message_text").text(messageText);
    //scrivo l'orario corrente sotto al messaggio
    newMessageSquare.children(".message_time").text(time());
    //resetto il valore di input in modo che utente possa scrivere un nuovo messaggio
    $(".texting_bar input").val("");
    //aggiungo al contenitore del testo la classe sent per dargli li stili dei messaggi inviati
    newMessageSquare.addClass("sent");
    //appendo il div nel message_box ovvero dove utente potrà leggere i messaggi inviati e ricevuti
    $(".messages_box").append(newMessageSquare);
    //scrollo la message_box fino alla fine per mostrare a utente i messaggi piu recenti
    var messageBoxHigh = $(".texting_area").height();
    $(".texting_area").scrollTop(messageBoxHigh)
  }

}

//Determina orario corrente
//scrivi orario corrente aggiungendo gli 0 davanti alle cifre inferiori a 10
function time () {
  var date = new Date()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var currentTime = hours + ":"+ minutes;

  if (hours < 10) {
    currentTime = "0" + hours + ":" + minutes;
  }else if (minutes < 10) {
    currentTime = hours + ":" + "0" + minutes;
  }else if (hours < 10 && minutes < 10) {
      currentTime = "0" + hours + ":" + "0" + minutes;
  }
  return currentTime
}

//cerca un nome nei contatti attraverso le lettere
//cerca tra tutti gli user_name della lista contact_list
function searchContact () {
  var userType = $(".search_box input").val()
  return userType
}


});
