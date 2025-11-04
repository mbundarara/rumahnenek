const SHEET_URL = "https://script.google.com/macros/s/AKfycbyWVCYAUjvmV4871Vg5KoiQaABBVRSuQVfzNq1oHUCx34mNG7ESJ4gjRUsZBdNAgNQqMg/exec";

const loadBtn = document.getElementById("loadOrders");
const tableBody = document.querySelector("#orderTable tbody");
const orderForm = document.getElementById("orderForm");

async function loadOrders() {
    tableBody.innerHTML = "<tr><td colspan='10'>Memuat...</td></tr>";
    try {
        const res = await fetch(`${SHEET_URL}?action=get`);
        const data = await res.json();
        if (!data || data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='10'>Tidak ada data</td></tr>";
            return;
        }
        tableBody.innerHTML = "";
        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.No}</td>
                <td>${row.Tanggal}</td>
                <td>${row.Nama}</td>
                <td>${row.WA}</td>
                <td>${row.Jenis}</td>
                <td>${row.Berat}</td>
                <td>${row.Harga}</td>
                <td>${row.Total}</td>
                <td>${row.Catatan}</td>
                <td>${row.StrukID}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch(e) {
        tableBody.innerHTML = "<tr><td colspan='10'>Gagal memuat data</td></tr>";
        console.error(e);
    }
}

loadBtn.addEventListener("click", loadOrders);

orderForm.addEventListener("submit", async e => {
    e.preventDefault();
    const payload = {
        nama: document.getElementById("nama").value,
        wa: document.getElementById("wa").value,
        jenis: document.getElementById("jenis").value,
        berat: parseFloat(document.getElementById("berat").value),
        harga: parseFloat(document.getElementById("harga").value),
        catatan: document.getElementById("catatan").value
    };
    try {
        const res = await fetch(SHEET_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            alert("Order berhasil disimpan!");
            orderForm.reset();
            loadOrders();
        } else {
            alert("Gagal menyimpan order!");
        }
    } catch(err) {
        alert("Gagal menghubungi server!");
        console.error(err);
    }
});