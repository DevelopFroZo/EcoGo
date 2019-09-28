let requests = new Requests({
    dataType: "json",
    responsePreprocess: data => JSON.parse(data)
});

$(document).ready(async function () {
    initBurger();

    let data = await requests.post("/users/getUserInfo");

    if (data.isSuccess) {
        $("#qrCode").attr("src", data.qrcode)
        $("#user-name").text(data.fi);
        $("#user-mail").text(data.email);
        $("#user-number").text(data.phone).attr("href", "tel:" + data.phone);
        $(".tokens").text(data.balance + " баллов")
    }

})