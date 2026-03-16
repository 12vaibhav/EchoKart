import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Trash2,
  Edit2,
  Upload,
  TrendingUp,
  TrendingDown,
  Package,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { deleteFileFromStorage } from '../../lib/storage-utils';
import { useRef } from 'react';


const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};


const CATEGORIES_DATA: any[] = [];

export const CategoriesManagement = ({ categories, onCategoriesChange }: { categories: any[], onCategoriesChange: (categories: any[]) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ title: '', image: '', items: 0 });


  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    const { error } = await supabase.from('categories').update({ visible: !currentVisible }).eq('id', id);
    if (error) {
      console.error('Error toggling category visibility:', error);
    } else {
      onCategoriesChange(categories.map(cat => 
        cat.id === id ? { ...cat, visible: !cat.visible } : cat
      ));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isUploading) return;
    
    setIsUploading(true);
    if (e.target) e.target.value = '';

    try {
      if (formData.image) {
        await deleteFileFromStorage(formData.image);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `cat-${Math.random()}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Category upload error:', uploadError);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
    } finally {
      setIsUploading(false);
    }
  };


  const handleDelete = async (id: string) => {
    // 1. Fetch category to get image URL
    const { data: category } = await supabase.from('categories').select('*').eq('id', id).single();
    
    // 2. Delete from storage
    if (category?.image_url) {
      await deleteFileFromStorage(category.image_url);
    }

    // 3. Delete from database
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      alert('Failed to delete category');
    } else {
      alert('Category deleted successfully');
    }
  };


  const handleOpenModal = (cat?: typeof categories[0]) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ 
        title: cat.title || cat.name || '', 
        image: cat.image || cat.image_url || '', 
        items: cat.items || 0
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', image: '', items: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) return;
    
    const categoryData = {
      name: formData.title,
      image_url: formData.image || 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=500&q=80',
      visible: true
    };

    if (editingId) {
      const { error } = await supabase.from('categories').update(categoryData).eq('id', editingId);
      if (error) {
        console.error('Update error:', error);
        alert('Failed to update category');
      } else {
        alert('Category updated successfully');
      }
    } else {
      const { error } = await supabase.from('categories').insert([categoryData]);
      if (error) {
        console.error('Insert error:', error);
        alert('Failed to add category');
      } else {
        alert('Category added successfully');
      }
    }
    setIsModalOpen(false);
  };


  const filteredCategories = categories.filter(c => (c.title || c.name || '').toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <motion.div {...fadeInUpProps} className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
      
      {/* Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Product Categories</h3>
          <p className="text-slate-500 text-sm mt-1 font-medium">Overview and management of your store's department structure</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e31c3d]/20 transition-all font-medium"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-2 bg-[#e31c3d] text-white rounded-lg font-bold text-sm shadow-lg shadow-[#e31c3d]/20 hover:brightness-110 active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className={`bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group ${!category.visible ? 'opacity-75 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
            <div className="aspect-video relative bg-slate-100 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={category.image} alt={category.title} />
              <div className="absolute top-3 right-3">
                   {category.visible ? (
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Visible</span>
                   ) : (
                        <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Hidden</span>
                   )}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2 group/actions relative">
                <h4 className="font-bold text-lg">{category.title}</h4>
                <div className="flex gap-2 opacity-0 group-hover/actions:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(category)} className="p-1.5 text-slate-400 hover:text-[#e31c3d] hover:bg-slate-100 rounded-md transition-colors"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(category.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-md transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>{(category.items || 0).toLocaleString()} items</span>
                </div>
                <div className="flex items-center gap-1">
                  {category.trendUp === true && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                  {category.trendUp === false && <TrendingDown className="w-4 h-4 text-rose-500" />}
                  {(category.trendUp === null || category.trendUp === undefined) && <span className="text-slate-400">—</span>}
                  
                  <span className={`font-medium ${category.trendUp === true ? 'text-emerald-500' : category.trendUp === false ? 'text-rose-500' : 'text-slate-400'}`}>
                    {category.trend || '0%'}
                  </span>
                </div>
              </div>

              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visibility Toggle</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={category.visible}
                    onChange={() => toggleVisibility(category.id, category.visible)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e31c3d] rounded-full"></div>
                </label>
              </div>

            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button onClick={() => handleOpenModal()} className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 gap-3 text-slate-400 hover:border-[#e31c3d] hover:text-[#e31c3d] hover:bg-[#e31c3d]/5 transition-all group min-h-[300px]">
          <div className="size-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#e31c3d] group-hover:text-white transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-bold">Add New Category</span>
        </button>
      </div>

      {/* Pagination/Stats Footer */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
        <div className="text-sm font-medium text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredCategories.length}</span> of <span className="text-slate-900 font-bold">{categories.length}</span> categories
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="size-10 rounded-lg bg-[#e31c3d] text-white font-bold">1</button>
          <button className="size-10 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">2</button>
          <button className="size-10 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">3</button>
          <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" placeholder="e.g. Footwear" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Image URL or Upload</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50 transition-colors focus-within:border-[#e31c3d]">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 text-sm outline-none bg-transparent" placeholder="https://..." />
                  <button 
                    type="button" 
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()} 
                    className="px-3 shrink-0 text-slate-400 hover:text-[#e31c3d] transition-colors disabled:opacity-50"
                  >
                    {isUploading ? <div className="size-4 border-2 border-[#e31c3d] border-t-transparent rounded-full animate-spin"></div> : <Upload size={18} />}
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                {formData.image && (
                  <div className="mt-2 h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Item Count</label>
                <input type="number" value={formData.items} onChange={e => setFormData({...formData, items: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#e31c3d]" placeholder="0" />
              </div>

            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#e31c3d] text-white rounded-lg font-bold shadow-md hover:bg-[#c81935] transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
