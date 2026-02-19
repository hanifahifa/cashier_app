function simpanPesanan() {
  const pesanan = {
    kasir: document.getElementById('kasir').value,
    customer: document.getElementById('customer').value || '',
    metode: selectedMetode,
    items: cart,
    total: cart.reduce((s, i) => s + i.harga * i.qty, 0),
    timestamp: new Date().toISOString(),
    status: 'pending' // ⬅️ FIX
  };

  const data = JSON.parse(localStorage.getItem('pesanan')) || [];
  data.push(pesanan);
  localStorage.setItem('pesanan', JSON.stringify(data));

  window.location.href = '../index.html';
}
