const loadBtn = document.getElementById('loadOrders');
const tableBody = document.querySelector('#ordersTable tbody');

loadBtn.addEventListener('click', async () => {
  tableBody.innerHTML = "<tr><td colspan='11'>Memuat...</td></tr>";
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec');
    const data = await res.json();

    tableBody.innerHTML = "";
    data.forEach((row, index) => {
      // hitung total
      const berat = parseFloat(row['Berat (kg)'] || 0);
      const harga = parseFloat(row['Harga / Kg'] || 0);
      const total = (berat * harga).toFixed(0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.No || index+1}</td>
        <td>${row.Tanggal || ''}</td>
        <td>${row.Nama || ''}</td>
        <td>${row['Nomor WA'] || ''}</td>
        <td>${row['Jenis Cucian'] || ''}</td>
        <td>${row['Berat (kg)'] || ''}</td>
        <td>${row['Harga / Kg'] || ''}</td>
        <td>${total}</td>
        <td>${row.Catatan || ''}</td>
        <td>${row['Struk ID'] || ''}</td>
        <td><button class="print-btn" onclick='printStruk(${JSON.stringify(row)})'>Cetak Struk</button></td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    tableBody.innerHTML = "<tr><td colspan='11'>Error memuat data</td></tr>";
    console.error(err);
  }
});

function printStruk(order){
  const win = window.open('', 'Print Struk', 'width=400,height=600');
  const berat = parseFloat(order['Berat (kg)'] || 0);
  const harga = parseFloat(order['Harga / Kg'] || 0);
  const total = (berat * harga).toFixed(0);

  win.document.write(`<html><head><title>Struk ${order['Struk ID'] || ''}</title></head><body style="font-family:sans-serif;text-align:left;padding:10px;">`);
  win.document.write(`<h2>Rumah Nenek Laundry</h2>`);
  win.document.write(`<p>No: ${order.No || ''}<br>Tanggal: ${order.Tanggal || ''}<br>Struk ID: ${order['Struk ID'] || ''}</p>`);
  win.document.write(`<p>Nama: ${order.Nama || ''}<br>No WA: ${order['Nomor WA'] || ''}<br>Jenis Cucian: ${order['Jenis Cucian'] || ''}<br>Berat: ${order['Berat (kg)'] || ''} kg<br>Harga/Kg: ${order['Harga / Kg'] || ''}<br><strong>Total: ${total}</strong></p>`);
  if(order.Catatan) win.document.write(`<p>Catatan: ${order.Catatan}</p>`);
  win.document.write(`<p>Terima kasih!</p>`);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}