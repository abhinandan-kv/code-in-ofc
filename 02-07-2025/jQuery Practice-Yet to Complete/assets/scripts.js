
$(document).ready(function(){
    $("#singleClick").click(function(){
        $("#doubleClick").toggle(1000,function(){
            $("#doubleClickShadow").show()
        });
    })

    $("#doubleClick").dblclick(function(){
        $("#doubleClickShadow").hide()
    })
})
