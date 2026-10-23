import { Product, Category, FabricOption, Order, CustomQuote, RepairEnquiry, Review, StoreSettings } from '../types';

const BASE_URL = '/api';

export const api = {
  // Settings
  async getSettings(): Promise<StoreSettings> {
    const res = await fetch(`${BASE_URL}/settings`);
    if (!res.ok) throw new Error("Failed to load store settings");
    return res.json();
  },

  async updateSettings(data: Partial<StoreSettings>, token: string): Promise<StoreSettings> {
    const res = await fetch(`${BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update settings");
    return json.settings;
  },

  // Auth
  async adminLogin(password: string): Promise<{ success: boolean; token: string; user: any }> {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Login failed");
    return json;
  },

  async verifyAdmin(token: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/admin/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async getAdminStats(token: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load admin stats");
    return res.json();
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to load categories");
    return res.json();
  },

  async createCategory(data: Partial<Category>, token: string): Promise<Category> {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to create category");
    return json;
  },

  async updateCategory(id: string, data: Partial<Category>, token: string): Promise<Category> {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update category");
    return json;
  },

  async deleteCategory(id: string, token: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to delete category");
    return json;
  },

  // Products
  async getProducts(params?: { category?: string; search?: string; featured?: boolean; sort?: string }): Promise<Product[]> {
    const url = new URL(`${window.location.origin}${BASE_URL}/products`);
    if (params?.category) url.searchParams.set('category', params.category);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.featured) url.searchParams.set('featured', 'true');
    if (params?.sort) url.searchParams.set('sort', params.sort);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  },

  async createProduct(data: Partial<Product>, token: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to create product");
    return json;
  },

  async updateProduct(id: string, data: Partial<Product>, token: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update product");
    return json;
  },

  async deleteProduct(id: string, token: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to delete product");
    return json;
  },

  async deleteProductImage(productId: string, imageUrl: string, token: string): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`${BASE_URL}/products/${productId}/images`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageUrl })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to remove product image");
    return json;
  },

  async getMedia(token: string): Promise<Array<{ id: string; url: string; name: string; date: string }>> {
    const res = await fetch(`${BASE_URL}/admin/media`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load media photos");
    return res.json();
  },

  async createMedia(data: { url: string; name?: string }, token: string): Promise<{ id: string; url: string; name: string; date: string }> {
    const res = await fetch(`${BASE_URL}/admin/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to add media photo");
    return json;
  },

  async deleteMedia(id: string, token: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/admin/media/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to delete media photo");
    return json;
  },

  async uploadProductImage(dataUrl: string, token: string, filename?: string): Promise<{ success: boolean; url: string }> {
    const res = await fetch(`${BASE_URL}/admin/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ dataUrl, filename })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to upload image");
    return json;
  },

  // Fabrics
  async getFabrics(): Promise<FabricOption[]> {
    const res = await fetch(`${BASE_URL}/fabrics`);
    if (!res.ok) throw new Error("Failed to load fabrics");
    return res.json();
  },

  // Orders
  async createOrder(payload: any): Promise<{ success: boolean; orderId: string; order: Order }> {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to place order");
    return json;
  },

  async getOrders(token: string, status?: string): Promise<Order[]> {
    const url = new URL(`${window.location.origin}${BASE_URL}/orders`);
    if (status && status !== 'ALL') url.searchParams.set('status', status);
    const res = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load orders");
    return res.json();
  },

  async updateOrderStatus(id: string, data: any, token: string): Promise<Order> {
    const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update order status");
    return json.order;
  },

  // Custom Sofa Quotes
  async submitQuote(payload: Partial<CustomQuote>): Promise<{ success: boolean; quote: CustomQuote }> {
    const res = await fetch(`${BASE_URL}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to submit quote request");
    return json;
  },

  async getQuotes(token: string): Promise<CustomQuote[]> {
    const res = await fetch(`${BASE_URL}/quotes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load quotes");
    return res.json();
  },

  async updateQuoteStatus(id: string, status: string, token: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/quotes/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Sofa Repair Requests
  async submitRepair(payload: Partial<RepairEnquiry>): Promise<{ success: boolean; repair: RepairEnquiry }> {
    const res = await fetch(`${BASE_URL}/repairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to submit repair request");
    return json;
  },

  async getRepairs(token: string): Promise<RepairEnquiry[]> {
    const res = await fetch(`${BASE_URL}/repairs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load repairs");
    return res.json();
  },

  // Reviews
  async getReviews(): Promise<Review[]> {
    const res = await fetch(`${BASE_URL}/reviews`);
    if (!res.ok) throw new Error("Failed to load reviews");
    return res.json();
  },

  async submitReview(payload: Partial<Review>): Promise<Review> {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to post review");
    return json.review;
  },

  // Payment Verification Simulation
  async verifyPayment(orderId: string, paymentMethod: string, transactionRef?: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, paymentMethod, transactionRef })
    });
    return res.json();
  }
};
