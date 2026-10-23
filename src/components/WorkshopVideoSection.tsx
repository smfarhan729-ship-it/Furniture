import React, { useState } from 'react';
import { Play, Pause, RefreshCw, CheckCircle, Shield, Award, MessageCircle, Video, Image, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { getProductImage, IMAGES } from '../utils/imageCatalog';
import { StoreSettings } from '../types';

interface WorkshopVideoSectionProps {
  settings: StoreSettings;
}

export const WorkshopVideoSection: React.FC<WorkshopVideoSectionProps> = ({ settings }) => {
  const [activeTab, setActiveTab] = useState<'mechanism' | 'video' | 'gallery'>('mechanism');
  const [isPullOutOpen, setIsPullOutOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null);

  const workshopPhotos = [
    {
      id: 'photo_frame',
      title: 'Solid Seasoned Sal Wood Framing',
      tag: 'Step 1: Frame Carpentry',
      description: 'Termite-treated, 10-year guaranteed structural frame assembled by master Surat craftsmen.',
      image: IMAGES.cat_custom_sofa || IMAGES.product_l_shape_teal
    },
    {
      id: 'photo_mechanism',
      title: 'Heavy German-Spec Pull-Out Roller Track',
      tag: 'Step 2: Roller Assembly',
      description: '10,000+ cycle tested mechanism with scratch-proof floor rollers for effortless transformation.',
      image: IMAGES.product_sofa_bed_sage
    },
    {
      id: 'photo_foam',
      title: 'Sleepwell 40D Virgin HR Foam Layering',
      tag: 'Step 3: High Density Foam',
      description: 'High-resilience foam core with plush Dacron topper to prevent sagging and back discomfort.',
      image: IMAGES.service_cushion_repair
    },
    {
      id: 'photo_tailoring',
      title: 'Precision Stitching & Fabric Upholstery',
      tag: 'Step 4: Tailoring',
      description: 'Hand-tailored Royal Velvet, Chenille, or Vegan Leatherette stitched with bonded nylon thread.',
      image: IMAGES.cat_fabrics || IMAGES.product_sofa_bed_burgundy
    },
    {
      id: 'photo_inspection',
      title: 'Pre-Delivery Quality Inspection',
      tag: 'Step 5: Surat Delivery',
      description: 'Complete inspection before bubble packaging and white-glove doorstep assembly across South Gujarat.',
      image: IMAGES.product_l_shape_grey
    }
  ];

  const handleInquireMechanism = () => {
    const text = `Hello Shree Balaji Sofa, I saw your workshop video and convertible sofa bed demonstration on your website. Please share full details, dimensions, and photos for sofa beds in Surat.`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleRequestDriveMedia = () => {
    const text = `Hello Shree Balaji Sofa, please send me the Google Drive link and PDF catalog with all your latest sofa designs and workshop videos.`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="workshop-video" className="py-14 sm:py-16 bg-[#FDFBF7] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Workshop Media Viewer (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A7B69] uppercase tracking-wider">
                <span>Inside Our Dindoli Workshop</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#059669]">Real Surat Manufacturing</span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-[#FAF6EE] p-1 rounded-xl border border-[#E8DFC9] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('mechanism')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                    activeTab === 'mechanism' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1B382B]'
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>3s Mechanism</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                    activeTab === 'video' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1B382B]'
                  }`}
                >
                  <Video className="w-3 h-3" />
                  <span>Video Tour</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                    activeTab === 'gallery' ? 'bg-[#1B382B] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#1B382B]'
                  }`}
                >
                  <Image className="w-3 h-3" />
                  <span>Workshop Photos</span>
                </button>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B382B]">
              Handcrafted Mechanism &amp; Frame Integrity
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#4B5563] leading-relaxed">
              Every convertible sofa bed from Shree Balaji is crafted in our Dindoli workshop using seasoned solid wood internal framing and smooth roller channels built for effortless daily transformation between daytime living and night-time rest.
            </p>

            {/* TAB 1: INTERACTIVE PULL-OUT MECHANISM */}
            {activeTab === 'mechanism' && (
              <div className="relative rounded-2xl border border-[#E8DFC9] bg-[#FAF6EE] shadow-md p-3 sm:p-4 space-y-3">
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#EFE9DE] rounded-xl overflow-hidden border border-[#E5DEC9]">
                  <img
                    src={getProductImage(isPullOutOpen ? 'product_sofa_bed_burgundy' : 'product_sofa_bed_sage')}
                    alt={isPullOutOpen ? "Convertible Sofa Bed pulled out in extended bed mode" : "Convertible Sofa in compact living room seating mode"}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isPullOutOpen ? 'scale-102' : 'scale-100'}`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Mode Watermark Badge (Desktop & Tablet) */}
                  <div className="absolute top-3 left-3 bg-[#1B382B]/85 backdrop-blur-xs text-[#F3DC9B] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md border border-[#D4AF37]/30 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <span>{isPullOutOpen ? 'Current State: Extended Bed Mode' : 'Current State: 3-Seater Sofa Mode'}</span>
                  </div>
                </div>

                {/* Mechanism Control & Status Bar (Cleanly stacked on mobile, zero overlap with visual) */}
                <div className="bg-[#1B382B] text-white p-3 sm:p-3.5 rounded-xl border border-[#2B4E3E] space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] block">
                        Interactive Demonstration
                      </span>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {isPullOutOpen
                          ? 'Spacious Bed Mode — Full Sleeping Surface'
                          : 'Compact Living Mode — 3-Seater Sofa'}
                      </div>
                    </div>

                    {/* Toggle Button: Synchronized, Large Touch Target (min 44px) */}
                    <button
                      type="button"
                      onClick={() => setIsPullOutOpen(!isPullOutOpen)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#D4AF37] text-[#1B382B] hover:bg-[#c5a028] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 shrink-0 min-h-[44px]"
                      aria-label={isPullOutOpen ? "Fold back into sofa mode" : "Pull out to king bed mode"}
                    >
                      <RefreshCw className={`w-4 h-4 transition-transform duration-500 ${isPullOutOpen ? 'rotate-180 text-[#1B382B]' : 'text-[#1B382B]'}`} />
                      <span>{isPullOutOpen ? 'Fold Back into Sofa' : 'Pull Out to King Bed'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-gray-300 border-t border-white/10 pt-2 flex flex-wrap items-center justify-between gap-1">
                    <span>Effortless single-person transformation with smooth sliding tracks.</span>
                    <button
                      type="button"
                      onClick={handleInquireMechanism}
                      className="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Inquire Dimensions on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Verified Workshop Craftsmanship Highlights (Responsive 1-col on mobile, 3-col on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#E5DEC9] text-left sm:text-center shadow-xs">
                    <div className="font-bold text-xs text-[#1B382B]">Solid Wood Structure</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">Handcrafted seasoned internal frame built for lasting stability</div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#E5DEC9] text-left sm:text-center shadow-xs">
                    <div className="font-bold text-xs text-[#1B382B]">Smooth Roller Mechanism</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">Heavy-duty channel sliding system designed for daily opening</div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#E5DEC9] text-left sm:text-center shadow-xs">
                    <div className="font-bold text-xs text-[#1B382B]">Seamless Sleeping Comfort</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">High-density cushion layering with no uncomfortable ridge</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: WORKSHOP VIDEO DEMONSTRATION */}
            {activeTab === 'video' && (
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DFC9] bg-[#FAF6EE] shadow-lg p-2.5 sm:p-3">
                {settings.workshopVideoUrl ? (
                  <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={settings.workshopVideoUrl}
                      title="Shree Balaji Workshop Video Tour"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-[#142D22] rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1B382B] flex items-center justify-center shadow-lg mb-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                      {isVideoPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3DC9B]">
                      Dindoli Workshop Demonstration Reel
                    </h3>
                    <p className="text-xs text-white/80 max-w-md mt-1 leading-relaxed">
                      Watch the complete assembly, 40D Sleepwell foam compression testing, and effortless pull-out bed mechanism filmed in our workshop.
                    </p>
                    <button
                      type="button"
                      onClick={handleRequestDriveMedia}
                      className="mt-4 px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#20ba59] cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Request Full Video Reel on WhatsApp</span>
                    </button>
                  </div>
                )}
                <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-[#6B7280]">
                    Real footage from <strong className="text-[#1B382B]">Shop 33, Pavilion Plaza, Dindoli, Surat</strong>.
                  </div>
                  <button
                    type="button"
                    onClick={handleRequestDriveMedia}
                    className="text-[#1B382B] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Request HD Video Clip</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: WORKSHOP STEP-BY-STEP PHOTO GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {workshopPhotos.map(photo => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedGalleryPhoto(photo.image)}
                      className="group relative aspect-square bg-[#EAE3D2] rounded-xl overflow-hidden border border-[#E5DEC9] cursor-pointer shadow-xs hover:border-[#1B382B] transition-all"
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end text-white">
                        <span className="text-[9px] uppercase font-bold text-[#D4AF37] block">{photo.tag}</span>
                        <span className="text-[11px] font-bold leading-tight line-clamp-1">{photo.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#4B5563]">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Want to view the raw frame before upholstery? We welcome workshop visits anytime!</span>
                  </div>
                  {settings.catalogDriveUrl && (
                    <a
                      href={settings.catalogDriveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#1B382B] text-white rounded-lg font-semibold flex items-center gap-1.5 text-xs hover:bg-[#142d22]"
                    >
                      <span>Open Drive Portfolio</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Workshop Craftsmanship Story (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6EE] p-5 sm:p-8 rounded-2xl border border-[#E5DEC9] space-y-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>Why Surat Families Trust Shree Balaji</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4B5563]">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#1B382B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B382B] block">Inspect Before Final Fabric Upholstery:</strong>
                    Customers are always welcome to our Dindoli workshop to inspect the raw seasoned wood frame and foam layering before we stitch your fabric.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#1B382B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B382B] block">Authentic Sleepwell 40D Virgin Foam:</strong>
                    We never mix recycled low-density scrap foam. Every cushion uses virgin high resilience core with soft Dacron wrapping.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#1B382B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B382B] block">Customization to Exact Inches:</strong>
                    Whether your hall has an awkward pillar or your balcony requires a narrow 60-inch lounger, we customize to the inch.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#1B382B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1B382B] block">Direct Workshop Price — No Middlemen:</strong>
                    Save 30% to 50% compared to luxury showroom markups while receiving true commercial-grade Sal hardwood.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DEC9] space-y-2">
                <button
                  type="button"
                  onClick={handleInquireMechanism}
                  className="w-full py-3 bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire About Sofa Bed on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleRequestDriveMedia}
                  className="w-full py-2.5 bg-white text-[#1B382B] border border-[#D5C9B3] hover:bg-[#F3EFE6] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Request Drive Photo Album &amp; PDF Catalog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
