let requests = new Requests({
    dataType: "json",
    responsePreprocess: data => JSON.parse(data)
});

$(document).ready(function () {
    initUser();
    initBurger();
    initMode();
})

function initMode() {
    let bottleButton = $("#bottle-button");
    let butteryButton = $("#buttery-button");
    let tetrapackButton = $("#tetrapack-button");
    let binButton = $("#bin-button");
    let lampButton = $("#lamp-button");

    bottleButton.on("click", async function () {
        changeMode("bottle", bottleButton)
    })
    butteryButton.on("click", async function () {
        changeMode("battary", butteryButton)
    })
    tetrapackButton.on("click", async function () {
        changeMode("tetrapack", tetrapackButton)
    })
    binButton.on("click", async function () {
        changeMode("bin", binButton)
    })
    lampButton.on("click", async function () {
        changeMode("lamp", lampButton)
    })

}

function changeMode(clas, button){
    if(button.hasClass(clas)){
        button.removeClass(clas);
    }
    else{
        button.addClass(clas);
    }
}