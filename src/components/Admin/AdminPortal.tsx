import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Product, Category, Order, CustomQuote, RepairEnquiry, StoreSettings } from '../../types';
import { api } from '../../services/api';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Wrench,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Printer,
  Download,
  FileText,
  Search,
  MessageCircle,
  Eye,
  AlertTriangle,
  Lock,
  X,
  Camera,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Upload
} from 'lucide-react';
import { getProductImage } from '../../utils/imageCatalog';
import { ReceiptModal } from '../ReceiptModal';
import { printReceipt, downloadReceiptHtml } from '../../utils/receiptGenerator';

interface AdminPortalProps {
  onClose: () => void;
  settings: StoreSettings;
  onSettingsUpdate: (newSettings: StoreSettings) => void;
  onRefreshData: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onClose,
  settings,
  onSettingsUpdate,
  onRefreshData
}) => {
  const { token, isAdmin, login, logout } = useAuth();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab inside admin dashboard
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'media' | 'categories' | 'orders' | 'quotes' | 'repairs' | 'settings'>('dashboard');

  // Mobile Order View State (allows collapsing order cards on phones)
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const toggleOrderExpand = (id: string) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Settings Section on Mobile (prevents long scroll)
  const [activeSettingsSection, setActiveSettingsSection] = useState<'all' | 'workshop' | 'delivery' | 'payments' | 'media'>('all');

  // Media Library state for Client Genuine Photos
  const [selectedProductForMedia, setSelectedProductForMedia] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: string; url: string; name: string; date: string }>>([
    { id: 'img-1', url: 'IMG-20261012-WA0193.jpg', name: 'Royale Sectional Velvet (WA0193)', date: 'Uploaded' },
    { id: 'img-2', url: 'IMG-20261012-WA0154.jpg', name: 'Curved Cream Boucle (WA0154)', date: 'Uploaded' },
    { id: 'img-3', url: 'IMG-20261012-WA0205.jpg', name: 'Pull-Out Bed Mechanism (WA0205)', date: 'Uploaded' },
    { id: 'img-4', url: 'IMG-20261012-WA0195.jpg', name: 'Recliner Cinema Suite (WA0195)', date: 'Uploaded' },
    { id: 'img-5', url: 'IMG-20261012-WA0183.jpg', name: 'Modern 3-Seater Fluted (WA0183)', date: 'Uploaded' },
    { id: 'img-6', url: 'IMG-20261012-WA0181.jpg', name: 'Dining Accent Chair (WA0181)', date: 'Uploaded' },
    { id: 'img-7', url: 'IMG-20261012-WA0187.jpg', name: 'Designer Bed Headboard (WA0187)', date: 'Uploaded' },
    { id: 'img-8', url: 'IMG-20261012-WA0157.jpg', name: '40D Foam Cushion (WA0157)', date: 'Uploaded' }
  ]);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<CustomQuote[]>([]);
  const [repairs, setRepairs] = useState<RepairEnquiry[]>([]);

  // Search & Filter
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Category edit modal state
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Order detail modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewingReceiptOrder, setViewingReceiptOrder] = useState<Order | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // In-App Action Notices (replaces window.alert)
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const showNotice = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setActionNotice({ type, message });
    setTimeout(() => {
      setActionNotice(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Safe In-App Delete Modals (replaces blocked window.confirm & prompt)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<{ id: string; url: string; name: string } | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [categoryReassignTarget, setCategoryReassignTarget] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Quick image manager drawer per product in catalog
  const [managingImagesProductId, setManagingImagesProductId] = useState<string | null>(null);

  // Load Admin Data when authenticated
  useEffect(() => {
    if (isAdmin && token) {
      loadAllAdminData();
    }
  }, [isAdmin, token]);

  const loadAllAdminData = async () => {
    if (!token) return;
    try {
      const [s, p, c, o, q, r, m] = await Promise.all([
        api.getAdminStats(token),
        api.getProducts(),
        api.getCategories(),
        api.getOrders(token),
        api.getQuotes(token),
        api.getRepairs(token),
        api.getMedia(token).catch(() => [])
      ]);
      setStats(s);
      setProducts(p);
      setCategories(c);
      setOrders(o);
      setQuotes(q);
      setRepairs(r);
      if (Array.isArray(m) && m.length > 0) {
        setUploadedPhotos(m);
      }
    } catch (err) {
      console.error("Admin data fetch error:", err);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const success = await login(passwordInput);
    if (!success) {
      setLoginError('Incorrect password. Default owner credentials: Balaji@Surat2026');
    }
    setIsLoggingIn(false);
  };

  // --- Product Handlers ---
  const handleOpenAddProduct = () => {
    setEditingProduct({
      name: '',
      sku: `SBSF-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: categories[0]?.id || 'cat-l-shape',
      categoryName: categories[0]?.name || 'L-Shaped Sofas',
      price: 25000,
      originalPrice: 29000,
      isCustomizable: true,
      isFeatured: false,
      inStock: true,
      stockQuantity: 5,
      leadTimeDays: 7,
      seatingCapacity: '3 Seater',
      dimensions: { lengthInches: 80, widthInches: 34, heightInches: 34, seatingHeightInches: 18 },
      materials: {
        frame: 'Solid Sal Wood',
        foam: '40D Sleepwell HR Foam',
        fabric: 'Royal Velvet',
        legs: 'Metal with Gold Accent'
      },
      description: '',
      features: ['Solid seasoned hardwood skeleton', '40D high-resilience foam', '10-year warranty'],
      images: ['product_l_shape_teal'],
      colorVariants: [
        { name: 'Teal Blue', hex: '#1A5F7A', inStock: true },
        { name: 'Warm Grey', hex: '#6B7280', inStock: true }
      ],
      fabricOptions: ['Royal Velvet', 'Soft Chenille', 'Premium Vegan Leatherette']
    });
    setIsProductModalOpen(true);
  };

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
      showNotice("Please select a valid image file (JPG, PNG, WebP, SVG)", 'error');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showNotice("File size exceeds 15MB limit.", 'error');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        if (token) {
          const res = await api.uploadProductImage(base64, token, file.name);
          setEditingProduct(prev => {
            if (!prev) return null;
            const updatedImages = [...(prev.images || []), res.url];
            return {
              ...prev,
              images: updatedImages,
              image: prev.image || res.url
            };
          });
          showNotice(`Image "${file.name}" uploaded and attached to product.`, 'success');
        }
      } catch (err: any) {
        showNotice(err.message || "Upload failed", 'error');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    const url = imageUrlInput.trim();
    setEditingProduct(prev => {
      if (!prev) return null;
      const updatedImages = [...(prev.images || []), url];
      return {
        ...prev,
        images: updatedImages,
        image: prev.image || url
      };
    });
    setImageUrlInput('');
    showNotice("Image URL attached to product.", 'success');
  };

  // Remove a single image from product being edited in modal
  const handleRemoveProductImageInModal = (idxToRemove: number) => {
    setEditingProduct(prev => {
      if (!prev) return null;
      const currentImages = prev.images || [];
      const removedUrl = currentImages[idxToRemove];
      const remaining = currentImages.filter((_, i) => i !== idxToRemove);
      const newPrimary = prev.image === removedUrl ? (remaining[0] || '') : prev.image;
      return {
        ...prev,
        images: remaining,
        image: newPrimary
      };
    });
    showNotice("Image removed from product. Click 'Save Product' to commit changes.", 'info');
  };

  // Set a specific image as the primary cover in product modal
  const handleSetPrimaryImageInModal = (imgUrl: string) => {
    setEditingProduct(prev => {
      if (!prev) return null;
      const currentImages = prev.images || [];
      const reordered = [imgUrl, ...currentImages.filter(i => i !== imgUrl)];
      return {
        ...prev,
        image: imgUrl,
        images: reordered
      };
    });
    showNotice("Selected image set as Primary Cover.", 'success');
  };

  // Quick 1-click removal of a single image from a product directly in the catalog
  const handleQuickRemoveProductImage = async (productId: string, imageUrl: string) => {
    if (!token) return;
    try {
      const res = await api.deleteProductImage(productId, imageUrl, token);
      if (res.success && res.product) {
        setProducts(prev => prev.map(p => p.id === productId ? res.product : p));
        onRefreshData();
        showNotice("Single image removed from product successfully.", 'success');
      }
    } catch (err: any) {
      showNotice(err.message || "Failed to remove image", 'error');
    }
  };

  const handleAssignPhotoToProduct = async (photoUrl: string, productId: string, asPrimary: boolean) => {
    if (!token || !productId) {
      showNotice("Please choose a target furniture product first.", 'error');
      return;
    }
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    let updatedImages: string[] = [];
    if (asPrimary) {
      updatedImages = [photoUrl, ...(prod.images || []).filter(i => i !== photoUrl)];
    } else {
      updatedImages = [...(prod.images || []).filter(i => i !== photoUrl), photoUrl];
    }

    try {
      await api.updateProduct(productId, {
        ...prod,
        image: asPrimary ? photoUrl : (prod.image || photoUrl),
        images: updatedImages
      }, token);
      await loadAllAdminData();
      onRefreshData();
      showNotice(`Photo assigned to "${prod.name}" as ${asPrimary ? 'Primary Image' : 'Gallery Image'}.`, 'success');
    } catch (err: any) {
      showNotice(err.message || "Failed to assign photo", 'error');
    }
  };

  const handleMediaPoolUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'].includes(file.type)) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          if (token) {
            const res = await api.uploadProductImage(base64, token, file.name);
            const savedMedia = await api.createMedia({ url: res.url, name: file.name }, token);
            setUploadedPhotos(prev => [savedMedia, ...prev.filter(m => m.id !== savedMedia.id)]);
            showNotice(`Photo "${file.name}" uploaded to media library.`, 'success');
          }
        } catch {
          setUploadedPhotos(prev => [
            { id: `photo-${Date.now()}-${Math.random()}`, url: base64, name: file.name, date: 'Just now' },
            ...prev
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Safe deletion of a photo from Media Library
  const confirmDeletePhoto = async () => {
    if (!token || !photoToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteMedia(photoToDelete.id, token);
      setUploadedPhotos(prev => prev.filter(p => p.id !== photoToDelete.id));
      showNotice(`Photo "${photoToDelete.name}" removed from library.`, 'success');
      setPhotoToDelete(null);
    } catch (err: any) {
      showNotice(err.message || "Failed to delete photo", 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProduct?.name) return;

    try {
      const selectedCat = categories.find(c => c.id === editingProduct.categoryId);
      const payload = {
        ...editingProduct,
        categoryName: selectedCat ? selectedCat.name : editingProduct.categoryName
      };

      if (editingProduct.id) {
        await api.updateProduct(editingProduct.id, payload, token);
        showNotice(`Product "${editingProduct.name}" updated successfully.`, 'success');
      } else {
        await api.createProduct(payload, token);
        showNotice(`Product "${editingProduct.name}" created successfully.`, 'success');
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      await loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      showNotice(err.message || "Failed to save product", 'error');
    }
  };

  // Safe In-App Product Deletion (Works guaranteed in iframes)
  const handleDeleteProductClick = (prod: Product) => {
    setProductToDelete(prod);
  };

  const confirmDeleteProduct = async () => {
    if (!token || !productToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteProduct(productToDelete.id, token);
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      showNotice(`Product "${productToDelete.name}" deleted successfully.`, 'success');
      setProductToDelete(null);
      await loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      showNotice(err.message || "Failed to delete product", 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Category Handlers (Safe in-app modal instead of prompt/confirm) ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingCategory?.name) return;
    try {
      if (editingCategory.id) {
        await api.updateCategory(editingCategory.id, editingCategory, token);
        showNotice(`Category "${editingCategory.name}" updated.`, 'success');
      } else {
        await api.createCategory(editingCategory, token);
        showNotice(`Category "${editingCategory.name}" created.`, 'success');
      }
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      await loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      showNotice(err.message || "Failed to save category", 'error');
    }
  };

  const handleOpenDeleteCategory = (c: Category) => {
    const productsWithCat = products.filter(p => p.categoryId === c.id);
    const otherCats = categories.filter(other => other.id !== c.id);
    if (productsWithCat.length > 0 && otherCats.length === 0) {
      showNotice("Cannot delete the only remaining category with products.", 'error');
      return;
    }
    setCategoryToDelete(c);
    setCategoryReassignTarget(otherCats[0]?.id || '');
  };

  const confirmDeleteCategory = async () => {
    if (!token || !categoryToDelete) return;
    const catId = categoryToDelete.id;
    const productsWithCat = products.filter(p => p.categoryId === catId);
    let reassignTo: string | undefined = undefined;

    if (productsWithCat.length > 0) {
      if (!categoryReassignTarget) {
        showNotice("Please choose a category to reassign products to.", 'error');
        return;
      }
      reassignTo = categoryReassignTarget;
    }

    setIsDeleting(true);
    try {
      const url = reassignTo ? `/api/categories/${catId}?reassignTo=${reassignTo}` : `/api/categories/${catId}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete category");
      showNotice(`Category "${categoryToDelete.name}" deleted successfully.`, 'success');
      setCategoryToDelete(null);
      await loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      showNotice(err.message || "Failed to delete category", 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Order Handlers ---
  const handleUpdateOrderStatus = async (
    orderId: string,
    status?: any,
    internalNotes?: string,
    paymentStatus?: string,
    trackingDetails?: string
  ) => {
    if (!token) return;
    try {
      const payload: any = {};
      if (status) payload.status = status;
      if (internalNotes !== undefined) payload.internalNotes = internalNotes;
      if (paymentStatus) payload.paymentStatus = paymentStatus;
      if (trackingDetails !== undefined) payload.trackingDetails = trackingDetails;

      await api.updateOrderStatus(orderId, payload, token);
      await loadAllAdminData();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? {
          ...prev,
          ...(status ? { status } : {}),
          ...(internalNotes !== undefined ? { internalNotes } : {}),
          ...(trackingDetails !== undefined ? { trackingDetails } : {}),
          ...(paymentStatus && prev.payment ? { payment: { ...prev.payment, status: paymentStatus as any } } : {})
        } : null);
      }
    } catch (err: any) {
      showNotice(err.message || "Failed to update order", 'error');
    }
  };

  // --- Quote Handlers ---
  const handleUpdateQuoteStatus = async (quoteId: string, status: string) => {
    if (!token) return;
    try {
      await api.updateQuoteStatus(quoteId, status, token);
      await loadAllAdminData();
      showNotice("Quote status updated.", 'success');
    } catch (err: any) {
      showNotice(err.message || "Failed to update quote", 'error');
    }
  };

  // --- Settings Handlers ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const updated = await api.updateSettings(settingsForm, token);
      onSettingsUpdate(updated);
      setSettingsSavedNotice(true);
    } catch (err: any) {
      showNotice(err.message || "Failed to save settings", 'error');
    }
  };

  // ==========================================
  // Render: If NOT Logged In, show Login Form
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] p-6 sm:p-8 space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#1B382B] text-[#D4AF37] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
              Store &amp; Workshop Portal
            </h2>
            <p className="text-xs text-[#6B7280]">
              Authorized Shree Balaji staff &amp; owner login
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                Owner Secret / Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter authorized password"
                className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
              />
              <p className="text-[11px] text-[#8A7B69] mt-1.5">
                Default authorization pass: <code className="bg-[#FAF6EE] px-1.5 py-0.5 rounded font-mono font-bold text-[#1B382B]">Balaji@Surat2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#1B382B] text-white hover:bg-[#142d22] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>{isLoggingIn ? 'Verifying...' : 'Access Management Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render: Authenticated Admin Dashboard
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 bg-[#FDFBF7] flex flex-col overflow-hidden">
      {/* Admin Top Navbar */}
      <header className="h-14 sm:h-16 bg-[#1B382B] text-white px-3 sm:px-6 flex items-center justify-between shrink-0 border-b border-[#244636]">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-serif text-base sm:text-lg font-bold text-[#F3DC9B]">
            Shree Balaji Admin
          </span>
          <span className="text-xs text-white/60 hidden sm:inline">|</span>
          <span className="text-xs text-white/80 hidden sm:inline">Dindoli Workshop Management</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={logout}
            className="flex items-center gap-1 sm:gap-1.5 text-xs text-red-200 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
          <button
            onClick={onClose}
            className="px-2.5 sm:px-3 py-1.5 bg-[#D4AF37] text-[#1B382B] hover:bg-[#c5a028] text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap"
          >
            Storefront
          </button>
        </div>
      </header>

      {/* Global In-App Action Notification Banner (100% reliable in iframes) */}
      {actionNotice && (
        <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-xs transition-all shrink-0 ${
          actionNotice.type === 'success' ? 'bg-[#ECFDF5] text-[#065F46] border-b border-[#A7F3D0]' :
          actionNotice.type === 'error' ? 'bg-[#FEF2F2] text-[#991B1B] border-b border-[#FCA5A5]' :
          'bg-[#EFF6FF] text-[#1E40AF] border-b border-[#BFDBFE]'
        }`}>
          <div className="flex items-center gap-2">
            {actionNotice.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0 text-[#059669]" />}
            {actionNotice.type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC2626]" />}
            {actionNotice.type === 'info' && <ImageIcon className="w-4 h-4 shrink-0 text-[#2563EB]" />}
            <span>{actionNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="p-1 hover:opacity-75 cursor-pointer text-current"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mobile Horizontal Navigation Tab Strip (Compact & Finger-friendly) */}
      <div className="md:hidden bg-[#FAF6EE] border-b border-[#E8DFC9] px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-xs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'dashboard' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <LayoutDashboard className="w-3 h-3 text-[#D4AF37]" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'orders' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
          <span>Orders ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'products' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <Package className="w-3 h-3 text-[#D4AF37]" />
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'media' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <Camera className="w-3 h-3 text-[#D4AF37]" />
          <span>Photos</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'categories' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <FolderTree className="w-3 h-3 text-[#D4AF37]" />
          <span>Categories</span>
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'quotes' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <CheckCircle className="w-3 h-3 text-[#D4AF37]" />
          <span>Quotes</span>
        </button>
        <button
          onClick={() => setActiveTab('repairs')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'repairs' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <Wrench className="w-3 h-3 text-[#D4AF37]" />
          <span>Repairs</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'settings' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#4B5563] bg-white border border-[#E5DEC9]'
          }`}
        >
          <SettingsIcon className="w-3 h-3 text-[#D4AF37]" />
          <span>Settings</span>
        </button>
      </div>

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar Navigation (Desktop only) */}
        <aside className="hidden md:flex flex-col w-64 bg-[#FAF6EE] border-r border-[#E8DFC9] p-4 justify-between shrink-0 overflow-y-auto">
          <nav className="space-y-1 text-xs font-medium text-[#4B5563]">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'dashboard' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
              <span>Overview Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'orders' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Customer Orders</span>
              </div>
              {orders.length > 0 && (
                <span className="text-[10px] bg-[#D4AF37] text-[#1B382B] px-1.5 py-0.2 rounded-full font-bold">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'products' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#D4AF37]" />
                <span>Product Catalog</span>
              </div>
              <span className="text-[10px] text-[#8A7B69]">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'media' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <span>Genuine Product Photos</span>
              </div>
              <span className="text-[10px] bg-[#D4AF37] text-[#1B382B] px-1.5 py-0.2 rounded-full font-bold">
                {uploadedPhotos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'categories' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderTree className="w-4 h-4 text-[#D4AF37]" />
                <span>Category Structure</span>
              </div>
              <span className="text-[10px] text-[#8A7B69]">{categories.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'quotes' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom Sofa Quotes</span>
              </div>
              {quotes.filter(q => q.status === 'NEW').length > 0 && (
                <span className="text-[10px] bg-[#059669] text-white px-1.5 py-0.2 rounded-full font-bold">
                  {quotes.filter(q => q.status === 'NEW').length} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('repairs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'repairs' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-[#D4AF37]" />
                <span>Sofa Repair Requests</span>
              </div>
              {repairs.filter(r => r.status === 'NEW').length > 0 && (
                <span className="text-[10px] bg-[#D97706] text-white px-1.5 py-0.2 rounded-full font-bold">
                  {repairs.filter(r => r.status === 'NEW').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                activeTab === 'settings' ? 'bg-[#1B382B] text-[#FDFBF7] font-bold shadow-xs' : 'hover:bg-[#EFE8D8] text-[#374151]'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Store &amp; Workshop Settings</span>
            </button>
          </nav>

          {/* Quick Support info */}
          <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] text-[11px] text-[#6B7280]">
            <div>Workshop Contact:</div>
            <div className="font-bold text-[#1B382B]">{settings.phone}</div>
            <div className="text-[10px] text-[#8A7B69] mt-0.5">Dindoli, Surat · PIN 394210</div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-6 md:p-8 bg-[#FDFBF7]">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-3 sm:space-y-6">
              <div>
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1B382B]">
                  Workshop &amp; E-Commerce Overview
                </h2>
                <p className="text-[11px] sm:text-xs text-[#6B7280]">
                  Live metrics calculated from verified database records.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs text-[#8A7B69] block">Total Verified Sales</span>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-[#1B382B] tabular-nums">
                    ₹{stats.totalSales?.toLocaleString('en-IN') || 0}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#059669] block">Confirmed &amp; Delivered</span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs text-[#8A7B69] block">Workshop Active</span>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-[#1B382B] tabular-nums">
                    {stats.pendingOrders || 0}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#D97706] block">In Crafting / Framing</span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs text-[#8A7B69] block">Custom Quotes</span>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-[#1B382B] tabular-nums">
                    {stats.totalQuotes || 0}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#6B7280] block">Interactive Builder Leads</span>
                </div>

                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs text-[#8A7B69] block">Pending Repairs</span>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-[#1B382B] tabular-nums">
                    {stats.pendingRepairs || 0}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#2563EB] block">40D Foam Re-cushioning</span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5DEC9] p-3 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#1B382B]">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#1B382B] font-semibold hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs text-left text-[#374151]">
                    <thead className="bg-[#FAF6EE] text-[#8A7B69] uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFE6]">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-[#FAF7F0]">
                          <td className="p-3 font-mono font-bold text-[#1B382B]">{o.id}</td>
                          <td className="p-3">
                            <div className="font-semibold text-[#1B382B]">{o.customer.name}</div>
                            <div className="text-[10px] text-[#8A7B69]">{o.customer.phone}</div>
                          </td>
                          <td className="p-3">{o.items.length} item(s)</td>
                          <td className="p-3 font-bold tabular-nums">
                            ₹{o.pricing.total.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className="text-[11px] font-medium">{o.payment.method}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#ECFDF5] text-[#047857]">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingReceiptOrder(o)}
                              className="text-xs text-[#1B382B] font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Receipt Slip</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Clean Compact Cards (zero horizontal scroll!) */}
                <div className="md:hidden space-y-2.5">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] space-y-1.5 text-xs shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#1B382B]">{o.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#ECFDF5] text-[#047857]">
                          {o.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#374151]">
                        <span className="font-medium text-[#1B382B] truncate">{o.customer.name} ({o.customer.phone})</span>
                        <span className="font-bold text-[#1B382B] tabular-nums shrink-0 ml-2">₹{o.pricing.total.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D2] text-[11px]">
                        <span className="text-[#8A7B69]">{o.items.length} item(s) · {o.payment.method}</span>
                        <button
                          type="button"
                          onClick={() => setViewingReceiptOrder(o)}
                          className="text-[#1B382B] font-bold underline flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3 text-[#D4AF37]" />
                          <span>Receipt Slip</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
                    Product Management ({products.length})
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Add, edit, change pricing, and manage inventory for sofas and beds.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2.5 bg-[#1B382B] text-white hover:bg-[#142d22] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(prod => (
                  <div
                    key={prod.id}
                    className="p-4 bg-white rounded-xl border border-[#E5DEC9] shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={getProductImage(prod.images?.[0] || '', prod.images?.[0])}
                        alt={prod.name}
                        className="w-20 h-20 rounded-lg object-cover bg-[#FAF7F0] shrink-0 border border-[#EFE8D8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold text-[#8A7B69] block">
                          {prod.categoryName} · SKU: {prod.sku}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#1B382B] line-clamp-1 mt-0.5">
                          {prod.name}
                        </h4>
                        <div className="font-bold text-sm text-[#1B382B] mt-1 tabular-nums">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-[#6B7280]">
                          Stock: {prod.stockQuantity} units · {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#8A7B69]">
                        {prod.isFeatured ? '★ Featured on Home' : 'Catalog Only'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 text-[#1B382B] hover:bg-[#FAF6EE] rounded cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2B: GENUINE PRODUCT PHOTOS & MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1B382B]">
                    Genuine Furniture Photos &amp; Media Library
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Upload client workshop photos directly from your phone or assign existing photos to products without distortion.
                  </p>
                </div>
              </div>

              {/* Upload & Assignment Control Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Upload Card */}
                <div className="p-4 bg-white rounded-xl border border-[#E5DEC9] shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-bold text-xs text-[#1B382B]">Upload Genuine Photos</span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Select JPG, PNG, or WebP images from your phone gallery or files.
                  </p>
                  <label className="w-full py-2.5 px-4 bg-[#1B382B] text-white hover:bg-[#142d22] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs">
                    <Camera className="w-4 h-4 text-[#D4AF37]" />
                    <span>Choose Photos to Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMediaPoolUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Assignment Target Product Selector */}
                <div className="p-4 bg-white rounded-xl border border-[#E5DEC9] shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-bold text-xs text-[#1B382B]">Target Product for Assignment</span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Select which product you want to assign photos to:
                  </p>
                  <select
                    value={selectedProductForMedia}
                    onChange={e => setSelectedProductForMedia(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0] text-xs font-semibold text-[#1B382B] cursor-pointer"
                  >
                    <option value="">-- Choose a Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Gallery Grid */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5DEC9] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1B382B] uppercase tracking-wider">
                    Available Genuine Photos ({uploadedPhotos.length})
                  </span>
                  <span className="text-[11px] text-[#8A7B69]">
                    Preserved in genuine aspect ratio
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {uploadedPhotos.map(photo => (
                    <div
                      key={photo.id}
                      className="bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] overflow-hidden p-2 flex flex-col justify-between space-y-2 shadow-xs group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-white border border-[#E8DFC9] flex items-center justify-center">
                        <img
                          src={getProductImage(photo.url, photo.url)}
                          alt={photo.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div className="text-[11px] font-semibold text-[#1B382B] truncate" title={photo.name}>
                        {photo.name}
                      </div>

                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => handleAssignPhotoToProduct(photo.url, selectedProductForMedia, true)}
                          disabled={!selectedProductForMedia}
                          className="w-full py-1.5 px-2 bg-[#1B382B] disabled:bg-gray-200 text-white disabled:text-gray-400 text-[10px] font-bold rounded cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                          Set as Primary
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAssignPhotoToProduct(photo.url, selectedProductForMedia, false)}
                          disabled={!selectedProductForMedia}
                          className="w-full py-1.5 px-2 bg-white disabled:bg-gray-100 text-[#1B382B] disabled:text-gray-400 border border-[#D5C9B3] text-[10px] font-semibold rounded cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                          Add to Gallery
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORY MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
                    Category Management ({categories.length})
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Organize catalog navigation, rename categories, and set display orders.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingCategory({
                      name: '',
                      description: '',
                      image: 'cat_l_shaped',
                      displayOrder: categories.length + 1,
                      isActive: true
                    });
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#1B382B] text-white hover:bg-[#142d22] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5DEC9] overflow-hidden">
                <table className="w-full text-xs text-left text-[#374151]">
                  <thead className="bg-[#FAF6EE] text-[#8A7B69] uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Order</th>
                      <th className="p-3">Category Name</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Items Count</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EFE6]">
                    {categories.map(c => (
                      <tr key={c.id} className="hover:bg-[#FAF7F0]">
                        <td className="p-3 font-mono font-bold text-[#8A7B69]">{c.displayOrder}</td>
                        <td className="p-3 font-bold text-[#1B382B]">{c.name}</td>
                        <td className="p-3 text-[#6B7280] max-w-xs truncate">{c.description}</td>
                        <td className="p-3 tabular-nums">{c.itemCount} products</td>
                        <td className="p-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            c.isActive ? 'bg-[#ECFDF5] text-[#047857]' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {c.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingCategory(c);
                                setIsCategoryModalOpen(true);
                              }}
                              className="p-1 text-[#1B382B] hover:bg-[#FAF6EE] rounded cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(c.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
                    Order Management ({orders.length})
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Update manufacturing status, record tracking, and inspect customer delivery addresses.
                  </p>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs bg-white p-1 rounded-xl border border-[#E5DEC9]">
                  {['ALL', 'CONFIRMED', 'IN_PRODUCTION', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        orderFilter === st ? 'bg-[#1B382B] text-white font-bold' : 'text-[#4B5563] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order List */}
              <div className="space-y-3">
                {orders
                  .filter(o => orderFilter === 'ALL' || o.status === orderFilter)
                  .map(order => {
                    const isExpanded = !!expandedOrders[order.id];
                    return (
                      <div
                        key={order.id}
                        className="p-3.5 sm:p-5 bg-white rounded-xl border border-[#E5DEC9] shadow-xs space-y-3"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F3EFE6] pb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs sm:text-sm font-bold text-[#1B382B]">{order.id}</span>
                            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-[#FAF6EE] text-[#1B382B] border border-[#E8DFC9]">
                              {order.payment.method} ({order.payment.status})
                            </span>
                            <span className="text-[10px] text-[#8A7B69]">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-[#1B382B] tabular-nums">
                              ₹{order.pricing.total.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleOrderExpand(order.id)}
                              className="md:hidden p-1 text-[#8A7B69] hover:text-[#1B382B] rounded bg-[#FAF6EE] border border-[#E5DEC9] flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
                            >
                              <span>{isExpanded ? 'Less' : 'Details'}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Status & Payment Quick Selectors (Stacked neatly on mobile) */}
                        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span className="text-[10px] sm:text-xs font-semibold text-[#8A7B69]">Status:</span>
                            <select
                              value={order.status}
                              onChange={e => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="text-[11px] sm:text-xs font-bold p-1 sm:p-1.5 rounded border border-[#D5C9B3] bg-[#FAF7F0] text-[#1B382B] cursor-pointer"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="IN_PRODUCTION">IN PRODUCTION</option>
                              <option value="READY_FOR_DELIVERY">READY FOR DELIVERY</option>
                              <option value="DISPATCHED">DISPATCHED</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span className="text-[10px] sm:text-xs font-semibold text-[#8A7B69]">Payment:</span>
                            <select
                              value={order.payment.status}
                              onChange={e => handleUpdateOrderStatus(order.id, undefined, undefined, e.target.value)}
                              className={`text-[11px] sm:text-xs font-bold p-1 sm:p-1.5 rounded border ${
                                order.payment.status === 'VERIFIED'
                                  ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                                  : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                              } cursor-pointer`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="VERIFIED">VERIFIED</option>
                              <option value="FAILED">FAILED</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer & Items Breakdown: Visible always on desktop, expandable on mobile */}
                        <div className={`${isExpanded ? 'block' : 'hidden md:block'} pt-1 border-t border-[#F3EFE6]`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <span className="font-bold text-[#1B382B] block">Customer: {order.customer.name}</span>
                              <p className="text-[#6B7280]">Phone: {order.customer.phone}</p>
                              <p className="text-[#6B7280]">
                                Address: {order.customer.address}, {order.customer.city} — PIN {order.customer.pincode}
                              </p>
                              {order.customer.notes && (
                                <p className="text-[#B45309] italic">Notes: {order.customer.notes}</p>
                              )}
                            </div>

                            <div className="space-y-1 bg-[#FAF6EE] p-2.5 sm:p-3 rounded-lg border border-[#E8DFC9]">
                              <div className="flex justify-between font-bold text-[#1B382B]">
                                <span>Items ({order.items.length}):</span>
                                <span className="tabular-nums">Total: ₹{order.pricing.total.toLocaleString('en-IN')}</span>
                              </div>
                              {order.items.map((it, idx) => (
                                <div key={idx} className="text-[11px] text-[#4B5563]">
                                  • {it.quantity}x {it.name} ({it.selectedFabric || 'Standard'}{it.selectedColor ? ` / ${it.selectedColor}` : ''})
                                </div>
                              ))}
                              {order.trackingDetails && (
                                <div className="text-[11px] text-[#059669] pt-1">
                                  Tracking: {order.trackingDetails}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons: 1-click Receipt & WhatsApp */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F3EFE6]">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => setViewingReceiptOrder(order)}
                              className="flex-1 sm:flex-none px-2.5 py-1.5 bg-[#1B382B] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#142d22] cursor-pointer shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Receipt &amp; Slip</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => downloadReceiptHtml(order, settings)}
                              className="flex-1 sm:flex-none px-2.5 py-1.5 bg-[#FAF6EE] text-[#1B382B] border border-[#D5C9B3] rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#EFE8D8] cursor-pointer shadow-xs"
                              title="Download invoice HTML"
                            >
                              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>Download</span>
                            </button>
                            <a
                              href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${order.customer.name}, this is Shree Balaji Sofa & Furniture regarding your Order #${order.id}. Current status: ${order.status}.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 sm:flex-none px-2.5 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#20ba59]"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              <span>WhatsApp</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-2.5 py-1.5 bg-white text-[#4B5563] border border-[#E5DEC9] rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-gray-50 cursor-pointer hidden sm:flex"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Work Order</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOM SOFA QUOTES */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
                  Custom Sofa Configurator Inquiries ({quotes.length})
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Requests generated from the interactive custom builder on the website.
                </p>
              </div>

              <div className="space-y-3">
                {quotes.map(q => (
                  <div key={q.id} className="p-5 bg-white rounded-xl border border-[#E5DEC9] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1B382B]">{q.customerName}</span>
                        <span className="text-[10px] bg-[#FAF6EE] text-[#8A7B69] px-2 py-0.5 rounded font-mono">
                          {q.id}
                        </span>
                      </div>
                      <div className="text-[#374151]">
                        Model: <strong>{q.sofaType}</strong> · Fabric: <strong>{q.fabric}</strong> · Foam: <strong>{q.foamGrade}</strong>
                      </div>
                      <div className="text-[#6B7280]">Phone: {q.customerPhone}</div>
                      {q.notes && <div className="text-[#8A7B69] italic">Notes: {q.notes}</div>}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-[#8A7B69]">Est. Value</div>
                        <div className="font-bold text-base text-[#1B382B] tabular-nums">
                          ₹{q.estimatedPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${q.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${q.customerName}, this is Shree Balaji Sofa & Furniture. We received your custom quote request for the ${q.sofaType}. Are you available for a quick chat?`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SOFA REPAIRS */}
          {activeTab === 'repairs' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B382B]">
                  Sofa Cushion Repair &amp; Foam Replacement Requests ({repairs.length})
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Surat residential cushion re-foaming, sagging repair, and fabric restitching leads.
                </p>
              </div>

              <div className="space-y-3">
                {repairs.map(r => (
                  <div key={r.id} className="p-5 bg-white rounded-xl border border-[#E5DEC9] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1B382B]">{r.customerName}</span>
                        <span className="text-[10px] bg-[#FAF6EE] text-[#8A7B69] px-2 py-0.5 rounded font-mono">
                          {r.id}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] font-bold rounded">
                          {r.issueType}
                        </span>
                      </div>
                      <div className="text-[#374151]">
                        Seating: <strong>{r.seatingCount}</strong> · Sofa Age: {r.sofaAge}
                      </div>
                      <div className="text-[#6B7280]">Address: {r.address} (Surat)</div>
                      <div className="text-[#6B7280]">Phone: {r.customerPhone}</div>
                      {r.description && <div className="text-[#8A7B69] italic">Issue: {r.description}</div>}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={`https://wa.me/${r.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${r.customerName}, this is Shree Balaji Sofa & Furniture. We received your sofa cushion repair inquiry for ${r.seatingCount} in ${r.address}. When can we visit for inspection?`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Schedule Pickup</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & POLICIES */}
          {activeTab === 'settings' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1B382B]">
                  Store &amp; Workshop Settings
                </h2>
                <p className="text-[11px] sm:text-xs text-[#6B7280]">
                  Configure verified business details, delivery rules, and payment toggles.
                </p>
              </div>

              {/* Section Filters on Mobile (Reduces screen height clutter) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pb-1">
                <button
                  type="button"
                  onClick={() => setActiveSettingsSection('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSettingsSection === 'all' ? 'bg-[#1B382B] text-white font-bold' : 'bg-white border border-[#E5DEC9] text-[#4B5563]'
                  }`}
                >
                  All Settings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsSection('workshop')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSettingsSection === 'workshop' ? 'bg-[#1B382B] text-white font-bold' : 'bg-white border border-[#E5DEC9] text-[#4B5563]'
                  }`}
                >
                  Workshop Contact
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsSection('delivery')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSettingsSection === 'delivery' ? 'bg-[#1B382B] text-white font-bold' : 'bg-white border border-[#E5DEC9] text-[#4B5563]'
                  }`}
                >
                  Delivery Rules
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsSection('payments')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSettingsSection === 'payments' ? 'bg-[#1B382B] text-white font-bold' : 'bg-white border border-[#E5DEC9] text-[#4B5563]'
                  }`}
                >
                  UPI &amp; Payment
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsSection('media')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSettingsSection === 'media' ? 'bg-[#1B382B] text-white font-bold' : 'bg-white border border-[#E5DEC9] text-[#4B5563]'
                  }`}
                >
                  Video &amp; Drive
                </button>
              </div>

              {settingsSavedNotice && (
                <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Store settings updated successfully and saved to database!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E5DEC9] space-y-3 sm:space-y-4 text-xs">
                {(activeSettingsSection === 'all' || activeSettingsSection === 'workshop') && (
                  <div className="space-y-3">
                    <div className="font-bold text-[#1B382B] border-b border-[#F3EFE6] pb-1">
                      Workshop Contact &amp; Details
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Business Name</label>
                      <input
                        type="text"
                        value={settingsForm.businessName}
                        onChange={e => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-[#1B382B] mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                          className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[#1B382B] mb-1">WhatsApp Number (e.g. 917753857076)</label>
                        <input
                          type="text"
                          value={settingsForm.whatsapp}
                          onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                          className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Full Workshop Address</label>
                      <textarea
                        rows={2}
                        value={settingsForm.address}
                        onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Workshop Operating Hours</label>
                      <input
                        type="text"
                        value={settingsForm.hours}
                        onChange={e => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                      />
                    </div>
                  </div>
                )}

                {(activeSettingsSection === 'all' || activeSettingsSection === 'delivery') && (
                  <div className="space-y-3 pt-2">
                    <div className="font-bold text-[#1B382B] border-b border-[#F3EFE6] pb-1">
                      Delivery &amp; Shipping Charges
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-[#1B382B] mb-1">Free Delivery Threshold (₹)</label>
                        <input
                          type="number"
                          value={settingsForm.freeDeliveryThreshold}
                          onChange={e => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: parseInt(e.target.value) || 0 })}
                          className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[#1B382B] mb-1">Outside Surat Flat Delivery Fee (₹)</label>
                        <input
                          type="number"
                          value={settingsForm.defaultDeliveryFee}
                          onChange={e => setSettingsForm({ ...settingsForm, defaultDeliveryFee: parseInt(e.target.value) || 0 })}
                          className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(activeSettingsSection === 'all' || activeSettingsSection === 'payments') && (
                  <div className="space-y-3 pt-2">
                    <div className="font-bold text-[#1B382B] border-b border-[#F3EFE6] pb-1">
                      UPI &amp; Payment Settings
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Merchant UPI ID</label>
                      <input
                        type="text"
                        value={settingsForm.upiId}
                        onChange={e => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Google Drive & Video Embed Configuration */}
                {(activeSettingsSection === 'all' || activeSettingsSection === 'media') && (
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] space-y-3 pt-2">
                    <div className="font-bold text-[#1B382B] border-b border-[#E8DFC9] pb-1">
                      Workshop Video &amp; Drive Media Links
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Workshop Video Tour / Mechanism Demo URL</label>
                      <input
                        type="url"
                        placeholder="e.g. YouTube, Vimeo, Google Drive preview link, or MP4"
                        value={settingsForm.workshopVideoUrl || ''}
                        onChange={e => setSettingsForm({ ...settingsForm, workshopVideoUrl: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white text-xs"
                      />
                      <p className="text-[10px] text-[#8A7B69] mt-1">
                        Enables the real workshop video demonstration on the storefront.
                      </p>
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B382B] mb-1">Google Drive Catalog / PDF Portfolio URL</label>
                      <input
                        type="url"
                        placeholder="e.g. https://drive.google.com/drive/folders/..."
                        value={settingsForm.catalogDriveUrl || ''}
                        onChange={e => setSettingsForm({ ...settingsForm, catalogDriveUrl: e.target.value })}
                        className="w-full p-2 sm:p-2.5 rounded-lg border border-[#D5C9B3] bg-white text-xs"
                      />
                      <p className="text-[10px] text-[#8A7B69] mt-1">
                        Direct cloud folder link for client furniture catalog, fabrics, and customer albums.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1B382B] text-white font-semibold rounded-lg hover:bg-[#142d22] cursor-pointer shadow-xs min-h-[42px]"
                  >
                    Save Workshop Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT EDIT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] p-6 max-h-[85vh] overflow-y-auto my-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC9]">
              <h3 className="font-serif text-lg font-bold text-[#1B382B]">
                {editingProduct.id ? 'Edit Product' : 'Add New Furniture Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stockQuantity}
                    onChange={e => setEditingProduct({ ...editingProduct, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Wood Frame Material</label>
                  <input
                    type="text"
                    value={editingProduct.materials?.frame || 'Solid Sal & Teak Hardwood'}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      materials: { ...(editingProduct.materials || {} as any), frame: e.target.value }
                    })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Foam Specification</label>
                  <input
                    type="text"
                    value={editingProduct.materials?.foam || '40D Sleepwell HR Foam'}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      materials: { ...(editingProduct.materials || {} as any), foam: e.target.value }
                    })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured || false}
                    onChange={e => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="text-[#1B382B]"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.hasPullOutMechanism || false}
                    onChange={e => setEditingProduct({ ...editingProduct, hasPullOutMechanism: e.target.checked })}
                    className="text-[#1B382B]"
                  />
                  <span>Convertible Pull-Out Sofa Bed Mechanism</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E8DFC9]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280] hover:text-[#1B382B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1B382B] text-white font-semibold rounded-lg hover:bg-[#142d22]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT MODAL */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1B382B]">
              {editingCategory.id ? 'Edit Category' : 'Create Category'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">Description</label>
                <input
                  type="text"
                  value={editingCategory.description || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">Display Sort Order</label>
                <input
                  type="number"
                  value={editingCategory.displayOrder || 1}
                  onChange={e => setEditingCategory({ ...editingCategory, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B382B] text-white font-semibold rounded-lg"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER WORK ORDER & DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div id="printable-receipt" className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-6">
            <div className="p-5 bg-[#1B382B] text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Workshop Work Order &amp; Invoice</span>
                <h3 className="font-serif text-lg font-bold">Order #{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              {/* Customer & Delivery */}
              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E5DEC9]">
                <div>
                  <span className="font-bold text-[#1B382B] block">Customer Details</span>
                  <p className="font-semibold text-sm text-[#1B382B] mt-1">{selectedOrder.customer.name}</p>
                  <p className="text-[#6B7280]">Phone: {selectedOrder.customer.phone}</p>
                  {selectedOrder.customer.email && <p className="text-[#6B7280]">Email: {selectedOrder.customer.email}</p>}
                </div>
                <div>
                  <span className="font-bold text-[#1B382B] block">Delivery Location</span>
                  <p className="text-[#374151] mt-1 leading-relaxed">
                    {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} — PIN {selectedOrder.customer.pincode}
                  </p>
                  {selectedOrder.customer.landmark && (
                    <p className="text-[#8A7B69] mt-0.5">Landmark: {selectedOrder.customer.landmark}</p>
                  )}
                </div>
              </div>

              {/* Items & Materials */}
              <div className="space-y-2">
                <span className="font-bold text-[#1B382B] block">Manufacture Items ({selectedOrder.items.length})</span>
                <div className="border border-[#E5DEC9] rounded-xl overflow-hidden bg-white">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 border-b border-[#F3EFE6] last:border-b-0 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-[#1B382B] text-xs block">{it.name}</span>
                        <div className="text-[11px] text-[#6B7280]">
                          Fabric: <strong className="text-[#1B382B]">{it.selectedFabric}</strong>
                          {it.selectedColor && <> · Shade: <strong className="text-[#1B382B]">{it.selectedColor}</strong></>}
                          {it.orientation && <> · Facing: <strong className="text-[#1B382B]">{it.orientation}</strong></>}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-xs text-[#1B382B]">Qty: {it.quantity}</span>
                        <div className="font-bold text-xs tabular-nums text-[#1B382B]">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="p-4 bg-[#FAF6EE] rounded-xl border border-[#E5DEC9] space-y-1.5">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">₹{selectedOrder.pricing.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Delivery Charge:</span>
                  <span className="text-[#059669]">
                    {selectedOrder.pricing.deliveryFee === 0 ? 'FREE' : `₹${selectedOrder.pricing.deliveryFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#1B382B] pt-1 border-t border-[#E8DFC9]">
                  <span>Total Amount:</span>
                  <span className="tabular-nums">₹{selectedOrder.pricing.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[11px] text-[#8A7B69] pt-1">
                  Payment Method: <strong>{selectedOrder.payment.method}</strong> · Status: <strong>{selectedOrder.payment.status}</strong>
                  {selectedOrder.payment.transactionRef && <> (Ref: {selectedOrder.payment.transactionRef})</>}
                </div>
              </div>

              {/* Status Update & Internal Notes */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#1B382B] mb-1">Update Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={e => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#D5C9B3] bg-white font-semibold text-[#1B382B]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="IN_PRODUCTION">IN PRODUCTION (WORKSHOP)</option>
                      <option value="READY_FOR_DELIVERY">READY FOR DELIVERY</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1B382B] mb-1">Payment Status:</label>
                    <select
                      value={selectedOrder.payment.status}
                      onChange={e => handleUpdateOrderStatus(selectedOrder.id, undefined, undefined, e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#D5C9B3] bg-white font-semibold text-[#1B382B]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="VERIFIED">VERIFIED</option>
                      <option value="FAILED">FAILED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">Workshop Internal Notes / Tracking:</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder.internalNotes || ''}
                    onBlur={e => handleUpdateOrderStatus(selectedOrder.id, undefined, e.target.value)}
                    placeholder="e.g. Solid teak frame assembled, upholstery in progress"
                    className="w-full p-2 rounded-lg border border-[#D5C9B3] bg-white text-xs"
                  />
                </div>
              </div>

              {/* Print and Actions */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#E8DFC9]">
                <button
                  type="button"
                  onClick={() => setViewingReceiptOrder(selectedOrder)}
                  className="flex-1 min-w-[130px] py-2.5 bg-[#1B382B] text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-[#142d22] cursor-pointer shadow-xs text-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View / Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadReceiptHtml(selectedOrder, settings)}
                  className="flex-1 min-w-[120px] py-2.5 bg-[#FAF6EE] text-[#1B382B] border border-[#D5C9B3] rounded-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-[#EFE8D8] cursor-pointer shadow-xs text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Download (.html)</span>
                </button>
                <a
                  href={`https://wa.me/${selectedOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedOrder.customer.name}, Shree Balaji Sofa workshop is processing your Order #${selectedOrder.id}. Current status: ${selectedOrder.status}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 bg-[#25D366] text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-[#20ba59] text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Full Receipt & Slip Modal */}
      {viewingReceiptOrder && (
        <ReceiptModal
          order={viewingReceiptOrder}
          settings={settings}
          onClose={() => setViewingReceiptOrder(null)}
        />
      )}
    </div>
  );
};
