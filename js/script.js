//myJavaScript
$(document).ready(function() {

  //Reset di user_Inteface Current Contacts
  //Quello che vediamo appena apriamo la pagina
  //user name visibile in apertura in user_interface
  var userNameReset = $(".contact_item.selected .user_name").text()
  $(".user_interface .user_name").text(userNameReset);
  //user info visibile in apertura in user_interface
  var userInfoReset = $(".contact_item.selected .user_info").text();
  $(".user_interface .user_info").text(userInfoReset);
  //user date visibile in apertura in user_interface
  var userDateReset = $(".contact_item.selected .user_date").text();
  $(".user_interface .user_date").text(userDateReset);
  //user img avatar visibile in apertura in user_interface
  var userAvatarReset = $(".contact_item.selected .avatar > img").attr("src");
  $(".user_interface .avatar img").attr("src", userAvatarReset);

  //Quando faccio focus sulla input send message bar appare icona sent_message
  //aggiungo la classe none dal div che deve scomparire
  //tolgo classe non da div che devo mostrare
  $(document).on("focus", "input#send_message_bar", function () {
    $(".rigth_switch.icon").children(".mic_icon").addClass("none");
    $(".rigth_switch.icon").children(".sent_icon").removeClass("none");
  });

  //Quando faccio tolgo il focus(blur) sulla input#send_message_bar appare icona mic_icon
  //aggiungo la classe none dal div che deve scomparire
  //tolgo classe non da div che devo mostrare
  $(document).on("blur", "input#send_message_bar", function () {
    $(".rigth_switch.icon").children(".mic_icon").removeClass("none");
    $(".rigth_switch.icon").children(".sent_icon").addClass("none");
  });

  //invio il messaggio a click su icona predisposta
  $(document).on("click", ".rigth_switch.icon" , function() {
    sendMessage();
  });

  //Invio messaggio schiacciando su pulsante invio di tastiera
  $(document).on("keypress", "#send_message_bar", function() {
    if (event.which === 13 || event.keyCode === 13) {
      sendMessage();
    }
  });

  //Cercare contatti con input search
  $(document).on("keyup", "#search_bar", function() {
    var userType = $(this).val().toLowerCase()
    //cerca un nome nei contatti attraverso il valore input iserito in search_bar
    //cerca tra tutti gli user_name della lista contact_list
    //se il user_name contiene i valori di testo inseriti in input da utente mostra i risultati
    //altrimenti nascondi i risultati che non corrispondono ai valori di ricerca immessi
    $("li.contact_item").each(function() {
      var userName = $(this).find(".user_name").text().toLowerCase()
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

  //se faccio click su cancella nel menu dropdown del messaggio
  //cancello il messaggio corrente
  $(document).on("click", ".message_cancel", function() {
    $(this).parent().parent().parent().remove();
  });


  //Al click su un contatto tra quelli in lista contatti
  //Scrive user_name e src avatar img del contatto in user_interface
  //Associa ad ogni contatto una message_box separata per scrivere i messaggi
  $(document).on("click", "li.contact_item", function() {
    //variabile che indica la barra del cotatto cliccata
    var currentContact = $(this)
    //variabile che contiene il nome utente relativo al contatto cliccato
    var userName = currentContact.find(".contact_info > .user_name").text();
    //variabile che contiene le info generiche relative al contatto cliccato
    var userInfo = currentContact.find(".contact_info > .user_info").text();
    //variabile che contiene informazioni ultimo mess inviato da contatto corrente
    var userDate = currentContact.find(".contact_info > .user_date").text();
    console.log(userDate)
    //variabile che contiene attributo src di immagine avatar elemento cliccato
    var userAvatar = currentContact.find(".avatar > img").attr("src");
    //variabile che contiene il valore attr di data-contact
    var dataContact = currentContact.attr("data-contact");
    //cambio il colore della barra del contatto
    //rimuovo la classe selected a tutti gli elementi fratelli rispetto a quello cliccato
    //aggiungo classe selected per cambiare il background color di elemento cliccato
    currentContact.siblings().removeClass("selected");
    currentContact.addClass("selected");
    // assegno nome utente cliccato a user_inteface user_name
    $(".user_interface .user_name").text(userName);
    //assegno le info relative al contatto a user_interface user_info
    $(".user_interface .user_info").text(userInfo);
    //scrive in user_interface la data di immissione di ultimo messaggio inviato
    $(".user_interface .user_date").text(userDate);
    // assegno attr src immagine avatar a user_interface avatar img
    $(".user_interface .avatar img").attr("src", userAvatar);
    //Tolgo la classe active ai messages_box non selezionati quindi non appartenti al contatto correntemente
    //ovvero con un valore dell'attr data-message diverso da attr data-contact relativo al contatto corrente
    $(".messages_box[data-message=\"" + dataContact + "\"]").siblings().removeClass("active");
    //Aggiungo la classe active al messages_box selezionato quindi appartente al contatto correntemente
    //ovvero con un valore dell'attr data-message uguale a attr data-contact relativo al contatto corrente
    $(".messages_box[data-message=\"" + dataContact + "\"]").addClass("active")


  });

//FUNZIONI
//Invia un messaggio e aggiungilo al div con classe messages_box (ovvero la finestra chat)
function sendMessage() {
  // vado a inserire in una variabile quello che utente scrive in input text_area (ovvero il .val di input)
  var messageText = $("#send_message_bar").val();
  // se input text_area non è vuoto proseguo appendendo il messaggio inviato
  if (messageText != "") {
    // indico una variabile che definisce il contenitore (square_speech) del testo scritto da utente
    //ovvero .square_speech che è appunto il div contenitore del tag span contenete il message_text
    var newMessageSquare = $(".templates .square_speech").clone();
    //scrivo il testo che è il val di input, ovvero ciò che utente ha scritto nel div span message_text
    newMessageSquare.children(".message_text").text(messageText);
    //scrivo l'orario corrente sotto al messaggio
    newMessageSquare.children(".message_time").text(time());
    //scrivo data ora mese anno ogni volta che invio un mess nel contatto con classe selected
    $(".contact_item.selected .user_date").text("Last mess sent: " + time() + " - " + month() + " - " + year())
    //scrivo data ora mese anno ogni volta che invio un mess nella user face currebt_contact con classe selected
    $(".user_interface .user_date").text("Last mess sent: " + time() + " - " + month() + " - " + year())
    //resetto il valore di input in modo che utente possa scrivere un nuovo messaggio
    $(".texting_bar input").val("");
    //aggiungo al contenitore del testo la classe sent per dargli gli stili dei messaggi inviati
    newMessageSquare.addClass("sent");
    //appendo il div nel message_box ovvero dove utente potrà leggere i messaggi inviati e ricevuti
    //appendo il messaggio nella finestra di conversazione relativa al contatto corrente (ovvero quella con classe.active)
    $(".messages_box.active").append(newMessageSquare);
    //Genero messaggio di riasposta tramite funzione sendMessageReply
    //Invio messaggio di risposta dopo x secondi dal messaggio inviato da utente
    setTimeout(sendMessageReply, 1000);
    //scrollo la message_box fino alla fine ovvero altezza totale del div contenitore texting_area per mostrare a utente i messaggi piu recenti
    var messageBoxHigh = $(".texting_area").prop("scrollHeigth");
    $(".texting_area").scrollTop(messageBoxHigh)

  }
};

//Invia messaggio di risposta
function sendMessageReply() {
  // indico una variabile che definisce il contenitore del testo di rsiposta
  //ovvero .square_speech che è appunto il div contenitore del tag span contenete il message_text
  var newMessageSquare = $(".templates .square_speech").clone();
  //scrivo il testo che è Ciao
  newMessageSquare.children(".message_text").text("Ciao");
  //scrivo l'orario corrente sotto al messaggio
  newMessageSquare.children(".message_time").text(time());
  //aggiungo al contenitore del testo la classe received per dargli gli stili dei messaggi ricevuti
  newMessageSquare.addClass("received");
  //appendo il div nel message_box ovvero dove utente potrà leggere i messaggi inviati e ricevuti
  $(".messages_box.active").append(newMessageSquare);
};

//Determina orario corrente
//scrivi orario corrente aggiungendo gli 0 davanti alle cifre inferiori a 10
//ritorna orario corrente
function time() {
  var date = new Date()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var currentTime = hours + ":"+ minutes;
  //se il numero generato e`inferiore a 10
  //aggiungo lo 0 davanti al numero indicante ora e minuti correnti
  if (hours < 10) {
    currentTime = "0" + hours + ":" + minutes;
  }else if (minutes < 10) {
    currentTime = hours + ":" + "0" + minutes;
  }else if (hours < 10 && minutes < 10) {
      currentTime = "0" + hours + ":" + "0" + minutes;
  }
  return currentTime
};

//Fine document.ready Jquery
});

function month() {
  var date = new Date()
  var month = date.getMonth()

  if (month === 1) {
    month = "January";
  }else if (month === 2) {
    month = "February";
  }else if (month === 3) {
    month = "March";
  }else if (month === 4) {
    month = "April";
  }else if (month === 5) {
    month = "May";
  }else if (month === 6) {
    month = "June";
  }else if (month === 7) {
    month = "July";
  }else if (month === 8) {
    month = "August";
  }else if (month === 9) {
    month = "September";
  }else if (month === 10) {
    month = "Optober";
  }else if (month === 11) {
    month = "November";
  }else if (month === 12) {
    month = "December";
  }
  return month;
}

function year() {
  var date = new Date()
  var year = date.getFullYear()
  return year;
}
