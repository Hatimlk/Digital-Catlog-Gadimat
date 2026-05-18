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
const viewTableBtn = document.getElementById('viewTableBtn');
const viewGridBtn = document.getElementById('viewGridBtn');
const brandFilter = document.getElementById('brandFilter');
const tableContainer = document.getElementById('tableContainer');
const gridContainer = document.getElementById('gridContainer');
const productsTableBody = document.getElementById('productsTableBody');
const loadingIndicator = document.getElementById('loadingIndicator');
const openModalBtn = document.getElementById('openModalBtn');
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
let currentView = 'table'; // 'table' or 'grid'
let currentBrandFilter = 'ALL';

// --- FILTER & VIEW TOGGLE LOGIC ---
brandFilter.addEventListener('change', (e) => {
    currentBrandFilter = e.target.value;
    renderProducts(products);
});

viewTableBtn.addEventListener('click', () => switchView('table'));
viewGridBtn.addEventListener('click', () => switchView('grid'));

function switchView(view) {
    currentView = view;
    if (view === 'table') {
        // UI Buttons
        viewTableBtn.classList.replace('text-gray-400', 'text-gray-800');
        viewTableBtn.classList.add('bg-gray-100');
        viewGridBtn.classList.replace('text-gray-800', 'text-gray-400');
        viewGridBtn.classList.remove('bg-gray-100');
        // Containers
        tableContainer.classList.remove('hidden');
        gridContainer.classList.add('hidden');
    } else {
        // UI Buttons
        viewGridBtn.classList.replace('text-gray-400', 'text-gray-800');
        viewGridBtn.classList.add('bg-gray-100');
        viewTableBtn.classList.replace('text-gray-800', 'text-gray-400');
        viewTableBtn.classList.remove('bg-gray-100');
        // Containers
        gridContainer.classList.remove('hidden');
        tableContainer.classList.add('hidden');
    }
}

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

// --- RENDER DATA ---
function renderProducts(data) {
    productsTableBody.innerHTML = '';
    gridContainer.innerHTML = '';
    
    // Apply Filter
    const filteredData = currentBrandFilter === 'ALL' 
        ? data 
        : data.filter(p => p.brand && p.brand.toUpperCase() === currentBrandFilter);
    
    if (filteredData.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    Aucun produit trouvé pour cette catégorie.
                </td>
            </tr>
        `;
        gridContainer.innerHTML = `
            <div class="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
                Aucun produit trouvé pour cette catégorie.
            </div>
        `;
        return;
    }

    filteredData.forEach(product => {
        const surfaceImgSrc = product.surface_image_url || '';
        const hasImg = !!product.surface_image_url;
        
        const surfaceImgTable = hasImg 
            ? `<img src="${surfaceImgSrc}" class="w-12 h-12 object-cover rounded-md border border-gray-200">`
            : `<div class="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400"><i class="fa-solid fa-image"></i></div>`;

        const surfaceImgGrid = hasImg
            ? `<img src="${surfaceImgSrc}" class="w-full h-48 object-cover">`
            : `<div class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400"><i class="fa-solid fa-image text-3xl"></i></div>`;

        const statusBadge = product.is_hidden 
            ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Masqué</span>`
            : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponible</span>`;

        const hideIcon = product.is_hidden ? "fa-eye" : "fa-eye-slash";
        const hideTitle = product.is_hidden ? "Afficher le produit" : "Masquer le produit";
        const hideColor = product.is_hidden ? "text-green-600 hover:text-green-900 hover:bg-green-50" : "text-orange-600 hover:text-orange-900 hover:bg-orange-50";

        // 1. Table Row
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${surfaceImgTable}</td>
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

        // 2. Grid Card
        const card = document.createElement('div');
        card.className = "bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col relative group";
        
        // Add a semi-transparent overlay if hidden
        const overlay = product.is_hidden ? `<div class="absolute inset-0 bg-white/40 z-10 pointer-events-none"></div>` : '';
        
        card.innerHTML = `
            ${overlay}
            <div class="relative">
                ${surfaceImgGrid}
                <div class="absolute top-3 right-3 z-20">
                    ${statusBadge}
                </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">${product.brand}</span>
                        <h3 class="text-lg font-bold text-gray-900 mt-1">${product.code}</h3>
                    </div>
                    <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">${product.type}</span>
                </div>
                <p class="text-gray-600 font-medium">${product.label}</p>
                ${product.epaisseur ? `<p class="text-gray-500 text-sm mt-1">Épaisseur: ${product.epaisseur}</p>` : ''}
                
                <div class="mt-auto pt-4 flex justify-between border-t border-gray-100 relative z-20">
                    <button onclick="toggleHideProduct('${product.id}', ${!!product.is_hidden})" class="${hideColor} p-2 rounded-md transition-colors flex items-center gap-2 text-sm font-medium" title="${hideTitle}">
                        <i class="fa-solid ${hideIcon}"></i>
                    </button>
                    <div class="flex gap-2">
                        <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-colors" title="Modifier">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors" title="Supprimer">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
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

// --- PDF EXPORT ---
document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);

async function exportToPDF() {
    const exportBtn = document.getElementById('exportPdfBtn');
    exportBtn.disabled = true;
    exportBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-gray-400"></i> Génération...';

    const filteredData = currentBrandFilter === 'ALL'
        ? products
        : products.filter(p => p.brand && p.brand.toUpperCase() === currentBrandFilter);

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pageW = doc.internal.pageSize.getWidth();   // 297
        const pageH = doc.internal.pageSize.getHeight();  // 210

        const today = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
        const filterLabel = currentBrandFilter === 'ALL' ? 'Toutes les marques' : currentBrandFilter;

        // Layout constants
        const margin = 12;
        const cols = 4;
        const gap = 4;
        const headerH = 22;
        const startY = headerH + 6;
        const cardW = (pageW - 2 * margin - (cols - 1) * gap) / cols;
        const imgH = 46;
        const infoH = 34;
        const cardH = imgH + infoH;
        const rowGap = 5;
        const rowsPerPage = 2;

        // Pre-fetch all images in parallel
        const imageCache = {};
        await Promise.all(filteredData.map(async (p) => {
            if (p.surface_image_url) {
                imageCache[p.id] = await fetchImageAsDataUrl(p.surface_image_url);
            }
        }));

        function drawHeader() {
            doc.setFillColor(15, 23, 42);
            doc.rect(0, 0, pageW, headerH, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('GADIMAT', margin, 13);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(148, 163, 184);
            doc.text('Catalogue produits', margin, 18.5);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text(today, pageW - margin, 13, { align: 'right' });
            doc.setTextColor(148, 163, 184);
            doc.text(`${filterLabel} — ${filteredData.length} produit(s)`, pageW - margin, 18.5, { align: 'right' });
        }

        function drawCard(product, x, y) {
            // Card background + border
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(229, 231, 235);
            doc.setLineWidth(0.3);
            doc.roundedRect(x, y, cardW, cardH, 2, 2, 'FD');

            // Image
            const imgData = imageCache[product.id];
            if (imgData) {
                try {
                    doc.addImage(imgData, getImageFormat(imgData), x, y, cardW, imgH);
                    // Redraw border on top of image
                    doc.setDrawColor(229, 231, 235);
                    doc.setLineWidth(0.3);
                    doc.roundedRect(x, y, cardW, cardH, 2, 2, 'S');
                } catch (_) {
                    drawPlaceholder(x, y);
                }
            } else {
                drawPlaceholder(x, y);
            }

            // Info area
            let ty = y + imgH + 4;

            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text((product.brand || '').toUpperCase(), x + 3, ty);
            ty += 4.5;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(17, 24, 39);
            doc.text(product.code || '', x + 3, ty);
            ty += 4.5;

            doc.setFontSize(7);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(75, 85, 99);
            const labelLine = doc.splitTextToSize(product.label || '', cardW - 6)[0];
            doc.text(labelLine, x + 3, ty);
            ty += 4;

            doc.setFontSize(6.5);
            doc.setTextColor(107, 114, 128);
            const meta = [product.type, product.epaisseur].filter(Boolean).join(' · ');
            doc.text(meta, x + 3, ty);
            ty += 4.5;

            // Status badge
            const hidden = product.is_hidden;
            doc.setFillColor(...(hidden ? [254, 226, 226] : [220, 252, 231]));
            doc.roundedRect(x + 3, ty - 3, 20, 4.5, 1, 1, 'F');
            doc.setFontSize(6);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...(hidden ? [153, 27, 27] : [21, 128, 61]));
            doc.text(hidden ? 'Masqué' : 'Disponible', x + 3 + 10, ty + 0.2, { align: 'center' });
        }

        function drawPlaceholder(x, y) {
            doc.setFillColor(243, 244, 246);
            doc.rect(x, y, cardW, imgH, 'F');
            doc.setTextColor(156, 163, 175);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('—', x + cardW / 2, y + imgH / 2, { align: 'center' });
        }

        // Render all cards across pages
        let currentPage = 0;
        filteredData.forEach((product, i) => {
            const pageIndex = Math.floor(i / (cols * rowsPerPage));
            const posInPage = i % (cols * rowsPerPage);
            const col = posInPage % cols;
            const row = Math.floor(posInPage / cols);

            if (pageIndex > currentPage) {
                doc.addPage();
                currentPage = pageIndex;
                drawHeader();
            } else if (i === 0) {
                drawHeader();
            }

            const x = margin + col * (cardW + gap);
            const y = startY + row * (cardH + rowGap);
            drawCard(product, x, y);
        });

        // Page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(7);
            doc.setTextColor(156, 163, 175);
            doc.text(`${i} / ${pageCount}`, pageW / 2, pageH - 5, { align: 'center' });
        }

        const filename = `gadimat-catalogue-${currentBrandFilter.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(filename);
        showToast('PDF exporté avec succès.');
    } catch (err) {
        console.error('PDF export error:', err);
        showToast("Erreur lors de l'export PDF.", 'error');
    } finally {
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fa-solid fa-file-pdf text-red-500"></i> Exporter PDF';
    }
}

async function fetchImageAsDataUrl(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch {
        return null;
    }
}

function getImageFormat(dataUrl) {
    const mime = dataUrl.split(';')[0].split(':')[1];
    if (mime === 'image/png') return 'PNG';
    if (mime === 'image/webp') return 'WEBP';
    return 'JPEG';
}

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
