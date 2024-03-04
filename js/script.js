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

const onSuccess = function(response) {
    alert(" Email inviata con successo!");
    console.log(response);
};

const onError = function(err) {
    alert("Errore nell'invio dell'email, riprova più tardi");
    console.error(err);
};

// The same code as in previous snippet...
function sendEmail( data) {
    $.ajax({
        type: "POST",
        url: "https://public.herotofu.com/v1/b37fbdc0-da56-11ee-8a16-2dace5ed8cab",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: function(xhr, status) {
            if (typeof this.statusCode[xhr.status] !== 'undefined') {
                return false;
            }

            onError(err);
        },
        statusCode: {
            // Endpoint thinks that it's likely a spam/bot request, you need to change "spam protection mode" to "never" in HeroTofu forms
            422: function(response) {
                alert("Cannot send request, are you robot?");
            },
        }
    });
}