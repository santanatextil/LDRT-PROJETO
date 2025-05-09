let diseases = [];

// Carregar doenças do arquivo JSON
fetch('data/diseases-full.json')
    .then(res => res.json())
    .then(data => {
        diseases = data;
        displayDiseases(diseases);
    });

function displayDiseases(list) {
    const ul = document.getElementById("diseaseList");
    ul.innerHTML = "";
    list.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${d.code}</strong>: ${d.name} | <em>CID: ${d.cid}</em>`;
        ul.appendChild(li);
    });
}

function searchDisease() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = diseases.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.code.toLowerCase().includes(term) ||
        d.cid.toLowerCase().includes(term)
    );
    displayDiseases(filtered);
}

function filterByCategory() {
    const category = document.getElementById("categoryFilter").value;
    const filtered = category ? diseases.filter(d => d.category === category) : diseases;
    displayDiseases(filtered);
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(12);
    diseases.forEach((d, i) => {
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
        doc.text(`${d.code} - ${d.name} | CID: ${d.cid}`, 10, y);
        y += 7;
    });

    doc.save("doencas_ocupacionais.pdf");
}