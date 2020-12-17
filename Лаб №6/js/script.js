$(document).ready(function () {
        $("#firstButton").click(function () {
        let allInputs = $( "input[type=text]");
        allInputs.each(function () {
            let input = $(this).val();
            if(input[0] !== '$')
                $(this).val("$" + input).css("border","2px gold solid");
        });

        $('input[name="norm"][id="id2"]').before("<span></span><br>");
        $('span').text(new Date().toLocaleDateString() +' '+ new Date().toLocaleTimeString());
    });
        $("#secondButton").click(function () {
            $('input[id="id2"]').hide();
            $('input[id!="id2"]').css("background-color", "gray");
        });
});