import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImg, setNewProductImg] = useState(''); 
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductStock, setNewProductStock] = useState(5);
  const [newProductSales, setNewProductSales] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStock, setEditStock] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProductImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const newProduct = {
      id: Date.now(), 
      title: newProductName,
      price: parseFloat(newProductPrice),
      desc: newProductDesc || 'No description provided.',
      img: newProductImg || 'https://via.placeholder.com/150',
      stock: parseInt(newProductStock) || 0,
      sales: parseInt(newProductSales) || 0
    };

    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImg('');
    setNewProductDesc('');
    setNewProductStock(5);
    setNewProductSales(0);
    setMessage({ text: 'Product Added Successfully! 🚲', type: 'success' });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.title);
    setEditPrice(product.price);
    setEditDesc(product.desc);
    setEditStock(product.stock || 0);
  };

  const handleSaveEdit = (id) => {
    setProducts(products.map(p => p.id === id ? {
      ...p,
      title: editName,
      price: parseFloat(editPrice),
      desc: editDesc,
      stock: parseInt(editStock) || 0
    } : p));
    setEditingId(null); 
    setMessage({ text: 'Product Updated Successfully! 📝', type: 'success' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setMessage({ text: 'Product Deleted Successfully! 🗑️', type: 'success' });
  };

  return (
    <div className="container my-5 text-start">
      <h1 className='p-5'>Admin <span style={{ color: '#ff4000' }}>Dashboard</span></h1>
      <div className="row g-4">
        {message.text && (
           <h2 className={`alert alert-${message.type} text-center small py-2 mb-3`}>
           {message.text}
           </h2>
        )}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Add New Bike</h5>
            <form onSubmit={handleAddProduct}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Bike Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Speedster 3000"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Price ($)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="e.g. 1200"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Stock Quantity</label>
                <input type="number" className="form-control" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Image URL</label>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Description</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  placeholder="Enter bike features and details..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#ffff', color: '#ff4000', transition: 'all 0.3s' }}>
                Add Product
              </button>
              <button type="button" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#ffff', color: '#ff4000', transition: 'all 0.3s' }} onClick={() => navigate('/#bikes')}>
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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sales</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => {
                    const isEditing = editingId === product.id;
                    return (
                      <tr key={product.id}>
                        <td>
                          <img 
                            src={product.img} 
                            alt={product.title} 
                            className="rounded-3" 
                            style={{ width: '50px', height: '40px', objectFit: 'cover' }} 
                          />
                        </td>
                        
                        <td>
                          {isEditing ? (
                            <>
                              <input type="text" className="form-control form-control-sm mb-1" value={editName} onChange={(e) => setEditName(e.target.value)} />
                              <textarea className="form-control form-control-sm" rows="2" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                            </>
                          ) : (
                            <div>
                              <div className="fw-semibold text-dark">{product.title}</div>
                              <small className="text-muted text-truncate d-block" style={{ maxWidth: '180px' }}>{product.desc}</small>
                            </div>
                          )}
                        </td>
                        
                        <td className="fw-bold text-secondary">
                          {isEditing ? (
                            <input type="number" className="form-control form-control-sm" style={{ width: '80px' }} value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                          ) : (
                            `$${product.price}`
                          )}
                        </td>
                        
                        <td>
                          {isEditing ? (
                            <input type="number" className="form-control form-control-sm" style={{ width: '70px' }} value={editStock} onChange={(e) => setEditStock(e.target.value)} />
                          ) : (
                            <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-2 py-1`}>
                              {product.stock ?? 5} left
                            </span>
                          )}
                        </td>
                        
                        <td className="fw-bold text-primary">
                          <i className="fas fa-shopping-basket me-1"></i> {product.sales || 0} sold
                        </td>

                        <td>
                          {isEditing ? (
                            <div className="d-flex gap-1">
                              <button className="btn btn-sm btn-success rounded-pill px-2" onClick={() => handleSaveEdit(product.id)}>Save</button>
                              <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => setEditingId(null)}>X</button>
                            </div>
                          ) : (
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-warning border-0" onClick={() => startEdit(product)}>
                                <i className="fas fa-edit"></i> Edit
                              </button>
                              <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(product.id)}>
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};