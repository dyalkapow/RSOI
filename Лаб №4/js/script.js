function addElement() {
    const list = document.getElementById("list");
    const addValue = document.getElementById("addValue");

    if(!addValue.value) {
        alert("Пожалуйста, заполните поле ввода");
    } else {
        const option = new Option(addValue.value, addValue.value);
        
        list.add(option, undefined);
        
        addValue.value = '';
        addValue.focus();
    }
}

function deleteElement() {
    const list = document.getElementById("list");
    const table = document.getElementById('dataListTable');
    
    for (let i = 0; i < list.options.length; i++) {
        if (list.options[i].selected) {
            const row = table.insertRow(0);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            
            cell1.innerHTML = list.options.selectedIndex;
            cell2.innerHTML = list.options[i].value;
            
            list.remove(list.options.selectedIndex);
        }
    }
}

function show() {
    document.getElementById('tableContainer').classList.toggle('show');
}