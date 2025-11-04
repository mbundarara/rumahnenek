const SHEET_URL = "https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec";

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nama: document.getElementById("nama").value,
    wa: document.getElementById("wa").value,
    jenis: document.getElementById("jenis").value,
    berat: parseFloat(document.getElementById("berat").value),
    harga: parseFloat(document.getElementById("harga").value),
    total: parseFloat(document.getElementById("berat").value) * parseFloat(document.getElementById("harga").value),
    catatan: document.getElementById("catatan").value
  };

  const status = document.getElementById("status");
  status.innerText = "⏳ Mengirim data...";

  try {
    const res = await fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();

    if (result.result === "success") {
      status.innerText = `✅ Data tersimpan! ID Struk: ${result.strukID}`;
      document.getElementById("orderForm").reset();
    } else {
      status.innerText = "⚠️ Gagal menyimpan data.";
    }
  } catch (err) {
    status.innerText = "❌ Error koneksi ke Google Sheet.";
    console.error(err);
  }
});