let requests =  new Requests({
    dataType: "json",
    responsePreprocess: data => JSON.parse(data)
});

$(document).ready(function () {
    initBurger();
    initUser();
})