let requests =  new Requests({
    dataType: "json",
    responsePreprocess: data => JSON.parse(data)
});
let cookie = new Cookie();

$(document).ready(async function () {
    initBurger();

    $("#inter").on("click", async function () {
        let mail = $("#mail").val().toLowerCase();
        let password = $("#password").val();

        let data = await requests.post(
            "/users/auth",
            {
                emailOrPhone: mail,
                password: password
            }
        )
        
        if(data.isSuccess){
            cookie.set( "token", data.token );
            $(location).attr('href',"./index.html")
        }
        
        
    })

})