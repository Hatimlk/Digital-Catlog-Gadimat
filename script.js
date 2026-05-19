const { createElement: h, useEffect, useRef, useState } = React;
const gadimatLogo = "Assets/Logo-Gadimat02.png";
const productSizeMap = {
  "MDF LAM": "2100 mm x 2800 mm",
  "HIGH GLOSS": "1220 mm x 2800 mm",
  "SUPRAMAT": "1220 mm x 2800 mm",
};
function getProductSize(type) {
  return productSizeMap[type] || "1220 mm x 2800 mm";
}
const brandLogos = {
  AGT: "Assets/Logos/AGT-logo.png",
  CAMSAN: "Assets/Logos/Camsan-logo.png",
  VENNI: "Assets/Logos/Venni-logo.png",
  YILDIZ: "Assets/Logos/Yildiz-logo.png",
  KRONOSPAN: "Assets/Logos/Kronospan-logo.png",
};

const catalogData = {
  brands: [
    { name: "AGT", label: "Design contemporain" },
    { name: "CAMSAN", label: "Textures équilibrées" },
    { name: "VENNI", label: "Palette expressive" },
    { name: "YILDIZ", label: "Finitions architecturales" },
    { name: "KRONOSPAN", label: "Surface technique" },
  ],
  types: {
    "MDF LAM": {
      description:
        "Des surfaces chaleureuses et structurées, parfaites pour le mobilier intérieur, le dressing et les aménagements sur mesure.",
      features: [
        "Texture naturelle et decorative",
        "Grande polyvalence pour l'agencement",
        "Excellent rendu sur tons bois et unis",
      ],
      materialLabel: "",
      materialImage: "Assets/MDF_exemplaire.png",
      materialBackground:
        "linear-gradient(120deg, #6a4429, #b88558, #3c2618)",
    },
    "HIGH GLOSS": {
      description:
        "Une finition très lumineuse et réfléchissante, idéale pour des cuisines modernes et des espaces haut de gamme.",
      features: [
        "Effet miroir premium",
        "Sens de la lumière et profondeur visuelle",
        "Parfait pour cuisines et meubles design",
      ],
      materialLabel: "",
      materialImage: "Assets/HG_exemplaire.png",
      materialBackground:
        "linear-gradient(135deg, #3c342d 0%, #b9b9b5 18%, #f4eee4 36%, #82756a 60%, #ece6db 80%, #53453c 100%)",
    },
    SUPRAMAT: {
      description:
        "Une matière ultra mate et tactile qui offre un rendu sobre, contemporain et très architectural.",
      features: [
        "Toucher soyeux et moderne",
        "Esthétique minimaliste premium",
        "Excellent pour concepts boutiques et mobilier chic",
      ],
      materialLabel: "",
      materialImage: "Assets/SUPMAT_exemplaire.png",
      materialBackground:
        "linear-gradient(135deg, #47413e 0%, #71675f 30%, #988b80 58%, #60554f 100%)",
    },
  },
  products: {
    "MDF LAM": [],
    "HIGH GLOSS": [],
    SUPRAMAT: [],
  },
};

const brandTypeMap = {
  AGT: ["MDF LAM", "HIGH GLOSS", "SUPRAMAT"],
  KRONOSPAN: ["MDF LAM"],
  CAMSAN: ["MDF LAM", "HIGH GLOSS"],
  YILDIZ: ["MDF LAM"],
  VENNI: ["HIGH GLOSS"],
};

const agtAssetCatalog = {
  "MDF LAM": [
    { code: "L003", label: "NOIR", surfaceFile: "L003-BLACK.png", previewFile: "L003-IMG.png" },
    { code: "L004", label: "ANTHRACITE", surfaceFile: "L004-ANTHRACITE.png", previewFile: "L004-IMG.png" },
    { code: "L018", label: "LARA FONCE", surfaceFile: "L018-DARK LARA.png", previewFile: "L018-IMG.png" },
    { code: "L019", label: "TECK", surfaceFile: "L019-TEAK.png", previewFile: "L019-IMG.png" },
    { code: "L020", label: "TABAC", surfaceFile: "L020-TOBACCO.png", previewFile: "L020-IMG.png" },
    { code: "L030", label: "BAMBOU", surfaceFile: "L030-BAMBOO.png", previewFile: "L030-IMG.png" },
    { code: "L031", label: "NOYER CLAIR", surfaceFile: "L031-LIGHT WALNUT.png", previewFile: "L031-IMG.png" },
    { code: "L032", label: "CHENE ALLEMAND", surfaceFile: "L032-GERMAN OAK.png", previewFile: "L032-IMG.png" },
    { code: "L034", label: "CHENE DORE", surfaceFile: "L034-GOLDEN OAK.png", previewFile: "L034-IMG.png" },
    { code: "L051", label: "CORSICO", surfaceFile: "L051-CORSICO.png", previewFile: "L051-IMG.png" },
    { code: "L053", label: "MONTBELLO", surfaceFile: "L053-MONTBELLO.png", previewFile: "L053-IMG.png" },
    { code: "L126", label: "TOSKANA", surfaceFile: "L126-TOSKANA.png", previewFile: "L126-IMG.png" },
    { code: "L127", label: "PALERMO", surfaceFile: "L127-PALERMO.png", previewFile: "L127-IMG.png" },
    { code: "L133", label: "PERA", surfaceFile: "L133-PERA.png", previewFile: "L133-IMG.png" },
    { code: "L138", label: "GRIS MARMARA", surfaceFile: "L138-MARMARA GREY.png", previewFile: "L138-IMG.png" },
    { code: "L140", label: "MARMARA ETRA", surfaceFile: "L140-MARMARA ETRA.png", previewFile: "L140-IMG.png" },
    { code: "L144", label: "GRIS SAPHIR", surfaceFile: "L144-SAPHIR GREY.png", previewFile: "L144-IMG.png" },
    { code: "L145", label: "GRAND BEIGE", surfaceFile: "L145-GRAND BEIGE.png", previewFile: "L145-IMG.png" },
    { code: "L146", label: "ANTHRACITE FONCE", surfaceFile: "L146-DARK ANTHRACITE.png", previewFile: "L146-IMG.png" },
    { code: "L152", label: "CREME CAPPADOCE", surfaceFile: "L152-CAPPADOCIA CREAM.png", previewFile: "L152-IMG.png" },
  ],
  "HIGH GLOSS": [
    { code: "3006", label: "GALAXY BL", surfaceFile: "3006-GALAXY BL.png", previewFile: "3006-IMG.png" },
    { code: "3030", label: "MARBRE BLANC TOROS", surfaceFile: "3030-TOROS WHITE MARBLE.jpg", previewFile: "3030-IMG.png" },
    { code: "3033", label: "GRIS GALAXY", surfaceFile: "3033-GALAXY GREY.png", previewFile: "3033-IMG.png" },
    { code: "387", label: "GRIS CACHEMIRE MAT", surfaceFile: "387-CASHMERE GREY MT.png", previewFile: "387-IMG.png" },
    { code: "389", label: "TOLEDO FONCE MAT", surfaceFile: "389-TOLEDO DARK MAT.png", previewFile: "389-IMG.png" },
    { code: "391", label: "INOX PICASSO MAT", surfaceFile: "391-PICASSO INOX MAT.png", previewFile: "391-IMG.png" },
    { code: "394", label: "ORME METALLIQUE", surfaceFile: "394-METALLIC ELM.png", previewFile: "394-IMG.png" },
    { code: "6015", label: "GRIS DIAMANT", surfaceFile: "6015-DIAMOND GREY.png", previewFile: "6015-IMG.png" },
    { code: "6016", label: "GRIS ONYX", surfaceFile: "6016-ONYX GREY.png", previewFile: "6016-IMG.png" },
    { code: "6018", label: "MARBRE TOROS BLANC", surfaceFile: "6018-TOROS WT MARBLE.png", previewFile: "6018-IMG.png" },
    { code: "6019", label: "MARBRE NOIR TOROS", surfaceFile: "6019-TOROS BLACK MARBLE.png", previewFile: "6019-IMG.png" },
    { code: "6022", label: "ANTHRACITE", surfaceFile: "6022-ANTHRACITE.png", previewFile: "6022-IMG.png" },
    { code: "603", label: "ORME METALLIQUE", surfaceFile: "603-METALLIC ELM.png", previewFile: "603-IMG.png" },
    { code: "604", label: "EBENE", surfaceFile: "604-EBONY.png", previewFile: "604-IMG.png" },
    { code: "617", label: "OREGON", surfaceFile: "617-OREGON.png", previewFile: "617-IMG.png" },
    { code: "640", label: "BRUME MIEL GALAXY", surfaceFile: "640-GALAXY HONEY MIST.png", previewFile: "640-IMG.png" },
    { code: "686", label: "LIN FONCE", surfaceFile: "686-DARK LINEN.png", previewFile: "686-IMG.png" },
    { code: "699", label: "BLANC METALLIQUE", surfaceFile: "699-BLANC METALIC.png", previewFile: "699-IMG.png" },
    { code: "723", label: "NOIR DOUX", surfaceFile: "723-SOFT BLACK.png", previewFile: "723-IMG.png" },
    { code: "734", label: "BLANC DOUX", surfaceFile: "734-SOFT WHITE.png", previewFile: "734-IMG.png" },
    { code: "735", label: "VERT DOUX", surfaceFile: "735-SOFT TR GREEN.png", previewFile: "735-IMG.png" },
    { code: "736", label: "BLEU DOUX", surfaceFile: "736-SOFT BLUE.png", previewFile: "736-IMG.png" },
    { code: "737", label: "SIENA BOIS DOUX", surfaceFile: "737-SOFT SIENA WD.png", previewFile: "737-IMG.png" },
    { code: "878", label: "NOUVELLE VISION", surfaceFile: "878-NEW VISION.png", previewFile: "878-IMG.png" },
  ],
  SUPRAMAT: [
    { code: "3009", label: "GALAXY NOIR", surfaceFile: "3009-GALAXY BLACK.png", previewFile: "3009-IMG.png" },
    { code: "3011", label: "LONDON BLUE", surfaceFile: "3011-LONDON BLUE.png", previewFile: "3011-IMG.png" },
    { code: "3012", label: "SNOW WHITE", surfaceFile: "3012-SNOW WHITE.png", previewFile: "3012-IMG.png" },
    { code: "3014", label: "CLOUD GREY", surfaceFile: "3014-CLOUD GREY.png", previewFile: "3014-IMG.png" },
    { code: "3017", label: "GRIS INTEMPOREL", surfaceFile: "3017-TIMELESS GREY.jpg", previewFile: "3017-IMG.webp" },
    { code: "3031", label: "MARBRE NOIR TOROS", surfaceFile: "3031-TOROS BLACK MARBLE.png", previewFile: "3031-IMG.png" },
  ],
};

function getAssetLabelFromFilename(filename, code, fallbackLabel) {
  if (!filename) {
    return fallbackLabel || code;
  }

  const baseName = filename.replace(/\.[^.]+$/, "");
  const prefix = `${code}-`;
  return baseName.startsWith(prefix) ? baseName.slice(prefix.length) : fallbackLabel || baseName;
}

const brandFolderMap = {
  AGT: { "MDF LAM": "MDF" },
  Kronospan: { "MDF LAM": "MDF" },
  YILDIZ: { "MDF LAM": "MDF" },
};

const brandAssetCatalogs = {
  AGT: agtAssetCatalog,
  Camsan: {
    "MDF LAM": [
      { code: "FG-50", label: "BAMBU", surfaceFile: "FG-50 BAMBU.png", previewFile: "FG-50-IMG.png" },
      { code: "FG-52", label: "CORDOBA", surfaceFile: "FG-52 CORDOBA.png", previewFile: "FG-52-IMG.png" },
      { code: "FG-54", label: "SONOMA MESE", surfaceFile: "FG-54 SONOMA MESE.png", previewFile: "FG-54-IMG.png" },
      { code: "FG-55", label: "LEFKAS MESE", surfaceFile: "FG-55 LEFKAS MESE.png", previewFile: "FG-55-IMG.png" },
      { code: "FG-59", label: "FREZE MESE", surfaceFile: "FG-59 FREZE MESE.png", previewFile: "FG-59-IMG.png" },
      { code: "FG-63", label: "AKCAM", surfaceFile: "FG-63 AKCAM.png", previewFile: "FG-63-IMG.png" },
      { code: "FG-65", label: "YERLI CEVIZ", surfaceFile: "FG-65 YERLI CEVIZ.png", previewFile: "FG-65-IMG.png" },
      { code: "FG-77", label: "TOROS MESE", surfaceFile: "FG-77 TOROS MESE.png", previewFile: "FG-77-IMG.png" },
      { code: "FG-80", label: "MODENA", surfaceFile: "FG-80 MODENA.png", previewFile: "FG-80-IMG.png" },
      { code: "FG-82", label: "NIAGARA", surfaceFile: "FG-82 NIAGARA.png", previewFile: "FG-82-IMG.png" },
      { code: "FG-86", label: "ANTIK DARK", surfaceFile: "FG-86 ANTIK DARK.png", previewFile: "FG-86-IMG.png" },
      { code: "MR-33", label: "MERKUR", surfaceFile: "MR-33 MERKUR.png", previewFile: "MR-33-IMG.png" },
      { code: "MR-37", label: "CALACATTA", surfaceFile: "MR-37 CALACATTA.png", previewFile: "MR-37-IMG.png" },
      { code: "UC-05", label: "BEIGE", surfaceFile: "UC-05 BEIGE.png", previewFile: "UC-05-IMG.png" },
      { code: "UC-11", label: "KIRMIZI", surfaceFile: "UC-11 KIRMIZI.png", previewFile: "UC-11-IMG.png" },
      { code: "UC-12", label: "MAVI", surfaceFile: "UC-12 MAVI.png", previewFile: "UC-12-IMG.png" },
    ],
    "HIGH GLOSS": [
      { code: "AH-03", label: "NOY MILANO", surfaceFile: "AH-03 NOY MILANO.png", previewFile: "AH-03-IMG.png" },
      { code: "HL-15", label: "EFES ANTIK BL", surfaceFile: "HL-15 EFES ANTIK BL.png", previewFile: "HL-15-IMG.png" },
      { code: "SL-01", label: "HG WHITE", surfaceFile: "SL-01 HG WHITE.png", previewFile: "SL-01-IMG.png" },
      { code: "SL-07", label: "MURDUM SL", surfaceFile: "SL-07 MURDUM SL.png", previewFile: "SL-07-IMG.png.png" },
    ],
  },
  Kronospan: {
    "MDF LAM": [
      { code: "K003", label: "GOLD CRAFT", surfaceFile: "K003 GOLD CRAFT.png", previewFile: "K003-IMG.png" },
      { code: "K114", label: "BLANC", surfaceFile: "K114 BLANC.png", previewFile: "K114-IMG.png" },
      { code: "K164", label: "ANTHRACITE", surfaceFile: "K164 ANTHRACITE.png", previewFile: "K164-IMG.png" },
      { code: "K2738", label: "TORRO CREMONA OAK", surfaceFile: "K2738 TORRO CREMONA OAK.png", previewFile: "K2738-IMG.png" },
      { code: "K365", label: "COAST EVOKE", surfaceFile: "K365 COAST EVOKE.png", previewFile: "K365-IMG.png" },
      { code: "K519", label: "MOUSE GREY", surfaceFile: "K519 MOUSE GREY.png", previewFile: "K519-IMG.png" },
      { code: "K535", label: "GOLD BAROQUE", surfaceFile: "K535 GOLD BAROQUE.png", previewFile: "K535-IMG.png" },
      { code: "K5981", label: "CASHMERE", surfaceFile: "K5981 CASHMERE.png", previewFile: "K5981-IMG.png" },
      { code: "K8685", label: "SNOW WHITE", surfaceFile: "K8685 SNOW WHITE.png", previewFile: "K8685-IMG.png" },
    ],
  },
  VENNI: {
    "HIGH GLOSS": [
      { code: "21", label: "TOROS MARBLE", surfaceFile: "21-TOROS MARBLE.png", previewFile: "21-IMG.png" },
    ],
  },
  YILDIZ: {
    "MDF LAM": [
      { code: "54A", label: "BRAZILIAN WALNUT", surfaceFile: "54A BRAZILIAN WALNUT.png", previewFile: "54A-IMG.png" },
      { code: "O55", label: "ITALIAN WALNUT", surfaceFile: "O55 ITALIAN WALNUT.png", previewFile: "O55-IMG.png" },
    ],
  },
};

function makeBrandProduct(brand, type, entry) {
  const item = typeof entry === "string" ? { code: entry, label: entry } : entry;
  const folderMap = brandFolderMap[brand] || {};
  const folder = folderMap[type] || type;
  const brandFolder = brand;
  const codeFolder = `Assets/${brandFolder}/${folder}/Code Produit`;
  const showroomFolder = `Assets/${brandFolder}/${folder}/Showroom`;
  const typeData = catalogData.types[type];
  const assetLabel = getAssetLabelFromFilename(item.surfaceFile, item.code, item.label);

  return {
    brand: brand.toUpperCase(),
    code: item.code,
    name: `${item.code} - ${assetLabel}`,
    description: assetLabel || "",
    aspect: typeData.materialLabel,
    usage: assetLabel || `Reference ${brand}`,
    colors: [],
    background: typeData.materialBackground,
    surfaceImage: `${codeFolder}/${item.surfaceFile}`,
    previewImage: item.previewFile ? `${showroomFolder}/${item.previewFile}` : null,
  };
}

Object.entries(brandAssetCatalogs).forEach(([brand, catalog]) => {
  Object.keys(catalog).forEach((type) => {
    const brandProducts = catalog[type].map((entry) => makeBrandProduct(brand, type, entry));
    const existing = catalogData.products[type] || [];
    const brandKey = brand.toUpperCase();
    const otherProducts = existing.filter((product) => product.brand !== brandKey);
    catalogData.products[type] = [...brandProducts, ...otherProducts];
  });
});

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function getProductReference(product) {
  return product.code || product.name;
}

function getProductColorAccentStyle(product) {
  if (product.surfaceImage) {
    return {
      backgroundImage: `url("${product.surfaceImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  if (product.colors && product.colors.length > 0) {
    return { background: product.colors[0] };
  }

  return { background: product.background };
}

function getAvailableTypesForBrand(brand) {
  return brandTypeMap[brand] || [];
}

function isBrandTypeAllowed(brand, type) {
  return getAvailableTypesForBrand(brand).includes(type);
}

function renderGadimatHeader(title, text) {
  const hasCopy = Boolean(title || text);

  return h(
    "section",
    { className: "brand-masthead reveal" },
    h(
      "div",
      { className: `brand-masthead__main ${hasCopy ? "" : "brand-masthead__main--logo-only"}`.trim() },
      h(
        "div",
        { className: "brand-masthead__identity" },
        h("img", {
          className: "brand-masthead__logo",
          src: gadimatLogo,
          alt: "Logo Gadimat",
        }),
        h("span", { className: "brand-masthead__portfolio" }, "PORTFOLIO STOCK")
      ),
      hasCopy
        ? h(
          "div",
          { className: "brand-masthead__copy" },
          h("p", { className: "brand-masthead__eyebrow" }, "Catalogue Gadimat"),
          h("h1", { className: "brand-masthead__title" }, title),
          h("p", { className: "brand-masthead__text" }, text)
        )
        : null
    )
  );
}

function buildProductHash(product, type) {
  return `#product/${encodeURIComponent(product.brand)}/${encodeURIComponent(type)}/${encodeURIComponent(getProductReference(product))}`;
}

function parseProductHash(hash) {
  if (!hash.startsWith("#product/")) {
    return null;
  }

  const parts = hash.slice("#product/".length).split("/").map(decodeURIComponent);

  if (parts.length < 3) {
    return null;
  }

  return {
    brand: parts[0],
    type: parts[1],
    reference: parts.slice(2).join("/"),
  };
}

function findProductByRoute(route) {
  if (!route || !catalogData.products[route.type] || !isBrandTypeAllowed(route.brand, route.type)) {
    return null;
  }

  return (
    catalogData.products[route.type].find(
      (product) =>
        product.brand === route.brand && getProductReference(product) === route.reference
    ) || null
  );
}

function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

function useRevealObserver(dependencies) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal:not(.is-visible)");
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, dependencies);
}

function App() {
  const [activeBrand, setActiveBrand] = useState("AGT");
  const [activeType, setActiveType] = useState("MDF LAM");
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [detailRoute, setDetailRoute] = useState(() => parseProductHash(window.location.hash));
  const showroomCardRef = useRef(null);
  const shouldScrollToShowroomRef = useRef(false);
  const brandSliderRef = useRef(null);
  const previewTouchRef = useRef(null);

  const availableTypes = getAvailableTypesForBrand(activeBrand);
  const typeData = catalogData.types[activeType];
  const products = (catalogData.products[activeType] || [])
    .filter(product => product.brand === activeBrand)
    .sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true, sensitivity: 'base' }));
  const safeProductIndex = products.length > 0 ? Math.min(activeProductIndex, products.length - 1) : 0;
  const activeProduct = products[safeProductIndex] || null;
  const detailProduct = findProductByRoute(detailRoute);
  const detailTypeData = detailRoute ? catalogData.types[detailRoute.type] : null;
  const previewSurfaceStyle = activeProduct && activeProduct.surfaceImage
    ? {
      backgroundImage: `url("${activeProduct.surfaceImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : activeProduct
      ? { background: activeProduct.background }
      : { background: typeData.materialBackground };

  useRevealObserver([
    activeBrand,
    activeType,
    detailRoute ? `${detailRoute.brand}-${detailRoute.type}-${detailRoute.reference}` : "catalog",
  ]);

  useEffect(() => {
    function handleHashChange() {
      setDetailRoute(parseProductHash(window.location.hash));
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (safeProductIndex !== activeProductIndex) {
      setActiveProductIndex(safeProductIndex);
    }
  }, [activeProductIndex, safeProductIndex]);

  useEffect(() => {
    if (!shouldScrollToShowroomRef.current || !showroomCardRef.current) {
      return;
    }

    shouldScrollToShowroomRef.current = false;

    window.requestAnimationFrame(() => {
      showroomCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [activeProductIndex, activeBrand, activeType]);

  useEffect(() => {
    if (window.innerWidth > 720 || !brandSliderRef.current) {
      return;
    }

    const activeCard = brandSliderRef.current.querySelector(".brand-card.is-active");
    activeCard?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeBrand]);

  useEffect(() => {
    if (!isBrandTypeAllowed(activeBrand, activeType) && availableTypes.length > 0) {
      setActiveType(availableTypes[0]);
      setActiveProductIndex(0);
    }
  }, [activeBrand, activeType, availableTypes]);

  useEffect(() => {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
      el.style.transitionDelay = "0ms";
      el.classList.add("is-visible");
    });
  }, [safeProductIndex]);

  useEffect(() => {
    if (!activeProduct) return;
    preloadImage(activeProduct.surfaceImage);
    preloadImage(activeProduct.previewImage);
    const prev = products[safeProductIndex - 1];
    const next = products[safeProductIndex + 1];
    if (prev) { preloadImage(prev.surfaceImage); preloadImage(prev.previewImage); }
    if (next) { preloadImage(next.surfaceImage); preloadImage(next.previewImage); }
  }, [safeProductIndex, activeBrand, activeType]);

  useEffect(() => {
    if (!detailRoute || !detailProduct) {
      return;
    }

    if (detailRoute.brand !== activeBrand) {
      setActiveBrand(detailRoute.brand);
    }

    if (detailRoute.type !== activeType) {
      setActiveType(detailRoute.type);
    }

    const productIndex = catalogData.products[detailRoute.type]
      .filter((product) => product.brand === detailRoute.brand)
      .findIndex((product) => getProductReference(product) === detailRoute.reference);

    if (productIndex >= 0 && productIndex !== activeProductIndex) {
      setActiveProductIndex(productIndex);
    }
  }, [activeBrand, activeProductIndex, activeType, detailProduct, detailRoute]);

  function handleBrandChange(brand) {
    const nextTypes = getAvailableTypesForBrand(brand);
    setActiveBrand(brand);
    if (!nextTypes.includes(activeType) && nextTypes.length > 0) {
      setActiveType(nextTypes[0]);
    }
    setActiveProductIndex(0);
  }

  function handleTypeChange(type) {
    if (!isBrandTypeAllowed(activeBrand, type)) {
      return;
    }

    setActiveType(type);
    setActiveProductIndex(0);
  }

  function handleProductSelect(index) {
    if (window.innerWidth <= 720) {
      shouldScrollToShowroomRef.current = true;

      if (index === safeProductIndex) {
        window.requestAnimationFrame(() => {
          showroomCardRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    }

    setActiveProductIndex(index);
  }

  function scrollBrandSlider(direction) {
    if (!brandSliderRef.current) {
      return;
    }

    const slider = brandSliderRef.current;
    const amount = Math.max(slider.clientWidth * 0.82, 220);

    slider.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  }

  function handlePrevProduct() {
    if (products.length < 2) {
      return;
    }

    setActiveProductIndex((currentIndex) =>
      currentIndex === 0 ? products.length - 1 : currentIndex - 1
    );
  }

  function handleNextProduct() {
    if (products.length < 2) {
      return;
    }

    setActiveProductIndex((currentIndex) =>
      currentIndex === products.length - 1 ? 0 : currentIndex + 1
    );
  }

  function handlePreviewTouchStart(event) {
    if (window.innerWidth > 720 || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    previewTouchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handlePreviewTouchEnd(event) {
    const start = previewTouchRef.current;
    previewTouchRef.current = null;

    if (!start || window.innerWidth > 720 || products.length < 2) {
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      handleNextProduct();
    } else {
      handlePrevProduct();
    }
  }

  function handlePreviewTouchCancel() {
    previewTouchRef.current = null;
  }

  function openProductPage(product, index) {
    setActiveProductIndex(index);
    window.location.hash = buildProductHash(product, activeType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeProductPage() {
    history.pushState(null, "", window.location.pathname + window.location.search);
    setDetailRoute(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (detailRoute && detailProduct && detailTypeData) {
    const detailSurfaceStyle = detailProduct.surfaceImage
      ? {
        backgroundImage: `url("${detailProduct.surfaceImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
      : { background: detailProduct.background };

    return h(
      "div",
      { className: "page-shell" },
      renderGadimatHeader("", ""),
      h(
        "section",
        { className: "section detail-page" },
        h(
          "button",
          {
            className: "ghost-btn detail-page__back",
            type: "button",
            onClick: closeProductPage,
          },
          "← Retour au catalogue"
        ),
        h(
          "div",
          { className: "detail-page__hero" },
          h(
            "div",
            { className: "detail-page__copy reveal" },
            h("p", { className: "section-tag" }, `${detailRoute.brand} / ${detailRoute.type}`),
            h("h1", null, detailProduct.name),
            h(
              "p",
              { className: "detail-page__text" },
              detailProduct.description || detailTypeData.description
            ),
            h(
              "div",
              { className: "detail-page__meta" },
              h("div", null, h("span", null, "Code"), h("strong", null, getProductReference(detailProduct))),
              h("div", null, h("span", null, "Type"), h("strong", null, detailRoute.type)),
              h("div", null, h("span", null, "Taille"), h("strong", null, getProductSize(detailRoute.type))),
              h("div", null, h("span", null, "Finition"), h("strong", null, detailProduct.aspect || detailTypeData.materialLabel)),
              detailProduct.epaisseur ? h("div", null, h("span", null, "Épaisseur"), h("strong", null, detailProduct.epaisseur)) : null
            )
          ),
          h(
            "div",
            {
              className: "detail-page__surface reveal",
              style: detailSurfaceStyle,
            },
            detailTypeData.materialLabel ? h("div", { className: "material-chip" }, detailTypeData.materialLabel) : null
          )
        ),
        h(
          "div",
          { className: "detail-page__grid" },
          h(
            "div",
            { className: "detail-card detail-card--showroom reveal" },
            h("h2", null, "Mise en situation"),
            detailProduct.previewImage
              ? h("img", {
                className: "detail-card__image",
                src: detailProduct.previewImage,
                alt: `${detailProduct.name} application`,
                loading: "lazy",
              })
              : h("div", { className: "detail-card__fallback", style: detailSurfaceStyle }),
            h(
              "p",
              null,
              "Mise en situation en conditions réelles d'aménagement."
            )
          )
        )
      )
    );
  }

  return h(
    "div",
    { className: "page-shell" },
    renderGadimatHeader("", ""),
    h(
      "main",
      null,
      h(
        "section",
        { className: "section section--brands", id: "brands" },
        h(
          "div",
          { className: "section-heading reveal" },
          h("h2", null, "Choisir la marque")
        ),
        h(
          "div",
          { className: "brand-slider reveal" },
          h(
            "button",
            {
              className: "brand-slider__nav brand-slider__nav--prev",
              type: "button",
              onClick: () => scrollBrandSlider(-1),
              "aria-label": "Marques précédentes",
            },
            "‹"
          ),
          h(
            "div",
            { className: "brand-grid", ref: brandSliderRef },
            ...catalogData.brands.map((brand, index) =>
              h(
                "button",
                {
                  key: brand.name,
                  className: `brand-card reveal ${brand.name === activeBrand ? "is-active" : ""}`,
                  type: "button",
                  onClick: () => handleBrandChange(brand.name),
                },
                h("span", { className: "brand-card__index" }, String(index + 1).padStart(2, "0")),
                h("img", {
                  className: "brand-card__logo",
                  src: brandLogos[brand.name],
                  alt: `Logo ${brand.name}`,
                })
              )
            )
          ),
          h(
            "button",
            {
              className: "brand-slider__nav brand-slider__nav--next",
              type: "button",
              onClick: () => scrollBrandSlider(1),
              "aria-label": "Marques suivantes",
            },
            "›"
          )
        )
      ),
      h(
        "section",
        { className: "section section--types", id: "types" },
        h(
          "div",
          { className: "section-heading reveal" },
          h("h2", null, "Explorer les types de panneaux")
        ),
        h(
          "div",
          { className: "type-switch reveal", role: "tablist", "aria-label": "Types de produits" },
          ...["MDF LAM", "HIGH GLOSS", "SUPRAMAT"].map((type) => {
            const available = isBrandTypeAllowed(activeBrand, type);
            return h(
              "button",
              {
                key: type,
                className: `type-pill ${type === activeType ? "is-active" : ""} ${!available ? "is-disabled" : ""}`.trim(),
                type: "button",
                role: "tab",
                "aria-selected": type === activeType,
                disabled: !available,
                onClick: () => handleTypeChange(type),
              },
              type
            );
          })
        ),
        h(
          "div",
          { className: "type-showcase reveal" },
          h(
            "div",
            { className: "type-showcase__panel" },
            h("p", { className: "type-showcase__label" }, "Type sélectionné"),
            h("h3", null, activeType),
            h("p", { className: "type-showcase__size" }, getProductSize(activeType)),
            h("p", { id: "type-description" }, typeData.description),
            h(
              "ul",
              { className: "feature-list" },
              ...typeData.features.map((feature) => h("li", { key: feature }, feature))
            )
          ),
          h(
            "div",
            {
              className: "type-showcase__material",
              style: {
                background: typeData.materialBackground,
              },
            },
            h("img", {
              className: "type-showcase__image",
              src: typeData.materialImage,
              alt: `${activeType} exemplaire`,
            }),
            typeData.materialLabel ? h("div", { className: "material-chip" }, typeData.materialLabel) : null
          )
        )
      ),
      h(
        "section",
        { className: "section section--products", id: "products" },
        h(
          "div",
          { className: "products-layout" },
          h(
            "div",
            { className: "product-list" },
            ...(products.length > 0
              ? products.map((product, index) =>
                h(
                  "button",
                  {
                    key: `${product.brand}-${product.name}`,
                    className: `product-card reveal ${index === safeProductIndex ? "is-active" : ""}`,
                    type: "button",
                    onClick: () => handleProductSelect(index),
                  },
                  h(
                    "div",
                    { className: "product-card__top" },
                    h(
                      "div",
                      null,
                      h("span", { className: "product-card__brand" }, product.brand),
                      h("h3", null, product.name)
                    ),
                    h("span", { className: "product-card__type" }, activeType)
                  ),
                  product.surfaceImage
                    ? h(
                      "div",
                      { className: "product-card__media" },
                      h("img", {
                        className: "product-card__thumb",
                        src: product.surfaceImage,
                        alt: `${product.name} surface`,
                        loading: "lazy",
                      })
                    )
                    : null,
                  h(
                    "div",
                    { className: "product-card__swatches" },
                    ...(product.colors.length > 0
                      ? product.colors.map((color) =>
                        h("span", {
                          key: color,
                          className: "swatch",
                          style: { background: color },
                        })
                      )
                      : [
                        h(
                          "span",
                          { key: product.code || product.name, className: "product-card__code" },
                          product.code || product.name
                        ),

                      ])
                  )
                )
              )
              : [
                h(
                  "div",
                  { key: "empty-products", className: "product-empty reveal" },
                  h("h3", null, `Aucun produit ${activeType} pour ${activeBrand}`),
                  h(
                    "p",
                    null,
                    "Cette marque est limitée à ses types de produits associés pour cette sélection."
                  )
                ),
              ])
          ),
          activeProduct
            ? h(
              "aside",
              {
                className: "product-preview reveal",
                ref: showroomCardRef,
                onTouchStart: handlePreviewTouchStart,
                onTouchEnd: handlePreviewTouchEnd,
                onTouchCancel: handlePreviewTouchCancel,
              },
              h(
                "div",
                {
                  className: "product-preview__surface",
                  style: previewSurfaceStyle,
                },
                h("span", { className: "preview-badge" }, `${activeType} Showroom`),
                activeProduct.previewImage
                  ? h("img", {
                    className: "product-preview__hero-image",
                    src: activeProduct.previewImage,
                    alt: `${activeProduct.name} showroom`,
                    loading: "lazy",
                  })
                  : h(
                    "div",
                    { className: "preview-room" },
                    h("div", { className: "preview-room__wall" }),
                    h("div", {
                      className: "preview-room__cabinet",
                      style: previewSurfaceStyle,
                    }),
                    h("div", { className: "preview-room__shelf" })
                  ),
                products.length > 1
                  ? h(
                      "div",
                      { className: "swipe-arrows" },
                      h(
                        "button",
                        {
                          className: "swipe-arrows__btn swipe-arrows__btn--left",
                          type: "button",
                          onClick: handlePrevProduct,
                          "aria-label": "Produit précédent",
                        },
                        "‹"
                      ),
                      h(
                        "button",
                        {
                          className: "swipe-arrows__btn swipe-arrows__btn--right",
                          type: "button",
                          onClick: handleNextProduct,
                          "aria-label": "Produit suivant",
                        },
                        "›"
                      )
                    )
                  : null
              ),
              h(
                "div",
                { className: "product-preview__info" },
                h(
                  "div",
                  { className: "product-preview__header" },
                  h(
                    "div",
                    { className: "product-preview__brand-wrap" },
                    brandLogos[activeProduct.brand]
                      ? h("img", {
                        className: "product-preview__brand-logo",
                        src: brandLogos[activeProduct.brand],
                        alt: `Logo ${activeProduct.brand}`,
                        loading: "lazy",
                      })
                      : h("p", { className: "product-preview__brand" }, activeProduct.brand)
                  ),
                  h(
                    "div",
                    { className: "product-preview__summary" },
                    h(
                      "span",
                      { className: "product-preview__reference" },
                      getProductReference(activeProduct)
                    ),
                    h("span", {
                      className: "product-preview__color-dot",
                      style: getProductColorAccentStyle(activeProduct),
                      "aria-label": `Couleur ${activeProduct.name}`,
                      title: activeProduct.usage || activeProduct.name,
                    })
                  )
                ),
                h("h3", null, activeProduct.name),
                h(
                  "div",
                  { className: "product-preview__controls" },
                  h(
                    "button",
                    {
                      className: "ghost-btn product-preview__nav",
                      type: "button",
                      onClick: handlePrevProduct,
                      disabled: products.length < 2,
                    },
                    "Précédent"
                  ),
                  h(
                    "span",
                    { className: "product-preview__counter" },
                    `${safeProductIndex + 1} / ${products.length}`
                  ),
                  h(
                    "button",
                    {
                      className: "ghost-btn product-preview__nav",
                      type: "button",
                      onClick: handleNextProduct,
                      disabled: products.length < 2,
                    },
                    "Suivant"
                  )
                ),
                activeProduct.colors.length > 0
                  ? h(
                    "div",
                    { className: "swatch-row" },
                    ...activeProduct.colors.map((color) =>
                      h("span", { key: color, style: { background: color } })
                    )
                  )
                  : null,
                h(
                  "div",
                  { className: "product-meta" },
                  activeProduct.epaisseur ? h("div", null, h("span", null, "Épaisseur"), h("strong", null, activeProduct.epaisseur)) : null,
                  h(
                    "div",
                    null,
                    h("span", null, "Showroom"),
                    h("strong", null, activeProduct.previewImage ? "Disponible" : "Non disponible")
                  ),
                  h(
                    "div",
                    null,
                    h("span", null, "Référence"),
                    h("strong", null, getProductReference(activeProduct))
                  )
                ),
                h(
                  "button",
                  {
                    className: "primary-btn detail-cta",
                    type: "button",
                    onClick: () => openProductPage(activeProduct, safeProductIndex),
                  },
                  "Voir le détail →"
                )
              )
            )
            : h(
              "aside",
              { className: "product-preview product-preview--empty reveal", ref: showroomCardRef },
              h("p", { className: "product-preview__brand" }, activeBrand),
              h("h3", null, `Collection ${activeType}`),
              h(
                "p",
                { id: "preview-description" },
                "Sélectionnez un produit dans la liste pour afficher l'aperçu."
              )
            )
        )
      )
    )
  );
}

const SUPABASE_URL = 'https://hcrfhiponimvivbrznwk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcmZoaXBvbmltdml2YnJ6bndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNzgzMjQsImV4cCI6MjA5NDY1NDMyNH0.LCgAOm_aOcLx6CuT7gOjJzLyBX8UzwN-SCV9KZ8DD90';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadProductsFromDB() {
  try {
    const { data: dbProducts, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('code', { ascending: true });

    if (error) throw error;

    catalogData.products = {
      "MDF LAM": [],
      "HIGH GLOSS": [],
      SUPRAMAT: []
    };

    if (dbProducts && dbProducts.length > 0) {
      dbProducts.forEach(dbProd => {
        const type = dbProd.type;
        const typeData = catalogData.types[type] || {};
        const brandKey = dbProd.brand.toUpperCase();

        if (dbProd.is_hidden === true) return;

        const mappedProduct = {
          brand: brandKey,
          code: dbProd.code,
          name: `${dbProd.code} - ${dbProd.label}`,
          description: dbProd.label,
          aspect: typeData.materialLabel || "",
          usage: dbProd.label || `Reference ${dbProd.brand}`,
          colors: [],
          background: typeData.materialBackground || "#ccc",
          surfaceImage: dbProd.surface_image_url,
          previewImage: dbProd.preview_image_url,
          epaisseur: dbProd.epaisseur
        };

        if (!catalogData.products[type]) {
          catalogData.products[type] = [];
        }
        catalogData.products[type].push(mappedProduct);
      });
    }
  } catch (err) {
    console.error("Failed to load products from Supabase:", err);
  }
}

let appRoot = null;

async function initApp() {
  await loadProductsFromDB();

  const rootElement = document.getElementById("root");
  if (rootElement) {
    appRoot = ReactDOM.createRoot(rootElement);
    appRoot.render(h(App));
  }
}

// Re-fetch and re-render automatically when the user switches back to this tab
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && appRoot) {
    await loadProductsFromDB();
    appRoot.render(h(App));
  }
});

initApp();
