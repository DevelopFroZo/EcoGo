$(document).ready(function () {
    initBurger();
    initCompanyMode();
    map()
})

function initCompanyMode(){
    let mode = 0;
    let modeButton = $(".organisation-swipe-block");
    let photosBlock = $(".photo-block");
    let mailBlock = $(".mail-block");
    let typeBlock = $(".organisation-type-block");
    
    modeButton.off("click").on("click", function(){
        if(mode === 0){
            typeBlock.css("display", "flex");
            mode++;
        }
        else if(mode === 1){
            mailBlock.css("display", "flex");
            photosBlock.css("display", "flex");
            mode++;
        }
        else if(mode === 2){
            photosBlock.hide();
            mailBlock.hide();
            typeBlock.hide();
            mode = 0;
        }
    })
}

function showReceptionPoint( receptionPoint ){
    let organisationInfoBlock = $(".organisation-info-block");
    let organisationName = $(".organisation-name");
    let organisationPlace = $(".organisation-place");
    let organisationTime = $(".organisation-time");
    let organisationNumber = $(".organisation-number");
    let organisationMail = $(".organisation-mail");
    let trashType = $(".trash-type");

    let openTime = [Math.floor(receptionPoint.opentime / 60), (receptionPoint.opentime / 60 - Math.floor(receptionPoint.opentime / 60)) * 60];
    let closeTime = [Math.floor(receptionPoint.closetime / 60), (receptionPoint.closetime / 60 - Math.floor(receptionPoint.closetime / 60)) * 60];

    initCompanyMode();

    organisationInfoBlock.show();
    trashType.hide();

    console.log(receptionPoint)

    organisationName.text(receptionPoint.name);
    organisationPlace.text(receptionPoint.address);
    organisationTime.text(setFormatTime(openTime[0]) + ":" + setFormatTime(openTime[1]) + "-" + setFormatTime(closeTime[0]) + ":" + setFormatTime(closeTime[1]));

}

function setFormatTime(time){
    if(time < 10)
        return "0" + time
    else
        return time
}