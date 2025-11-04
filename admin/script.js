const execURL = "https://script.google.com/macros/s/AKfycbyWVCYAUjvmV4871Vg5KoiQaABBVRSuQVfzNq1oHUCx34mNG7ESJ4gjRUsZBdNAgNQqMg/exec";

const loadBtn = document.getElementById("loadOrders");
const orderTable = document.querySelector("#orderTable tbody");
const statusDiv = document.getElementById("status");
const orderForm = document.getElementById("orderForm");

loadBtn.addEventListener("click", loadOrders);
orderForm.addEventListener("submit", addOrder);

function loadOrders(){
    statusDiv.textContent = "Memuat data...";
    fetch(execURL + "?action=get")
    .then(resp => resp.json())
    .then(data => {
        orderTable.innerHTML = "";
        if(data.length === 0){
            orderTable.innerHTML = "<tr><td colspan='10'>Belum ada data</td></tr>";
        } else {
            data.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${row.No}</td>
                <td>${row.Tanggal}</td>
                <td>${row.Nama}</td>
                <td>${row["Nomor WA"]}</td>
                <td>${row["Jenis Cucian"]}</td>
                <td>${row["Berat (kg)"]}</td>
                <td>${row["Harga / Kg"]}</td>
                <td>${row.Total}</td>
                <td>${row.Catatan}</td>
                <td>${row["Struk ID"]}</td>
                `;
                orderTable.appendChild(tr);
            });
        }
        statusDiv.textContent = "Data berhasil dimuat";
        statusDiv.className = "success";
    })
    .catch(err => {
        statusDiv.textContent = "Gagal memuat data";
        statusDiv.className = "error";
        console.error(err);
    });
}

function addOrder(e){
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const wa = document.getElementById("wa").value;
    const jenis = document.getElementById("jenis").value;
    const berat = parseFloat(document.getElementById("berat").value);
    const harga = parseFloat(document.getElementById("harga").value);
    const catatan = document.getElementById("catatan").value;
    const total = berat * harga;

    const params = new URLSearchParams();
    params.append("action","add");
    params.append("Nama",nama);
    params.append("NomorWA",wa);
    params.append("JenisCucian",jenis);
    params.append("Berat",berat);
    params.append("Harga",harga);
    params.append("Total",total);
    params.append("Catatan",catatan);

    fetch(execURL, {method:"POST", body: params})
    .then(resp => resp.json())
    .then(res => {
        if(res.result === "success"){
            statusDiv.textContent = "Order berhasil disimpan";
            statusDiv.className = "success";
            orderForm.reset();
            loadOrders();
        } else {
            statusDiv.textContent = "Gagal menyimpan order";
            statusDiv.className = "error";
        }
    })
    .catch(err=>{
        statusDiv.textContent = "Gagal menyimpan order";
        statusDiv.className = "error";
        console.error(err);
    });
}