async function initUser(){

    let data = await requests.post("/users/getUserInfo");

    let bonusBlock = $(".user-bunus");
    let interButton = $(".login");
    let userButton = $(".user-logo-block");

    if (data.isSuccess) {
        bonusBlock.text(data.balance);
        userButton.css("display", "flex");
        interButton.hide();

        userButton.on("click", function(){
            $(location).attr("href", "./personalArea.html");
        })
    }
    else{
        interButton.on("click", function(){
            $(location).attr("href", "./inter.html");
        })
    }
}