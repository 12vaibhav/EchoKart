import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, Save, Eye, PlusCircle, Search, ShoppingBag, X, Check, MapPin, Trash2, Edit2, ShoppingCart, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

type Address = {
  id: string;
  type: string;
  name: string;
  houseNumber: string;
  roadName: string;
  city: string;
  phone: string;
  isDefault: boolean;
};

export const AccountPage = ({ onNavigate, initialTab = 'profile' }: { onNavigate: (path: string, id?: any) => void, initialTab?: 'profile' | 'orders' | 'address' | 'wishlist' }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address' | 'wishlist'>(initialTab);
  
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        onNavigate('auth');
      } else {
        setProfile({
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
          email: session.user.email || '',
          phone: session.user.phone || ''
        });
      }
    };
    checkUser();
  }, [onNavigate]);
  const { wishlist } = useWishlist();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSaveProfile = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddr: Address = {
      id: editingAddress?.id || Math.random().toString(36).substr(2, 9),
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      houseNumber: formData.get('houseNumber') as string,
      roadName: formData.get('roadName') as string,
      city: formData.get('city') as string,
      phone: formData.get('phone') as string,
      isDefault: formData.get('isDefault') === 'on'
    };

    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).filter(a => a.id !== newAddr.id).concat(newAddr));
    } else {
      if (editingAddress) {
        setAddresses(prev => prev.map(a => a.id === editingAddress.id ? newAddr : a));
      } else {
        setAddresses(prev => [...prev, newAddr]);
      }
    }
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  React.useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(count)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedOrders = data.map(o => ({
        id: o.id.split('-')[0].toUpperCase(),
        fullId: o.id,
        date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: o.status,
        statusColor: o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                     o.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                     o.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                     o.status === 'Order Placed' ? 'bg-yellow-100 text-yellow-700' :
                     'bg-yellow-100 text-yellow-700',
        items: o.order_items?.[0]?.count || 0,
        total: `₹${o.total_amount.toLocaleString()}`
      }));

      setOrders(mappedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onNavigate('home');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Order History</h2>
                <p className="text-slate-500 mt-1">Track and manage your past and current orders.</p>
              </div>
              <button 
                onClick={fetchOrders}
                disabled={loadingOrders}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loadingOrders ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingOrders ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#e31c3d]" />
                          Loading your order history...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                          No orders found yet. Start shopping to see your history!
                        </td>
                      </tr>
                    ) : orders.map((order: any) => (
                      <tr key={order.fullId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{order.items} items</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.total}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            className="bg-slate-900 hover:bg-[#e31c3d] text-white p-2 rounded-lg transition-all group" 
                            title="Track Order" 
                            onClick={() => onNavigate('track', order.fullId)}
                          >
                            <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'address':
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Manage Addresses</h2>
                <p className="text-[10px] font-black text-[#e31c3d] uppercase tracking-[0.2em] mt-1">Set your default shipping & billing details</p>
              </div>
              <button 
                onClick={() => { setEditingAddress(null); setShowAddressForm(true); }}
                className="bg-[#e31c3d] hover:bg-[#c81935] text-white px-6 py-3 rounded-md font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#e31c3d]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className={`p-6 bg-white rounded-md border-2 transition-all shadow-sm flex flex-col gap-4 ${addr.isDefault ? 'border-[#e31c3d]' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${addr.isDefault ? 'bg-[#e31c3d] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {addr.type} {addr.isDefault && '(Default)'}
                    </span>
                    <div className="flex gap-4">
                       <button onClick={() => { setEditingAddress(addr); setShowAddressForm(true); }} className="text-slate-400 hover:text-slate-900 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors">
                         <Edit2 className="w-4 h-4" />
                         Edit
                       </button>
                       <button onClick={() => deleteAddress(addr.id)} className="text-slate-300 hover:text-rose-500 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors">
                         <Trash2 className="w-4 h-4" />
                         Delete
                       </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-slate-900">{addr.name}</p>
                    <p className="text-sm text-slate-600">{addr.houseNumber}</p>
                    <p className="text-sm text-slate-600">{addr.roadName}</p>
                    <p className="text-sm text-slate-600">{addr.city}</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Contact: {addr.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Form Modal */}
            <AnimatePresence>
              {showAddressForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddressForm(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white w-full max-w-lg rounded-xl p-8 shadow-2xl overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-black">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                      <button onClick={() => setShowAddressForm(false)} className="p-2 hover:bg-slate-100 rounded-full">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Address Type</label>
                          <select name="type" defaultValue={editingAddress?.type || 'Home'} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold">
                            <option>Home</option>
                            <option>Office</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Full Name</label>
                          <input name="name" type="text" defaultValue={editingAddress?.name} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold" required />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">House number / Building name</label>
                          <input name="houseNumber" type="text" defaultValue={editingAddress?.houseNumber} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold" required />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Road name / Area / Colony</label>
                          <input name="roadName" type="text" defaultValue={editingAddress?.roadName} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">City / Pincode</label>
                          <input name="city" type="text" defaultValue={editingAddress?.city} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold" required />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                          <input name="phone" type="tel" defaultValue={editingAddress?.phone} className="w-full bg-slate-50 border-2 border-slate-100 rounded-md px-4 py-2.5 outline-none focus:border-[#e31c3d] font-bold" required />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 py-4">
                        <input name="isDefault" type="checkbox" id="isDefault" defaultChecked={editingAddress?.isDefault} className="accent-[#e31c3d] w-4 h-4" />
                        <label htmlFor="isDefault" className="text-sm font-bold text-slate-700">Set as default address</label>
                      </div>
                      <button type="submit" className="w-full bg-[#151515] hover:bg-black text-white font-black py-4 rounded-md transition-all shadow-lg tracking-widest uppercase text-xs">
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </button>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        );
      case 'wishlist':
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">My Wishlist</h2>
                <p className="text-slate-500 mt-1">
                  {wishlist.length > 0 
                    ? `You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved for later.`
                    : 'Your wishlist is currently empty.'}
                </p>
              </div>
              {wishlist.length > 0 && (
                <button 
                  onClick={() => onNavigate('cart')}
                  className="bg-[#e31c3d] hover:bg-[#c81935] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-[#e31c3d]/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  View Cart
                </button>
              )}
            </div>

            {wishlist.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-100">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-[#e31c3d]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your wishlist is empty</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Save items you love to your wishlist. Review them anytime and easily move them to your cart.
                </p>
                <button 
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  <Search className="w-5 h-5" />
                  <span>Browse Products</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onNavigate={onNavigate} 
                    className="w-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  />
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Manage Profile</h2>
                <p className="text-slate-500 mt-1">Update your personal information and security settings.</p>
              </div>
              <button 
                onClick={handleSaveProfile}
                className="bg-[#e31c3d] hover:bg-[#c81935] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-[#e31c3d]/20 transition-all flex items-center justify-center gap-2 relative"
              >
                {showSaveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved Successfully
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 md:p-8 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <User className="w-5 h-5 text-[#e31c3d]" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#e31c3d] focus:border-[#e31c3d] outline-none transition-all font-bold" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#e31c3d] focus:border-[#e31c3d] outline-none transition-all font-bold" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#e31c3d] focus:border-[#e31c3d] outline-none transition-all font-bold" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <Package className="w-5 h-5 text-[#e31c3d]" />
                  Recent Orders
                </h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-[#e31c3d] text-sm font-bold hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* No recent orders */}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <Heart className="w-5 h-5 text-[#e31c3d]" />
                  Wishlist Sneak Peek
                </h3>
                <button onClick={() => setActiveTab('wishlist')} className="text-[#e31c3d] text-sm font-bold hover:underline">Manage List</button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {wishlist.slice(0, 3).map((product) => (
                  <div key={product.id} className="bg-white p-3 rounded-md border border-slate-100 shadow-sm group">
                    <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden border border-slate-200">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{product.name}</h4>
                    <p className="text-[#e31c3d] text-sm font-black">₹{product.price.toLocaleString()}</p>
                  </div>
                ))}
                <div 
                  className="bg-slate-50 p-3 rounded-md border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 transition-colors min-h-[150px]"
                  onClick={() => setActiveTab('wishlist')}
                >
                  <PlusCircle className="text-slate-400 w-8 h-8 mb-2" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Find More</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <motion.div {...fadeInUpProps} className="max-w-[1280px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden sticky top-28">
              <div className="p-6 pb-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-300" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 font-bold">{profile.name}</h2>
                    <p className="text-slate-500 text-xs font-medium">Gold Member</p>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-1">
                  {[
                    { id: 'profile', label: 'Manage Profile', icon: User },
                    { id: 'orders', label: 'Order History', icon: Package },
                    { id: 'wishlist', label: 'Wishlist', icon: Heart },
                    { id: 'address', label: 'Manage Address', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold text-sm transition-all ${activeTab === item.id ? 'bg-[#e31c3d] text-white shadow-lg shadow-[#e31c3d]/20' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="mt-4 p-6 border-t border-slate-50 bg-slate-50/50">
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            {renderContent()}
          </section>
        </div>
      </motion.div>
    </div>
  );
};
