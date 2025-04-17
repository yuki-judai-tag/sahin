import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    // ✅ Ürün Oluşturma
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill all fields" };
        }

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();

            if (data.success) {
                set((state) => ({ products: [...state.products, data.Data] }));
                return { success: true, message: "Product Created Successfully" };
            } else {
                return { success: false, message: "Failed to create product" };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    // ✅ Ürünleri Getirme
    fetchProducts: async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products");

            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await res.json();

            if (Array.isArray(data.Data)) {
                set({ products: data.Data });
            } else {
                set({ products: [] });
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },

    // ✅ Ürün Silme
    deleteProduct: async (pid) => {
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));

        return { success: true, message: data.message };
    },

    // ✅ **Ürün Güncelleme (Hata Düzeltildi)**
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            // **Güncellenmiş Ürünü Direkt State'e Ekle**
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? { ...product, ...updatedProduct } : product
                ),
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));
