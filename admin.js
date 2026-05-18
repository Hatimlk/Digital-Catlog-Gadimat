// --- SUPABASE CONFIGURATION ---
// IMPORTANT: Replace these with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = 'https://hcrfhiponimvivbrznwk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcmZoaXBvbmltdml2YnJ6bndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzgzMjQsImV4cCI6MjA5NDY1NDMyNH0.LCgAOm_aOcLx6CuT7gOjJzLyBX8UzwN-SCV9KZ8DD90';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- AUTHENTICATION & DOM ELEMENTS ---
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');
const loginBtnText = document.getElementById('loginBtnText');
const loginSpinner = document.getElementById('loginSpinner');
const logoutBtn = document.getElementById('logoutBtn');

// Other DOM Elements
const productsTableBody = document.getElementById('productsTableBody');
const loadingIndicator = document.getElementById('loadingIndicator');
const openModalBtn = document.getElementById('openModalBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const formError = document.getElementById('formError');

// Form Fields
const productIdInput = document.getElementById('productId');
const brandInput = document.getElementById('brand');
const typeInput = document.getElementById('type');
const codeInput = document.getElementById('code');
const labelInput = document.getElementById('label');
const epaisseurInput = document.getElementById('epaisseur');
const isHiddenInput = document.getElementById('isHidden');
const surfaceImageInput = document.getElementById('surfaceImage');
const previewImageInput = document.getElementById('previewImage');
const surfaceImageName = document.getElementById('surfaceImageName');
const previewImageName = document.getElementById('previewImageName');

let products = [];
let currentSession = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
        alert("⚠️ Supabase URL is not configured.");
        return;
    }
    
    // Check active session
    const { data: { session } } = await supabaseClient.auth.getSession();
    handleSession(session);

    // Listen for auth changes
    supabaseClient.auth.onAuthStateChange((_event, session) => {
        handleSession(session);
    });
});

function handleSession(session) {
    currentSession = session;
    if (session) {
        loginContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        fetchProducts();
    } else {
        loginContainer.style.display = 'flex';
        appContainer.style.display = 'none';
    }
}

// --- LOGIN / LOGOUT ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');
    loginBtn.disabled = true;
    loginSpinner.classList.remove('hidden');
    loginBtnText.textContent = 'Connexion...';

    const { error } = await supabaseClient.auth.signInWithPassword({
        email: loginEmail.value,
        password: loginPassword.value,
    });

    if (error) {
        loginError.textContent = "Email ou mot de passe incorrect.";
        loginError.classList.remove('hidden');
        loginBtn.disabled = false;
        loginSpinner.classList.add('hidden');
        loginBtnText.textContent = 'Se connecter';
    }
});

logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
});

// --- FETCH DATA ---
async function fetchProducts() {
    loadingIndicator.classList.remove('hidden');
    productsTableBody.innerHTML = '';
    
    try {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
            .order('id', { ascending: true }); // Tie-breaker for products migrated at the same time

        if (error) throw error;
        
        products = data;
        renderProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Erreur lors du chargement des produits.', 'error');
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

// --- RENDER TABLE ---
function renderProducts(data) {
    productsTableBody.innerHTML = '';
    
    if (data.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    Aucun produit trouvé. Cliquez sur "Nouveau Produit" pour commencer.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(product => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        
        const surfaceImg = product.surface_image_url 
            ? `<img src="${product.surface_image_url}" class="w-12 h-12 object-cover rounded-md border border-gray-200">`
            : `<div class="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400"><i class="fa-solid fa-image"></i></div>`;

        const statusBadge = product.is_hidden 
            ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Masqué</span>`
            : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actif</span>`;

        const hideIcon = product.is_hidden ? "fa-eye" : "fa-eye-slash";
        const hideTitle = product.is_hidden ? "Afficher le produit" : "Masquer le produit";
        const hideColor = product.is_hidden ? "text-green-600 hover:text-green-900 hover:bg-green-50" : "text-orange-600 hover:text-orange-900 hover:bg-orange-50";

        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${surfaceImg}</td>
            <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${product.brand}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">${product.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">${product.code}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">${product.label}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">${product.epaisseur || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="toggleHideProduct('${product.id}', ${!!product.is_hidden})" class="${hideColor} mr-3 p-2 rounded-md transition-colors" title="${hideTitle}">
                    <i class="fa-solid ${hideIcon}"></i>
                </button>
                <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded-md hover:bg-blue-50 transition-colors" title="Modifier">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors" title="Supprimer">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        productsTableBody.appendChild(tr);
    });
}

// --- MODAL & FORM LOGIC ---
function openModal(isEdit = false) {
    modalTitle.textContent = isEdit ? 'Modifier le produit' : 'Ajouter un produit';
    formError.classList.add('hidden');
    productModal.classList.remove('hidden');
    productModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    productModal.classList.add('hidden');
    productModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
    productForm.reset();
    productIdInput.value = '';
    isHiddenInput.checked = false;
    surfaceImageName.textContent = '';
    previewImageName.textContent = '';
}

openModalBtn.addEventListener('click', () => openModal(false));
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// File input listeners for display names
surfaceImageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        surfaceImageName.textContent = e.target.files[0].name;
    } else {
        surfaceImageName.textContent = '';
    }
});

previewImageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        previewImageName.textContent = e.target.files[0].name;
    } else {
        previewImageName.textContent = '';
    }
});

// --- SAVE PRODUCT ---
saveBtn.addEventListener('click', async () => {
    // Basic validation
    if (!brandInput.value || !typeInput.value || !codeInput.value || !labelInput.value) {
        showError("Veuillez remplir tous les champs obligatoires (*).");
        return;
    }

    const isEdit = !!productIdInput.value;
    
    if (!isEdit && !surfaceImageInput.files[0]) {
        showError("Une image de surface est obligatoire pour un nouveau produit.");
        return;
    }

    setLoading(true);
    formError.classList.add('hidden');

    try {
        let surfaceImageUrl = null;
        let previewImageUrl = null;

        // Upload Surface Image
        if (surfaceImageInput.files.length > 0) {
            surfaceImageUrl = await uploadImage(surfaceImageInput.files[0], 'surface');
        }

        // Upload Preview Image
        if (previewImageInput.files.length > 0) {
            previewImageUrl = await uploadImage(previewImageInput.files[0], 'preview');
        }

        const productData = {
            brand: brandInput.value,
            type: typeInput.value,
            code: codeInput.value,
            label: labelInput.value,
            epaisseur: epaisseurInput.value || null,
            is_hidden: isHiddenInput.checked
        };

        if (surfaceImageUrl) productData.surface_image_url = surfaceImageUrl;
        if (previewImageUrl) productData.preview_image_url = previewImageUrl;

        if (isEdit) {
            const { error } = await supabaseClient
                .from('products')
                .update(productData)
                .eq('id', productIdInput.value);
            if (error) throw error;
            showToast('Produit modifié avec succès.');
        } else {
            const { error } = await supabaseClient
                .from('products')
                .insert([productData]);
            if (error) throw error;
            showToast('Produit ajouté avec succès.');
        }

        closeModal();
        fetchProducts();

    } catch (error) {
        console.error("Save error:", error);
        showError("Erreur lors de l'enregistrement: " + error.message);
    } finally {
        setLoading(false);
    }
});

// --- IMAGE UPLOAD ---
async function uploadImage(file, prefix) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${brandInput.value}/${typeInput.value}/${fileName}`;

    const { error: uploadError, data } = await supabaseClient.storage
        .from('catalog-images')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabaseClient.storage
        .from('catalog-images')
        .getPublicUrl(filePath);

    return publicUrl;
}

// --- EDIT PRODUCT ---
window.editProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    productIdInput.value = product.id;
    brandInput.value = product.brand;
    typeInput.value = product.type;
    codeInput.value = product.code;
    labelInput.value = product.label;
    epaisseurInput.value = product.epaisseur || '';
    isHiddenInput.checked = product.is_hidden || false;
    
    surfaceImageName.textContent = product.surface_image_url ? 'Image existante conservée (téléchargez pour remplacer)' : '';
    previewImageName.textContent = product.preview_image_url ? 'Image existante conservée (téléchargez pour remplacer)' : '';

    openModal(true);
};

// --- DELETE PRODUCT ---
window.deleteProduct = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
        return;
    }

    try {
        const { error } = await supabaseClient
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        showToast('Produit supprimé avec succès.');
        fetchProducts();
    } catch (error) {
        console.error("Delete error:", error);
        showToast("Erreur lors de la suppression.", "error");
    }
};

// --- TOGGLE HIDE PRODUCT ---
window.toggleHideProduct = async (id, currentStatus) => {
    try {
        const newStatus = !currentStatus;
        const { error } = await supabaseClient
            .from('products')
            .update({ is_hidden: newStatus })
            .eq('id', id);

        if (error) throw error;
        
        // Update local state without refetching from DB to keep exact position
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            products[productIndex].is_hidden = newStatus;
            renderProducts(products);
        }
        
        showToast(newStatus ? 'Produit masqué avec succès.' : 'Produit activé avec succès.');
    } catch (error) {
        console.error("Toggle hide error:", error);
        showToast("Erreur lors du changement de statut.", "error");
    }
};

// --- EXPORT PDF ---
exportPdfBtn.addEventListener('click', async () => {
    // Ne garder que les produits actifs
    const activeProducts = products.filter(p => !p.is_hidden);
    
    if (activeProducts.length === 0) {
        showToast("Aucun produit actif à exporter.", "error");
        return;
    }

    try {
        setLoading(true);
        showToast("Génération du PDF en cours, veuillez patienter...", "info");

        // 1. Dictionnaire des logos et tailles
        const brandLogos = {
            "AGT": "Assets/Logos/AGT-logo.png",
            "CAMSAN": "Assets/Logos/Camsan-logo.png",
            "VENNI": "Assets/Logos/Venni-logo.png",
            "YILDIZ": "Assets/Logos/Yildiz-logo.png",
            "KRONOSPAN": "Assets/Logos/Kronospan-logo.png"
        };
        const productSizeMap = {
            "MDF LAM": "2100X2800",
            "HIGH GLOSS": "1220X2800",
            "SUPRAMAT": "1220X2800"
        };
        
        // 2. Grouper par Marque et Type
        const grouped = {};
        activeProducts.forEach(p => {
            const key = `${p.brand}|${p.type}`;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(p);
        });

        // 3. Construire le conteneur HTML global (invisible)
        const container = document.createElement('div');
        // Fix for html2canvas blank page: move off-screen horizontally instead of using zIndex/opacity
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '-9999px';
        container.style.width = '210mm';
        container.style.background = 'white';
        
        // Font is already loaded in admin.html, no need to inject <link> here
        const pagesHtml = [];

        Object.keys(grouped).forEach(key => {
            const [brand, type] = key.split('|');
            let items = grouped[key];
            // Trier alphabétiquement par code
            items.sort((a, b) => a.code.localeCompare(b.code));

            const brandLogoSrc = brandLogos[brand] || '';
            const dimension = productSizeMap[type] || "1220X2800";

            // Découper en pages de 6 produits (3 cols x 2 rows)
            for (let i = 0; i < items.length; i += 6) {
                const chunk = items.slice(i, i + 6);
                
                let gridHtml = '';
                chunk.forEach(p => {
                    const ep = p.epaisseur || '18 mm';
                    // Use Flexbox instead of CSS Grid to prevent html2canvas blank rendering bugs
                                const isSupabase = p.surface_image_url && p.surface_image_url.includes('supabase.co');
                                const crossOriginAttr = isSupabase ? 'crossorigin="anonymous"' : '';
                                gridHtml += `
                        <div style="display:flex; flex-direction:column; width:calc(33.333% - 10mm); margin-bottom: 20mm; background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); box-sizing: border-box; font-family: 'Montserrat', sans-serif;">
                            <!-- En-tête de la carte -->
                            <div style="padding: 16px; border-bottom: 1px solid #f3f4f6; background-color: #f9fafb; display: flex; justify-content: space-between; align-items: flex-start; height: 75px; box-sizing: border-box;">
                                <div>
                                    <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: #111827;">${p.code}</h3>
                                    <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${p.label}</p>
                                </div>
                                <span style="display: inline-block; padding: 4px 10px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 9999px; font-size: 10px; font-weight: 700; color: #374151;">
                                    ${ep}
                                </span>
                            </div>
                            <!-- Image Zone -->
                            <div style="width: 100%; position: relative;">
                                <div style="padding-top: 100%;"></div>
                                <img ${crossOriginAttr} src="${p.surface_image_url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;">
                            </div>
                        </div>
                    `;
                });

                pagesHtml.push(`
                    <div class="pdf-page" style="width: 210mm; height: 297mm; background: linear-gradient(135deg, #fdfdfd 0%, #ececec 100%); position: relative; padding: 20mm; box-sizing: border-box; page-break-after: always; overflow: hidden;">
                        <!-- Header -->
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; height: 30mm; margin-bottom: 10mm;">
                            <img src="Assets/Logo-Gadimat02.png" style="height:45px; object-fit:contain;">
                            ${brandLogoSrc ? `<img src="${brandLogoSrc}" style="height:45px; object-fit:contain;">` : `<div style="font-family:'Montserrat', sans-serif; font-weight:bold; font-size:24px;">${brand}</div>`}
                        </div>
                        
                        <!-- Grid 3x2 using Flexbox -->
                        <div style="display:flex; flex-wrap:wrap; gap:15mm; justify-content:flex-start;">
                            ${gridHtml}
                        </div>

                        <!-- Footer Dimension -->
                        <div style="position:absolute; bottom: 20mm; left:0; right:0; text-align:center;">
                            <div style="font-family:'Montserrat', sans-serif; font-size:36px; font-weight:800; letter-spacing:4px; color:#222;">
                                ${dimension}
                            </div>
                        </div>
                    </div>
                `);
            }
        });

        const fullHtml = `
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap" rel="stylesheet">
            <div style="width: 210mm; background-color: white;">
                ${pagesHtml.join('')}
            </div>
        `;

        // Create overlay to hide the rendering process but keep it in the DOM
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = '#ffffff';
        overlay.style.zIndex = '99999';
        overlay.style.overflow = 'hidden';

        const message = document.createElement('div');
        message.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><i class="fa-solid fa-spinner fa-spin" style="font-size:40px;color:#2563eb;margin-bottom:20px;"></i><h2 style="font-family:sans-serif;font-size:24px;color:#1f2937;">Génération du PDF en cours...</h2><p style="font-family:sans-serif;color:#6b7280;margin-top:10px;">Veuillez patienter quelques secondes.</p></div>';
        message.style.position = 'absolute';
        message.style.top = '0';
        message.style.left = '0';
        message.style.width = '100%';
        message.style.height = '100%';
        message.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        message.style.zIndex = '2';

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '210mm';
        container.style.zIndex = '1';
        container.innerHTML = fullHtml;

        overlay.appendChild(container);
        overlay.appendChild(message);
        document.body.appendChild(overlay);

        // Wait for all images to fully load before capturing
        const images = Array.from(container.querySelectorAll('img'));
        await Promise.all(images.map(img => new Promise((resolve) => {
            if (img.complete) return resolve();
            img.onload = resolve;
            img.onerror = resolve; // Ignore errors to prevent freezing
        })));
        
        // Extra delay to ensure fonts and layout are computed
        await new Promise(resolve => setTimeout(resolve, 800));

        // 4. Options html2pdf
        const opt = {
            margin:       0,
            filename:     `Catalogue_Gadimat_${new Date().toISOString().split('T')[0]}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true, 
                letterRendering: true,
                allowTaint: false,
                scrollY: 0
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // 5. Générer
        await html2pdf().set(opt).from(container).save();
        
        // Nettoyer
        document.body.removeChild(overlay);
        setLoading(false);
        showToast('Export PDF réussi !');
    } catch (error) {
        console.error("PDF Export error:", error);
        setLoading(false);
        showToast("Erreur lors de la génération du PDF.", "error");
    }
});

// --- UTILS ---
function setLoading(isLoading) {
    const saveSpinner = document.getElementById('saveSpinner');
    const saveBtnText = document.getElementById('saveBtnText');
    
    if (isLoading) {
        saveBtn.disabled = true;
        cancelBtn.disabled = true;
        saveBtn.classList.add('opacity-75', 'cursor-not-allowed');
        saveSpinner.classList.remove('hidden');
        saveBtnText.textContent = 'Enregistrement...';
    } else {
        saveBtn.disabled = false;
        cancelBtn.disabled = false;
        saveBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        saveSpinner.classList.add('hidden');
        saveBtnText.textContent = 'Enregistrer';
    }
}

function showError(message) {
    formError.textContent = message;
    formError.classList.remove('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastMessage.textContent = message;
    
    if (type === 'error') {
        toastIcon.className = "fa-solid fa-circle-exclamation text-red-400";
        toast.classList.remove('bg-gray-900');
        toast.classList.add('bg-red-900');
    } else {
        toastIcon.className = "fa-solid fa-check-circle text-green-400";
        toast.classList.add('bg-gray-900');
        toast.classList.remove('bg-red-900');
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}
