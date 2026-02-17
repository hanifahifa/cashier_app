// ===============================
// STATE KERANJANG
// ===============================
let cart = [];

// ===============================
// FORMAT RUPIAH (PAKAI TITIK)
// ===============================
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ===============================
// UPDATE TANGGAL & JAM REALTIME
// ===============================
function updateDateTime() {
  const now = new Date();

  document.getElementById('tanggal').innerText =
    now.toLocaleDateString('id-ID');

  document.getElementById('jam').innerText =
    now.toLocaleTimeString('id-ID');
}

updateDateTime();
setInterval(updateDateTime, 1000);

// ===============================
// UPDATE PREVIEW IDENTITAS STRUK
// ===============================
function updatePreviewIdentitas() {
  const kasir = document.getElementById('kasir').value || '-';
  const customer = document.getElementById('customer').value || '-';

  document.getElementById('previewKasir').innerText = kasir;
  document.getElementById('previewCustomer').innerText = customer;
}

document.getElementById('kasir')
  .addEventListener('change', updatePreviewIdentitas);

document.getElementById('customer')
  .addEventListener('input', updatePreviewIdentitas);

// ===============================
// TAMBAH ITEM KE KERANJANG
// ===============================
function addItem(nama, harga) {
  const item = cart.find(i => i.nama === nama);

  if (item) {
    item.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }

  renderCart();
}

// ===============================
// RENDER PREVIEW STRUK
// ===============================
function renderCart() {
  const list = document.getElementById('orderList');
  const totalEl = document.getElementById('totalHarga');

  list.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';

    li.innerHTML = `
      ${item.nama} x${item.qty}
      <span>${formatRupiah(subtotal)}</span>
    `;

    list.appendChild(li);
  });

  totalEl.innerText = formatRupiah(total);
}

// ===============================
// SIMPAN PESANAN + REDIRECT
// ===============================
function simpanPesanan() {
  if (cart.length === 0) {
    alert('Keranjang masih kosong');
    return;
  }

  const kasir = document.getElementById('kasir').value;
  if (!kasir) {
    alert('Pilih kasir terlebih dahulu');
    return;
  }

  const pesanan = {
    kasir: kasir,
    customer: document.getElementById('customer').value || '',
    metode: 'QRIS',
    items: cart,
    total: cart.reduce((s, i) => s + i.harga * i.qty, 0),
    timestamp: new Date().toISOString()
  };

  const data = JSON.parse(localStorage.getItem('pesanan')) || [];
  data.push(pesanan);
  localStorage.setItem('pesanan', JSON.stringify(data));

  // RESET & BALIK KE DASHBOARD
  cart = [];
  window.location.href = '../index.html';
}
