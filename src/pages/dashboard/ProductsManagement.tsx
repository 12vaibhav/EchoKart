import React, { useState, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Upload,
  Star as StarIcon,
  X,
  Check,
  Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const PRODUCTS_DATA: any[] = [];

export const ProductsManagement = ({ products, onProductsChange }: { products: any[], onProductsChange: (products: any[]) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All Categories');
  const [filterStatus, setFilterStatus] = useState<string>('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    isTrending: false, isNewArrival: false,
    swatches: [] as string[],
    swatchesVisible: true,
    packOptions: [] as { label: string, price: number, savings: string }[],
    packsVisible: false
  });
  const [swatchInput, setSwatchInput] = useState('');
  const [packLabel, setPackLabel] = useState('');
  const [packPrice, setPackPrice] = useState(0);
  const [packSavings, setPackSavings] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'In Stock': return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' };
      case 'Low Stock': return { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-600' };
      case 'Out of Stock': return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-600' };
    }
  };

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('name');
      if (data) setAvailableCategories(data.map(c => c.name));
    };
    fetchCategories();
  }, []);

  const CustomDropdown = ({ label, options, value, onChange, bgColor = 'bg-white' }: { label?: string, options: string[], value: string, onChange: (val: string) => void, bgColor?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative w-full">
        {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">{label}</label>}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 ${bgColor} border ${isOpen ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'} rounded-xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all text-left shadow-sm group`}
        >
          <span className="truncate">{value || 'Select...'}</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-slate-600'}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-[70] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
              <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-slate-50 ${value === opt ? 'bg-slate-100/50 text-slate-900 font-black' : 'text-slate-600 font-medium'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };


  const categories = ['All Categories', ...availableCategories];
  const statuses = ['All Statuses', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const nameMatch = (p.name || p.title || '').toLowerCase();
      const idMatch = (p.id || '').toString().toLowerCase();
      const categoryMatch = (p.category || '').toLowerCase();
      const queryMatch = searchQuery.toLowerCase();

      const matchesSearch = nameMatch.includes(queryMatch) || 
                           idMatch.includes(queryMatch) || 
                           categoryMatch.includes(queryMatch);
      
      const matchesCategory = filterCategory === 'All Categories' || p.category === filterCategory;
      const matchesStatus = filterStatus === 'All Statuses' || p.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, filterCategory, filterStatus]);


  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingId(product.id);
      setFormData({ 
        name: product.name || product.title || '', 
        category: product.category, 
        categoryId: product.categoryId,
        price: product.price, 
        stock: product.stock, 
        status: product.status, 
        image: product.image,
        images: product.images || (product.image ? [product.image] : []),
        tags: product.tags || [],
        productCopy: product.description || product.productCopy || '',
        shortDescription: product.shortDescription || '',
        featureImages: product.featureImages || [],
        rating: product.rating || 5,
        reviewsCount: product.reviewsCount !== undefined ? product.reviewsCount : (typeof product.reviews === 'number' ? product.reviews : (product.reviews?.length || 0)),
        reviews: Array.isArray(product.reviews) ? product.reviews : [],
        isTrending: product.isTrending || false,
        isNewArrival: product.isNewArrival || false,
        swatches: product.swatches || [],
        swatchesVisible: product.swatches_visible !== false,
        packOptions: product.pack_options || [],
        packsVisible: product.packs_visible || false
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', category: availableCategories[0] || 'Electronics', price: 0, stock: 0, status: 'In Stock', 
        image: '', images: [], tags: [], productCopy: '', shortDescription: '', featureImages: [], 
        rating: 5, reviewsCount: 0, reviews: [], isTrending: false, isNewArrival: false,
        swatches: [], swatchesVisible: true, packOptions: [], packsVisible: false
      });
    }
    setTagInput('');
    setSwatchInput('');
    setPackLabel('');
    setPackPrice(0);
    setPackSavings('');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    for (const file of files) {
      if (formData.images.length >= 6) break;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => {
        const newImages = [...prev.images, publicUrl];
        return { ...prev, images: newImages, image: newImages[0] || '' };
      });
    }
  };


  const handleRemoveImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages, image: newImages[0] || '' };
    });
  };

  const handleAddTag = (e?: React.KeyboardEvent<HTMLInputElement>, manualValue?: string) => {
    const valueToAdd = manualValue || tagInput.trim();
    if (e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    
    if (valueToAdd) {
      if (!formData.tags.includes(valueToAdd)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, valueToAdd] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleFeatureImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    for (const file of files) {
      if (formData.featureImages.length >= 6) break;
      const fileExt = file.name.split('.').pop();
      const fileName = `feature-${Math.random()}.${fileExt}`;
      const filePath = `features/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) continue;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, featureImages: [...prev.featureImages, publicUrl] }));
    }
  };


  const handleRemoveFeatureImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      featureImages: prev.featureImages.filter((_, i) => i !== index)
    }));
  };

  const addReview = () => {
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { author: '', rating: 5, text: '', images: [] }]
    }));
  };

  const removeReview = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== idx)
    }));
  };

  const updateReview = (idx: number, field: string, value: any) => {
    setFormData(prev => {
      const newReviews = [...prev.reviews];
      newReviews[idx] = { ...newReviews[idx], [field]: value };
      return { ...prev, reviews: newReviews };
    });
  };

  const handleReviewImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, reviewIdx: number) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `reviews/${Math.random()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Review image upload error:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => {
        const newReviews = [...prev.reviews];
        newReviews[reviewIdx].images = [...(newReviews[reviewIdx].images || []), publicUrl];
        return { ...prev, reviews: newReviews };
      });
    }
  };

  const handleRemoveReviewImage = (reviewIdx: number, imgIdx: number) => {
    setFormData(prev => {
      const newReviews = [...prev.reviews];
      newReviews[reviewIdx].images = newReviews[reviewIdx].images.filter((_, i) => i !== imgIdx);
      return { ...prev, reviews: newReviews };
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    } else {
      setSuccessMessage('Product deleted successfully');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleSave = async () => {
    if (!formData.name) return;
    
    let finalTags = [...formData.tags];
    if (tagInput.trim() && !finalTags.includes(tagInput.trim())) {
      finalTags.push(tagInput.trim());
    }

    // Use the ID if we already have it, otherwise look it up
    let categoryId = formData.categoryId;
    if (!categoryId) {
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', formData.category)
        .single();
      categoryId = catData?.id;
    }

    const productData = {
      name: formData.name,
      category_id: categoryId,
      price: formData.price,
      stock_quantity: formData.stock,
      status: formData.status,
      main_image_url: formData.images[0] || formData.image,
      images: formData.images,
      feature_images: formData.featureImages,
      tags: finalTags,
      short_description: formData.shortDescription,
      description: formData.productCopy,
      rating: formData.rating,
      reviews_count: formData.reviewsCount,
      reviews: formData.reviews,
      is_trending: formData.isTrending,
      is_new_arrival: formData.isNewArrival,
      swatches: formData.swatches,
      swatches_visible: formData.swatchesVisible,
      pack_options: formData.packOptions,
      packs_visible: formData.packsVisible
    };

    if (editingId) {
      const { data, error } = await supabase.from('products').update(productData).eq('id', editingId).select().single();
      if (error) {
        console.error('Update error:', error);
        alert('Failed to update product');
      } else if (data) {
        // Optimistic local update
        const updatedProducts = products.map(p => p.id === editingId ? {
          ...p,
          ...productData,
          reviewsCount: productData.reviews_count,
          category: formData.category, // Map back the string name for the UI
        } : p);
        onProductsChange(updatedProducts);
      }
    } else {
      const { data, error } = await supabase.from('products').insert([{ 
        ...productData, 
        sku: `SKU-${Date.now()}` 
      }]).select().single();
      
      if (error) {
        console.error('Insert error:', error);
        alert('Failed to add product');
      } else if (data) {
        // Optimistic local update
        const newProduct = {
          ...data,
          ...productData,
          id: data.id,
          reviewsCount: productData.reviews_count,
          category: formData.category,
        };
        onProductsChange([newProduct, ...products]);
      }
    }
    
    setSuccessMessage(editingId ? 'Product updated successfully!' : 'Product added successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setIsModalOpen(false);
  };


  return (
    <motion.div {...fadeInUpProps} className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Manage products</h2>
          <p className="text-slate-500 mt-1">Overview and management of your inventory</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-[#e31c3d] hover:bg-[#c81935] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center gap-2">
          <Plus size={18} /> Add new product
        </button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-10 left-1/2 z-[100] bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold text-sm border border-slate-100 shadow-2xl flex items-center gap-3"
          >
            <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <Check size={18} />
            </div>
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search products by name, SKU, or category..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-[#e31c3d]/20 focus:outline-none text-sm transition-shadow"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="min-w-[160px]">
              <CustomDropdown 
                options={categories} 
                value={filterCategory} 
                onChange={(val) => { setFilterCategory(val); setCurrentPage(1); }} 
                bgColor="bg-slate-50"
              />
            </div>
            <div className="min-w-[160px]">
              <CustomDropdown 
                options={statuses} 
                value={filterStatus} 
                onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }} 
                bgColor="bg-slate-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thumbnail</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Product title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Price (₹)</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reviews</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Stock status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map((product) => {
                const statusStyle = getStatusStyles(product.status);
                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="size-12 rounded-lg bg-slate-100 overflow-hidden">
                        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 truncate max-w-[250px]">{product.name}</p>
                      <p className="text-xs text-slate-500">SKU: {product.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-3.5 h-3.5 fill-[#ff9c1a] text-[#ff9c1a]" />
                        <span className="text-sm font-bold text-slate-700">{Number(product.rating || 5).toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {product.reviewsCount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${statusStyle.bg} ${statusStyle.text} text-xs font-bold rounded-full`}>
                        <span className={`size-1.5 rounded-full ${statusStyle.dot}`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(product)} className="p-2 text-slate-400 hover:text-[#e31c3d] hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">No products found for your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 gap-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 transition-colors shadow-sm disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`size-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors shadow-sm ${currentPage === idx + 1 ? 'bg-[#e31c3d] text-white hover:brightness-110' : 'bg-transparent text-slate-600 hover:bg-white border border-transparent hover:border-slate-200'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 transition-colors shadow-sm disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Product' : 'Add Product'}</h3>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8">
              {/* Core Details Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 pb-2 border-b border-slate-100 flex items-center gap-2">Core Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Title</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" />
                  </div>
                <CustomDropdown 
                  label="Category" 
                  options={availableCategories} 
                  value={formData.category} 
                  onChange={(val) => setFormData({...formData, category: val})} 
                />
                <CustomDropdown 
                  label="Status" 
                  options={['In Stock', 'Low Stock', 'Out of Stock']} 
                  value={formData.status} 
                  onChange={(val) => setFormData({...formData, status: val})} 
                />
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Price</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Stock Quantity</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Average Rating (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value) || 0})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Initial Reviews Count</label>
                  <input type="number" value={formData.reviewsCount} onChange={e => setFormData({...formData, reviewsCount: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Product Tags</label>
                  <div className="border border-slate-200 rounded-lg p-2 focus-within:border-[#e31c3d] transition-colors flex flex-wrap gap-2 items-center bg-white">
                    {formData.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500"><X size={12} /></button>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      onBlur={() => handleAddTag()}
                      placeholder={formData.tags.length === 0 ? "Type and press enter to add tags (e.g. Hot Selling, New)..." : "Add more tags..."}
                      className="flex-1 min-w-[150px] outline-none text-sm px-1 py-1"
                    />
                  </div>
                </div>

                {/* Display Toggles */}
                <div className="col-span-1 flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white transition-shadow hover:shadow-sm">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Trending Now</h5>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 max-w-[160px]">Show this product in the Trending section</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={formData.isTrending} onChange={e => setFormData({...formData, isTrending: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#e31c3d] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                
                <div className="col-span-1 flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white transition-shadow hover:shadow-sm">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">New Arrival</h5>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 max-w-[160px]">Highlight this product as a New Arrival</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={formData.isNewArrival} onChange={e => setFormData({...formData, isNewArrival: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#e31c3d] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="col-span-1 flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white transition-shadow hover:shadow-sm">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Swatches Visible</h5>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 max-w-[160px]">Toggle color selection visibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={formData.swatchesVisible} onChange={e => setFormData({...formData, swatchesVisible: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#e31c3d] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="col-span-1 flex items-center justify-between border border-slate-200 rounded-lg p-4 bg-white transition-shadow hover:shadow-sm">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Packs Visible</h5>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 max-w-[160px]">Toggle pack options visibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={formData.packsVisible} onChange={e => setFormData({...formData, packsVisible: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#e31c3d] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="col-span-2 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Color Swatches</label>
                    <div className="border border-slate-200 rounded-lg p-2 focus-within:border-[#e31c3d] transition-colors flex flex-wrap gap-2 items-center bg-white">
                      {formData.swatches.map(sw => (
                        <span key={sw} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                          <div className="size-3 rounded-full border border-slate-300" style={{ backgroundColor: sw.toLowerCase().includes('#') || sw.toLowerCase().includes('rgb') ? sw : undefined }}></div>
                          {sw}
                          <button onClick={() => setFormData(prev => ({ ...prev, swatches: prev.swatches.filter(s => s !== sw) }))} className="hover:text-red-500"><X size={12} /></button>
                        </span>
                      ))}
                      <input 
                        type="text" 
                        value={swatchInput}
                        onChange={e => setSwatchInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (swatchInput.trim() && !formData.swatches.includes(swatchInput.trim())) {
                              setFormData(prev => ({ ...prev, swatches: [...prev.swatches, swatchInput.trim()] }));
                              setSwatchInput('');
                            }
                          }
                        }}
                        placeholder="Add color (e.g. Red, #FF0000)..."
                        className="flex-1 min-w-[150px] outline-none text-sm px-1 py-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Pack Options</label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="text" 
                          placeholder="Pack Label (e.g. 2 Pack)" 
                          value={packLabel} 
                          onChange={e => setPackLabel(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e31c3d]" 
                        />
                        <input 
                          type="number" 
                          placeholder="Price" 
                          value={packPrice} 
                          onChange={e => setPackPrice(parseFloat(e.target.value) || 0)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e31c3d]" 
                        />
                        <input 
                          type="text" 
                          placeholder="Savings (e.g. 20%)" 
                          value={packSavings} 
                          onChange={e => setPackSavings(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e31c3d]" 
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (packLabel.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              packOptions: [...prev.packOptions, { label: packLabel.trim(), price: packPrice, savings: packSavings }]
                            }));
                            setPackLabel('');
                            setPackPrice(0);
                            setPackSavings('');
                          }
                        }}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors border border-slate-200"
                      >
                        + Add Pack Option
                      </button>
                      <div className="flex flex-wrap gap-2">
                        {formData.packOptions.map((pack, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col gap-1 min-w-[140px] relative group">
                            <button 
                              type="button" 
                              onClick={() => setFormData(prev => ({ ...prev, packOptions: prev.packOptions.filter((_, i) => i !== idx) }))}
                              className="absolute top-1 right-1 size-5 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider ">{pack.label}</span>
                            <span className="text-xs font-bold text-[#e31c3d]">₹{pack.price}</span>
                            {pack.savings && <span className="text-[9px] font-medium text-green-600 bg-green-50 px-1 py-0.5 rounded w-fit">Save {pack.savings}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Product Images ({formData.images.length}/6)</label>
                    <button 
                      type="button"
                      disabled={formData.images.length >= 6} 
                      onClick={() => document.getElementById('multi-image-upload')?.click()} 
                      className="flex items-center gap-1 text-xs font-bold text-[#e31c3d] hover:text-[#c81935] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload size={14} /> Upload Image
                    </button>
                    <input type="file" id="multi-image-upload" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                  </div>
                  <div className="grid grid-cols-6 gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="aspect-square relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 size-5 bg-white/90 hover:bg-white text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 6 - formData.images.length) }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="aspect-square rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                        <span className="text-xs font-bold">{formData.images.length + idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
              {/* Extended Content Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 pb-2 border-b border-slate-100">Product Copy & Presentation</h4>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Short Description</label>
                  <textarea 
                    value={formData.shortDescription} 
                    onChange={e => setFormData({...formData, shortDescription: e.target.value})} 
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#e31c3d] min-h-[60px] resize-y"
                    placeholder="Write a short appealing description..."
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Product Description / Copy</label>
                    <div className="h-px bg-slate-100 flex-1"></div>
                    <span className="text-[10px] font-black text-[#e31c3d] uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">Rich Text Enabled</span>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white min-h-[300px] flex flex-col focus-within:border-[#e31c3d] transition-all">
                    <ReactQuill 
                      theme="snow"
                      value={formData.productCopy} 
                      onChange={content => setFormData({...formData, productCopy: content})}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Share the story of your product... Use formatting to make it stand out!"
                      className="flex-1 product-quill-editor"
                    />
                  </div>
                  <p className="mt-2 text-[10px] font-medium text-slate-400 italic">
                    Pro Tip: Highlight text to see formatting options. You can also paste images directly between paragraphs.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Feature Showcase Images ({formData.featureImages.length}/6)</label>
                    <button 
                      type="button"
                      disabled={formData.featureImages.length >= 6} 
                      onClick={() => document.getElementById('multi-feature-image-upload')?.click()} 
                      className="flex items-center gap-1 text-xs font-bold text-[#e31c3d] hover:text-[#c81935] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload size={14} /> Upload Image
                    </button>
                    <input type="file" id="multi-feature-image-upload" className="hidden" accept="image/*" multiple onChange={handleFeatureImageUpload} />
                  </div>
                  <div className="grid grid-cols-6 gap-3">
                    {formData.featureImages.map((img, idx) => (
                      <div key={idx} className="aspect-square relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img src={img} alt={`Feature ${idx + 1}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => handleRemoveFeatureImage(idx)}
                          className="absolute top-1 right-1 size-5 bg-white/90 hover:bg-white text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 6 - formData.featureImages.length) }).map((_, idx) => (
                      <div key={`empty-feature-${idx}`} className="aspect-square rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                        <span className="text-xs font-bold">{formData.featureImages.length + idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-700">Customer Reviews</h4>
                  <button type="button" onClick={addReview} className="text-xs font-bold text-[#e31c3d] flex items-center gap-1 hover:text-[#c81935]">
                    <Plus size={14} /> Add Review
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.reviews.length === 0 ? (
                    <p className="text-sm text-slate-400 font-medium italic text-center py-4">No reviews added manually yet.</p>
                  ) : (
                    formData.reviews.map((rev, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                        <button type="button" onClick={() => removeReview(idx)} className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-2 gap-3 mb-3 pr-8">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Author Name</label>
                            <input type="text" value={rev.author} onChange={e => updateReview(idx, 'author', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-[#e31c3d]" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Star Rating (1-5)</label>
                            <input type="number" min="1" max="5" value={rev.rating} onChange={e => updateReview(idx, 'rating', parseInt(e.target.value) || 5)} className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-[#e31c3d]" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Review Text</label>
                          <textarea value={rev.text} onChange={e => updateReview(idx, 'text', e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-[#e31c3d] resize-y min-h-[60px]" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Attached Images</label>
                            <button type="button" onClick={() => document.getElementById(`review-img-upload-${idx}`)?.click()} className="text-[10px] font-bold text-[#e31c3d] flex items-center gap-1">
                              <Upload size={12}/> Attach
                            </button>
                            <input type="file" id={`review-img-upload-${idx}`} className="hidden" accept="image/*" onChange={(e) => handleReviewImageUpload(e, idx)} />
                          </div>
                          {rev.images.length > 0 && (
                            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                              {rev.images.map((img, imgIdx) => (
                                <div key={imgIdx} className="size-12 shrink-0 relative rounded-md overflow-hidden bg-slate-200 group/img">
                                  <img src={img} alt="Review" className="w-full h-full object-cover" />
                                  <button type="button" onClick={() => handleRemoveReviewImage(idx, imgIdx)} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 flex-shrink-0 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#e31c3d] text-white rounded-lg font-bold shadow-md hover:bg-[#c81935] transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
