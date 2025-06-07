import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    // ✅ Ürün Oluşturma
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Tüm alanları doldurunuz" };
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Ürün oluşturulamadı");
            }

            const data = await res.json();

            if (data.success) {
                set((state) => ({ products: [...state.products, data.Data] }));
                return { success: true, message: "Ürün başarıyla oluşturuldu" };
            } else {
                return { success: false, message: "Ürün oluşturulamadı" };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    // ✅ Ürünleri Getirme
    fetchProducts: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products`);

            if (!res.ok) {
                throw new Error("Ürünler alınamadı");
            }

            const data = await res.json();

            if (Array.isArray(data.Data)) {
                set({ products: data.Data });
            } else {
                set({ products: [] });
            }
        } catch (error) {
            console.error("ürünler alınırken hata oluştu", error);
        }
    },

    // ✅ Ürün Silme
    deleteProduct: async (pid) => {
        const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
            method: "DELETE",  // "Sil" değil, HTTP DELETE olmalı
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));

        return { success: true, message: data.message };
    },

    // ✅ Ürün Güncelleme
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? { ...product, ...updatedProduct } : product
                ),
            }));

            return { success: true, message: "Ürün başarıyla güncellendi" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));
