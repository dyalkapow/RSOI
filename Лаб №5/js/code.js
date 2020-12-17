let db = openDatabase("5", "1.0", "DB", 2 * 1024 * 1024);

db.transaction(function (transaction) {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS ComputerStore (store_id INTEGER PRIMARY KEY AUTOINCREMENT, device_name TEXT NOT NULL, receipt_date DATE NOT NULL, delivery_type TEXT NOT NULL, requisites TEXT NOT NULL, address, company_phone, visitor TEXT)");
    // transaction.executeSql("DROP TABLE ComputerStore");
});

class ComputerStore{
    constructor(device_name,receipt_date,delivery_type, requisites){
        this._device_name = device_name;
        this._receipt_date = receipt_date;
        this._delivery_type = delivery_type;
        this._requisites = requisites;
    }
    get device_name() {
        return this._device_name;
    }

    get receipt_date() {
        return this._receipt_date;
    }

    get delivery_type() {
        return this._delivery_type;
    }

    get g_requisites() {
        return this._requisites;
    }

    get address(){
        return this._address;
    }

    get company_phone(){
        return this._company_phone;
    }

    get g_visitor(){
        return this._visitor;
    }
}


function add_data() {
    let device_name = document.getElementById("deviceName").value;
    let receipt_date = document.getElementById("receiptDate").value;
    let delivery_type = document.getElementById("deliveryType").value;
    let requisites = document.getElementById("requisites").value;
    let add_info = document.getElementById("addInfoKey").value;

    let computer_store = new ComputerStore(device_name,receipt_date,delivery_type,requisites);

    if(add_info === "companyPhone"){
        ComputerStore.prototype._company_phone = null;
        computer_store._company_phone = document.getElementById("addInfoValue").value;
        alert(computer_store.company_phone);
    } else if(add_info === "address"){
      ComputerStore.prototype._address = null;
      computer_store._address = document.getElementById("addInfoValue").value;
        alert(computer_store.address);
    } else if(add_info === "visitor"){
      ComputerStore.prototype._visitor = null;
      computer_store._visitor = document.getElementById("addInfoValue").value;
        alert(computer_store.g_visitor);
    }

    insert(computer_store);
    load_table();
    return false;
}

function insert(computer_store) {
    if('_company_phone' in computer_store){
        db.transaction(function (transaction) {
           transaction.executeSql("INSERT INTO ComputerStore (device_name,receipt_date,delivery_type,requisites,company_phone) VALUES(?,?,?,?,?)",
               [computer_store.device_name, computer_store.receipt_date,computer_store.delivery_type,computer_store.g_requisites,computer_store.company_phone],
               success,error);
        });
    } else if('_address' in computer_store){
        db.transaction(function (transaction) {
            transaction.executeSql("INSERT INTO ComputerStore (device_name,receipt_date,delivery_type,requisites,address) VALUES(?,?,?,?,?)",
                [computer_store.device_name, computer_store.receipt_date,computer_store.delivery_type,computer_store.g_requisites,computer_store.address],
                success,error);
        });
    } else if('_visitor' in computer_store){
        db.transaction(function (transaction) {
            transaction.executeSql("INSERT INTO ComputerStore (device_name,receipt_date,delivery_type,requisites,visitor) VALUES(?,?,?,?,?)",
                [computer_store.device_name, computer_store.receipt_date,computer_store.delivery_type,computer_store.g_requisites,computer_store.g_visitor],
                success,error);
        });
    }
}

function success() {
    alert("Информация успешно добавлена!");
    document.getElementById("deviceName").value = "";
    document.getElementById("receiptDate").value = "";
    document.getElementById("deliveryType").value = "";
    document.getElementById("requisites").value = "";

    if (document.getElementById("addInfoKey") != null && document.getElementById("addInfoValue") != null) {
        remove_additional_fields();
    }
}

function error(transaction, error) {
    alert("Произошла ошибка!" + error.message);
}

function load_table() {
    if (db) {
        db.transaction(function (t) {
            t.executeSql("SELECT store_id, device_name, receipt_date, delivery_type, requisites, company_phone, address, visitor FROM ComputerStore",
                [], update_table);
        })
    }
}

function get_sorted_order() {
    let type = document.getElementById("deliveryTypeSearch").value;
    if(db){
        db.transaction(function (transaction) {
            transaction.executeSql("SELECT device_name FROM ComputerStore WHERE delivery_type = ?",[type],alert_order);
        })
    }
}

function alert_order(transaction,result) {
    let rows = result.rows;
    let info = "Список товаров с данным видом доставки:\n";

    for(let i =0;i<rows.length;i++){
        info += rows.item(i).device_name + "\n";
    }

    alert(info);
}

function delete_store() {
    let store_id = parseInt(document.getElementById("storeId").value,10);
    if(db){
        db.transaction(function (transaction) {
            transaction.executeSql("DELETE FROM ComputerStore WHERE store_id = ?",[store_id],update_table);
        })
    }
}

function update_table(transaction, result) {
    let table = document.getElementById("storeTable");
    let select = document.getElementById("storeId");
    let properties = document.getElementById("storeProperties");
    properties.innerHTML = "<th>ID</th>\n" +
        "<th>Название устройства</th>\n" +
        "<th>Дата поставки</th>\n" +
        "<th>Вид доставки</th>\n" +
        "<th>Реквизиты</th>";
    let company_phone = false;
    let address = false;
    let visitor = false;

    let number = table.rows.length;
    for (let i = 1; i < number; i++) {
        select.remove(0);
        table.deleteRow(1);
    }

    let rows = result.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows.item(i);
        if (row.company_phone != null && !company_phone) {
            company_phone = true;
        }
        if (row.address != null && !address) {
            address = true;
        }
        if (row.g_visitor != null && !visitor) {
            visitor = true;
        }
    }

    if (company_phone) {
        properties.insertAdjacentHTML("beforeend", "<th>Телефон</th>");
    }
    if (address) {
        properties.insertAdjacentHTML("beforeend", "<th>Адрес</th>");
    }
    if (visitor) {
        properties.insertAdjacentHTML("beforeend", "<th>Посетитель</th>");
    }

    for (let i = 0; i < rows.length; i++) {
        let row = rows.item(i);
        let tr = table.insertRow(-1);

        let store_id = tr.insertCell(0);
        store_id.innerText = row.store_id;

        let device_name = tr.insertCell(1);
        device_name.innerText = row.device_name;

        let receipt_date = tr.insertCell(2);
        receipt_date.innerText = row.receipt_date;

        let delivery_type = tr.insertCell(3);
        delivery_type.innerText = row.delivery_type;

        let requisites = tr.insertCell(4);
        requisites.innerText = row.requisites;

        if (company_phone) {
            let phone_value = tr.insertCell(5);
            phone_value.innerText = row.company_phone;
        }
        if (address) {
            let index = company_phone ? 6 : 5;
            let address_value = tr.insertCell(index);
            address_value.innerText = row.address;
        }
        if (visitor) {
            let index = company_phone ? (address ? 7 : 6) : (address ? 6 : 5);
            let visitor_value = tr.insertCell(index);
            visitor_value.innerText = row.visitor;
        }

        let option = document.createElement("option");
        option.value = row.store_id;
        option.innerText = row.store_id;
        select.appendChild(option);
    }
}

function add_additional_fields() {
    let div = document.getElementById("mainInfo");
    div.insertAdjacentHTML("beforeend", "<select id=\"addInfoKey\" name=\"addInfoKey\"><option value=\"companyPhone\">Телефон</option><option value=\"address\">Адрес</option><option value=\"visitor\">Посетитель</option></select>");
    div.insertAdjacentHTML("beforeend", "<input type=\"text\" placeholder=\"Значение\" id=\"addInfoValue\" name=\"addInfoValue\">");
    div.insertAdjacentHTML("beforeend", "<button class=\"red\" type=\"button\" id=\"removeAddInfo\" onclick=\"remove_additional_fields()\">Удалить поле</button>");
    let button = document.getElementById("addInfo");
    div.removeChild(button);
}

function remove_additional_fields() {
    let div = document.getElementById("mainInfo");
    div.insertAdjacentHTML("beforeend", "<button class=\"orange\" type=\"button\" id=\"addInfo\" onclick=\"add_additional_fields()\">Доп. информация</button>");
    let key = document.getElementById("addInfoKey");
    let value = document.getElementById("addInfoValue");
    let removeButton = document.getElementById("removeAddInfo");
    div.removeChild(key);
    div.removeChild(value);
    div.removeChild(removeButton);
}