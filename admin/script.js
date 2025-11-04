const sheetURL = "https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec";
const loadBtn = document.getElementById('loadOrders');
const tbody = document.querySelector('#ordersTable tbody');

loadBtn.addEventListener('click', () => {
  loadBtn.textContent = "📤 Memuat...";
  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      if(!data || data.length === 0){
        tbody.innerHTML = '<tr><td colspan="11">Belum ada data orderan.</td></tr>';
        loadBtn.textContent = "📥 Muat Orderan";
        return;
      }
      data.forEach((row, i) => {
        const total = parseFloat(row['Berat (kg)'] || 0) * parseFloat(row['Harga / Kg'] || 0);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${i+1}</td>
          <td>${row['Tanggal'] || ''}</td>
          <td>${row['Nama'] || ''}</td>
          <td>${row['Nomor WA'] || ''}</td>
          <td>${row['Jenis Cucian'] || ''}</td>
          <td>${row['Berat (kg)'] || ''}</td>
          <td>${row['Harga / Kg'] || ''}</td>
          <td>${total.toFixed(0)}</td>
          <td>${row['Catatan'] || ''}</td>
          <td>${row['Struk ID'] || ''}</td>
          <td><button class="printBtn" onclick="printStruk(${i})">🖨️</button></td>
        `;
        tbody.appendChild(tr);
      });
      loadBtn.textContent = "📥 Muat Orderan";
    })
    .catch(err => {
      console.error(err);
      tbody.innerHTML = '<tr><td colspan="11">Gagal memuat data!</td></tr>';
      loadBtn.textContent = "📥 Muat Orderan";
    });
});

// Cetak struk
function printStruk(index){
  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      const row = data[index];
      if(!row) return alert("Data tidak ditemukan!");
      const total = parseFloat(row['Berat (kg)'] || 0) * parseFloat(row['Harga / Kg'] || 0);
      const struk = `
        <h2>Rumah Nenek Laundry</h2>
        <p><strong>Struk ID:</strong> ${row['Struk ID']}</p>
        <p><strong>Tanggal:</strong> ${row['Tanggal']}</p>
        <p><strong>Nama:</strong> ${row['Nama']}</p>
        <p><strong>No WA:</strong> ${row['Nomor WA']}</p>
        <p><strong>Jenis Cucian:</strong> ${row['Jenis Cucian']}</p>
        <p><strong>Berat (kg):</strong> ${row['Berat (kg)']}</p>
        <p><strong>Harga / Kg:</strong> ${row['Harga / Kg']}</p>
        <p><strong>Total:</strong> ${total.toFixed(0)}</p>
        <p><strong>Catatan:</strong> ${row['Catatan']}</p>
      `;
      const printWindow = window.open('', '', 'width=300,height=500');
      printWindow.document.write(struk);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    });
}