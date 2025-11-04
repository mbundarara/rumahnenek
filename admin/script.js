document.getElementById("loadData").addEventListener("click", () => {
  fetch(SHEETS_API_URL)
    .then(response => response.json())
    .then(data => {
      const orderList = document.getElementById("orderList");
      orderList.innerHTML = ""; // clear previous

      if (!data || data.length === 0) {
        orderList.innerHTML = "<p>Tidak ada data orderan.</p>";
        return;
      }

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";

      const header = table.insertRow();
      ["No", "Nama", "Alamat", "WA", "Jenis Cucian", "Jumlah", "Tanggal"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.border = "1px solid #5c4633";
        th.style.padding = "6px";
        th.style.backgroundColor = "#e7c7a5";
        header.appendChild(th);
      });

      data.forEach((row, i) => {
        const tr = table.insertRow();
        [i + 1, row.nama, row.alamat, row.wa, row.jenis, row.jumlah, row.tanggal].forEach(text => {
          const td = tr.insertCell();
          td.textContent = text;
          td.style.border = "1px solid #5c4633";
          td.style.padding = "6px";
        });
      });

      orderList.appendChild(table);
    })
    .catch(err => {
      document.getElementById("orderList").innerHTML = "<p>Gagal memuat data.</p>";
      console.error(err);
    });
});