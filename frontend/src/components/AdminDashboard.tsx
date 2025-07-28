import React, { useState } from 'react';
import { User, LogOut, Search, Plus, Edit, BarChart3, Calendar, Package, History } from 'lucide-react';

interface AdminDashboardProps {
  user: { username: string; role: string };
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'sales'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Datos simulados
  const mockProducts = [
    { id: 1, code: '001', name: 'Laptop HP', price: 850.00, stock: 15, category: 'Electrónicos' },
    { id: 2, code: '002', name: 'Mouse Inalámbrico', price: 25.99, stock: 45, category: 'Accesorios' },
    { id: 3, code: '003', name: 'Teclado Mecánico', price: 89.99, stock: 23, category: 'Accesorios' },
    { id: 4, code: '004', name: 'Monitor 24"', price: 199.99, stock: 8, category: 'Electrónicos' },
  ];

  const mockSales = [
    { id: 1, date: '2024-01-15', product: 'Laptop HP', quantity: 2, total: 1700.00, customer: 'Juan Pérez' },
    { id: 2, date: '2024-01-15', product: 'Mouse Inalámbrico', quantity: 5, total: 129.95, customer: 'María García' },
    { id: 3, date: '2024-01-14', product: 'Teclado Mecánico', quantity: 1, total: 89.99, customer: 'Carlos López' },
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSales = selectedDate 
    ? mockSales.filter(sale => sale.date === selectedDate)
    : mockSales;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-emerald-600 mr-3" />
              <h1 className="text-xl font-bold text-slate-800">Panel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-slate-600">
                <User className="w-4 h-4 mr-2" />
                {user.username}
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Package className="w-5 h-5 mr-2" />
              Gestión de Productos
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'sales'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Historial de Ventas
            </button>
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                Nuevo Producto
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm text-slate-500">#{product.code}</span>
                      <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                      <p className="text-sm text-slate-600">{product.category}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Precio:</span>
                      <span className="font-semibold text-slate-800">${product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stock:</span>
                      <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {product.stock} unid.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-slate-600">
                Total de ventas mostradas: ${filteredSales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Fecha</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Cliente</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Cantidad</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-800">{sale.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-800">{sale.product}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{sale.customer}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{sale.quantity}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">${sale.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;