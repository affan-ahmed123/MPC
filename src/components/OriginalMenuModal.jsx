import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ZoomIn, ZoomOut, Download, FileText, Sparkles } from 'lucide-react';

export default function OriginalMenuModal() {
  const { activeModal, setActiveModal, modalData } = useCart();
  const [activeCard, setActiveCard] = useState(modalData?.card || 'biryani'); // 'biryani' or 'icecream'
  const [zoomLevel, setZoomLevel] = useState(1);

  if (activeModal !== 'originalMenu') return null;

  const currentImage = activeCard === 'biryani' ? '/images/biryani-menu-card.jpg' : '/images/icecream-menu-card.jpg';
  const cardTitle = activeCard === 'biryani' ? 'Biryani & Pulao Menu Flyer (Official Print)' : 'Ice Cream Menu Flyer (Official Print)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#121622] border border-[#e6b343]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-3 sm:p-4 bg-[#0a0d14] border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#e6b343]/20 border border-[#e6b343]/50 flex items-center justify-center text-[#e6b343]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Official Printed Menu Flyers</span>
                <span className="text-xs bg-[#e6b343]/20 text-[#e6b343] px-2 py-0.5 rounded-full border border-[#e6b343]/30">High Res</span>
              </h3>
              <p className="text-xs text-gray-400">{cardTitle}</p>
            </div>
          </div>

          {/* Toggle Tab buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveCard('biryani'); setZoomLevel(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCard === 'biryani'
                  ? 'bg-[#e6b343] text-black shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              🍲 Biryani Flyer
            </button>
            <button
              onClick={() => { setActiveCard('icecream'); setZoomLevel(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCard === 'icecream'
                  ? 'bg-[#e6b343] text-black shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              🍨 Ice Cream Flyer
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-gray-900 rounded-lg border border-gray-700 p-0.5 ml-2">
              <button
                onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.2))}
                className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] px-2 text-gray-400 font-mono">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.2))}
                className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <a
              href={currentImage}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              title="Download image"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-800 hover:text-white transition-colors border border-red-800/40"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Content Container */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07090e]">
          <div className="relative inline-block transition-transform duration-200" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}>
            <img
              src={currentImage}
              alt={cardTitle}
              className="max-h-[75vh] w-auto rounded-xl shadow-2xl border border-amber-500/30 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-[#0a0d14] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cropped & enhanced official printed menu of Madina Biryani & Pakwan Center</span>
          </div>
          <div>
            All digital menu prices strictly match these physical flyers
          </div>
        </div>
      </div>
    </div>
  );
}
