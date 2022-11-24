const latinPhrases = [
    'Consuetudo est altera natura',
    "Nota bene",
    'Nulla calamitas sola',
    'Per aspera ad astra',
];
const russianPhrases = [
    'Привычка - вторая натура',
    'Заметье хорошо!',
    'Беда не приходит одна',
    'Через тернии к звездам',
];

function noMorePhrases() {
    alert('No more phrases!');
}

function changeEvenRowsFontStyle() {
    document.querySelectorAll('.even-row-class').forEach(row => {
        row.style.fontWeight = 'bold';
    });
}

function addTableRow() {
    if (russianPhrases.length === 0) {
        noMorePhrases();
        return;
    }

    const tableBody = document.getElementById('lat-ru-table-body-id');
    console.log(tableBody)
    const tableRow = tableBody.insertRow();
    if (tableBody.rows.length % 2 === 0) {
        tableRow.classList.add('even-row-class');
    } else {
        tableRow.classList.add('odd-row-class');
    }

    const index = Math.floor(Math.random() * russianPhrases.length);


    const latinPhrase = latinPhrases[index];
    const latinCell = tableRow.insertCell();
    latinCell.appendChild(document.createTextNode(latinPhrase));
    latinPhrases.splice(index, 1);

    const russianPhrase = russianPhrases[index];
    const russianCell = tableRow.insertCell();
    russianCell.appendChild(document.createTextNode(russianPhrase));
    russianPhrases.splice(index, 1);
}