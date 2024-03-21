window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
});
document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

function onSuccess(response) {
    alert(" Email inviata con successo!");
    console.log(response);
};

function onError(err) {
    alert("Errore nell'invio dell'email, riprova più tardi");
    console.error(err);
};

// Funzione per strutturare i dati in modo corretto
function preprocessFormData(formData) {
    // Assumendo che formData sia un oggetto con le chiavi corrispondenti ai nomi dei campi del form
    // Struttura i dati nel formato richiesto
    const structuredData = {
        "Nome e Cognome": formData["nomeCognome"], // Assumendo che il campo nel form si chiami "nomeCognome"
        "Email": formData["email"], // Assumendo che il campo nel form si chiami "email"
        "Telefono": formData["telefono"], // Assumendo che il campo nel form si chiami "telefono"
        "Messaggio": formData["messaggio"] // Assumendo che il campo nel form si chiami "messaggio"
    };

    return structuredData;
}

function sendEmail(data) {
    // Prima di inviare, preprocessa i dati
    const processedData = preprocessFormData(data);

    $.ajax({
        type: "POST",
        url: "https://public.herotofu.com/v1/b37fbdc0-da56-11ee-8a16-2dace5ed8cab",
        data: JSON.stringify(processedData), // Usa i dati processati
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            onSuccess(response);
        },
        error: function(xhr, status, err) { // Aggiunto 'err' per correggere la chiamata a onError
            if (typeof this.statusCode[xhr.status] !== 'undefined') {
                return false;
            }

            onError(err);
        },
        statusCode: {
            422: function(response) {
                alert("Cannot send request, are you robot?");
            },
        }
    });
}