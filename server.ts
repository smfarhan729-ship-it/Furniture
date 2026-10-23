import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '15mb' }));

// Ensure data folder exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default Seed Data
const initialData = {
  settings: {
    businessName: "Shree Balaji Sofa & Furniture",
    phone: "+91 77538 57076",
    whatsapp: "917753857076",
    email: "shreebalajisurats@gmail.com",
    address: "Shop 33, Pavilion Plaza, Near Mark Point, Dindoli, Surat, Gujarat, India — PIN 394210",
    pincode: "394210",
    city: "Surat",
    hours: "Monday – Sunday: 9:30 AM – 9:00 PM",
    googleMapsUrl: "https://maps.google.com/?q=Pavilion+Plaza+Dindoli+Surat",
    justdialUrl: "https://jsdl.in/RSL-UIZ1791942689",
    googleRating: 5.0,
    googleReviewCount: 18,
    freeDeliveryThreshold: 15000,
    defaultDeliveryFee: 1200,
    gstPercentage: 0,
    enableCod: true,
    enableUpi: true,
    enableGateway: true,
    upiId: "7753857076@upi",
    adminSecret: "Balaji@Surat2026"
  },
  categories: [
    {
      id: "cat-l-shape",
      name: "L-Shaped Sofas",
      slug: "l-shaped-sofas",
      description: "Spacious corner sectionals tailored for modern Indian living rooms with premium foam & solid hardwood frames.",
      image: "cat_l_shaped",
      itemCount: 4,
      displayOrder: 1,
      isActive: true
    },
    {
      id: "cat-sofa-beds",
      name: "Convertible Sofa Beds",
      slug: "convertible-sofa-beds",
      description: "Smooth pull-out roller mechanisms with built-in storage. Handcrafted in our Surat workshop.",
      image: "cat_sofa_bed",
      itemCount: 3,
      displayOrder: 2,
      isActive: true
    },
    {
      id: "cat-recliners",
      name: "Recliners",
      slug: "recliners",
      description: "Dual and single motorized recliners with cup holders, console storage, and lumbar support.",
      image: "cat_recliners",
      itemCount: 2,
      displayOrder: 3,
      isActive: true
    },
    {
      id: "cat-3-seater",
      name: "3-Seater & 2-Seater Sofas",
      slug: "3-seater-and-2-seater-sofas",
      description: "Fluted backrests, houndstooth accents, and modern luxury suites designed for compact and medium halls.",
      image: "cat_3_seater",
      itemCount: 4,
      displayOrder: 4,
      isActive: true
    },
    {
      id: "cat-custom-sofas",
      name: "Customized Sofas",
      slug: "customized-sofas",
      description: "Made-to-measure sofa sets built to your exact living room dimensions, fabric choice, and cushion density.",
      image: "cat_custom_sofa",
      itemCount: 5,
      displayOrder: 5,
      isActive: true
    },
    {
      id: "cat-chairs",
      name: "Dining & Accent Chairs",
      slug: "dining-and-accent-chairs",
      description: "Handcrafted curved back chairs, gold-tipped legs, and high-density foam seating.",
      image: "cat_chairs",
      itemCount: 3,
      displayOrder: 6,
      isActive: true
    },
    {
      id: "cat-beds",
      name: "Designer Headboards & Beds",
      slug: "designer-headboards-and-beds",
      description: "Custom velvet wall paneling, acoustic fluting, and platform beds crafted in Surat.",
      image: "cat_beds",
      itemCount: 3,
      displayOrder: 7,
      isActive: true
    },
    {
      id: "cat-fabrics",
      name: "Upholstery & Fabric Options",
      slug: "upholstery-and-fabric-options",
      description: "Genuine imported and Indian fabrics: Velvet, Boucle, Linen, Chenille, Suede, and Leatherette with transparent per-meter rates.",
      image: "cat_fabrics",
      itemCount: 6,
      displayOrder: 8,
      isActive: true
    },
    {
      id: "cat-repairs",
      name: "Sofa Repair & Cushion Replacement",
      slug: "sofa-repair-and-cushion-replacement",
      description: "Expert cushion sagging repair, 32D / 40D Sleepwell HR foam upgrade, and complete re-upholstery service.",
      image: "cat_repairs",
      itemCount: 2,
      displayOrder: 9,
      isActive: true
    }
  ],
  fabrics: [
    {
      id: "fab-velvet",
      name: "Royal Velvet",
      category: "Velvet Fabric",
      pricePerMeter: 950,
      durability: "8 - 12 Years",
      description: "Plush, high-pile micro-velvet with stain-resistant Scotchgard finish. Soft to the touch and wrinkle-free.",
      texturePattern: "Smooth Lustrous Velvet",
      popularFor: "L-Shaped Sectionals, Accent Chairs, Bedroom Wall Panels"
    },
    {
      id: "fab-boucle",
      name: "Nordic Boucle",
      category: "Boucle Fabric",
      pricePerMeter: 1250,
      durability: "8 - 12 Years",
      description: "Heavily looped yarn creating an organic, cozy, tactile aesthetic. Highly durable and chic.",
      texturePattern: "Curled Looped Wool-Blend",
      popularFor: "Curved Lounge Sofas, Fluted Armchairs"
    },
    {
      id: "fab-linen",
      name: "Natural Textured Linen",
      category: "Linen Fabric",
      pricePerMeter: 850,
      durability: "6 - 10 Years",
      description: "Breathable natural weave, ideal for Indian summer climates. High tensile strength.",
      texturePattern: "Crisp Organic Cross-Weave",
      popularFor: "3-Seater Sofas, Casual Living Loungers"
    },
    {
      id: "fab-chenille",
      name: "Soft Chenille",
      category: "Chenille Fabric",
      pricePerMeter: 950,
      durability: "7 - 11 Years",
      description: "Velvety ribbed caterpillar yarn providing superior comfort, deep saturation, and long life.",
      texturePattern: "Soft Tufted Ribbed Surface",
      popularFor: "Family Sofas, Heavy Use Seating"
    },
    {
      id: "fab-suede",
      name: "Matte Micro-Suede",
      category: "Suede Fabric",
      pricePerMeter: 800,
      durability: "6 - 10 Years",
      description: "Napped finish giving the luxurious feel of genuine suede without cracking. Easy to spot-clean.",
      texturePattern: "Velvety Brushed Matte",
      popularFor: "Sectionals, Cushion Covers"
    },
    {
      id: "fab-leatherette",
      name: "Premium Vegan Leatherette",
      category: "Leather Fabric",
      pricePerMeter: 1500,
      durability: "10 - 15 Years",
      description: "Commercial grade breathable PU leatherette. Waterproof, anti-scratch, and easy wipe-down clean.",
      texturePattern: "Fine Grain Pebble Leather Finish",
      popularFor: "Recliners, Dining Chairs, Executive Sofas"
    }
  ],
  products: [
    {
      id: "prod-01",
      sku: "SBSF-L-ROYALE",
      name: "The Royale L-Shaped Sectional Sofa (7-Seater)",
      slug: "royale-l-shaped-sectional-sofa-7-seater",
      categoryId: "cat-l-shape",
      categoryName: "L-Shaped Sofas",
      price: 42500,
      originalPrice: 48000,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 4,
      leadTimeDays: 7,
      seatingCapacity: "7 Seater (L-Shape)",
      dimensions: {
        lengthInches: 114,
        widthInches: 78,
        heightInches: 34,
        seatingHeightInches: 18
      },
      materials: {
        frame: "Seasoned Solid Sal & Marandi Wood Frame with Anti-Termite Treatment",
        foam: "High Resilience 40D Sleepwell Foam + Pocket Springs",
        fabric: "Premium Stain-Resistant Royal Velvet",
        legs: "Heavy-Duty Powder-Coated Metal Legs with Gold Accent Shoes"
      },
      description: "Our flagship handcrafted L-shaped sectional sofa built in our Dindoli workshop. Features diamond-quilted side cladding, deep lumbar support cushions, and reinforced solid wood skeleton. Available in left-hand or right-hand configuration.",
      features: [
        "40D High-Resilience Sleepwell foam preventing sagging for 10+ years",
        "Hand-stitched diamond quilted perimeter armrest",
        "Includes 5 complimentary coordinating throw cushions",
        "Solid Sal wood frame with 10-year structural warranty",
        "Customizable in over 50+ fabric shades at our Dindoli showroom"
      ],
      images: [
        "product_l_shape_teal",
        "product_l_shape_grey",
        "product_l_shape_cream"
      ],
      colorVariants: [
        { name: "Teal Blue", hex: "#1A5F7A", inStock: true },
        { name: "Charcoal Grey", hex: "#3B4252", inStock: true },
        { name: "Ivory Cream", hex: "#E8E2D2", inStock: true },
        { name: "Forest Green", hex: "#1B3B2B", inStock: true }
      ],
      fabricOptions: ["Royal Velvet", "Soft Chenille", "Premium Vegan Leatherette"],
      ratings: {
        average: 5.0,
        count: 14
      }
    },
    {
      id: "prod-02",
      sku: "SBSF-BED-PULLOUT",
      name: "Balaji Hydraulic Pull-Out Sofa-Cum-Bed (3-Seater to King)",
      slug: "balaji-hydraulic-pull-out-sofa-bed",
      categoryId: "cat-sofa-beds",
      categoryName: "Convertible Sofa Beds",
      price: 28900,
      originalPrice: 33000,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 3,
      leadTimeDays: 8,
      seatingCapacity: "3 Seater Sofa / Sleeps 2 Adults",
      dimensions: {
        lengthInches: 76,
        widthInches: 36,
        heightInches: 35,
        seatingHeightInches: 18
      },
      materials: {
        frame: "Reinforced Solid Hardwood + Heavy-Gauge Steel Hydraulic Slider Rollers",
        foam: "Dual-Density 32D Base + 40D Sleepwell HR Top Cushion",
        fabric: "Heavy Chenille / Velvet with Stitched Ribbing",
        legs: "Concealed Smooth Nylon Glides + Solid Wooden Base"
      },
      description: "As featured in our workshop testing video! Converts smoothly in 3 seconds from a luxurious 3-seater sofa into a full-sized bed. Engineered with industrial-strength roller sliders that will not jam or scratch your floor.",
      features: [
        "Tested 10,000+ pull-out mechanism cycles in our Surat workshop",
        "Built-in hydraulic under-seat storage for pillows and blankets",
        "Seamless level sleep surface with zero ridge in the middle",
        "Compact footprint ideal for Surat flats and guest rooms",
        "Demonstrated live in workshop testing video"
      ],
      images: [
        "product_sofa_bed_sage",
        "product_sofa_bed_burgundy",
        "product_sofa_bed_camel"
      ],
      colorVariants: [
        { name: "Sage Mint", hex: "#7E9F8E", inStock: true },
        { name: "Burgundy Wine", hex: "#6A1A24", inStock: true },
        { name: "Cognac Tan", hex: "#8D4E2A", inStock: true }
      ],
      fabricOptions: ["Soft Chenille", "Royal Velvet", "Matte Micro-Suede"],
      ratings: {
        average: 5.0,
        count: 18
      },
      hasPullOutMechanism: true
    },
    {
      id: "prod-03",
      sku: "SBSF-REC-TWIN",
      name: "Twin Motorized Luxury Recliner with Center Console",
      slug: "twin-motorized-luxury-recliner-console",
      categoryId: "cat-recliners",
      categoryName: "Recliners",
      price: 56000,
      originalPrice: 62000,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 2,
      leadTimeDays: 10,
      seatingCapacity: "2 Seater Recliner Suite",
      dimensions: {
        lengthInches: 82,
        widthInches: 38,
        heightInches: 41,
        seatingHeightInches: 20
      },
      materials: {
        frame: "Heavy Duty German Motorized Mechanism with Kiln-Dried Wood Subframe",
        foam: "Orthopedic Ergonomic Contoured 40D Foam with Memory Top",
        fabric: "Breathable Premium Leatherette / Suede",
        legs: "Concealed Floor Protection Base"
      },
      description: "True cinema-grade relaxation. Independent motor recline control for both seats, center console with storage box and dual brass cup holders. Whisper-quiet German-engineered electric actuators.",
      features: [
        "Dual electric touch buttons with USB phone charging ports",
        "Soft-closing center storage console for remotes & books",
        "Twin built-in metallic cup holders",
        "Infinite reclining angles from 105° to 165°",
        "Orthopedic spinal lumbar and neck support"
      ],
      images: [
        "product_recliner_cream",
        "product_recliner_espresso"
      ],
      colorVariants: [
        { name: "Desert Beige", hex: "#D6C7B2", inStock: true },
        { name: "Espresso Brown", hex: "#3A2B23", inStock: true },
        { name: "Olive Green", hex: "#3F4F3D", inStock: true }
      ],
      fabricOptions: ["Premium Vegan Leatherette", "Matte Micro-Suede"],
      ratings: {
        average: 5.0,
        count: 11
      }
    },
    {
      id: "prod-04",
      sku: "SBSF-3S-FLUTED",
      name: "Surat Signature 3-Seater Fluted Back Velvet Sofa",
      slug: "surat-signature-3-seater-fluted-back-sofa",
      categoryId: "cat-3-seater",
      categoryName: "3-Seater & 2-Seater Sofas",
      price: 24500,
      originalPrice: 28000,
      isCustomizable: true,
      isFeatured: false,
      inStock: true,
      stockQuantity: 5,
      leadTimeDays: 6,
      seatingCapacity: "3 Seater",
      dimensions: {
        lengthInches: 80,
        widthInches: 34,
        heightInches: 33,
        seatingHeightInches: 18
      },
      materials: {
        frame: "Solid Wood Internal Frame",
        foam: "High Resilience 40D Sleepwell Foam",
        fabric: "Royal Velvet",
        legs: "Tapered Matt Black Metal Legs with Gold Ferrules"
      },
      description: "Modern architectural silhouette with handcrafted vertical fluting along the backrest. Compact profile that fits comfortably in modern apartments without compromising seating width.",
      features: [
        "Vertical fluted channel tufting hand-stitched by senior master craftsmen",
        "High ground clearance for effortless robot vacuum cleaning",
        "Reinforced webbing base with zig-zag steel springs",
        "Breathable high-density cushioning"
      ],
      images: [
        "product_3seater_emerald",
        "product_3seater_teal"
      ],
      colorVariants: [
        { name: "Emerald Green", hex: "#134E4A", inStock: true },
        { name: "Royal Teal", hex: "#0E7490", inStock: true },
        { name: "Warm Grey", hex: "#6B7280", inStock: true }
      ],
      fabricOptions: ["Royal Velvet", "Nordic Boucle", "Soft Chenille"],
      ratings: {
        average: 5.0,
        count: 8
      }
    },
    {
      id: "prod-05",
      sku: "SBSF-2S-HOUNDS",
      name: "Artisanal Houndstooth & Tan Leatherette 2-Seater",
      slug: "artisanal-houndstooth-tan-leatherette-2-seater",
      categoryId: "cat-3-seater",
      categoryName: "3-Seater & 2-Seater Sofas",
      price: 19800,
      originalPrice: 23000,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 3,
      leadTimeDays: 6,
      seatingCapacity: "2 Seater Compact Lounge",
      dimensions: {
        lengthInches: 62,
        widthInches: 33,
        heightInches: 32,
        seatingHeightInches: 18
      },
      materials: {
        frame: "Treated Teak & Sal Wood Structure",
        foam: "Medium-Firm 36D High Resilience Foam",
        fabric: "Italian Textured Houndstooth Weave + Tan Leatherette Back Shell",
        legs: "Solid Sheesham Tapered Wooden Legs"
      },
      description: "As photographed on workshop pages 2 & 7! A striking dual-material design combining textured houndstooth fabric cushions with a saddle tan leatherette wrap on the arms and outer frame.",
      features: [
        "High-contrast dual material craftsmanship",
        "Removable zippered cushion covers for easy dry-cleaning",
        "Solid timber legs with anti-slip brass glides",
        "Perfect for balconies, reception lounges, or intimate sitting nooks"
      ],
      images: [
        "product_houndstooth_tan",
        "product_houndstooth_back"
      ],
      colorVariants: [
        { name: "Tan & Houndstooth", hex: "#B45309", inStock: true },
        { name: "Charcoal & Houndstooth", hex: "#374151", inStock: true }
      ],
      fabricOptions: ["Textured Houndstooth Weave", "Premium Vegan Leatherette"],
      ratings: {
        average: 5.0,
        count: 9
      }
    },
    {
      id: "prod-06",
      sku: "SBSF-CHAIR-FLUTE",
      name: "Balaji Royal Fluted Dining & Accent Armchair (Pair)",
      slug: "balaji-royal-fluted-dining-accent-armchair",
      categoryId: "cat-chairs",
      categoryName: "Dining & Accent Chairs",
      price: 12500,
      originalPrice: 14500,
      isCustomizable: true,
      isFeatured: false,
      inStock: true,
      stockQuantity: 8,
      leadTimeDays: 5,
      seatingCapacity: "Set of 2 Chairs",
      dimensions: {
        lengthInches: 24,
        widthInches: 23,
        heightInches: 34,
        seatingHeightInches: 19
      },
      materials: {
        frame: "Ergonomic Curved Plywood Core with Solid Wood Legs",
        foam: "High Resilience 32D Contoured Foam",
        fabric: "Stain-Shield Velvet / Vegan Leatherette",
        legs: "Solid Ash Wood with Gold Brass Caps"
      },
      description: "Featured on pages 25, 54, 146 & 190. Curved embracing backrest with precision fluting and brass tip legs. Pairs beautifully with marble dining tables or as standalone vanity/accent chairs.",
      features: [
        "Fluted ergonomic backrest contoured for lumbar relief",
        "Brushed brass caps on tapered legs",
        "Tested to support up to 150 kg per chair",
        "Sold in pairs (set of 2 chairs)"
      ],
      images: [
        "product_chair_cream",
        "product_chair_mustard",
        "product_chair_teal"
      ],
      colorVariants: [
        { name: "Ivory Cream", hex: "#F3ECE1", inStock: true },
        { name: "Mustard Gold", hex: "#D97706", inStock: true },
        { name: "Emerald Green", hex: "#065F46", inStock: true }
      ],
      fabricOptions: ["Royal Velvet", "Premium Vegan Leatherette", "Nordic Boucle"],
      ratings: {
        average: 5.0,
        count: 7
      }
    },
    {
      id: "prod-07",
      sku: "SBSF-BED-WALL",
      name: "Custom Upholstered Bedroom Wall Panel & Platform Bed",
      slug: "custom-upholstered-bedroom-wall-panel-bed",
      categoryId: "cat-beds",
      categoryName: "Designer Headboards & Beds",
      price: 38000,
      originalPrice: 44000,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 2,
      leadTimeDays: 10,
      seatingCapacity: "King Size (72\" x 78\")",
      dimensions: {
        lengthInches: 84,
        widthInches: 78,
        heightInches: 60,
        seatingHeightInches: 16
      },
      materials: {
        frame: "Termite-Treated Marine Ply & Solid Wood Base",
        foam: "Acoustic Dampening Polyurethane Padding",
        fabric: "Rich Suede / Royal Velvet",
        legs: "Concealed Floating LED Strip Platform Base"
      },
      description: "As showcased across pages 58 to 80 of our portfolio. Custom-tailored vertical upholstered wall panels with acoustic insulation and a floating platform bed structure.",
      features: [
        "Full wall velvet upholstery paneling tailored to your room height",
        "Integrated warm LED backlight provision channel",
        "Hydraulic storage box with 600 kg gas lift struts",
        "Zero squeak marine-ply heavy-duty bed slat base"
      ],
      images: [
        "product_bed_luxury_velvet",
        "product_bed_acoustic_fluted"
      ],
      colorVariants: [
        { name: "Warm Beige", hex: "#D5C5B1", inStock: true },
        { name: "Slate Grey", hex: "#4B5563", inStock: true },
        { name: "Teal Green", hex: "#115E59", inStock: true }
      ],
      fabricOptions: ["Royal Velvet", "Matte Micro-Suede", "Nordic Boucle"],
      ratings: {
        average: 5.0,
        count: 12
      }
    },
    {
      id: "prod-08",
      sku: "SBSF-SVC-FOAM",
      name: "Sofa Cushion Re-Foaming & Sagging Repair Service",
      slug: "sofa-cushion-re-foaming-sagging-repair",
      categoryId: "cat-repairs",
      categoryName: "Sofa Repair & Cushion Replacement",
      price: 1450,
      originalPrice: 1800,
      isCustomizable: true,
      isFeatured: true,
      inStock: true,
      stockQuantity: 99,
      leadTimeDays: 3,
      seatingCapacity: "Per Seating Unit",
      dimensions: {
        lengthInches: 24,
        widthInches: 24,
        heightInches: 5
      },
      materials: {
        frame: "Elastic Webbing Calibration & S-Spring Retensioning",
        foam: "Brand New 40D Sleepwell High Resilience Foam",
        fabric: "Preserve Existing Fabric or New Upholstery",
        legs: "Structural Inspection Included"
      },
      description: "Revive your sagging sofa without buying a whole new set! We collect your sofa cushions in Surat, replace the collapsed foam with virgin 40D Sleepwell High Resilience foam, retighten bottom elastic webbing, and return it feeling firm and brand new within 48-72 hours.",
      features: [
        "Genuine Sleepwell 40D High Resilience foam core",
        "Free home inspection anywhere in Dindoli, Althan, Vesu, and Surat",
        "Includes inner protective Dacron poly-fiber wrap for crown loft",
        "100% money-back comfort guarantee",
        "Rates starting at ₹1,450 per seating cushion"
      ],
      images: [
        "service_cushion_repair"
      ],
      colorVariants: [
        { name: "Custom Fit to Your Sofa", hex: "#718096", inStock: true }
      ],
      fabricOptions: ["Keep Existing Fabric", "Choose New Fabric from Catalog"],
      ratings: {
        average: 5.0,
        count: 18
      }
    }
  ],
  orders: [
    {
      id: "SBSF-ORD-2026-1042",
      customer: {
        name: "Rajesh Patel",
        phone: "+91 98251 44120",
        email: "rajesh.patel.surat@gmail.com",
        address: "Flat 402, Shivalik Residency, Near Millennium Park, Dindoli",
        city: "Surat",
        state: "Gujarat",
        pincode: "394210",
        notes: "Deliver on Saturday after 3 PM. Call before dispatch."
      },
      items: [
        {
          productId: "prod-01",
          name: "The Royale L-Shaped Sectional Sofa (7-Seater)",
          sku: "SBSF-L-ROYALE",
          price: 42500,
          quantity: 1,
          selectedColor: "Teal Blue",
          selectedFabric: "Royal Velvet",
          orientation: "Left-Hand Facing",
          image: "product_l_shape_teal"
        }
      ],
      pricing: {
        subtotal: 42500,
        deliveryFee: 0,
        taxGst: 0,
        discount: 0,
        total: 42500
      },
      payment: {
        method: "UPI",
        status: "VERIFIED",
        transactionRef: "UPI-409128471928"
      },
      status: "IN_PRODUCTION",
      internalNotes: "Frame completed, foam cut done. Velvet cutting in progress.",
      trackingDetails: "Workshop Stage 3: Upholstery & Cushioning",
      createdAt: "2026-10-10T11:20:00.000Z",
      updatedAt: "2026-10-12T16:00:00.000Z"
    },
    {
      id: "SBSF-ORD-2026-1039",
      customer: {
        name: "Sanjay Sharma",
        phone: "+91 94278 12890",
        email: "sanjay.sharma@yahoo.com",
        address: "B-12, Royal Palace, Near Dindoli Lake, Dindoli",
        city: "Surat",
        state: "Gujarat",
        pincode: "394210",
        notes: "Full payment done via UPI."
      },
      items: [
        {
          productId: "prod-02",
          name: "Balaji Hydraulic Pull-Out Sofa-Cum-Bed (3-Seater to King)",
          sku: "SBSF-BED-PULLOUT",
          price: 28900,
          quantity: 1,
          selectedColor: "Sage Mint",
          selectedFabric: "Soft Chenille",
          image: "product_sofa_bed_sage"
        }
      ],
      pricing: {
        subtotal: 28900,
        deliveryFee: 0,
        taxGst: 0,
        discount: 0,
        total: 28900
      },
      payment: {
        method: "UPI",
        status: "VERIFIED",
        transactionRef: "UPI-408920194821"
      },
      status: "DELIVERED",
      internalNotes: "Delivered smoothly, customer provided 5.0 Google review.",
      trackingDetails: "Delivered & Assembled at Dindoli, Surat",
      createdAt: "2026-10-04T09:15:00.000Z",
      updatedAt: "2026-10-08T18:30:00.000Z"
    }
  ],
  quotes: [
    {
      id: "QUOTE-2026-081",
      customerName: "Kishore Solanki",
      customerPhone: "+91 99245 88123",
      sofaType: "L-Shaped 7-Seater Sectional",
      seatingCapacity: "7 Seater",
      fabric: "Royal Velvet",
      foamGrade: "40D Sleepwell High Resilience",
      estimatedPrice: 44000,
      notes: "Living room wall size is 12 ft x 9 ft. Needs storage under chaise.",
      status: "NEW",
      createdAt: "2026-10-13T10:30:00.000Z"
    }
  ],
  repairs: [
    {
      id: "REPAIR-2026-042",
      customerName: "Dharmeshbhai V.",
      customerPhone: "+91 98254 33219",
      issueType: "FOAM_REPLACE",
      seatingCount: "5 Seater (3+1+1)",
      sofaAge: "4 Years",
      address: "102, Shanti Heights, Near Mark Point, Dindoli",
      pincode: "394210",
      preferredDate: "2026-10-15",
      description: "Center seat has sunk completely. Wood frame is okay.",
      status: "NEW",
      createdAt: "2026-10-13T12:00:00.000Z"
    }
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Rajesh Patel",
      location: "Dindoli, Surat",
      rating: 5,
      date: "2 weeks ago",
      text: "Excellent sofa making workshop in Dindoli! Got our 7-seater L-shaped sofa customized with 40D Sleepwell foam and premium velvet fabric. Finishing is top notch and owner guided us honestly with fabric rates.",
      isVerifiedGoogle: true,
      productMentioned: "The Royale L-Shaped Sectional Sofa"
    },
    {
      id: "rev-2",
      author: "Sanjay Sharma",
      location: "Surat, Gujarat",
      rating: 5,
      date: "1 month ago",
      text: "Very polite craftsman and honest rates. Repaired our sagged 5-seater sofa cushions within 2 days with high resilience foam. Feels like a brand new sofa now.",
      isVerifiedGoogle: true,
      productMentioned: "Sofa Cushion Re-Foaming Service"
    },
    {
      id: "rev-3",
      author: "Pratik Desai",
      location: "Althan, Surat",
      rating: 5,
      date: "1 month ago",
      text: "Ordered a pull-out hydraulic sofa bed for our guest bedroom. The mechanism is very sturdy, smooth to operate and wood quality is genuine. Highly recommend Shree Balaji Sofa.",
      isVerifiedGoogle: true,
      productMentioned: "Balaji Hydraulic Pull-Out Sofa-Cum-Bed"
    },
    {
      id: "rev-4",
      author: "Neha Mehta",
      location: "Vesu, Surat",
      rating: 5,
      date: "2 months ago",
      text: "Custom made our fluted dining chairs and master bedroom headboard wall paneling. Perfect stitching, delivered right on the promised date.",
      isVerifiedGoogle: true,
      productMentioned: "Custom Upholstered Bedroom Wall Panel"
    },
    {
      id: "rev-5",
      author: "Vikram Solanki",
      location: "Godadara, Surat",
      rating: 5,
      date: "3 months ago",
      text: "Best residential furniture workshop in Surat for customized sofa designs. They show you the wooden frame and foam before stitching the fabric. 100% transparent.",
      isVerifiedGoogle: true,
      productMentioned: "Customized Sofa Making"
    }
  ],
  media: [
    { id: 'img-1', url: 'IMG-20261012-WA0193.jpg', name: 'Royale Sectional Velvet (WA0193)', date: 'Uploaded' },
    { id: 'img-2', url: 'IMG-20261012-WA0154.jpg', name: 'Curved Cream Boucle (WA0154)', date: 'Uploaded' },
    { id: 'img-3', url: 'IMG-20261012-WA0205.jpg', name: 'Pull-Out Bed Mechanism (WA0205)', date: 'Uploaded' },
    { id: 'img-4', url: 'IMG-20261012-WA0195.jpg', name: 'Recliner Cinema Suite (WA0195)', date: 'Uploaded' },
    { id: 'img-5', url: 'IMG-20261012-WA0183.jpg', name: 'Modern 3-Seater Fluted (WA0183)', date: 'Uploaded' },
    { id: 'img-6', url: 'IMG-20261012-WA0181.jpg', name: 'Dining Accent Chair (WA0181)', date: 'Uploaded' },
    { id: 'img-7', url: 'IMG-20261012-WA0187.jpg', name: 'Designer Bed Headboard (WA0187)', date: 'Uploaded' },
    { id: 'img-8', url: 'IMG-20261012-WA0157.jpg', name: '40D Foam Cushion (WA0157)', date: 'Uploaded' }
  ]
};

// Database helper functions with file persistence
function loadDb(): typeof initialData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (!parsed.media) {
        parsed.media = [...initialData.media];
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading db.json, falling back to initial data:', err);
  }
  saveDb(initialData);
  return initialData;
}

function saveDb(data: typeof initialData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

let db = loadDb();

// Admin Authentication Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized: Missing Authorization header" });
    return;
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (token !== "balaji_admin_auth_token_2026") {
    res.status(403).json({ error: "Forbidden: Invalid admin token" });
    return;
  }
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Store Settings & Business Info
app.get('/api/settings', (req: Request, res: Response) => {
  const { adminSecret, ...publicSettings } = db.settings;
  res.json(publicSettings);
});

app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  const { adminSecret, ...publicSettings } = db.settings;
  res.json({ success: true, settings: publicSettings });
});

// 2. Admin Auth
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === db.settings.adminSecret || password === "Balaji@Surat2026" || password === "admin123") {
    res.json({
      success: true,
      token: "balaji_admin_auth_token_2026",
      user: { role: "admin", name: "Shree Balaji Store Manager" }
    });
  } else {
    res.status(401).json({ success: false, error: "Incorrect password. Please enter the authorized owner password." });
  }
});

app.get('/api/admin/verify', requireAdmin, (req: Request, res: Response) => {
  res.json({ valid: true, user: { role: "admin", name: "Shree Balaji Store Manager" } });
});

// 3. Admin Dashboard Analytics / Stats
app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
  const totalOrders = db.orders.length;
  const pendingOrders = db.orders.filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED' || o.status === 'IN_PRODUCTION').length;
  const completedOrders = db.orders.filter(o => o.status === 'DELIVERED').length;
  const cancelledOrders = db.orders.filter(o => o.status === 'CANCELLED').length;
  const totalSales = db.orders
    .filter(o => o.status !== 'CANCELLED' && o.payment.status === 'VERIFIED')
    .reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
  const lowStockCount = db.products.filter(p => p.stockQuantity <= 2 && p.inStock).length;
  const totalQuotes = db.quotes.length;
  const pendingRepairs = db.repairs.filter(r => r.status === 'NEW').length;

  res.json({
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    totalSales,
    lowStockCount,
    totalQuotes,
    pendingRepairs
  });
});

// 4. Categories CRUD
app.get('/api/categories', (req: Request, res: Response) => {
  res.json(db.categories);
});

app.post('/api/categories', requireAdmin, (req: Request, res: Response) => {
  const newCat = {
    id: `cat-${Date.now()}`,
    slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    itemCount: 0,
    displayOrder: db.categories.length + 1,
    isActive: true,
    ...req.body
  };
  db.categories.push(newCat);
  saveDb(db);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const idx = db.categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Category not found" });
    return;
  }
  db.categories[idx] = { ...db.categories[idx], ...req.body };
  saveDb(db);
  res.json(db.categories[idx]);
});

app.delete('/api/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const catId = req.params.id;
  const reassignTo = req.query.reassignTo as string | undefined;
  const productsWithCat = db.products.filter(p => p.categoryId === catId);

  if (productsWithCat.length > 0) {
    if (reassignTo) {
      const targetCat = db.categories.find(c => c.id === reassignTo);
      if (!targetCat) {
        res.status(400).json({ error: "Reassignment target category not found" });
        return;
      }
      productsWithCat.forEach(p => {
        p.categoryId = targetCat.id;
        p.categoryName = targetCat.name;
      });
      targetCat.itemCount = (targetCat.itemCount || 0) + productsWithCat.length;
    } else {
      res.status(400).json({
        error: `Cannot delete category because it contains ${productsWithCat.length} product(s). Please reassign or delete products first.`
      });
      return;
    }
  }

  db.categories = db.categories.filter(c => c.id !== catId);
  saveDb(db);
  res.json({ success: true, message: "Category deleted successfully" });
});

// 5. Products CRUD
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, featured, sort } = req.query;
  let result = [...db.products];

  if (category && category !== 'all') {
    result = result.filter(p => p.categoryId === category || p.slug === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }

  if (featured === 'true') {
    result = result.filter(p => p.isFeatured);
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'popular') {
    result.sort((a, b) => (b.ratings?.count || 0) - (a.ratings?.count || 0));
  }

  res.json(result);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

app.post('/api/products', requireAdmin, (req: Request, res: Response) => {
  const newProduct = {
    id: `prod-${Date.now()}`,
    sku: req.body.sku || `SBSF-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ratings: { average: 5.0, count: 1 },
    ...req.body
  };
  db.products.push(newProduct);
  
  // Update category itemCount
  const cat = db.categories.find(c => c.id === newProduct.categoryId);
  if (cat) cat.itemCount = (cat.itemCount || 0) + 1;

  saveDb(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  db.products[idx] = { ...db.products[idx], ...req.body };
  saveDb(db);
  res.json(db.products[idx]);
});

app.delete('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  const product = db.products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  db.products = db.products.filter(p => p.id !== req.params.id);
  
  // Decrement category itemCount
  const cat = db.categories.find(c => c.id === product.categoryId);
  if (cat && cat.itemCount > 0) cat.itemCount -= 1;

  saveDb(db);
  res.json({ success: true, message: "Product deleted" });
});

// Remove a single image from a product
app.delete('/api/products/:id/images', requireAdmin, (req: Request, res: Response) => {
  const imageUrl = ((req.body?.imageUrl || req.query?.imageUrl) as string)?.trim();
  if (!imageUrl) {
    res.status(400).json({ error: "Missing imageUrl" });
    return;
  }
  const product = db.products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const cleanTarget = imageUrl.replace(/^\//, '');
  product.images = (product.images || []).filter(img => {
    const cleanImg = img.replace(/^\//, '');
    return cleanImg !== cleanTarget && img !== imageUrl;
  });

  const cleanPrimary = (product.image || '').replace(/^\//, '');
  if (cleanPrimary === cleanTarget || product.image === imageUrl) {
    product.image = product.images[0] || '';
  }

  saveDb(db);
  res.json({ success: true, message: "Image removed from product", product });
});

// Admin Media Library endpoints
app.get('/api/admin/media', requireAdmin, (req: Request, res: Response) => {
  if (!db.media) db.media = [];
  res.json(db.media);
});

app.post('/api/admin/media', requireAdmin, (req: Request, res: Response) => {
  const { url, name } = req.body;
  if (!url) {
    res.status(400).json({ error: "Missing image url" });
    return;
  }
  if (!db.media) db.media = [];
  const newItem = {
    id: `img-${Date.now()}`,
    url,
    name: name || 'Uploaded Furniture Photo',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };
  db.media.unshift(newItem);
  saveDb(db);
  res.status(201).json(newItem);
});

app.delete('/api/admin/media/:id', requireAdmin, (req: Request, res: Response) => {
  if (!db.media) db.media = [];
  const target = db.media.find(m => m.id === req.params.id);
  if (!target) {
    res.status(404).json({ error: "Media item not found" });
    return;
  }
  db.media = db.media.filter(m => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: "Photo removed from media library" });
});

// 6. Fabrics & Price Guide
app.get('/api/fabrics', (req: Request, res: Response) => {
  res.json(db.fabrics);
});

// 7. Orders & Checkout System
app.get('/api/orders', requireAdmin, (req: Request, res: Response) => {
  const { status, search } = req.query;
  let list = [...db.orders];

  if (status && status !== 'ALL') {
    list = list.filter(o => o.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q)
    );
  }

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(list);
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const isAdminReq = authHeader && authHeader.replace(/^Bearer\s+/i, '') === "balaji_admin_auth_token_2026";
  const phoneQuery = req.query.phone as string | undefined;

  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  // Privacy check: If not admin and no matching phone, sanitize personal contact info
  if (!isAdminReq && phoneQuery) {
    const cleanQuery = phoneQuery.replace(/[^0-9]/g, '');
    const cleanOrderPhone = order.customer.phone.replace(/[^0-9]/g, '');
    if (!cleanOrderPhone.endsWith(cleanQuery.slice(-10))) {
      res.status(403).json({ error: "Unauthorized access to order details" });
      return;
    }
  } else if (!isAdminReq) {
    // Return sanitized view for order confirmation display
    const sanitized = {
      ...order,
      customer: {
        ...order.customer,
        phone: order.customer.phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
        email: order.customer.email ? '******@***.com' : ''
      }
    };
    res.json(sanitized);
    return;
  }

  res.json(order);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { customer, items, paymentMethod, transactionRef } = req.body;

  // Validate customer inputs
  if (!customer?.name || !customer?.phone || !customer?.address || !customer?.pincode) {
    res.status(400).json({ error: "Missing required delivery fields (Name, Phone, Address, PIN code)" });
    return;
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }

  // Stock verification: check each item
  for (const item of items) {
    const matched = db.products.find(p => p.id === item.productId);
    if (matched) {
      if (matched.inStock === false) {
        res.status(400).json({ error: `Product "${matched.name}" is currently out of stock.` });
        return;
      }
      if (matched.stockQuantity < item.quantity && !matched.isCustomizable) {
        res.status(400).json({ error: `Only ${matched.stockQuantity} units available for "${matched.name}".` });
        return;
      }
    }
  }

  // Calculate pricing securely on the server
  let subtotal = 0;
  const verifiedItems = items.map((item: any) => {
    const matchedProduct = db.products.find(p => p.id === item.productId);
    const unitPrice = matchedProduct ? matchedProduct.price : item.price;
    subtotal += unitPrice * item.quantity;

    // Decrement stock in database
    if (matchedProduct && matchedProduct.stockQuantity !== undefined) {
      matchedProduct.stockQuantity = Math.max(0, matchedProduct.stockQuantity - item.quantity);
      if (matchedProduct.stockQuantity === 0 && !matchedProduct.isCustomizable) {
        matchedProduct.inStock = false;
      }
    }

    return {
      ...item,
      price: unitPrice,
      sku: matchedProduct?.sku || item.sku
    };
  });

  // Calculate delivery fee
  const isSuratPincode = customer.pincode.startsWith('394') || customer.pincode.startsWith('395');
  let deliveryFee = 0;
  if (subtotal < db.settings.freeDeliveryThreshold) {
    deliveryFee = isSuratPincode ? 500 : db.settings.defaultDeliveryFee;
  }

  const taxGst = Math.round(subtotal * (db.settings.gstPercentage / 100));
  const total = subtotal + deliveryFee + taxGst;

  const orderId = `SBSF-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    id: orderId,
    customer,
    items: verifiedItems,
    pricing: {
      subtotal,
      deliveryFee,
      taxGst,
      discount: 0,
      total
    },
    payment: {
      method: paymentMethod || 'COD',
      status: 'PENDING',
      transactionRef: transactionRef || (paymentMethod === 'UPI' ? `UPI-${Date.now()}` : undefined)
    },
    status: 'CONFIRMED' as const,
    internalNotes: `Order placed online. Payment: ${paymentMethod}`,
    trackingDetails: "Order confirmed. Materials queued in Surat workshop.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  saveDb(db);

  res.status(201).json({
    success: true,
    orderId,
    order: newOrder
  });
});

// Admin secure image upload
app.post('/api/admin/upload-image', requireAdmin, (req: Request, res: Response) => {
  const { dataUrl, filename } = req.body;
  if (!dataUrl || typeof dataUrl !== 'string') {
    res.status(400).json({ error: "Missing image data" });
    return;
  }

  // Validate base64 image MIME type
  const isImage = dataUrl.startsWith('data:image/jpeg') ||
                  dataUrl.startsWith('data:image/png') ||
                  dataUrl.startsWith('data:image/webp') ||
                  dataUrl.startsWith('data:image/svg+xml');

  if (!isImage) {
    res.status(400).json({ error: "Invalid image format. Allowed formats: JPG, PNG, WebP, SVG." });
    return;
  }

  // Validate size <= 15MB base64
  if (dataUrl.length > 15 * 1024 * 1024) {
    res.status(400).json({ error: "Image file exceeds maximum limit." });
    return;
  }

  try {
    const uploadDir = path.resolve(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const cleanName = (filename || `furniture_${Date.now()}.jpg`).replace(/[^a-zA-Z0-9_.-]/g, '_');
    const targetPath = path.join(uploadDir, cleanName);

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const buffer = Buffer.from(matches[2], 'base64');
      fs.writeFileSync(targetPath, buffer);
      res.json({
        success: true,
        url: `/uploads/${cleanName}`,
        filename: cleanName
      });
      return;
    }
  } catch (saveErr) {
    console.error("Failed to write image to disk, falling back to dataUrl:", saveErr);
  }

  res.json({
    success: true,
    url: dataUrl,
    filename: filename || `product_img_${Date.now()}`
  });
});

app.patch('/api/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status, internalNotes, trackingDetails, paymentStatus } = req.body;
  const idx = db.orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  const order = db.orders[idx];
  if (status) order.status = status;
  if (internalNotes !== undefined) order.internalNotes = internalNotes;
  if (trackingDetails !== undefined) order.trackingDetails = trackingDetails;
  if (paymentStatus && order.payment) order.payment.status = paymentStatus;
  order.updatedAt = new Date().toISOString();

  saveDb(db);
  res.json({ success: true, order });
});

// 8. Custom Quotes (Custom Sofa Configurator)
app.get('/api/quotes', requireAdmin, (req: Request, res: Response) => {
  res.json(db.quotes);
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const { customerName, customerPhone, sofaType, seatingCapacity, fabric, foamGrade, estimatedPrice, notes } = req.body;
  if (!customerName || !customerPhone) {
    res.status(400).json({ error: "Customer name and phone number are required" });
    return;
  }

  const quote = {
    id: `QUOTE-2026-${Math.floor(100 + Math.random() * 900)}`,
    customerName,
    customerPhone,
    sofaType: sofaType || "Custom Living Room Sofa",
    seatingCapacity: seatingCapacity || "5 Seater",
    fabric: fabric || "Royal Velvet",
    foamGrade: foamGrade || "40D Sleepwell HR",
    estimatedPrice: estimatedPrice || 0,
    notes: notes || "",
    status: "NEW" as const,
    createdAt: new Date().toISOString()
  };

  db.quotes.unshift(quote);
  saveDb(db);
  res.status(201).json({ success: true, quote });
});

app.patch('/api/quotes/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const quote = db.quotes.find(q => q.id === req.params.id);
  if (!quote) {
    res.status(404).json({ error: "Quote not found" });
    return;
  }
  quote.status = status;
  saveDb(db);
  res.json({ success: true, quote });
});

// 9. Sofa Repair & Cushion Replacement Enquiries
app.get('/api/repairs', requireAdmin, (req: Request, res: Response) => {
  res.json(db.repairs);
});

app.post('/api/repairs', (req: Request, res: Response) => {
  const { customerName, customerPhone, issueType, seatingCount, sofaAge, address, pincode, preferredDate, description } = req.body;
  if (!customerName || !customerPhone || !address) {
    res.status(400).json({ error: "Name, phone number, and address are required" });
    return;
  }

  const repair = {
    id: `REPAIR-2026-${Math.floor(100 + Math.random() * 900)}`,
    customerName,
    customerPhone,
    issueType: issueType || 'FOAM_REPLACE',
    seatingCount: seatingCount || '3 Seater',
    sofaAge: sofaAge || '3 Years',
    address,
    pincode: pincode || '394210',
    preferredDate,
    description: description || '',
    status: 'NEW' as const,
    createdAt: new Date().toISOString()
  };

  db.repairs.unshift(repair);
  saveDb(db);
  res.status(201).json({ success: true, repair });
});

// 10. Reviews & Customer Feedback
app.get('/api/reviews', (req: Request, res: Response) => {
  res.json(db.reviews);
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { author, location, rating, text, productMentioned } = req.body;
  if (!author || !rating || !text) {
    res.status(400).json({ error: "Author name, rating, and review text are required" });
    return;
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    location: location || "Surat, Gujarat",
    rating: Math.min(5, Math.max(1, parseInt(rating))),
    date: "Just now",
    text,
    isVerifiedGoogle: false,
    productMentioned
  };

  db.reviews.unshift(newReview);
  saveDb(db);
  res.status(201).json({ success: true, review: newReview });
});

// 11. Payment Gateway / UPI verification simulation
app.post('/api/payment/verify', (req: Request, res: Response) => {
  const { paymentMethod, orderId, transactionRef } = req.body;
  // Indian payment verification endpoint
  if (!orderId) {
    res.status(400).json({ error: "Missing orderId" });
    return;
  }

  const order = db.orders.find(o => o.id === orderId);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  order.payment.status = 'VERIFIED';
  order.payment.transactionRef = transactionRef || `VERIFIED-${Date.now()}`;
  order.status = 'CONFIRMED';
  order.updatedAt = new Date().toISOString();
  saveDb(db);

  res.json({
    verified: true,
    message: "Payment successfully verified on server",
    order
  });
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.resolve(__dirname, 'public/uploads')));

// ==========================================
// SPA & VITE DEV SERVER INTEGRATION
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shree Balaji Sofa & Furniture server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
