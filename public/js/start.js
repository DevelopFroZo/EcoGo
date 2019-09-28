$(document).ready(function () {
    initBurger();
    initCompanyMode();
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

function initBurger(){
    let burgerButton = $(".burger-button");
    let burgerBlock = $(".burger");

    burgerButton.on("click", function(){
        burgerBlock.show();
    })

    $(document).on("mouseup", function(e){
        if (!burgerBlock.is(e.target)
		    && burgerBlock.has(e.target).length === 0) { 
			burgerBlock.hide();
		}
    })
}