function submitForm() {
    var username = document.getElementById('username').value;
    var branch = document.getElementById('branch').value;
    var grade = document.getElementById('grade').value;
    var email = document.getElementById('email').value;

    var records = getRecords();
    var recordIndex = document.getElementById('recordIndex').value;

    if (recordIndex !== '') {
        // Update 
        records[recordIndex] = { username, branch, grade, email };
    } else {
        // Create new
        records.push({ username, branch, grade, email });
    }

    saveRecords(records);
    resetForm();
    insertRecords();
}

function updateRecord() {
    var index = document.getElementById('recordIndex').value;
    if (index !== '') {
        submitForm();
    }
}

function editRecord(index) {
    var records = getRecords();
    var record = records[index];

    document.getElementById('username').value = record.username;
    document.getElementById('branch').value = record.branch;
    document.getElementById('grade').value = record.grade;
    document.getElementById('email').value = record.email;

    document.getElementById('recordIndex').value = index;
    document.getElementById('recordForm').querySelector('button[type="button"]').style.display = 'none';
    document.getElementById('recordForm').querySelector('button[type="button"][onclick="updateRecord()"]').style.display = 'inline';
}

function deleteRecord(index) {
    var records = getRecords();
    records.splice(index, 1);
    saveRecords(records);
    insertRecords();
}

function getRecords() {
    return JSON.parse(localStorage.getItem('userRecords')) || [];
}

function saveRecords(records) {
    localStorage.setItem('userRecords', JSON.stringify(records));
}

function resetForm() {
    document.getElementById('recordForm').reset();
    document.getElementById('recordIndex').value = '';
    document.getElementById('recordForm').querySelector('button[type="button"]').style.display = 'inline';
    document.getElementById('recordForm').querySelector('button[type="button"][onclick="updateRecord()"]').style.display = 'none';
}

function insertRecords() {
    var records = getRecords();
    var tableBody = document.getElementById('recordTableBody');
    tableBody.innerHTML = '';

    records.forEach(function (record, index) {
        var row = tableBody.insertRow();

        for (var key in record) {
            if (record.hasOwnProperty(key)) {
                var cell = row.insertCell();
                cell.textContent = record[key];
            }
        }

        var actionsCell = row.insertCell();
        actionsCell.innerHTML = '<button onclick="editRecord(' + index + ')">Edit</button> ' +
                                 '<button id="btn" onclick="deleteRecord(' + index + ')">Delete</button>';
    });
}

// Initial display page load
insertRecords();