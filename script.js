const { createElement: h, useEffect, useRef, useState } = React;
const gadimatLogo = "Assets/Logo-Gadimat02.png";
const productSize = "1220 mm x 2800 mm";
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
    MDF: {
      description:
        "Des surfaces chaleureuses et structurées, parfaites pour le mobilier intérieur, le dressing et les aménagements sur mesure.",
      features: [
        "Texture naturelle et decorative",
        "Grande polyvalence pour l'agencement",
        "Excellent rendu sur tons bois et unis",
      ],
      materialLabel: "Grain bois",
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
      materialLabel: "Reflet brillant",
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
      materialLabel: "Ultra mat",
      materialImage: "Assets/SUPMAT_exemplaire.png",
      materialBackground:
        "linear-gradient(135deg, #47413e 0%, #71675f 30%, #988b80 58%, #60554f 100%)",
    },
  },
  products: {
    MDF: [
      {
        brand: "AGT",
        name: "MDF Noyer Terra",
        description: "Un noyer riche avec veinage fluide pour un mobilier chaleureux.",
        aspect: "Bois satine",
        usage: "Cuisine, dressing, bureau",
        colors: ["#5c3a24", "#9e6b43", "#d5b18b"],
        background: "linear-gradient(145deg, #5b3925, #bf8a5e, #3b2518)",
      },
      {
        brand: "CAMSAN",
        name: "MDF Chene Lin",
        description: "Une interprétation claire du chêne pour les intérieurs lumineux.",
        aspect: "Chene naturel",
        usage: "Placard, tete de lit, meuble TV",
        colors: ["#876247", "#cfac87", "#efe2c9"],
        background: "linear-gradient(145deg, #8b6446, #d9b38d, #f1e5cf)",
      },
      {
        brand: "KRONOSPAN",
        name: "MDF Sable Urbain",
        description: "Une teinte sable boisée pour projets contemporains et doux.",
        aspect: "Bois uni",
        usage: "Salle d'exposition, accueil, rangement",
        colors: ["#70513f", "#b98f71", "#dfc3a8"],
        background: "linear-gradient(145deg, #6e5140, #b89073, #e0c5a7)",
      },
      {
        brand: "YILDIZ",
        name: "MDF Dune Lin",
        description: "Une finition claire et élégante pour des aménagements doux et lumineux.",
        aspect: "Bois structure",
        usage: "Placard, panneau decoratif, meuble mural",
        colors: ["#8a6d56", "#ccb08c", "#efe1cf"],
        background: "linear-gradient(145deg, #856851, #ceb18d, #f0e2d0)",
      },
    ],
    "HIGH GLOSS": [
      {
        brand: "CAMSAN",
        name: "Blanc Perle Brillant",
        description: "Un blanc brillant miroir pour cuisines et murs décoratifs haut de gamme.",
        aspect: "Laque brillante",
        usage: "Cuisine, salle d'exposition, commerce",
        colors: ["#d7d4cf", "#f3efe9", "#ffffff"],
        background: "linear-gradient(145deg, #8d847d 0%, #f7f0e8 35%, #ffffff 62%, #b8aea5 100%)",
      },
      {
        brand: "VENNI",
        name: "Taupe Champagne Brillant",
        description: "Une nuance élégante avec de beaux reflets pour ameublement moderne.",
        aspect: "Reflet soyeux",
        usage: "Buffet, dressing, comptoir",
        colors: ["#7f7066", "#c8b5a5", "#f2e2d5"],
        background: "linear-gradient(145deg, #6f6159 0%, #cab7a8 40%, #f7e8dc 76%, #8e7c70 100%)",
      },
      {
        brand: "AGT",
        name: "Graphite Luxe Brillant",
        description: "Une surface profonde et brillante pour une signature haut de gamme.",
        aspect: "Graphite miroir",
        usage: "Cuisine moderne, hotel, reception",
        colors: ["#1f2327", "#535960", "#b0b4b8"],
        background: "linear-gradient(145deg, #14171b 0%, #51575e 38%, #d8dcdf 68%, #23272c 100%)",
      },
    ],
    SUPRAMAT: [
      {
        brand: "CAMSAN",
        name: "Supramat Olive Pierre",
        description: "Un vert pierre discret pour des ambiances contemporaines et tactiles.",
        aspect: "Ultra mat veloute",
        usage: "Bibliotheque, cuisine, bureau de direction",
        colors: ["#4e5748", "#8b947d", "#d9dbcf"],
        background: "linear-gradient(145deg, #4c5546, #89927a, #d3d7ca)",
      },
      {
        brand: "VENNI",
        name: "Supramat Nude Argile",
        description: "Une finition nude matte, douce et architecturale.",
        aspect: "Mat profond",
        usage: "Dressing, meuble vasque, boutique",
        colors: ["#6d5b53", "#baa095", "#e8d8ce"],
        background: "linear-gradient(145deg, #6d5b52, #b99f92, #e9d8ce)",
      },
      {
        brand: "KRONOSPAN",
        name: "Supramat Noir Braise",
        description: "Une présence intense, mate et minimaliste pour projets affirmés.",
        aspect: "Noir ultra mat",
        usage: "Commerce de luxe, cuisine, habillage mural",
        colors: ["#1f1c1a", "#4b4440", "#8b827c"],
        background: "linear-gradient(145deg, #171513, #3c3733, #6e6660)",
      },
    ],
  },
};

const brandTypeMap = {
  AGT: ["MDF", "HIGH GLOSS", "SUPRAMAT"],
  KRONOSPAN: ["MDF"],
  CAMSAN: ["MDF", "HIGH GLOSS"],
  YILDIZ: ["MDF"],
  VENNI: ["HIGH GLOSS"],
};

const agtAssetCatalog = {
  MDF: [
    { code: "L003", label: "NOIR", surfaceFile: "L003-BLACK.png", previewFile: "L003-IMG.png" },
    { code: "L004", label: "ANTHRACITE", surfaceFile: "L004-ANTHRACITE.png" },
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

function makeAgtProduct(type, entry) {
  const item = typeof entry === "string" ? { code: entry, label: entry } : entry;
  const codeFolder = `Assets/AGT/${type}/Code Produit`;
  const showroomFolder = `Assets/AGT/${type}/Showroom`;
  const typeData = catalogData.types[type];
  const assetLabel = getAssetLabelFromFilename(item.surfaceFile, item.code, item.label);

  return {
    brand: "AGT",
    code: item.code,
    name: `${item.code} - ${assetLabel}`,
    description: assetLabel || "",
    aspect: typeData.materialLabel,
    usage: assetLabel || "Reference AGT",
    colors: [],
    background: typeData.materialBackground,
    surfaceImage: `${codeFolder}/${item.surfaceFile}`,
    previewImage: item.previewFile ? `${showroomFolder}/${item.previewFile}` : null,
  };
}

Object.keys(agtAssetCatalog).forEach((type) => {
  const agtProducts = agtAssetCatalog[type].map((entry) => makeAgtProduct(type, entry));
  const nonAgtProducts = catalogData.products[type].filter((product) => product.brand !== "AGT");
  catalogData.products[type] = [...agtProducts, ...nonAgtProducts];
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
  const [activeType, setActiveType] = useState("MDF");
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [detailRoute, setDetailRoute] = useState(() => parseProductHash(window.location.hash));
  const showroomCardRef = useRef(null);
  const shouldScrollToShowroomRef = useRef(false);
  const brandSliderRef = useRef(null);
  const previewTouchRef = useRef(null);

  const availableTypes = getAvailableTypesForBrand(activeBrand);
  const typeData = catalogData.types[activeType];
  const products = (catalogData.products[activeType] || []).filter(
    (product) => product.brand === activeBrand
  );
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
              h("div", null, h("span", null, "Taille"), h("strong", null, productSize)),
              h("div", null, h("span", null, "Finition"), h("strong", null, detailProduct.aspect || detailTypeData.materialLabel))
            )
          ),
          h(
            "div",
            {
              className: "detail-page__surface reveal",
              style: detailSurfaceStyle,
            },
            h("div", { className: "material-chip" }, detailTypeData.materialLabel)
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
                }),
                h("span", { className: "brand-card__label" }, brand.label)
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
          ...availableTypes.map((type) => {
            return h(
              "button",
              {
                key: type,
                className: `type-pill ${type === activeType ? "is-active" : ""}`.trim(),
                type: "button",
                role: "tab",
                "aria-selected": type === activeType,
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
            h("p", { className: "type-showcase__size" }, productSize),
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
            h("div", { className: "material-chip" }, typeData.materialLabel)
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
                      )
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
                    h("div", null, h("span", null, "Épaisseur"), h("strong", null, "18 mm")),
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(App));
