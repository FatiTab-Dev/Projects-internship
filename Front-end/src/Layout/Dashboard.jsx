import { useState } from 'react';
import bikesData from './bikesData';

export const Dashboard = () => {
 const [products, setProducts] = useState(bikesData || []);
 const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImg, setNewProductImg] = useState(''); 
  const [newProductDesc, setNewProductDesc] = useState('')
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProductImg(URL.createObjectURL(e.target.files[0]));
    }};
 const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const newProduct = {
      id: Date.now(), 
      title: newProductName,
      price: parseFloat(newProductPrice),
      desc: newProductDesc || 'No description provided.',
      img: newProductImg || 'https://via.placeholder.com/150'
    };

    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImg('');
    setNewProductDesc('');
    alert('Product Added Successfully! 🚲');
  };
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="container my-5 text-start">
      <h1 className='p-5'>Admin <span style={{ color: '#ff4000' }}>Dashboard</span></h1>
      <div className="row g-4">
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
                <label className="form-label small fw-bold text-muted">Image URL</label>
                <input 
                  type="file" 
                  className="form-control" 
                  placeholder="choose an image file"
                  value={newProductImg}
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
              <button type="submit" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#ffff', color: '#ff4000' }}>
                Add Product
              </button>
            </form>
          </div>
        </div>
       <div className="col-md-8">
          <div className="card p-4 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Manage Products ({products.length})</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr className="text-muted small">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      
                      <td>
                        <img 
                          src={product.img} 
                          alt={product.title} 
                          className="rounded-3" 
                          style={{ width: '50px', height: '40px', objectFit: 'cover' }} 
                        />
                      </td>
                      
                      <td className="fw-semibold text-dark">{product.title}</td>
                      <td className="fw-bold text-secondary">
                        {typeof product.price === 'number' ? `$${product.price}` : product.price}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(product.id)}>
                          <i className="fas fa-trash me-1"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};