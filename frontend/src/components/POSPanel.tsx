import React, { useState } from 'react';
import { User, LogOut, Search, ShoppingCart, Package, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

interface POSPanelProps {
  user: { username: string; role: string };
  onLogout: () => void;
}

interface CartItem {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const POSPanel: React.FC<POSPanelProps> = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Datos simulados de productos
  const mockProducts = [
    { 
      id: 1, 
      code: '001', 
      name: 'Laptop HP Pavilion 15"', 
      price: 850.00, 
      stock: 15, 
      category: 'Electrónicos',
      description: 'Laptop HP con procesador Intel i5, 8GB RAM, 256GB SSD',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 2, 
      code: '002', 
      name: 'Mouse Inalámbrico Logitech', 
      price: 25.99, 
      stock: 45, 
      category: 'Accesorios',
      description: 'Mouse ergonómico con conexión Bluetooth',
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 3, 
      code: '003', 
      name: 'Teclado Mecánico RGB', 
      price: 89.99, 
      stock: 23, 
      category: 'Accesorios',
      description: 'Teclado mecánico con retroiluminación RGB y switches azules',
      image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 4, 
      code: '004', 
      name: 'Monitor Samsung 24" Full HD', 
      price: 199.99, 
      stock: 8, 
      category: 'Electrónicos',
      description: 'Monitor LED de 24 pulgadas con resolución Full HD',
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 5, 
      code: '005', 
      name: 'Auriculares Sony WH-1000XM4', 
      price: 299.99, 
      stock: 12, 
      category: 'Audio',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 6, 
      code: '006', 
      name: 'Webcam HD 1080p', 
      price: 79.99, 
      stock: 18, 
      category: 'Accesorios',
      description: 'Cámara web con calidad HD para videoconferencias',
      image: 'https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSale = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    alert(`Venta procesada por $${getTotalAmount().toFixed(2)}`);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-emerald-600 mr-3" />
              <h1 className="text-xl font-bold text-slate-800">Punto de Venta</h1>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs text-slate-500">#{product.code}</span>
                          <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                          <p className="text-xs text-slate-600 mt-1">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <p className="text-lg font-bold text-slate-800">${product.price}</p>
                          <p className="text-xs text-slate-500">Stock: {product.stock}</p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Carrito
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                {cart.length} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">El carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">#{item.code}</p>
                      <p className="text-sm font-semibold text-slate-800">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium text-slate-800 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-400 hover:text-red-600 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-200 pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-slate-800">Total:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${getTotalAmount().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleSale}
                    className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Procesar Venta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSPanel;