const http = require("http");
const fs = require('fs');
const ENCODING = 'UTF-8';
//
const FILE_WITH_BASE_ARRAY = '../resources/data/data.txt';
const FILE_WITH_SORTED_ARRAY_ASC = '../resources/data/sortedASCData.txt';
const FILE_WITH_SORTED_ARRAY_DESC = '../resources/data/sortedDESCData.txt';
//
let htmlBase;
let html;
let css;
let background;
//
const numbersCount = 100;
let numberAfterDotCount = 6;
let array = createAndFillArray();
///
fs.readFile('../html/index.html', function (err, data) {
    console.log("started");
    if (err) {
        throw err;
    }
    html = data.toString();
    htmlBase = data.toString();
});

fs.readFile('../css/style.css', function (err, data) {
    if (err) {
        throw err;
    }
    css = data;
});

fs.readFile('../resources/img/background.png', function (err, data) {
    if (err) {
        throw err;
    }
    background = data;
});

let ready;

const server = http.createServer((request, response) => {
    if (!ready) {
        ready = true;
        preparedFiles();
    }
    if (request.method === "POST") {
        let data = '';
        request.on('data', function (chunk) {
            data = chunk.toString();
        });
        request.on('end', () => {
            numberAfterDotCount = data.split("=")[1];
            response.writeHead(200, {"Content-Type": "text/html"});
            writeTable(response);
            response.end();
        });
    }
    else {
        switch (request.url) {
            case '/css/style.css':
                response.writeHead(200, {"Content-type": "text/css"});
                response.write(css);
                break;
            case '/resources/img/background.png':
                response.write(background);
                break;
            case '/getTableSortedASC?':
                readFile(FILE_WITH_SORTED_ARRAY_ASC);
                writeTable(response);
                break;
            case '/getTableSortedDESC?':
                readFile(FILE_WITH_SORTED_ARRAY_DESC);
                writeTable(response);
                break;
            default:
                writeTable(response);
        }
        response.end();
    }

});

server.listen(3000, "127.0.0.1", function () {
    console.log("Сервер начал прослушивание запросов на порту 3000");
});


function writeToFile(filePath, array) {
    fs.writeFile(filePath, array, function (err) {
        if (err) {
            throw err;
        }
        console.log('Информация записана в файл!');
    });
}


function readFile(filePath) {
    let contents = fs.readFileSync(filePath, ENCODING).split(",");
    for (let i = 0; i < contents.length; i++) {
        array[i] = parseFloat(contents[i]);
    }
    console.log('Информация считана из файла!');
}

function writeTable(response) {
    changeCountNumbersAfterDot(array);

    let newTable = createNewTable(array);
    html = htmlBase.replace('<table></table>', newTable);

    response.writeHead(200, {"Content-type": "text/html"});
    response.write(html);
}


function getRandomFloat() {
    const min = 1;
    const max = 17;
    return Math.random() * (max - min) + min;
}

function createAndFillArray() {
    let array = [];
    //
    for (let i = 0; i < numbersCount; i++) {
        array[i] = getRandomFloat().toFixed(numberAfterDotCount);
    }
    return array;
}

function changeCountNumbersAfterDot(array) {
    for (let i = 0; i < numbersCount; i++) {
        array[i] = parseFloat(array[i]).toFixed(numberAfterDotCount);
    }
}

function createNewTable(array) {
    let newTable = '<table border="1">';
    let count = 0;
    //
    array.forEach(function (number) {
        if (number % 10 === 0) {
            newTable += '<tr>';
        }
        if (count === 10) {
            newTable += '</tr>';
            count = 0;
        }
        newTable += '<td>' + number + '</td>';
        count++;
    });
    newTable += '</table>';
    return newTable;
}


function preparedFiles() {
    writeToFile(FILE_WITH_BASE_ARRAY, array.toString());
    writeToFile(FILE_WITH_SORTED_ARRAY_ASC, sortArrayAsc(array).toString());
    writeToFile(FILE_WITH_SORTED_ARRAY_DESC, sortArrayDesc(array).toString());
}

function sortArrayAsc() {
    return array.sort(function (a, b) {
        return a - b;
    });
}

function sortArrayDesc(array) {
    return array.sort(function (a, b) {
        return b - a;
    });
}