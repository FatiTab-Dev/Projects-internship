import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = ({ products = [], setProducts }) => {
  const navigate = useNavigate();
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImg, setNewProductImg] = useState(''); 
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductStock, setNewProductStock] = useState(5);
  const [newProductSales, setNewProductSales] = useState(0);
  
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStock, setEditStock] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setMessage({ text: 'Error fetching products', type: 'danger' }));

    fetch(`${API}/api/orders`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      })
      .catch(() => setMessage({ text: 'Error fetching orders', type: 'danger' }));
  }, [API, setProducts]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProductImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const newProduct = {
      title: newProductName,
      price: parseFloat(newProductPrice),
      desc: newProductDesc || 'No description provided.',
      img: newProductImg || 'https://via.placeholder.com/150',
      stock: parseInt(newProductStock) || 0,
      sales: parseInt(newProductSales) || 0
    };

    try {
      const response = await fetch(`${API}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts(prev => [savedProduct, ...prev]);
        setNewProductName(''); setNewProductPrice(''); setNewProductImg(''); setNewProductDesc('');
        setNewProductStock(5); setNewProductSales(0);
        setMessage({ text: 'Product Added Successfully! 🚲', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Error adding product', type: 'danger' });
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id || product.id);
    setEditName(product.title || '');
    setEditPrice(product.price || 0);
    setEditDesc(product.desc || '');
    setEditStock(product.stock || 0);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`${API}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editName, price: parseFloat(editPrice), desc: editDesc, stock: parseInt(editStock) })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? updatedProduct : p));
        setEditingId(null); 
        setMessage({ text: 'Product Updated Successfully! 📝', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Error updating product', type: 'danger' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
        setMessage({ text: 'Product Deleted Successfully! 🗑️', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Error deleting product', type: 'danger' });
    }
  };

  return (
    <div className="container my-5 text-start">
      <h1 className='p-5 fw-bold'>Admin <span style={{ color: '#ff4000' }}>Dashboard</span></h1>
      <div className="row g-4">
        {message.text && (
           <h2 className={`alert alert-${message.type} text-center small py-2 mb-3`}>
             {message.text}
           </h2>
        )}
        <div className="col-md-12 d-flex gap-2 mb-4">
          <button className="btn px-4 fw-bold" onClick={() => setActiveTab('orders')} style={{ backgroundColor: activeTab === 'orders' ? '#ff4000' : 'transparent', color: activeTab === 'orders' ? '#fff' : '#ff4000', border: '1px solid #ff4000' }}>
            Orders
          </button>
          <button className="btn px-4 fw-bold" onClick={() => setActiveTab('products')} style={{ backgroundColor: activeTab === 'products' ? '#ff4000' : 'transparent', color: activeTab === 'products' ? '#fff' : '#ff4000', border: '1px solid #ff4000' }}>
            Manage Products
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="col-md-12">
            <div className="card p-4 shadow-sm border-0 rounded-4">
              <h5 className="fw-bold mb-3">Manage Orders ({orders?.length || 0})</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead> 
                    <tr className="text-muted small">
                      <th>Order ID</th><th>Customer</th><th>Contact</th><th>Address</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && orders.length > 0 ? (
                      orders.map((order) => {
                        if (!order) return null;
                        const oId = order._id || order.id ||'unknown';
                        return (
                          <tr key={oId}>
                            <td className="fw-bold text-secondary">#{String(oId).substring(0, 6)}</td>
                            <td>
                              <div className="fw-semibold text-dark">{order.customerName || 'none'}</div>
                              <small className="text-muted">{order.customerEmail || 'none'}</small>
                            </td>
                            <td><div className="fw-semibold text-dark">{order.phone || ''}</div></td>
                            <td><div className="fw-semibold text-dark">{order.address || 'N/A'}</div></td>
                            <td><div className="fw-semibold text-dark">{(order.items?.length || 0)} items</div></td>
                            <td className="fw-bold text-success">{(order.totalAmount || 0).toFixed(2)} MAD</td>
                           <td>
                            <select
                              className="form-select form-select-sm"
                               value={order.status || 'pending'}
                                onChange={async (e) => {
                                const newStatus = e.target.value;
                                try {
                                const res = await fetch(`${API}/api/orders/${oId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: newStatus })
                             });
                               if (res.ok) {
                             setOrders(prev => prev.map(o => 
                             (o._id === oId || o.id === oId) ? { ...o, status: newStatus } : o
                              ));
                              }
                            } catch {
                           setMessage({ text: 'Error updating status', type: 'danger' });
                             }
                            }}
                            style={{ 
                            borderColor: order.status === 'completed' ? '#198754' : '#ffc107',
                            color: order.status === 'completed' ? '#198754' : '#856404'
                            }}
                           >
                           <option value="pending">pending</option>
                           <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                             </select>
                            </td>
                           
                            <td>{order.createdAt || order.date ? new Date(order.createdAt || order.date).toLocaleDateString() : 'N/A'}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr><td colSpan="7" className="text-center text-muted py-4">No orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="row g-4 m-0 p-0 w-100">
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Add New Bike</h5>
                <form onSubmit={handleAddProduct}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Bike Name</label>
                    <input type="text" className="form-control" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Price (MAD)</label>
                    <input type="number" className="form-control" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Stock Quantity</label>
                    <input type="number" className="form-control" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Image URL</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Description</label>
                    <textarea className="form-control" rows="3" value={newProductDesc} onChange={(e) => setNewProductDesc(e.target.value)}></textarea>
                  </div>
                  <button type="submit" className="btn w-100 fw-bold text-white mb-2  " style={{ backgroundColor: '#fff', color: '#ff4000' }}>
                    Add Product
                  </button>
                  <button type="button" className="btn w-100 fw-bold btn-light" onClick={() => navigate('/#bikes')}>
                    Back to Shop
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-8 col-sm-12">
              <div className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Manage Products ({products?.length || 0})</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr className="text-muted small">
                        <th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Sales</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products.length > 0 ? (
                        products.map((product) => {
                          if (!product) return null;
                          const pId = product._id || product.id;
                          const isEditing = editingId === pId;
                          return (
                            <tr key={pId}>
                              <td>
                                <img src={product.img || 'https://via.placeholder.com/150'} alt={product.title} className="rounded-3" style={{ width: '50px', height: '40px', objectFit: 'cover' }} />
                              </td>
                              <td>
                                {isEditing ? (
                                  <>
                                    <input type="text" className="form-control form-control-sm mb-1" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                    <textarea className="form-control form-control-sm" rows="2" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                                  </>
                                ) : (
                                  <div>
                                    <div className="fw-semibold text-dark">{product.title || 'No Title'}</div>
                                    <small className="text-muted text-truncate d-block" style={{ maxWidth: '180px' }}>{product.desc || ''}</small>
                                  </div>
                                )}
                              </td>
                              <td className="fw-bold text-secondary">
                                {isEditing ? <input type="number" className="form-control form-control-sm" style={{ width: '80px' }} value={editPrice} onChange={(e) => setEditPrice(e.target.value)} /> : `MAD${product.price || 0}`}
                              </td>
                              <td>
                                {isEditing ? <input type="number" className="form-control form-control-sm" style={{ width: '70px' }} value={editStock} onChange={(e) => setEditStock(e.target.value)} /> : 
                                  <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-2 py-1`}>
                                    {product.stock ?? 0} left
                                  </span>
                                }
                              </td>
                              <td className="fw-bold text-primary">
                                <i className="fas fa-shopping-basket me-1"></i> {product.sales || 0} sold
                              </td>
                              <td>
                                {isEditing ? (
                                  <div className="d-flex gap-1">
                                    <button className="btn btn-sm btn-success rounded-pill px-2" onClick={() => handleSaveEdit(pId)}>Save</button>
                                    <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => setEditingId(null)}>X</button>
                                  </div>
                                ) : (
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-warning border-0" onClick={() => startEdit(product)}><i className="fas fa-edit"></i> Edit</button>
                                    <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(pId)}><i className="fas fa-trash"></i> Delete</button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr><td colSpan="6" className="text-center text-muted py-4">No products found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};