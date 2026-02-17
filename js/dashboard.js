// ===============================
// FORMAT RUPIAH
// ===============================
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ===============================
// LOAD ANTRIAN (HANYA PENDING)
// ===============================
function loadAntrian() {
  const container = document.getElementById('antrian');
  container.innerHTML = '';

  const data = JSON.parse(localStorage.getItem('pesanan')) || [];

  // filter hanya yang pending
  const pendingOrders = data.filter(o => o.status === 'pending');

  if (pendingOrders.length === 0) {
    container.innerHTML = '<p class="text-muted">Belum ada pesanan</p>';
    return;
  }

  pendingOrders.forEach((order) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';

    let itemsHTML = '';
    order.items.forEach(item => {
      itemsHTML += `${item.nama} x${item.qty}<br>`;
    });

    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between fw-bold mb-2">
          <span>${order.kasir} - ${order.customer || 'Customer'}</span>
          <span>QRIS</span>
        </div>

        <div class="mb-2">
          ${itemsHTML}
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <strong>${formatRupiah(order.total)}</strong>
          <button class="btn btn-success btn-sm"
            onclick="selesai('${order.timestamp}')">
            ✔ Selesai
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===============================
// SELESAI PESANAN (UBAH STATUS)
// ===============================
function selesai(timestamp) {
  let data = JSON.parse(localStorage.getItem('pesanan')) || [];

  const index = data.findIndex(o => o.timestamp === timestamp);

  if (index !== -1) {
    data[index].status = 'done';
    localStorage.setItem('pesanan', JSON.stringify(data));
  }

  loadAntrian();
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', loadAntrian);
