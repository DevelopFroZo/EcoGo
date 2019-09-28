function initBurger(){
    let burgerButton = $(".burger-button");
    let burgerBlock = $(".burger");
    let mode = false;

    burgerButton.on("click", function(){
        if(!mode){
            burgerBlock.show();
            mode = true;
        }
        else{
            burgerBlock.hide();
            mode = false;
        }
    })

    $(document).on("mouseup", function(e){
        if (!burgerBlock.is(e.target)
		    && burgerBlock.has(e.target).length === 0) { 
			burgerBlock.hide();
		}
    })
}