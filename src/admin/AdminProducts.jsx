import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, CheckCircle2, AlertCircle, X, Package } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { useToast } from '../context/ToastContext';

const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Confectionery',
    division: 'Flavours',
    price: 1500,
    packSize: '25 kg Drum',
    stockStatus: 'In Stock',
    profile: '',
    applications: ''
  });

  useEffect(() => {
    const savedCustom = localStorage.getItem('skff_admin_custom_products');
    let merged = [...initialProducts];
    if (savedCustom) {
      try {
        const custom = JSON.parse(savedCustom);
        // Add custom or override
        merged = [...custom, ...initialProducts.filter((p) => !custom.some((c) => c.id === p.id))];
      } catch (e) {
        console.error(e);
      }
    }
    setProductList(merged);
  }, []);

  const saveProductListToStorage = (updated) => {
    setProductList(updated);
    localStorage.setItem('skff_admin_custom_products', JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Confectionery',
      division: 'Flavours',
      price: 1800,
      packSize: '25 kg Drum',
      stockStatus: 'In Stock',
      profile: '',
      applications: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      division: prod.division || 'Flavours',
      price: prod.price || 1500,
      packSize: prod.packSize || '25 kg Drum',
      stockStatus: prod.inStock ? 'In Stock' : 'Out of Stock',
      profile: prod.profile || prod.flavourProfile || prod.scentProfile || '',
      applications: prod.applications ? prod.applications.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the demo catalogue?`)) {
      const updated = productList.filter((p) => p.id !== id);
      saveProductListToStorage(updated);
      addToast(`Removed "${name}" from demo catalogue`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Product name is required', 'error');
      return;
    }

    if (editingProduct) {
      // Update
      const updated = productList.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formData.name,
            category: formData.category,
            division: formData.division,
            price: Number(formData.price),
            packSize: formData.packSize,
            inStock: formData.stockStatus === 'In Stock',
            profile: formData.profile
          };
        }
        return p;
      });
      saveProductListToStorage(updated);
      addToast(`Updated product "${formData.name}"`, 'success');
    } else {
      // Create new
      const newProd = {
        id: `SKFF-CUSTOM-${Date.now().toString().slice(-4)}`,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: formData.name,
        category: formData.category,
        division: formData.division,
        price: Number(formData.price),
        packSize: formData.packSize,
        inStock: formData.stockStatus === 'In Stock',
        profile: formData.profile,
        applications: formData.applications.split(',').map((s) => s.trim()).filter(Boolean),
        rating: 5.0,
        reviewCount: 1,
        featured: false,
        demoNote: 'Custom demonstration entry created in local browser admin'
      };
      const updated = [newProd, ...productList];
      saveProductListToStorage(updated);
      addToast(`Added new formulation "${newProd.name}"`, 'success');
    }

    setIsModalOpen(false);
  };

  const filtered = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-products-view">
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3>Flavour & Fragrance Formulations ({filtered.length} of {productList.length})</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Manage demo catalogue listings across all 11 product divisions.
            </p>
          </div>
          <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add New Formulation
          </button>
        </div>

        {/* Filters Toolbar */}
        <div style={{ padding: '1rem 1.75rem', background: '#FAFAFA', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '0.4rem 0.75rem', minWidth: '240px' }}>
            <Search size={16} color="#888" style={{ marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search by code, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.85rem', background: '#FFF' }}
          >
            <option value="all">All 11 Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name} ({c.division})</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Formulation Name</th>
                <th>Category</th>
                <th>Division</th>
                <th>Demo Price / Kg</th>
                <th>Pack Size</th>
                <th>Demo Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 15).map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>
                      {p.flavourProfile || p.scentProfile || p.profile || 'Proprietary profile'}
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: p.division === 'Fragrances' ? '#FCE4EC' : '#FFF3E0',
                      color: p.division === 'Fragrances' ? '#C2185B' : '#E65100',
                      fontWeight: 600
                    }}>
                      {p.division || 'Flavours'}
                    </span>
                  </td>
                  <td>₹{p.price?.toLocaleString('en-IN') || 'Quote'}</td>
                  <td>{p.packSize || '25 kg'}</td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: p.inStock ? '#E8F5E9' : '#FFEBEE',
                      color: p.inStock ? '#2E7D32' : '#C62828',
                      fontWeight: 600
                    }}>
                      {p.inStock ? 'Available' : 'Lead Time'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="admin-action-btn admin-action-edit"
                      title="Edit Product"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="admin-action-btn admin-action-delete"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 15 && (
          <div style={{ padding: '1rem', textAlign: 'center', background: '#FAFAFA', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem', color: '#666' }}>
            Showing top 15 formulations of {filtered.length} matching items.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFF',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                {editingProduct ? 'Edit Formulation Details' : 'Add New Formulation (Demo)'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Formulation Title *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cardamom Gold Essential Note"
                  required
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.name === e.target.value);
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        division: cat ? cat.division : formData.division
                      });
                    }}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Division
                  </label>
                  <input
                    type="text"
                    value={formData.division}
                    readOnly
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#F5F5F5' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Demo Price (₹ / Kg)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Standard Pack Size
                  </label>
                  <input
                    type="text"
                    value={formData.packSize}
                    onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
                    placeholder="e.g. 25 kg Drum"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Sensory Profile Notes
                </label>
                <textarea
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                  placeholder="e.g. Warm spicy aroma with sweet woody undertones..."
                  rows={2}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  {editingProduct ? 'Save Changes' : 'Create Formulation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
