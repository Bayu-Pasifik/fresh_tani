import { BarChart2, ShoppingBag, TrendingUp } from "lucide-react";

const FarmerDashboard = () => {
    return (
      <div className="p-6 bg-white min-h-screen w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-green-600">Farmer Dashboard</h1>
          <p className="text-gray-600">Selamat datang di pusat pengelolaan Fresh Tani!</p>
        </header>
  
        {/* Statistik Utama */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Produk */}
          <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <ShoppingBag className="w-10 h-10 text-green-600 mr-4" />
            <div>
              <p className="text-lg font-semibold">15 Produk</p>
              <p className="text-gray-600">Total yang dijual</p>
            </div>
          </div>
          {/* Pendapatan */}
          <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
            <BarChart2 className="w-10 h-10 text-yellow-600 mr-4" />
            <div>
              <p className="text-lg font-semibold">Rp 25,000,000</p>
              <p className="text-gray-600">Pendapatan bulan ini</p>
            </div>
          </div>
          {/* Performa */}
          <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <TrendingUp className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <p className="text-lg font-semibold">+10%</p>
              <p className="text-gray-600">Performa mingguan</p>
            </div>
          </div>
        </section>
  
        {/* Daftar Produk */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk Anda</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Nama Produk</th>
                  <th className="px-4 py-2 text-left text-gray-600">Kategori</th>
                  <th className="px-4 py-2 text-right text-gray-600">Harga</th>
                  <th className="px-4 py-2 text-right text-gray-600">Stok</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Tomat Segar</td>
                  <td className="px-4 py-2">Sayuran</td>
                  <td className="px-4 py-2 text-right">Rp 10,000/kg</td>
                  <td className="px-4 py-2 text-right">50 kg</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Apel Merah</td>
                  <td className="px-4 py-2">Buah</td>
                  <td className="px-4 py-2 text-right">Rp 20,000/kg</td>
                  <td className="px-4 py-2 text-right">30 kg</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Kentang</td>
                  <td className="px-4 py-2">Umbi-umbian</td>
                  <td className="px-4 py-2 text-right">Rp 8,000/kg</td>
                  <td className="px-4 py-2 text-right">100 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
  
        {/* Aksi */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
              Tambah Produk
            </button>
            <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700">
              Lihat Pesanan
            </button>
          </div>
        </section>
      </div>
    );
  };
  
  export default FarmerDashboard;
  