
import { useEffect, useRef } from 'react';

const Cat = () => {
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!catRef.current) return;
      
      const cat = catRef.current;
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      const catRect = cat.getBoundingClientRect();
      const catHeight = catRect.height;
      
      // Ограничиваем движение кота в пределах окна
      const maxTop = windowHeight - catHeight;
      const newTop = Math.min(Math.max(mouseY - catHeight / 2, 0), maxTop);
      
      // Плавное следование за курсором
      cat.style.transition = 'top 0.3s ease-out';
      cat.style.top = `${newTop}px`;
      
      // Добавляем анимацию движения хвоста при движении
      if (Math.random() > 0.7) {
        cat.classList.add('wiggle-tail');
        setTimeout(() => {
          cat.classList.remove('wiggle-tail');
        }, 500);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={catRef}
      className="fixed left-4 z-20 transition-all duration-300"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <div className="cat-container relative">
        <div className="cat-head w-16 h-16 bg-[#FFD8A9] rounded-full relative">
          {/* Уши */}
          <div className="cat-ear-left absolute -top-3 -left-1 w-6 h-8 bg-[#FFD8A9] rounded-tl-full transform rotate-[-30deg]"></div>
          <div className="cat-ear-right absolute -top-3 -right-1 w-6 h-8 bg-[#FFD8A9] rounded-tr-full transform rotate-[30deg]"></div>
          
          {/* Глаза */}
          <div className="cat-eye-left absolute top-5 left-3 w-3 h-4 bg-white rounded-full">
            <div className="cat-pupil absolute top-1 left-1 w-1.5 h-2 bg-black rounded-full"></div>
          </div>
          <div className="cat-eye-right absolute top-5 right-3 w-3 h-4 bg-white rounded-full">
            <div className="cat-pupil absolute top-1 left-1 w-1.5 h-2 bg-black rounded-full"></div>
          </div>
          
          {/* Нос и рот */}
          <div className="cat-nose absolute top-9 left-1/2 w-2 h-1.5 bg-[#FF9E9E] rounded-full transform -translate-x-1/2"></div>
          <div className="cat-mouth absolute top-11 left-1/2 w-4 h-0.5 border-t-2 border-[#333] transform -translate-x-1/2"></div>
          
          {/* Усы */}
          <div className="cat-whisker-left-1 absolute top-9 left-2 w-4 h-0.5 bg-[#333] transform rotate-[-10deg]"></div>
          <div className="cat-whisker-left-2 absolute top-10 left-2 w-4 h-0.5 bg-[#333] transform rotate-[-5deg]"></div>
          <div className="cat-whisker-right-1 absolute top-9 right-2 w-4 h-0.5 bg-[#333] transform rotate-[10deg]"></div>
          <div className="cat-whisker-right-2 absolute top-10 right-2 w-4 h-0.5 bg-[#333] transform rotate-[5deg]"></div>
        </div>
        
        {/* Тело */}
        <div className="cat-body w-12 h-20 bg-[#FFD8A9] rounded-b-full mx-auto mt-[-5px]"></div>
        
        {/* Хвост */}
        <div className="cat-tail w-3 h-16 bg-[#FFD8A9] rounded-full absolute bottom-0 -right-2 origin-bottom transform rotate-[20deg] group-hover:rotate-[40deg] transition-transform duration-300"></div>
        
        {/* Лапы */}
        <div className="cat-paw-left absolute bottom-0 left-0 w-4 h-3 bg-[#FFD8A9] rounded-full"></div>
        <div className="cat-paw-right absolute bottom-0 right-0 w-4 h-3 bg-[#FFD8A9] rounded-full"></div>
      </div>
    </div>
  );
};

export default Cat;
