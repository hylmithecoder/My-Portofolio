import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const hideCursorOnSpecificElements = () => {
      document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
        el.style.cursor = 'none';
      });
    };
  
    hideCursorOnSpecificElements(); // Jalankan sekali pada awal komponen
  
    const observer = new MutationObserver(hideCursorOnSpecificElements); // Tangani elemen dinamis
    observer.observe(document.body, { childList: true, subtree: true });
  
    return () => {
      observer.disconnect(); // Hentikan observer saat komponen dilepas
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Sembunyikan kursor asli di seluruh halaman
    const hideDefaultCursor = () => {
      document.body.style.cursor = 'none';
    };

    const restoreDefaultCursor = () => {
      document.body.style.cursor = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    hideDefaultCursor(); // Jalankan langsung untuk menyembunyikan kursor saat komponen dimuat

    const elements = Array.from(document.querySelectorAll('*'));
    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Bersihkan event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      restoreDefaultCursor(); // Kembalikan kursor asli saat komponen dilepas
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    >
      <img
        src={isHovering ? '/images/cursor_hover.png' : '/images/cursor.png'}
        alt="Custom Cursor"
        className="w-8 h-8"
      />
    </div>
  );
};

export default CustomCursor;