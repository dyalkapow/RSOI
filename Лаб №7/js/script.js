$(document).ajaxSend(function () {
    console.log("Ajax send triggered");
});

$(document).ajaxComplete(function () {
    console.log("Ajax complete triggered");
});

$(document).ajaxStart(function () {
    console.log("Ajax start triggered");
});

$(document).ajaxStop(function () {
    console.log("Ajax stop triggered");
});

$(document).bind("ajaxError", function () {
    alert("Произошла ошибка!");
});

$(document).ajaxSuccess(function () {
    console.log("Запрос выполнен удачно (success)");
});

$(document).ajaxError(function () {
    console.log("Ошибка запроса (error)");

    let result = confirm("Перезагрузить страницу?");
    if (result) {
        location.reload();
    } else {
        window.open("error404");
    }
});

//button1
$(document).ready(function () {
    $("#loadXml").click(function () {
        $.ajax({
            type: "POST",
            url: "../resources/data.xml",
            data: "<person name=\"\" address=\"\" age=\"\" position=\"\"/>",
            dataType: "xml",
            error: function () {
                alert("No find data in file!");
            },
            success: function (xml) {
                $(xml).find('person').each(function () {
                    let fontSize = $('input[name=fontSize]:checked', '#forma').val();
                    if (fontSize) {

                        let name = $(this).find("name").text();
                        let address = $(this).find("address").text();
                        let age = $(this).find("age").text();
                        let position = $(this).find("position").text();

                        $("#name").val(name).css("font-size", fontSize + "px");
                        $("#address").val(address).css("font-size", fontSize + "px");
                        $("#age").val(age).css("font-size", fontSize + "px");
                        $("#position").val(position).css("font-size", fontSize + "px");
                    } else {
                        alert("Выберите размер шрифта!");
                    }
                });
            }
        });
    });
});

//button2
$(document).ready(function () {
    $("#loadGif").click(function () {
        let url = "../js/newScript.js";
        $.getScript(url, function (data, textStatus) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log("Load was performed.");
        });
    });
});


///button3
$(document).ready(function () {
    $("#makeInvisible").click(function () {
        $('input').hide(1200);
        $('label').hide(1200);
    });
});

//Сделать поля невидимыми
$(document).ready(function () {
    $("#makeVisible").click(function () {
        $('input').show(1200);
        $('label').show(1200);
    });
});

//button4
$(document).ready(function () {
    $("#showNewInfo").click(function () {
        $('#textWithPicture').show();
        $('#picture').load('../html/second.html');
        $.ajax({
            url: '../resources/text.txt',
            type: 'GET',
            dataType: 'text',
            success: function (response) {
                $('<p id=\"textFile\">' + response + '</p>')
                    .css({'font-size': '20px', 'color': 'red'})
                    .insertAfter('#text');
            },
        });
    });
});

//Скрыть информацию в блоке
$(document).ready(function () {
    $('#hideNewInfo').click(function () {
        $('#textWithPicture').hide();
    });
});