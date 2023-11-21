let records = [];

function submitForm() {
  const username = document.getElementById('username').value;
  const branch = document.getElementById('branch').value;
  const grade = document.getElementById('grade').value;
  const email = document.getElementById('email').value;

  const record = { username, branch, grade, email };
  records.push(record);

  insertRecords();
  clearForm();
}

function updateRecord() {
  const index = document.getElementById('recordIndex').value;
  const username = document.getElementById('username').value;
  const branch = document.getElementById('branch').value;
  const grade = document.getElementById('grade').value;
  const email = document.getElementById('email').value;

  records[index] = { username, branch, grade, email };

  insertRecords();
  clearForm();
}

function editRecord(rowIndex) {
  const record = records[rowIndex];
  document.getElementById('username').value = record.username;
  document.getElementById('branch').value = record.branch;
  document.getElementById('grade').value = record.grade;
  document.getElementById('email').value = record.email;

  document.getElementById('recordIndex').value = rowIndex;

  document.getElementById('recordForm').querySelector('button[type="button"]').style.display = 'none';
  document.getElementById('recordForm').querySelector('button[type="button"][onclick="updateRecord()"]').style.display = 'inline';
}

function deleteRecord(rowIndex) {
  records.splice(rowIndex, 1);
  insertRecords();
}

function insertRecords() {
  const tableBody = document.getElementById('recordTableBody');
  tableBody.innerHTML = '';

  records.forEach((record, index) => {
    const row = tableBody.insertRow();
    const cellUsername = row.insertCell(0);
    const cellBranch = row.insertCell(1);
    const cellGrade = row.insertCell(2);
    const cellEmail = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cellUsername.innerHTML = record.username;
    cellBranch.innerHTML = record.branch;
    cellGrade.innerHTML = record.grade;
    cellEmail.innerHTML = record.email;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editRecord(index);
    cell5.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteRecord(index);
    cell5.appendChild(deleteButton);
  });
}

function clearForm() {
  document.getElementById('recordForm').reset();
  document.getElementById('recordForm').querySelector('button[type="button"]').style.display = 'inline';
  document.getElementById('recordForm').querySelector('button[type="button"][onclick="updateRecord()"]').style.display = 'none';
}
