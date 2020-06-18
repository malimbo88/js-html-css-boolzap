//myJavaScript
$(document).ready(function() {

  //Quando faccio mouseenter sulla input send message bar appare icona sent_message
  //aggiungo la classe none dal div che deve scomparire
  //tolgo classe non da div che devo mostrare
  $(document).on("mouseenter", "#send_message_bar", function () {
    $(".rigth_switch.icon").children(".sent_icon").siblings().addClass("none");
    $(".rigth_switch.icon").children(".sent_icon").removeClass("none");
  });


  //Quando faccio mouseleave sulla texting_bar generale appare icona mic_icon
  //aggiungo la classe none dal div che deve scomparire
  //tolgo classe non da div che devo mostrare
  $(document).on("mouseleave", ".texting_bar", function () {
    $(".rigth_switch.icon").children(".sent_icon").siblings().removeClass("none");
    $(".rigth_switch.icon").children(".sent_icon").addClass("none");
  });

  //invio il messaggio a click su icona predisposta
  $(document).on("click", ".sent_icon" , function() {
    sendMessage();
  });

  //invio messaggio schiacciando su pulsante invio di tastiera
  $(document).on("keypress", "#send_message_bar", function() {
    if (event.which === 13 || event.keyCode === 13) {
      sendMessage();
    }
  });

  //cercare contatti con input search
  $(document).on("keyup", "#search_bar", function() {
    var userType = $(this).val().toLowerCase()
    console.log("Valore immesso Utente " + userType)
    //cerca un nome nei contatti attraverso il valore input iserito in search_bar
    //cerca tra tutti gli user_name della lista contact_list
    //se il user_name contiene i valori di testo inseriti in input da utente mostra i risultati
    //altrimenti nascondi i risultati che non corrispondono ai valori di ricerca immessi
    $("li.contact_item").each(function() {
      var userName = $(this).find(".user_name").text().toLowerCase()
      console.log("Nome Utente " + userName)
      if (userName.includes(userType)) {
        $(this).show()
      }else {
        $(this).hide()
      }
    });
  });
  //se faccio mouseenter su square_speech messaggio appare icona menu square_speech_dropdown
  //per rendere visibile o meno aggiungo e tolgo classe none
  $(document).on("mouseenter", ".square_speech", function() {
    $(this).children(".message_menu_icon").removeClass("none");
  });

  //se faccio mouseleave su square_speech messaggio nascondo icona menu square_speech_dropdown
  //per rendere visibile o meno aggiungo e tolgo classe none
  $(document).on("mouseleave", ".square_speech", function() {
    //icona scompare olo se il menu non è correntemente aperto e consultabile
    //se il menu e`aperto icona rimane visibile
    if ($(this).children(".square_speech_dropdown").hasClass("none")) {
      $(this).children(".message_menu_icon").addClass("none");
    }
  });

  //se faccio click su icona_menu messaggio appare square_speech_dropdown
  //se faccio click su icona gli altri menu dropdown si chiudono e rimane aperto solo quello slelezionato
  //per rendere visibile o meno aggiungo e tolgo classe none
  $(document).on("click", ".message_menu_icon", function() {
    $(this).parents().siblings().children(".square_speech_dropdown").addClass("none");
    $(this).siblings(".square_speech_dropdown").toggleClass("none");
  });

//FUNZIONI
//Invia un messaggio e aggiungilo al div con classe messages_box
function sendMessage () {
  // vado a definire in una variabile quello che utente scrive in input text_area
  var messageText = $("#send_message_bar").val();

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
    //Invia messaggio di risposta
    setTimeout(sendMessageReply, 1000);
    //scrollo la message_box fino alla fine per mostrare a utente i messaggi piu recenti
    var messageBoxHigh = $(".texting_area").height();
    $(".texting_area").scrollTop(messageBoxHigh)
  }
}

//Invia messaggio di risposta
function sendMessageReply () {

  // indico una variabile che definisce il contenitore del testo scritto da utente
  //ovvero .square_speech che è appunto il div contenitore del tag span contenete il message_text
  var newMessageSquare = $(".templates .square_speech").clone();
  //scrivo il testo che è Ciao
  newMessageSquare.children(".message_text").text("Ciao");
  //scrivo l'orario corrente sotto al messaggio
  newMessageSquare.children(".message_time").text(time());
  //aggiungo al contenitore del testo la classe sent per dargli li stili dei messaggi inviati
  newMessageSquare.addClass("received");
  //appendo il div nel message_box ovvero dove utente potrà leggere i messaggi inviati e ricevuti
  $(".messages_box").append(newMessageSquare);

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


});
