// High-fidelity SVG visual assets for Shree Balaji Sofa & Furniture
// Guarantees zero broken images and faithful representation of the furniture items matching the client catalog & workshop

export const IMAGES: Record<string, string> = {
  // 1. L-Shaped Sectional Sofa - Teal Blue
  product_l_shape_teal: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF7F2"/><stop offset="100%" stop-color="#EFE9DE"/></linearGradient>
        <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E6778"/><stop offset="50%" stop-color="#145362"/><stop offset="100%" stop-color="#0E3D48"/></linearGradient>
        <linearGradient id="cushionT" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#2D7B8E"/><stop offset="100%" stop-color="#174E5B"/></linearGradient>
        <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F3DC9B"/><stop offset="50%" stop-color="#D4AF37"/><stop offset="100%" stop-color="#9A781E"/></linearGradient>
        <pattern id="quiltP" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/></pattern>
      </defs>
      <rect width="800" height="600" fill="url(#bgT)"/>
      <ellipse cx="400" cy="520" rx="360" ry="32" fill="#D5CCC0" opacity="0.6"/>
      <g>
        <polygon points="120,490 126,490 123,535 117,535" fill="url(#goldG)"/>
        <polygon points="260,490 266,490 263,535 257,535" fill="url(#goldG)"/>
        <polygon points="560,490 566,490 563,535 557,535" fill="url(#goldG)"/>
        <polygon points="700,490 706,490 703,535 697,535" fill="url(#goldG)"/>
        <rect x="100" y="210" width="620" height="150" rx="16" fill="url(#tealGrad)"/>
        <rect x="115" y="225" width="135" height="120" rx="10" fill="url(#cushionT)"/>
        <rect x="260" y="225" width="135" height="120" rx="10" fill="url(#cushionT)"/>
        <rect x="405" y="225" width="135" height="120" rx="10" fill="url(#cushionT)"/>
        <rect x="90" y="420" width="640" height="75" rx="8" fill="url(#tealGrad)"/>
        <rect x="90" y="420" width="640" height="75" rx="8" fill="url(#quiltP)"/>
        <rect x="90" y="488" width="640" height="6" fill="url(#goldG)"/>
        <rect x="100" y="340" width="145" height="85" rx="12" fill="url(#cushionT)"/>
        <rect x="250" y="340" width="145" height="85" rx="12" fill="url(#cushionT)"/>
        <rect x="400" y="340" width="145" height="85" rx="12" fill="url(#cushionT)"/>
        <path d="M 545,230 L 710,230 L 710,480 L 545,480 Z" fill="url(#tealGrad)"/>
        <rect x="550" y="260" width="155" height="165" rx="14" fill="url(#cushionT)"/>
        <rect x="70" y="280" width="45" height="185" rx="16" fill="url(#tealGrad)"/>
        <rect x="705" y="280" width="45" height="185" rx="16" fill="url(#tealGrad)"/>
      </g>
    </svg>
  `)}`,

  // 1b. L-Shaped Sectional Sofa - Charcoal Grey
  product_l_shape_grey: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F5F5F7"/><stop offset="100%" stop-color="#E5E5EB"/></linearGradient>
        <linearGradient id="greyGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4B5563"/><stop offset="50%" stop-color="#374151"/><stop offset="100%" stop-color="#1F2937"/></linearGradient>
        <linearGradient id="cushionG" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#6B7280"/><stop offset="100%" stop-color="#374151"/></linearGradient>
        <linearGradient id="goldG2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F3DC9B"/><stop offset="50%" stop-color="#D4AF37"/><stop offset="100%" stop-color="#9A781E"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgG)"/>
      <ellipse cx="400" cy="520" rx="360" ry="32" fill="#D1D5DB" opacity="0.6"/>
      <g>
        <polygon points="120,490 126,490 123,535 117,535" fill="url(#goldG2)"/>
        <polygon points="260,490 266,490 263,535 257,535" fill="url(#goldG2)"/>
        <polygon points="560,490 566,490 563,535 557,535" fill="url(#goldG2)"/>
        <polygon points="700,490 706,490 703,535 697,535" fill="url(#goldG2)"/>
        <rect x="100" y="210" width="620" height="150" rx="16" fill="url(#greyGrad)"/>
        <rect x="115" y="225" width="135" height="120" rx="10" fill="url(#cushionG)"/>
        <rect x="260" y="225" width="135" height="120" rx="10" fill="url(#cushionG)"/>
        <rect x="405" y="225" width="135" height="120" rx="10" fill="url(#cushionG)"/>
        <rect x="90" y="420" width="640" height="75" rx="8" fill="url(#greyGrad)"/>
        <rect x="90" y="488" width="640" height="6" fill="url(#goldG2)"/>
        <rect x="100" y="340" width="145" height="85" rx="12" fill="url(#cushionG)"/>
        <rect x="250" y="340" width="145" height="85" rx="12" fill="url(#cushionG)"/>
        <rect x="400" y="340" width="145" height="85" rx="12" fill="url(#cushionG)"/>
        <path d="M 545,230 L 710,230 L 710,480 L 545,480 Z" fill="url(#greyGrad)"/>
        <rect x="550" y="260" width="155" height="165" rx="14" fill="url(#cushionG)"/>
        <rect x="70" y="280" width="45" height="185" rx="16" fill="url(#greyGrad)"/>
        <rect x="705" y="280" width="45" height="185" rx="16" fill="url(#greyGrad)"/>
      </g>
    </svg>
  `)}`,

  // 1c. L-Shaped Sectional Sofa - Ivory Cream
  product_l_shape_cream: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FCFAF6"/><stop offset="100%" stop-color="#ECE3D5"/></linearGradient>
        <linearGradient id="creamGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF5EC"/><stop offset="50%" stop-color="#EFE5D3"/><stop offset="100%" stop-color="#D7C9B1"/></linearGradient>
        <linearGradient id="darkBrown" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#5B402B"/><stop offset="100%" stop-color="#3B2616"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgC)"/>
      <ellipse cx="400" cy="520" rx="360" ry="32" fill="#D6CAB8" opacity="0.6"/>
      <g>
        <rect x="120" y="490" width="8" height="40" fill="#3B2616"/>
        <rect x="260" y="490" width="8" height="40" fill="#3B2616"/>
        <rect x="560" y="490" width="8" height="40" fill="#3B2616"/>
        <rect x="700" y="490" width="8" height="40" fill="#3B2616"/>
        <rect x="100" y="210" width="620" height="150" rx="16" fill="url(#creamGrad2)"/>
        <rect x="115" y="225" width="135" height="120" rx="10" fill="#FFF"/>
        <rect x="260" y="225" width="135" height="120" rx="10" fill="#FFF"/>
        <rect x="405" y="225" width="135" height="120" rx="10" fill="#FFF"/>
        <rect x="90" y="420" width="640" height="75" rx="8" fill="url(#darkBrown)"/>
        <rect x="100" y="340" width="145" height="85" rx="12" fill="#FFF"/>
        <rect x="250" y="340" width="145" height="85" rx="12" fill="#FFF"/>
        <rect x="400" y="340" width="145" height="85" rx="12" fill="#FFF"/>
        <path d="M 545,230 L 710,230 L 710,480 L 545,480 Z" fill="url(#creamGrad2)"/>
        <rect x="550" y="260" width="155" height="165" rx="14" fill="#FFF"/>
        <rect x="70" y="280" width="45" height="185" rx="16" fill="url(#darkBrown)"/>
        <rect x="705" y="280" width="45" height="185" rx="16" fill="url(#darkBrown)"/>
      </g>
    </svg>
  `)}`,

  // 2. Sofa-Cum-Bed - Sage Green (From Workshop Video)
  product_sofa_bed_sage: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgSage" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F8FAF7"/><stop offset="100%" stop-color="#EAEFE8"/></linearGradient>
        <linearGradient id="sageG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#779684"/><stop offset="50%" stop-color="#587A67"/><stop offset="100%" stop-color="#415E4D"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgSage)"/>
      <ellipse cx="400" cy="530" rx="350" ry="30" fill="#CAD5C9" opacity="0.6"/>
      <g>
        <rect x="150" y="160" width="500" height="150" rx="14" fill="url(#sageG)"/>
        <g stroke="rgba(255,255,255,0.25)" stroke-width="3">
          <line x1="180" y1="170" x2="280" y2="290"/>
          <line x1="230" y1="170" x2="330" y2="290"/>
          <line x1="280" y1="170" x2="380" y2="290"/>
          <line x1="420" y1="290" x2="520" y2="170"/>
          <line x1="470" y1="290" x2="570" y2="170"/>
          <line x1="520" y1="290" x2="620" y2="170"/>
        </g>
        <rect x="130" y="270" width="540" height="160" rx="10" fill="url(#sageG)"/>
        <rect x="160" y="280" width="230" height="90" rx="12" fill="#698A76"/>
        <rect x="410" y="280" width="230" height="90" rx="12" fill="#698A76"/>
        <rect x="150" y="380" width="500" height="130" rx="10" fill="#4D6B59"/>
        <rect x="375" y="440" width="50" height="30" rx="6" fill="#8FAFA0" stroke="#FFF" stroke-width="1.5"/>
        <rect x="110" y="230" width="45" height="230" rx="14" fill="url(#sageG)"/>
        <rect x="645" y="230" width="45" height="230" rx="14" fill="url(#sageG)"/>
      </g>
    </svg>
  `)}`,

  // 2b. Sofa-Cum-Bed - Burgundy Wine
  product_sofa_bed_burgundy: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgBur" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FCF8F8"/><stop offset="100%" stop-color="#EFE1E3"/></linearGradient>
        <linearGradient id="burG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7B1D28"/><stop offset="50%" stop-color="#5E141D"/><stop offset="100%" stop-color="#420B13"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgBur)"/>
      <ellipse cx="400" cy="530" rx="350" ry="30" fill="#D3C3C5" opacity="0.6"/>
      <g>
        <rect x="150" y="160" width="500" height="150" rx="14" fill="url(#burG)"/>
        <rect x="130" y="270" width="540" height="160" rx="10" fill="url(#burG)"/>
        <rect x="160" y="280" width="230" height="90" rx="12" fill="#711923"/>
        <rect x="410" y="280" width="230" height="90" rx="12" fill="#711923"/>
        <rect x="150" y="380" width="500" height="130" rx="10" fill="#420B13"/>
        <rect x="375" y="440" width="50" height="30" rx="6" fill="#8E2A37" stroke="#FFF" stroke-width="1.5"/>
        <rect x="110" y="230" width="45" height="230" rx="14" fill="url(#burG)"/>
        <rect x="645" y="230" width="45" height="230" rx="14" fill="url(#burG)"/>
      </g>
    </svg>
  `)}`,

  // 2c. Sofa-Cum-Bed - Camel Cognac
  product_sofa_bed_camel: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgCam" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF6F0"/><stop offset="100%" stop-color="#EFE3D0"/></linearGradient>
        <linearGradient id="camG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#A5683F"/><stop offset="50%" stop-color="#894F28"/><stop offset="100%" stop-color="#693716"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgCam)"/>
      <ellipse cx="400" cy="530" rx="350" ry="30" fill="#DACBB8" opacity="0.6"/>
      <g>
        <rect x="150" y="160" width="500" height="150" rx="14" fill="url(#camG)"/>
        <rect x="130" y="270" width="540" height="160" rx="10" fill="url(#camG)"/>
        <rect x="160" y="280" width="230" height="90" rx="12" fill="#995E36"/>
        <rect x="410" y="280" width="230" height="90" rx="12" fill="#995E36"/>
        <rect x="150" y="380" width="500" height="130" rx="10" fill="#693716"/>
        <rect x="375" y="440" width="50" height="30" rx="6" fill="#BA794C" stroke="#FFF" stroke-width="1.5"/>
        <rect x="110" y="230" width="45" height="230" rx="14" fill="url(#camG)"/>
        <rect x="645" y="230" width="45" height="230" rx="14" fill="url(#camG)"/>
      </g>
    </svg>
  `)}`,

  // 3. Recliner - Desert Cream
  product_recliner_cream: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgR1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF8F5"/><stop offset="100%" stop-color="#EBE3D7"/></linearGradient>
        <linearGradient id="creamR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F2EBE0"/><stop offset="50%" stop-color="#DFD4C3"/><stop offset="100%" stop-color="#C2B29A"/></linearGradient>
        <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#EED596"/><stop offset="50%" stop-color="#C9A346"/><stop offset="100%" stop-color="#8C691E"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgR1)"/>
      <ellipse cx="400" cy="530" rx="350" ry="30" fill="#D2C7B8" opacity="0.6"/>
      <g>
        <rect x="120" y="160" width="220" height="180" rx="18" fill="url(#creamR)"/>
        <rect x="135" y="180" width="190" height="90" rx="12" fill="#EAE0D1"/>
        <rect x="130" y="330" width="200" height="90" rx="14" fill="url(#creamR)"/>
        <polygon points="135,420 325,420 315,480 145,480" fill="url(#creamR)"/>
        <rect x="350" y="240" width="100" height="230" rx="14" fill="url(#creamR)"/>
        <circle cx="400" cy="385" r="14" fill="url(#goldBrass)"/>
        <circle cx="400" cy="385" r="10" fill="#1C1814"/>
        <circle cx="400" cy="425" r="14" fill="url(#goldBrass)"/>
        <circle cx="400" cy="425" r="10" fill="#1C1814"/>
        <rect x="460" y="160" width="220" height="180" rx="18" fill="url(#creamR)"/>
        <rect x="475" y="180" width="190" height="90" rx="12" fill="#EAE0D1"/>
        <rect x="470" y="330" width="200" height="90" rx="14" fill="url(#creamR)"/>
        <polygon points="475,420 665,420 655,480 485,480" fill="url(#creamR)"/>
        <rect x="80" y="240" width="50" height="220" rx="16" fill="url(#creamR)"/>
        <rect x="670" y="240" width="50" height="220" rx="16" fill="url(#creamR)"/>
      </g>
    </svg>
  `)}`,

  // 3b. Recliner - Espresso Brown
  product_recliner_espresso: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgR2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F7F5F4"/><stop offset="100%" stop-color="#E5DFDB"/></linearGradient>
        <linearGradient id="espG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A3B32"/><stop offset="50%" stop-color="#342820"/><stop offset="100%" stop-color="#241B15"/></linearGradient>
        <linearGradient id="goldBrass2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#EED596"/><stop offset="50%" stop-color="#C9A346"/><stop offset="100%" stop-color="#8C691E"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgR2)"/>
      <ellipse cx="400" cy="530" rx="350" ry="30" fill="#CCC4BD" opacity="0.6"/>
      <g>
        <rect x="120" y="160" width="220" height="180" rx="18" fill="url(#espG)"/>
        <rect x="135" y="180" width="190" height="90" rx="12" fill="#58473D"/>
        <rect x="130" y="330" width="200" height="90" rx="14" fill="url(#espG)"/>
        <polygon points="135,420 325,420 315,480 145,480" fill="url(#espG)"/>
        <rect x="350" y="240" width="100" height="230" rx="14" fill="url(#espG)"/>
        <circle cx="400" cy="385" r="14" fill="url(#goldBrass2)"/>
        <circle cx="400" cy="425" r="14" fill="url(#goldBrass2)"/>
        <rect x="460" y="160" width="220" height="180" rx="18" fill="url(#espG)"/>
        <rect x="475" y="180" width="190" height="90" rx="12" fill="#58473D"/>
        <rect x="470" y="330" width="200" height="90" rx="14" fill="url(#espG)"/>
        <polygon points="475,420 665,420 655,480 485,480" fill="url(#espG)"/>
        <rect x="80" y="240" width="50" height="220" rx="16" fill="url(#espG)"/>
        <rect x="670" y="240" width="50" height="220" rx="16" fill="url(#espG)"/>
      </g>
    </svg>
  `)}`,

  // 4. 3-Seater Fluted Back - Emerald Green
  product_3seater_emerald: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgEm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FBFBF7"/><stop offset="100%" stop-color="#EBECE4"/></linearGradient>
        <linearGradient id="emG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#14532D"/><stop offset="50%" stop-color="#0F3D21"/><stop offset="100%" stop-color="#082815"/></linearGradient>
        <linearGradient id="goldLeg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F3DC9B"/><stop offset="100%" stop-color="#B8860B"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgEm)"/>
      <ellipse cx="400" cy="520" rx="340" ry="28" fill="#CCD1C6" opacity="0.6"/>
      <g>
        <polygon points="140,460 148,460 144,525 136,525" fill="url(#goldLeg)"/>
        <polygon points="650,460 658,460 654,525 646,525" fill="url(#goldLeg)"/>
        <rect x="130" y="180" width="540" height="170" rx="18" fill="url(#emG)"/>
        <g stroke="rgba(255,255,255,0.2)" stroke-width="2.5">
          <line x1="180" y1="190" x2="180" y2="340"/>
          <line x1="230" y1="190" x2="230" y2="340"/>
          <line x1="280" y1="190" x2="280" y2="340"/>
          <line x1="330" y1="190" x2="330" y2="340"/>
          <line x1="380" y1="190" x2="380" y2="340"/>
          <line x1="430" y1="190" x2="430" y2="340"/>
          <line x1="480" y1="190" x2="480" y2="340"/>
          <line x1="530" y1="190" x2="530" y2="340"/>
          <line x1="580" y1="190" x2="580" y2="340"/>
          <line x1="620" y1="190" x2="620" y2="340"/>
        </g>
        <rect x="120" y="340" width="560" height="120" rx="14" fill="url(#emG)"/>
        <rect x="145" y="345" width="160" height="85" rx="10" fill="#166534"/>
        <rect x="320" y="345" width="160" height="85" rx="10" fill="#166534"/>
        <rect x="495" y="345" width="160" height="85" rx="10" fill="#166534"/>
        <rect x="100" y="260" width="45" height="180" rx="16" fill="url(#emG)"/>
        <rect x="655" y="260" width="45" height="180" rx="16" fill="url(#emG)"/>
      </g>
    </svg>
  `)}`,

  // 4b. 3-Seater Fluted Back - Royal Teal
  product_3seater_teal: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgTl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F7FAF9"/><stop offset="100%" stop-color="#E2EBEC"/></linearGradient>
        <linearGradient id="tlG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0E7490"/><stop offset="50%" stop-color="#155E75"/><stop offset="100%" stop-color="#164E63"/></linearGradient>
        <linearGradient id="goldLeg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F3DC9B"/><stop offset="100%" stop-color="#B8860B"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgTl)"/>
      <ellipse cx="400" cy="520" rx="340" ry="28" fill="#CAD7D9" opacity="0.6"/>
      <g>
        <polygon points="140,460 148,460 144,525 136,525" fill="url(#goldLeg2)"/>
        <polygon points="650,460 658,460 654,525 646,525" fill="url(#goldLeg2)"/>
        <rect x="130" y="180" width="540" height="170" rx="18" fill="url(#tlG)"/>
        <g stroke="rgba(255,255,255,0.2)" stroke-width="2.5">
          <line x1="200" y1="190" x2="200" y2="340"/>
          <line x1="260" y1="190" x2="260" y2="340"/>
          <line x1="320" y1="190" x2="320" y2="340"/>
          <line x1="380" y1="190" x2="380" y2="340"/>
          <line x1="440" y1="190" x2="440" y2="340"/>
          <line x1="500" y1="190" x2="500" y2="340"/>
          <line x1="560" y1="190" x2="560" y2="340"/>
          <line x1="600" y1="190" x2="600" y2="340"/>
        </g>
        <rect x="120" y="340" width="560" height="120" rx="14" fill="url(#tlG)"/>
        <rect x="145" y="345" width="160" height="85" rx="10" fill="#0891B2"/>
        <rect x="320" y="345" width="160" height="85" rx="10" fill="#0891B2"/>
        <rect x="495" y="345" width="160" height="85" rx="10" fill="#0891B2"/>
        <rect x="100" y="260" width="45" height="180" rx="16" fill="url(#tlG)"/>
        <rect x="655" y="260" width="45" height="180" rx="16" fill="url(#tlG)"/>
      </g>
    </svg>
  `)}`,

  // 5. Houndstooth & Tan Leatherette 2-Seater (As photographed in PDF Pages 2 & 7)
  product_houndstooth_tan: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgH" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FCFAF5"/><stop offset="100%" stop-color="#EFE6D5"/></linearGradient>
        <linearGradient id="tanLeather" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C27A45"/><stop offset="50%" stop-color="#9A5523"/><stop offset="100%" stop-color="#733810"/></linearGradient>
        <pattern id="houndPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#FFF"/>
          <polygon points="0,0 8,0 8,8 16,8 16,16 8,16 8,8 0,8" fill="#4A3423"/>
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#bgH)"/>
      <ellipse cx="400" cy="520" rx="300" ry="26" fill="#D3C7B5" opacity="0.6"/>
      <g>
        <polygon points="160,460 166,460 162,525 156,525" fill="#3B2616"/>
        <polygon points="630,460 636,460 632,525 626,525" fill="#3B2616"/>
        <!-- Tan Leather Outer Cradle -->
        <rect x="140" y="220" width="520" height="240" rx="20" fill="url(#tanLeather)"/>
        <!-- Houndstooth Inner Cushions -->
        <rect x="170" y="240" width="220" height="110" rx="10" fill="url(#houndPattern)"/>
        <rect x="410" y="240" width="220" height="110" rx="10" fill="url(#houndPattern)"/>
        <rect x="170" y="360" width="220" height="85" rx="10" fill="url(#houndPattern)"/>
        <rect x="410" y="360" width="220" height="85" rx="10" fill="url(#houndPattern)"/>
        <!-- Tan Arms -->
        <rect x="120" y="260" width="40" height="180" rx="14" fill="url(#tanLeather)"/>
        <rect x="640" y="260" width="40" height="180" rx="14" fill="url(#tanLeather)"/>
      </g>
    </svg>
  `)}`,

  // 5b. Houndstooth Back Craftsmanship
  product_houndstooth_back: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgHb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF7F2"/><stop offset="100%" stop-color="#ECE3D3"/></linearGradient>
        <linearGradient id="tanLeather2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C27A45"/><stop offset="50%" stop-color="#9A5523"/><stop offset="100%" stop-color="#733810"/></linearGradient>
        <pattern id="houndPattern2" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#FFF"/>
          <polygon points="0,0 8,0 8,8 16,8 16,16 8,16 8,8 0,8" fill="#4A3423"/>
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#bgHb)"/>
      <ellipse cx="400" cy="520" rx="300" ry="26" fill="#D3C7B5" opacity="0.6"/>
      <g>
        <polygon points="160,460 166,460 162,525 156,525" fill="#3B2616"/>
        <polygon points="630,460 636,460 632,525 626,525" fill="#3B2616"/>
        <!-- Rear Backrest Houndstooth Inlay -->
        <rect x="140" y="210" width="520" height="250" rx="20" fill="url(#tanLeather2)"/>
        <rect x="180" y="230" width="440" height="180" rx="12" fill="url(#houndPattern2)"/>
      </g>
    </svg>
  `)}`,

  // 6. Dining Chair - Cream
  product_chair_cream: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgChr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FBF9F5"/><stop offset="100%" stop-color="#EBE3D5"/></linearGradient>
        <linearGradient id="ivoryLeather" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF6ED"/><stop offset="50%" stop-color="#EFE6D5"/><stop offset="100%" stop-color="#D7C9B1"/></linearGradient>
        <linearGradient id="brassTip" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F2DD9C"/><stop offset="50%" stop-color="#CCA03B"/><stop offset="100%" stop-color="#8F6C1A"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgChr)"/>
      <ellipse cx="400" cy="535" rx="220" ry="24" fill="#D2C7B8" opacity="0.5"/>
      <g>
        <polygon points="310,390 320,390 280,530 270,530" fill="#1C1917"/>
        <polygon points="275,485 285,485 280,530 270,530" fill="url(#brassTip)"/>
        <polygon points="480,390 490,390 520,530 510,530" fill="#1C1917"/>
        <polygon points="515,485 525,485 520,530 510,530" fill="url(#brassTip)"/>
        <path d="M 280,350 C 270,180 320,90 400,90 C 480,90 530,180 520,350 Z" fill="url(#ivoryLeather)"/>
        <g stroke="rgba(0,0,0,0.1)" stroke-width="2">
          <line x1="330" y1="180" x2="330" y2="340"/>
          <line x1="365" y1="130" x2="365" y2="340"/>
          <line x1="400" y1="100" x2="400" y2="340"/>
          <line x1="435" y1="130" x2="435" y2="340"/>
          <line x1="470" y1="180" x2="470" y2="340"/>
        </g>
        <ellipse cx="400" cy="385" rx="140" ry="45" fill="url(#ivoryLeather)"/>
        <path d="M 260,385 C 260,420 320,445 400,445 C 480,445 540,420 540,385 Z" fill="#D7C9B1"/>
      </g>
    </svg>
  `)}`,

  // 6b. Dining Chair - Mustard Gold
  product_chair_mustard: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgChrM" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FCFAF2"/><stop offset="100%" stop-color="#F2ECD8"/></linearGradient>
        <linearGradient id="mustardG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F59E0B"/><stop offset="50%" stop-color="#D97706"/><stop offset="100%" stop-color="#B45309"/></linearGradient>
        <linearGradient id="brassTipM" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F2DD9C"/><stop offset="100%" stop-color="#8F6C1A"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgChrM)"/>
      <ellipse cx="400" cy="535" rx="220" ry="24" fill="#D2C7B8" opacity="0.5"/>
      <g>
        <polygon points="310,390 320,390 280,530 270,530" fill="#1C1917"/>
        <polygon points="275,485 285,485 280,530 270,530" fill="url(#brassTipM)"/>
        <polygon points="480,390 490,390 520,530 510,530" fill="#1C1917"/>
        <polygon points="515,485 525,485 520,530 510,530" fill="url(#brassTipM)"/>
        <path d="M 280,350 C 270,180 320,90 400,90 C 480,90 530,180 520,350 Z" fill="url(#mustardG)"/>
        <g stroke="rgba(255,255,255,0.2)" stroke-width="2">
          <line x1="330" y1="180" x2="330" y2="340"/>
          <line x1="365" y1="130" x2="365" y2="340"/>
          <line x1="400" y1="100" x2="400" y2="340"/>
          <line x1="435" y1="130" x2="435" y2="340"/>
          <line x1="470" y1="180" x2="470" y2="340"/>
        </g>
        <ellipse cx="400" cy="385" rx="140" ry="45" fill="url(#mustardG)"/>
      </g>
    </svg>
  `)}`,

  // 6c. Dining Chair - Emerald Teal
  product_chair_teal: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgChrT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F8FAFA"/><stop offset="100%" stop-color="#E2ECE9"/></linearGradient>
        <linearGradient id="tealChrG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#047857"/><stop offset="50%" stop-color="#065F46"/><stop offset="100%" stop-color="#064E3B"/></linearGradient>
        <linearGradient id="brassTipT" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F2DD9C"/><stop offset="100%" stop-color="#8F6C1A"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgChrT)"/>
      <ellipse cx="400" cy="535" rx="220" ry="24" fill="#CAD7D2" opacity="0.5"/>
      <g>
        <polygon points="310,390 320,390 280,530 270,530" fill="#1C1917"/>
        <polygon points="275,485 285,485 280,530 270,530" fill="url(#brassTipT)"/>
        <polygon points="480,390 490,390 520,530 510,530" fill="#1C1917"/>
        <polygon points="515,485 525,485 520,530 510,530" fill="url(#brassTipT)"/>
        <path d="M 280,350 C 270,180 320,90 400,90 C 480,90 530,180 520,350 Z" fill="url(#tealChrG)"/>
        <ellipse cx="400" cy="385" rx="140" ry="45" fill="url(#tealChrG)"/>
      </g>
    </svg>
  `)}`,

  // 7. Designer Headboard & Platform Bed - Velvet
  product_bed_luxury_velvet: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgBed" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FAF7F2"/><stop offset="100%" stop-color="#EDE4D5"/></linearGradient>
        <linearGradient id="bedVelvet" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#E2D4C3"/><stop offset="50%" stop-color="#CBB7A0"/><stop offset="100%" stop-color="#A89279"/></linearGradient>
        <linearGradient id="ledGlow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.8"/><stop offset="100%" stop-color="#FEF3C7" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgBed)"/>
      <ellipse cx="400" cy="540" rx="360" ry="24" fill="#CBBDA9" opacity="0.5"/>
      <g>
        <!-- Tufted Wall Headboard Panel -->
        <rect x="120" y="100" width="560" height="260" rx="14" fill="url(#bedVelvet)"/>
        <g stroke="rgba(0,0,0,0.12)" stroke-width="2">
          <line x1="232" y1="110" x2="232" y2="350"/>
          <line x1="344" y1="110" x2="344" y2="350"/>
          <line x1="456" y1="110" x2="456" y2="350"/>
          <line x1="568" y1="110" x2="568" y2="350"/>
        </g>
        <!-- Floating Platform Base with LED Glow -->
        <rect x="100" y="470" width="600" height="24" fill="url(#ledGlow)"/>
        <rect x="120" y="320" width="560" height="170" rx="12" fill="#FAF6EE" stroke="#E5DEC9" stroke-width="2"/>
        <rect x="140" y="340" width="520" height="130" rx="8" fill="#FFF"/>
        <!-- Pillows -->
        <rect x="180" y="270" width="180" height="70" rx="8" fill="#EAE0D1"/>
        <rect x="440" y="270" width="180" height="70" rx="8" fill="#EAE0D1"/>
      </g>
    </svg>
  `)}`,

  // 7b. Acoustic Fluted Headboard
  product_bed_acoustic_fluted: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgBed2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F8FAF9"/><stop offset="100%" stop-color="#E2EBE8"/></linearGradient>
        <linearGradient id="flutedG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#115E59"/><stop offset="50%" stop-color="#0F766E"/><stop offset="100%" stop-color="#134E4A"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgBed2)"/>
      <ellipse cx="400" cy="540" rx="360" ry="24" fill="#C8D6D2" opacity="0.5"/>
      <g>
        <rect x="100" y="80" width="600" height="280" rx="14" fill="url(#flutedG)"/>
        <g stroke="rgba(255,255,255,0.18)" stroke-width="3">
          <line x1="160" y1="90" x2="160" y2="350"/>
          <line x1="220" y1="90" x2="220" y2="350"/>
          <line x1="280" y1="90" x2="280" y2="350"/>
          <line x1="340" y1="90" x2="340" y2="350"/>
          <line x1="400" y1="90" x2="400" y2="350"/>
          <line x1="460" y1="90" x2="460" y2="350"/>
          <line x1="520" y1="90" x2="520" y2="350"/>
          <line x1="580" y1="90" x2="580" y2="350"/>
          <line x1="640" y1="90" x2="640" y2="350"/>
        </g>
        <rect x="120" y="320" width="560" height="170" rx="12" fill="#FAF6EE" stroke="#E5DEC9" stroke-width="2"/>
        <rect x="140" y="340" width="520" height="130" rx="8" fill="#FFF"/>
      </g>
    </svg>
  `)}`,

  // 8. Sofa Cushion Repair Diagram
  service_cushion_repair: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FDFBF7"/><stop offset="100%" stop-color="#F0EBE1"/></linearGradient>
        <linearGradient id="hrFoamGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#34D399"/><stop offset="100%" stop-color="#059669"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgGrad5)"/>
      <g transform="translate(100, 140)">
        <rect width="260" height="240" rx="12" fill="#FFF" stroke="#E5E7EB" stroke-width="2"/>
        <text x="130" y="40" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#DC2626" text-anchor="middle">SAGGING &amp; COLLAPSED FOAM</text>
        <text x="130" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#6B7280" text-anchor="middle">Old worn 24D low-density cushion</text>
        <path d="M 40,150 Q 130,210 220,150 L 220,190 Q 130,220 40,190 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
        <text x="130" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#EF4444" font-weight="600" text-anchor="middle">Deep Sink &amp; Back Pain</text>
      </g>
      <g transform="translate(375, 230)">
        <circle cx="25" cy="25" r="24" fill="#145362"/>
        <path d="M 18,25 L 32,25 M 26,19 L 32,25 L 26,31" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="translate(440, 140)">
        <rect width="260" height="240" rx="12" fill="#FFF" stroke="#10B981" stroke-width="2"/>
        <text x="130" y="40" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#047857" text-anchor="middle">40D SLEEPWELL HR UPGRADE</text>
        <text x="130" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#6B7280" text-anchor="middle">Virgin high resilience + crown padding</text>
        <path d="M 40,135 Q 130,115 220,135 L 220,195 Q 130,205 40,195 Z" fill="url(#hrFoamGrad)"/>
        <text x="130" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#FFF" font-weight="700" text-anchor="middle">10+ Year Anti-Sagging Guarantee</text>
      </g>
      <rect x="100" y="430" width="600" height="90" rx="12" fill="#1B382B"/>
      <text x="400" y="465" font-family="'Playfair Display', serif" font-size="18" font-weight="600" fill="#F3DC9B" text-anchor="middle">Surat Doorstep Pickup &amp; Fast 48-Hour Delivery</text>
      <text x="400" y="495" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#E2E8F0" text-anchor="middle">Save up to 70% compared to purchasing a new sofa set. Starting at ₹1,450 / seat.</text>
    </svg>
  `)}`,

  // Category Banners
  cat_l_shaped: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#16382C"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">L-Shaped Sectionals</text></svg>
  `)}`,
  cat_sofa_bed: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#293B33"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Pull-Out Sofa Beds</text></svg>
  `)}`,
  cat_recliners: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#362922"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Recliners &amp; Cinema Suites</text></svg>
  `)}`,
  cat_3_seater: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#202A36"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">3-Seater &amp; 2-Seater Sofas</text></svg>
  `)}`,
  cat_custom_sofa: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#2C2621"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Customized Sofas</text></svg>
  `)}`,
  cat_chairs: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#222C28"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Dining &amp; Accent Chairs</text></svg>
  `)}`,
  cat_beds: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#1F2327"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Designer Headboards &amp; Beds</text></svg>
  `)}`,
  cat_fabrics: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#2E201B"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Upholstery &amp; Fabric Rates</text></svg>
  `)}`,
  cat_repairs: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%"><rect width="600" height="400" fill="#1B382B"/><text x="300" y="200" font-family="'Playfair Display', serif" font-size="28" fill="#E8D5B5" text-anchor="middle" font-weight="600">Sofa Cushion Repair</text></svg>
  `)}`
};

export function getProductImage(key?: string | null, customImage?: string | null): string {
  const resolve = (val?: string | null): string | null => {
    if (!val || typeof val !== 'string') return null;
    const trimmed = val.trim();
    if (!trimmed) return null;

    // Direct web or local protocol URIs
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:')
    ) {
      return trimmed;
    }

    // Direct root paths
    if (trimmed.startsWith('/') || trimmed.startsWith('./')) {
      return trimmed;
    }

    // Image catalog keys
    if (IMAGES[trimmed]) {
      return IMAGES[trimmed];
    }

    // Standalone image file names (e.g. IMG-20261012-WA0193.jpg or upload names)
    if (
      trimmed.startsWith('IMG-') ||
      /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(trimmed)
    ) {
      return `/${trimmed}`;
    }

    return null;
  };

  const fromCustom = resolve(customImage);
  if (fromCustom) return fromCustom;

  const fromKey = resolve(key);
  if (fromKey) return fromKey;

  return IMAGES.product_l_shape_teal;
}

