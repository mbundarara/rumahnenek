const API_URL = "https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec"; // ganti jika beda

document.getElementById("loadOrders").addEventListener("click", loadData);
document.getElementById("orderForm").addEventListener("submit", addOrder);

async function loadData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tableBody = document.querySelector("#orderTable tbody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="10">Belum ada data</td></tr>`;
      return;
    }

    data.forEach((row, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row["No"]}</td>
        <td>${row["Tanggal"]}</td>
        <td>${row["Nama"]}</td>
        <td>${row["Nomor WA"]}</td>
        <td>${row["Jenis Cucian"]}</td>
        <td>${row["Berat (kg)"]}</td>
        <td>${row["Harga / Kg"]}</td>
        <td>${row["Total"]}</td>
        <td>${row["Catatan"]}</td>
        <td>${row["Struk ID"]}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    alert("Gagal memuat data: " + err);
  }
}

async function addOrder(e) {
  e.preventDefault();

  const data = {
    "Nama": document.getElementById("nama").value,
    "Nomor WA": document.getElementById("wa").value,
    "Jenis Cucian": document.getElementById("jenis").value,
    "Berat (kg)": document.getElementById("berat").value,
    "Harga / Kg": document.getElementById("harga").value,
    "Catatan": document.getElementById("catatan").value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    });
    const result = await res.json();

    if (result.status === "success") {
      alert("✅ Order tersimpan! Struk ID: " + result.strukID);
      document.getElementById("orderForm").reset();
      loadData();
    } else {
      alert("Gagal menyimpan data.");
    }
  } catch (err) {
    alert("Error: " + err);
  }
}