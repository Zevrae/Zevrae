import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package2, ChevronDown, Eye, CheckCircle2, Truck, XCircle, Search, DollarSign, Archive, Clock, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  customer_phone?: string;
  amount: number;
  products: string; // JSON string
  payment_method: string;
  status: string; // paid, pending, cancelled
  order_status?: string; // packed, shipped, delivered
  created_at: string;
}

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }

      if (session.user.email === 'officialzevrae@gmail.com') {
        setIsAdmin(true);
        fetchOrders();
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', session.user.email);
      
      if (error || !data || data.length === 0) {
        navigate('/');
        return;
      }
      
      setIsAdmin(true);
      fetchOrders();
    };

    checkAdminAndLoad();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    // Set up realtime subscription (fastest updates if supported)
    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        fetchOrders();
      })
      .subscribe();

    // Set up fallback 3-second polling mechanism
    const pollInterval = setInterval(() => {
      fetchOrders(false); // Silent fetch, no loading spinner
    }, 3000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [isAdmin]);

  const fetchOrders = async (showLoader: boolean = true) => {
    if (showLoader) setLoading(true);
    try {
      // Trying Supabase orders table as requested
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
         console.warn("Failed fetching from Supabase orders table:", error);
         if (orders.length === 0) setErrorMsg("Could not load orders. Please configure your orders table.");
         return;
      }
      
      const normalizedData = (data as Order[]).map(o => ({
        ...o,
        order_status: o.order_status || 'pending'
      }));

      setOrders(normalizedData);
      setErrorMsg(""); // Clear error on success
    } catch (err: any) {
      console.error("Orders fetch exception:", err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: status })
        .eq('id', id);
        
      if (error) {
        alert("Status update failed: " + error.message);
        return;
      }
      
      alert("Order status updated");
      fetchOrders(true);
    } catch (err: any) {
      alert("Unexpected error: " + err.message);
    }
  };

  const formatVal = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (isAdmin === null) {
    return <div className="min-h-screen bg-[#0a0a0a] text-[#C5A059] flex items-center justify-center pt-20">Verifying access...</div>;
  }

  // Calculate Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.order_status === 'pending' || !o.order_status).length;
  const paidOrders = orders.filter(o => o.status?.toLowerCase() === 'paid').length;
  const codOrders = orders.filter(o => o.payment_method?.toLowerCase() === 'cod').length;
  const revenue = orders.filter(o => o.status?.toLowerCase() === 'paid').reduce((sum, o) => sum + o.amount, 0);

  // Filters: All, Pending, Paid, COD, Delivered.
  const filteredOrders = orders.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return o.order_status === 'pending' || !o.order_status;
    if (filter === 'Paid') return o.status?.toLowerCase() === 'paid';
    if (filter === 'COD') return o.payment_method?.toLowerCase() === 'cod';
    if (filter === 'Delivered') return o.order_status === 'delivered';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#EAE6E1] font-sans selection:bg-[#C5A059]/30 pt-[120px] pb-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Package2 size={32} className="text-[#C5A059]" />
            <h1 className="text-xl md:text-3xl font-serif tracking-[0.2em] font-light uppercase text-[#EAE6E1]">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 px-4 py-2 border border-[#C5A059]/20 rounded-sm">
            Secure Access Granted
          </p>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8 md:mb-16">
          <MetricCard title="Total Orders" value={totalOrders} icon={<Archive size={20} />} />
          <MetricCard title="Pending" value={pendingOrders} icon={<Clock size={20} />} />
          <MetricCard title="Paid (Prepaid)" value={paidOrders} icon={<CheckCircle2 size={20} />} />
          <MetricCard title="COD Orders" value={codOrders} icon={<Truck size={20} />} />
          <MetricCard title="Revenue" value={formatVal(revenue)} icon={<DollarSign size={20} />} highlight />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['All', 'Pending', 'Paid', 'COD', 'Delivered'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-serif rounded-sm transition-all duration-300 ${
                filter === f 
                  ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                  : 'bg-[#111] text-[#EAE6E1]/60 border border-[#EAE6E1]/10 hover:border-[#C5A059]/50 hover:text-[#C5A059]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders Table Area */}
        <div className="bg-[#111] border border-[#EAE6E1]/10 rounded-sm overflow-hidden">
          {errorMsg && (
             <div className="p-4 text-[#C5A059] bg-[#C5A059]/10 text-center text-sm font-serif">{errorMsg}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE6E1]/10 text-[10px] uppercase tracking-[0.2em] font-serif text-[#C5A059] bg-[#0a0a0a]/50">
                  <th className="p-5 font-normal">Order ID</th>
                  <th className="p-5 font-normal">Customer</th>
                  <th className="p-5 font-normal">Date</th>
                  <th className="p-5 font-normal">Total</th>
                  <th className="p-5 font-normal">Payment</th>
                  <th className="p-5 font-normal">Order Status</th>
                  <th className="p-5 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-[12px] uppercase tracking-[0.2em] font-serif text-[#C5A059] animate-pulse">
                      Loading Orders...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-[12px] uppercase tracking-[0.2em] font-serif text-[#EAE6E1]/50">
                      No orders found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, i) => (
                    <React.Fragment key={order.order_id}>
                      <tr className="border-b border-[#EAE6E1]/5 hover:bg-[#0a0a0a]/50 transition-colors">
                        <td className="p-5 text-[12px] font-mono text-[#EAE6E1]">{order.order_id.split('_').pop() || order.order_id}</td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                             <div className="text-[12px] text-[#EAE6E1]">{order.customer_name}</div>
                          </div>
                          <div className="text-[10px] text-[#EAE6E1]/50 font-mono mt-1">{order.customer_email}</div>
                          {order.customer_phone && <div className="text-[10px] text-[#EAE6E1]/50 font-mono mt-1 flex items-center gap-1"><Smartphone size={10} />{order.customer_phone}</div>}
                        </td>
                        <td className="p-5 text-[11px] text-[#EAE6E1]/70">{formatDate(order.created_at)}</td>
                        <td className="p-5 text-[12px] font-mono text-[#EAE6E1]">{formatVal(order.amount)}</td>
                        <td className="p-5">
                          <div className="flex flex-col gap-1 items-start">
                            <span className="px-2 py-1 bg-[#1a1a1a] text-[#EAE6E1]/70 text-[9px] uppercase tracking-wider font-serif rounded-sm">
                              {order.payment_method}
                            </span>
                            <span className={`px-2 py-1 text-[9px] uppercase tracking-wider font-serif rounded-sm ${
                              order.status === 'paid' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className={`px-2 py-1 text-[9px] uppercase tracking-wider font-serif rounded-sm inline-flex items-center gap-1 ${
                            order.order_status === 'delivered' ? 'text-green-400 bg-green-900/20' :
                            order.order_status === 'shipped' ? 'text-blue-400 bg-blue-900/20' :
                            order.order_status === 'packed' ? 'text-purple-400 bg-purple-900/20' :
                            order.order_status === 'cancelled' ? 'text-red-400 bg-red-900/20' :
                            'text-[#C5A059] bg-[#C5A059]/10'
                          }`}>
                            {order.order_status || 'pending'}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
                            className="text-[10px] uppercase tracking-[0.1em] font-serif hover:text-[#C5A059] transition-colors border border-[#EAE6E1]/20 px-3 py-1.5 rounded-sm flex items-center gap-2 ml-auto"
                          >
                            <Eye size={12} />
                            View
                          </button>
                        </td>
                      </tr>
                      {/* Expanded Details Row */}
                      <AnimatePresence>
                        {expandedOrder === order.order_id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <td colSpan={7} className="px-5 pb-5 bg-[#0a0a0a]/50 border-b border-[#EAE6E1]/10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div>
                                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#C5A059] mb-4">Customer Details & Address</h4>
                                  <div className="space-y-2 text-[12px] text-[#EAE6E1]/80 bg-[#111] p-4 rounded-sm border border-[#EAE6E1]/5">
                                    <p><span className="text-[#EAE6E1]/50 mr-2 inline-block w-16">Name:</span> {order.customer_name}</p>
                                    <p><span className="text-[#EAE6E1]/50 mr-2 inline-block w-16">Email:</span> {order.customer_email}</p>
                                    {order.customer_phone && <p><span className="text-[#EAE6E1]/50 mr-2 inline-block w-16">Phone:</span> {order.customer_phone}</p>}
                                    <p><span className="text-[#EAE6E1]/50 mr-2 inline-block w-16">Address:</span> {order.customer_address}</p>
                                  </div>

                                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#C5A059] mb-4 mt-6">Order Actions</h4>
                                  <div className="flex flex-wrap gap-2 text-[#EAE6E1]">
                                    <button type="button" onClick={() => updateOrderStatus(order.id, 'packed')} className="px-3 py-2 text-[10px] uppercase font-serif bg-[#111] border border-[#C5A059]/20 rounded-sm hover:bg-[#C5A059]/10">Packed</button>
                                    <button type="button" onClick={() => updateOrderStatus(order.id, 'shipped')} className="px-3 py-2 text-[10px] uppercase font-serif bg-[#111] border border-[#C5A059]/20 rounded-sm hover:bg-[#C5A059]/10">Shipped</button>
                                    <button type="button" onClick={() => updateOrderStatus(order.id, 'delivered')} className="px-3 py-2 text-[10px] uppercase font-serif bg-[#111] border border-[#C5A059]/20 rounded-sm hover:bg-[#C5A059]/10">Delivered</button>
                                    <button type="button" onClick={() => updateOrderStatus(order.id, 'cancelled')} className="px-3 py-2 text-[10px] uppercase font-serif bg-[#111] border border-[#C5A059]/20 rounded-sm hover:bg-[#C5A059]/10">Cancelled</button>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#C5A059] mb-4">Products Ordered</h4>
                                  <div className="space-y-2">
                                    {(() => {
                                      let products = [];
                                      try { products = JSON.parse(order.products); } catch (e) {}
                                      return products.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center bg-[#111] p-3 border border-[#EAE6E1]/5 rounded-sm">
                                          <div className="flex items-center gap-3">
                                            {item.image && (
                                              <div className="w-10 h-10 bg-[#0a0a0a] rounded-sm overflow-hidden flex-shrink-0 border border-[#EAE6E1]/10">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                              </div>
                                            )}
                                            <div>
                                              <p className="text-[11px] font-serif uppercase tracking-[0.1em] text-[#EAE6E1]">{item.name}</p>
                                              <p className="text-[9px] font-mono text-[#EAE6E1]/50 mt-1">Size: {item.size} &times; {item.quantity}</p>
                                            </div>
                                          </div>
                                          <div className="text-[12px] font-mono text-[#C5A059]">
                                            {formatVal(item.price * item.quantity)}
                                          </div>
                                        </div>
                                      ));
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, highlight = false }: { title: string, value: string | number, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <div className={`p-6 border rounded-sm flex flex-col justify-between ${
      highlight ? 'bg-[#C5A059]/5 border-[#C5A059]/30' : 'bg-[#111] border-[#EAE6E1]/10'
    }`}>
      <div className={`flex items-center gap-3 mb-4 ${highlight ? 'text-[#C5A059]' : 'text-[#EAE6E1]/40'}`}>
        {icon}
        <span className="text-[10px] uppercase font-serif tracking-[0.1em]">{title}</span>
      </div>
      <div className={`text-2xl md:text-3xl font-light font-mono ${highlight ? 'text-[#C5A059]' : 'text-[#EAE6E1]'}`}>
        {value}
      </div>
    </div>
  );
}

