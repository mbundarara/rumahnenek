const sheetURL = "https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec";
const sheetID = "16eEiqUhy76Ywm8GJHumylI_NXpoBHbHDCscLrpMd0FU"; // base1

// Muat order dari Google Sheet
document.getElementById("loadOrders").addEventListener("click", () => {
    fetch(`${sheetURL}?action=getOrders&sheetID=${sheetID}`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#orderTable tbody");
        tbody.innerHTML = "";
        if(data && data.length){
            data.forEach(row=>{
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.No}</td>
                    <td>${row.Tanggal}</td>
                    <td>${row.Nama}</td>
                    <td>${row["Nomor WA"]}</td>
                    <td>${row["Jenis Cucian"]}</td>
                    <td>${row.Berat}</td>
                    <td>${row["Harga / Kg"]}</td>
                    <td>${row.Total}</td>
                    <td>${row.Catatan}</td>
                    <td>${row["Struk ID"]}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = "<tr><td colspan='10'>Belum ada data order.</td></tr>";
        }
    })
    .catch(err=>{
        alert("Gagal memuat data: " + err);
    });
});

// Tambah order baru
document.getElementById("orderForm").addEventListener("submit", e=>{
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const wa = document.getElementById("wa").value.trim();
    const jenis = document.getElementById("jenis").value.trim();
    const berat = parseFloat(document.getElementById("berat").value);
    const harga = parseFloat(document.getElementById("harga").value);
    const catatan = document.getElementById("catatan").value.trim();

    const total = berat * harga;
    const tanggal = new Date().toLocaleDateString("id-ID");
    const strukID = "STRUK-" + Date.now();

    const payload = {
        action: "addOrder",
        sheetID,
        data: {Tanggal: tanggal, Nama: nama, "Nomor WA": wa, "Jenis Cucian": jenis, Berat: berat, "Harga / Kg": harga, Total: total, Catatan: catatan, "Struk ID": strukID}
    };

    fetch(sheetURL, {
        method:"POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type":"application/json"}
    })
    .then(res => res.json())
    .then(resp=>{
        if(resp.status=="success"){
            alert("Order berhasil ditambahkan!");
            document.getElementById("orderForm").reset();
            document.getElementById("loadOrders").click();
        } else {
            alert("Gagal menambahkan order.");
        }
    })
    .catch(err=>{
        alert("Error: " + err);
    });
});