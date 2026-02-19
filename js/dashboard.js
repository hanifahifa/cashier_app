function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function loadAntrian() {
  const container = document.getElementById('antrian');
  container.innerHTML = '';

  const data = JSON.parse(localStorage.getItem('pesanan')) || [];

  if (data.length === 0) {
    container.innerHTML = `<p>Belum ada pesanan</p>`;
    return;
  }

  data.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';

    const items = order.items.map(i => `${i.nama} x${i.qty}`).join(', ');

    const isDone = order.status === 'done';

    card.innerHTML = `
      <div>
        <strong>${order.customer || 'Customer'}</strong><br>
        <small>${order.kasir} · ${items}</small>
      </div>

      <div style="text-align:right">
        <div>${formatRupiah(order.total)}</div>

        <button
          onclick="toggleStatus('${order.timestamp}')"
          style="
            margin-top:6px;
            background:${isDone ? '#34C759' : '#007AFF'};
            color:#fff;
            border:none;
            padding:6px 14px;
            border-radius:8px;
            font-weight:700;
            cursor:pointer">
          ${isDone ? 'Selesai' : 'Pending'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function toggleStatus(timestamp) {
  const data = JSON.parse(localStorage.getItem('pesanan')) || [];
  const idx = data.findIndex(o => o.timestamp === timestamp);

  if (idx !== -1) {
    data[idx].status =
      data[idx].status === 'pending' ? 'done' : 'pending';
    localStorage.setItem('pesanan', JSON.stringify(data));
  }

  loadAntrian();
}

document.addEventListener('DOMContentLoaded', loadAntrian);
