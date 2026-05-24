# Admin Dashboard — React Frontend

Aplikasi admin dashboard berbasis React + Vite dengan autentikasi JWT, role-based access, dan fitur CRUD lengkap.

---

## Tech Stack

- **React** + **Vite**
- **React Router DOM** — routing & navigasi
- **Axios** — HTTP client dengan interceptor
- **Tailwind CSS** — styling
- **React Hot Toast** — notifikasi

---

## Struktur Folder

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root component
├── Store/
│   ├── AuthContext.jsx        # Auth state (token, user, login, logout)
│   └── PagesProvider.jsx      # Global UI state (modal, sidebar, dll)
├── Routes/
│   ├── MainRoute.jsx          # Definisi semua route
│   ├── PrivateRoute.jsx       # Guard: redirect ke /login jika belum auth
│   └── RouteSuperAdmin.jsx    # Guard: hanya role super_admin
├── Layouts/
│   └── Layouts.jsx            # Layout utama (Sidebar + Navbar + Footer)
├── Pages/
│   ├── auth/
│   │   └── Login.jsx
│   ├── Home.jsx               # Dashboard utama
│   ├── ProdukPage.jsx         # CRUD Produk
│   ├── Categories.jsx         # CRUD Kategori
│   ├── Type.jsx               # CRUD Tipe
│   ├── Banner.jsx             # CRUD Banner
│   ├── Result.jsx             # CRUD Result
│   ├── Order.jsx              # Update status & tracking number order
│   ├── About.jsx              # CRUD konten About
│   ├── Faq.jsx                # CRUD judul FAQ
│   ├── DetailFaq.jsx          # CRUD detail/isi FAQ
│   └── UserAdmin.jsx          # CRUD user admin (super_admin only)
├── Component/
│   ├── Navbar.jsx
│   ├── SideBar.jsx
│   ├── Footers.jsx
│   ├── Table.jsx
│   ├── Modal.jsx
│   ├── ButtonCreate.jsx
│   ├── ButtonUpdate.jsx
│   ├── ButtonDelete.jsx
│   └── ButtonToggle.jsx
├── Form/
│   └── FormProduk.jsx         # (dan form lainnya per fitur)
├── hooks/
│   ├── UseFecth.jsx           # Custom hook GET data + refetch
│   └── UseAction.jsx          # Custom hook delete & toggle
└── services/
    └── axiosInstance.js       # Axios + interceptor token & 401 handler
```

---

## Environment Variable

Buat file `.env` di root project:

```env
VITE_API=https://your-api-url.com/api
```

---

## Instalasi & Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build production
npm run build
```

---

## Autentikasi

- Token JWT disimpan di `localStorage` dengan key `token`.
- Data user disimpan di `localStorage` dengan key `User` (JSON).
- Login melalui endpoint `POST /auth/loginAdmin`.
- Jika response API mengembalikan status **401**, axios interceptor otomatis menghapus token dan redirect ke `/login`.

### AuthContext

| Value | Tipe | Keterangan |
|-------|------|------------|
| `token` | `string \| null` | JWT token aktif |
| `User` | `object \| null` | Data user yang login |
| `loading` | `boolean` | Status inisialisasi auth |
| `login(token, user)` | `function` | Simpan token & user, update state |
| `logout()` | `function` | Hapus token & user dari storage |

---

## Routing & Guard

| Route | Guard | Keterangan |
|-------|-------|------------|
| `/` | PrivateRoute | Home / Dashboard |
| `/ProdukPage` | PrivateRoute | Manajemen Produk |
| `/Categories` | PrivateRoute | Manajemen Kategori |
| `/Type` | PrivateRoute | Manajemen Tipe |
| `/Banner` | PrivateRoute | Manajemen Banner |
| `/Result` | PrivateRoute | Manajemen Result |
| `/Order` | PrivateRoute | Manajemen Order |
| `/About` | PrivateRoute | Konten About |
| `/Faq` | PrivateRoute | Judul FAQ |
| `/DetailFaq` | PrivateRoute | Detail/Isi FAQ |
| `/UserAdmin` | RouteSuperAdmin | Manajemen User (super_admin only) |
| `/Login` | — | Redirect ke `/` jika sudah login |

**PrivateRoute** — redirect ke `/login` jika tidak ada token.  
**RouteSuperAdmin** — redirect ke `/` jika role bukan `super_admin`.

---

## Custom Hooks

### `UseFecth(url)`

Custom hook untuk mengambil data dari API.

```jsx
const { Data, setData, refetch } = UseFecth('/product');
```

| Return | Keterangan |
|--------|------------|
| `Data` | Array hasil response API |
| `setData` | Setter untuk update data lokal |
| `refetch` | Trigger ulang fetch |

- Otomatis membatalkan request saat komponen unmount (`AbortController`).
- Re-fetch ketika `url` atau state `reload` berubah.

### `UseAction()`

Custom hook untuk aksi delete dan toggle status.

```jsx
const { HandleDelete, HandleToggle } = UseAction();

// Delete
HandleDelete('/admin/product', item.id, refetch);

// Toggle aktif/nonaktif
HandleToggle('/admin/product', item.id, item.is_active, refetch);
```

---

## Global State — PagesContext

| Value | Tipe | Keterangan |
|-------|------|------------|
| `isOpen` | `boolean` | Status buka/tutup modal |
| `setIsOpen` | `function` | Toggle modal |
| `selectedData` | `object \| null` | Data yang sedang diedit |
| `setSelectedData` | `function` | Set data untuk edit |
| `isSidebarOpen` | `boolean` | Status sidebar |
| `Banner` | `object` | Data banner |
| `VisiMisi` | `object` | Data visi misi |
| `ParagrafAbout` | `object` | Data paragraf about |
| `Result` | `array` | Data result |
| `Power` | `object` | Data power |
| `Faq` | `object` | Data FAQ |

---

## Fitur Per Halaman

### Home — Dashboard
Menampilkan ringkasan/statistik data utama.

### Produk
- Tampil daftar produk beserta gambar, harga, ukuran, dan stok dari relasi `product_sku`.
- Toggle aktif/nonaktif produk.
- Create & update via modal form `FormProduk`.
- Delete produk.

### Categories & Type
- CRUD kategori dan tipe produk.

### Banner
- CRUD banner halaman utama.

### Result
- CRUD data result/portofolio.

### Order
- Lihat daftar order.
- Update status order.
- Input/update nomor resi (tracking number).

### About
- Update konten halaman About (paragraf, visi misi, dll).

### FAQ
- CRUD judul/kelompok FAQ (`Faq`).
- CRUD isi pertanyaan & jawaban per kelompok (`DetailFaq`).

### User Admin *(super_admin only)*
- CRUD akun admin.
- Hanya bisa diakses oleh user dengan role `super_admin`.

---

## Pola Komponen Halaman

Setiap halaman umumnya mengikuti pola berikut:

```jsx
export const ExamplePage = () => {
  const { Data, refetch } = UseFecth('/endpoint');
  const { HandleDelete, HandleToggle } = UseAction();
  const { isOpen, setIsOpen, selectedData, setSelectedData } = useContext(PagesContext);

  const columns = [
    { key: 'name', label: 'Nama' },
    {
      key: 'Actions',
      label: 'Aksi',
      render: (item) => (
        <>
          <ButtonUpdate onClick={() => { setSelectedData(item); setIsOpen(true); }} />
          <ButtonDelete onClick={() => HandleDelete('/admin/endpoint', item.id, refetch)} />
        </>
      ),
    },
  ];

  return (
    <>
      <ButtonCreate onClick={() => { setSelectedData(null); setIsOpen(true); }} text="Create" />
      <Table colums={columns} Data={Data} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={selectedData ? 'Edit' : 'Create'}>
        <FormExample data={selectedData} onSuccess={() => { setIsOpen(false); refetch(); }} />
      </Modal>
    </>
  );
};
```

---

## Axios Instance

File: `src/services/axiosInstance.js`

- **Base URL** diambil dari `VITE_API`.
- **Request interceptor**: menyisipkan `Authorization: Bearer <token>` dari localStorage.
- **Response interceptor**: jika response `401`, hapus token dari storage dan redirect ke `/login`.

---

## Catatan Pengembangan

- Semua request ke API yang membutuhkan autentikasi **harus** menggunakan `axiosInstance`, bukan `axios` langsung.
- Gunakan `refetch()` dari `UseFecth` untuk refresh tabel setelah operasi create/update/delete.
- Saat membuka modal untuk **create**, pastikan `setSelectedData(null)` dipanggil terlebih dahulu agar form tidak terisi data lama.
- Role check dilakukan di level route (`RouteSuperAdmin`), bukan di dalam komponen halaman.
