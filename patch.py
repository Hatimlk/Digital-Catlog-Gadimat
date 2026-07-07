import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace productSizeMap
content = re.sub(
    r'(const productSizeMap = \{[\s\S]*?"SUPRAMAT": "1220 mm x 2800 mm",\s*\n)(\};)',
    r'\1  "CONSTRUCTION": "Selon produit",\n\2',
    content
)

# Replace brandLogos
content = re.sub(
    r'(KRONOSPAN: "Assets/Logos/Kronospan-logo\.png",\s*\n)(\};)',
    r'\1  "Matériaux de construction": "Assets/Logos/MC-logo.png",\n\2',
    content
)

# Replace catalogData.brands
content = re.sub(
    r'(\{ name: "KRONOSPAN", label: "Surface technique" \},\s*\n)(\s*\]\,\s*\n\s*types:)',
    r'\1    { name: "Matériaux de construction", label: "Gros œuvre et Bâtiment" },\n\2',
    content
)

# Replace catalogData.types
content = re.sub(
    r'(materialBackground:\s*"linear-gradient\(135deg, #47413e 0%, #71675f 30%, #988b80 58%, #60554f 100%\)",\s*\n\s*\},)(\s*\n\s*\},)',
    r'\1\n    "CONSTRUCTION": {\n      description: "Une gamme complète de matériaux de construction robustes et fiables pour vos projets de bâtiment.",\n      features: [\n        "Matériaux haute résistance",\n        "Qualité garantie pour le gros œuvre",\n        "Solutions durables",\n      ],\n      materialLabel: "",\n      materialImage: "Assets/Matériaux de construction/Code Produit/Produit-Bois Blanc.jpeg",\n      materialBackground: "linear-gradient(135deg, #d3c4a8 0%, #a89470 50%, #766042 100%)",\n    },\2',
    content
)

# Replace catalogData.products
content = re.sub(
    r'(SUPRAMAT: \[\],\s*\n)(\s*\},)',
    r'\1    "CONSTRUCTION": [],\n\2',
    content
)

# Replace brandTypeMap
content = re.sub(
    r'(VENNI: \["HIGH GLOSS"\],\s*\n)(\};)',
    r'\1  "Matériaux de construction": ["CONSTRUCTION"],\n\2',
    content
)

# Replace brandFolderMap
content = re.sub(
    r'(YILDIZ: \{ "MDF LAM": "MDF" \},\s*\n)(\};)',
    r'\1  "Matériaux de construction": { "CONSTRUCTION": "." },\n\2',
    content
)

# Replace Yildiz products end with Matériaux de construction
content = re.sub(
    r'(\{\s*code: "O55", label: "ITALIAN WALNUT", surfaceFile: "O55 ITALIAN WALNUT\.png", previewFile: "O55-IMG\.png"\s*\},?\s*\n\s*\],\s*\n\s*\},\s*\n)(\};)',
    r'\1  "Matériaux de construction": {\n    "CONSTRUCTION": [\n      { code: "AFRIFLEX", label: "AFRIFLEX", surfaceFile: "Produit-AFRIFLEX.jpeg", previewFile: "AFRIFLEX.jpeg" },\n      { code: "Bois Blanc", label: "Bois Blanc", surfaceFile: "Produit-Bois Blanc.jpeg", previewFile: "Bois Blanc.jpeg" },\n      { code: "Contreplaqué Bakélisé", label: "Contreplaqué Bakélisé", surfaceFile: "Produit-Contreplaqué Bakélisé.jpeg", previewFile: "Contreplaqué Bakélisé.jpeg" },\n      { code: "POUTRES H20", label: "POUTRES H20", surfaceFile: "Produit-POUTRES H20.jpeg", previewFile: "POUTRES H20.jpeg" },\n      { code: "TRICAPA - 3 PLIS", label: "TRICAPA - 3 PLIS", surfaceFile: "Produit-TRICAPA - 3 PLIS.jpeg", previewFile: "TRICAPA - 3 PLIS.jpeg" },\n    ],\n  },\n\2',
    content
)

# Replace makeBrandProduct path logic
content = re.sub(
    r'(const folder = folderMap\[type\] \|\| type;\s*\n\s*const brandFolder = brand;\s*\n\s*const codeFolder = `Assets/\$\{brandFolder\}/\$\{folder\}/Code Produit`;\s*\n\s*const showroomFolder = `Assets/\$\{brandFolder\}/\$\{folder\}/Showroom`;)',
    r'const folder = folderMap[type] !== undefined ? folderMap[type] : type;\n  const brandFolder = brand;\n  const pathPart = folder && folder !== "." ? `${folder}/` : (folder === "." ? "" : "");\n  const codeFolder = `Assets/${brandFolder}/${pathPart}Code Produit`;\n  const showroomFolder = `Assets/${brandFolder}/${pathPart}Showroom`;',
    content
)

# Replace hardcoded map inside App render (line 780 approx)
content = re.sub(
    r'(\.\.\.)\["MDF LAM", "HIGH GLOSS", "SUPRAMAT"\](\.map\(\(type\) => \{)',
    r'\1Object.keys(catalogData.types)\2',
    content
)

# Replace hardcoded map inside loadProductsFromDB
content = re.sub(
    r'(catalogData\.products = \{\s*\n\s*"MDF LAM": \[\],\s*\n\s*"HIGH GLOSS": \[\],\s*\n\s*SUPRAMAT: \[\]\s*\n\s*\};)',
    r'catalogData.products = {\n      "MDF LAM": [],\n      "HIGH GLOSS": [],\n      SUPRAMAT: [],\n      "CONSTRUCTION": []\n    };',
    content
)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement done for script.js")

# Now handle admin.html
with open('admin.html', 'r', encoding='utf-8') as f:
    admin_content = f.read()

# Add Matériaux de construction to brand-check
admin_content = re.sub(
    r'(<label class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">\s*\n\s*<input type="checkbox" value="YILDIZ" class="brand-check.*?</span>\s*\n\s*</label>)',
    r'\1\n                                <label class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">\n                                    <input type="checkbox" value="Matériaux de construction" class="brand-check w-4 h-4 rounded accent-blue-600">\n                                    <span class="text-sm text-gray-700 font-medium">Matériaux de construction</span>\n                                </label>',
    admin_content
)

# Add CONSTRUCTION to type-check
admin_content = re.sub(
    r'(<label class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">\s*\n\s*<input type="checkbox" value="SUPRAMAT" class="type-check.*?</span>\s*\n\s*</label>)',
    r'\1\n                                <label class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">\n                                    <input type="checkbox" value="CONSTRUCTION" class="type-check w-4 h-4 rounded accent-blue-600">\n                                    <span class="text-sm text-gray-700 font-medium">CONSTRUCTION</span>\n                                </label>',
    admin_content
)

# Add to select#brand
admin_content = re.sub(
    r'(<option value="KRONOSPAN">Kronospan</option>)',
    r'\1\n                            <option value="Matériaux de construction">Matériaux de construction</option>',
    admin_content
)

# Add to select#type
admin_content = re.sub(
    r'(<option value="SUPRAMAT">SUPRAMAT</option>)',
    r'\1\n                            <option value="CONSTRUCTION">CONSTRUCTION</option>',
    admin_content
)

with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(admin_content)

print("Replacement done for admin.html")
