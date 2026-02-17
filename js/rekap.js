// ===============================
// FORMAT RUPIAH (PAKAI TITIK)
// ===============================
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ===============================
// AMBIL DATA PESANAN
// ===============================
function getPesanan() {
  return JSON.parse(localStorage.getItem('pesanan')) || [];
}

// ===============================
// LOAD REKAP HARI INI
// ===============================
function loadRekap() {
  const tbody = document.getElementById('rekapTable');
  const totalTransaksiEl = document.getElementById('totalTransaksi');
  const totalOmzetEl = document.getElementById('totalOmzet');

  tbody.innerHTML = '';

  const data = getPesanan();

  const today = new Date().toLocaleDateString('id-ID');

  let totalTransaksi = 0;
  let totalOmzet = 0;

  data.forEach((order) => {
    const tanggalOrder = new Date(order.timestamp).toLocaleDateString('id-ID');

    // FILTER: HANYA HARI INI
    if (tanggalOrder === today) {
      totalTransaksi++;
      totalOmzet += order.total;

      const jam = new Date(order.timestamp).toLocaleTimeString('id-ID');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${totalTransaksi}</td>
        <td>${jam}</td>
        <td>${order.kasir}</td>
        <td>${order.customer || '-'}</td>
        <td>${formatRupiah(order.total)}</td>
      `;

      tbody.appendChild(tr);
    }
  });

  totalTransaksiEl.innerText = totalTransaksi;
  totalOmzetEl.innerText = formatRupiah(totalOmzet);
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', loadRekap);
