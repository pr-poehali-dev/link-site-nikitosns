
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Cat from "@/components/Cat";

const Index = () => {
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Refs для скролла к секциям
  const socialRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Проверяем каждую секцию
      const sections = [
        { id: 'social', ref: socialRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
        { id: 'about', ref: aboutRef }
      ];
      
      // Находим активную секцию
      for (const section of sections) {
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          const offsetHeight = section.ref.current.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Функция для отправки сообщения Telegram боту
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    
    setIsSubmitting(true);
    
    const BOT_TOKEN = "7716422574:AAHBFc8ZcW5dPTo-AxRaOCi3sIWCv7o0Bxc";
    const CHAT_ID = "@NikitosNSHelpsRobot"; // Замените на нужный chat_id
    
    const message = `Сообщение с сайта!\nИмя: ${contactName}\nСообщение: ${contactMessage}`;
    
    try {
      // Перенаправляем пользователя прямо в бота с предзаполненным сообщением
      const encodedMessage = encodeURIComponent(message);
      const telegramUrl = `https://t.me/NikitosNSHelpsRobot?start=${encodedMessage}`;
      
      window.open(telegramUrl, '_blank');
      
      setSubmitted(true);
      setContactName("");
      setContactMessage("");
      
      // Сброс состояния успешной отправки через 3 секунды
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-nikitos-dark text-white relative">
      {/* Градиентный фон с эффектом шума */}
      <div className="absolute inset-0 bg-gradient-to-b from-nikitos-dark to-nikitos-secondary/20 opacity-50 z-0" />
      
      {/* Анимированный котик */}
      <Cat />
      
      {/* Навигационные кнопки */}
      <nav className="sticky top-0 z-30 backdrop-blur-md bg-nikitos-dark/80 border-b border-nikitos-primary/20 shadow-md">
        <div className="container max-w-3xl mx-auto px-4 py-3 flex items-center justify-between overflow-x-auto space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection(aboutRef)}
            className={`whitespace-nowrap ${activeSection === 'about' ? 'bg-nikitos-primary/20 text-white' : 'text-gray-300'}`}
          >
            <Icon name="User" className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Обо мне</span>
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection(socialRef)}
            className={`whitespace-nowrap ${activeSection === 'social' ? 'bg-nikitos-primary/20 text-white' : 'text-gray-300'}`}
          >
            <Icon name="Share2" className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Социальные сети</span>
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection(projectsRef)}
            className={`whitespace-nowrap ${activeSection === 'projects' ? 'bg-nikitos-primary/20 text-white' : 'text-gray-300'}`}
          >
            <Icon name="Briefcase" className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Мои проекты</span>
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection(contactRef)}
            className={`whitespace-nowrap ${activeSection === 'contact' ? 'bg-nikitos-primary/20 text-white' : 'text-gray-300'}`}
          >
            <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Связаться со мной</span>
          </Button>
        </div>
      </nav>
      
      <div className="container max-w-3xl mx-auto px-4 py-8 relative z-10">
        {/* Профиль */}
        <div ref={aboutRef} className="flex flex-col md:flex-row items-center gap-6 mb-12 animate-fade-in">
          <div className="shrink-0">
            <img 
              src="https://i.postimg.cc/qR8RpxXF/photo-2025-05-08-17-32-20.jpg" 
              alt="NikitosNS" 
              className="w-40 h-40 object-cover rounded-full border-4 border-nikitos-primary shadow-lg shadow-nikitos-primary/30"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 animate-typing">NikitosNS</h1>
            <p className="text-gray-300 max-w-md animate-typing-delayed">
              Привет! Я Никита, очень позитивный человек. Имею много историй и люблю их рассказывать!
            </p>
          </div>
        </div>
        
        {/* Социальные сети */}
        <div ref={socialRef} className="grid gap-3 mb-12">
          <h2 className="text-xl font-bold mb-2 text-center animate-typing-delayed-2">Социальные сети</h2>
          
          <SocialLinkCard 
            icon="MessageSquare" 
            title="Telegram (основной)"
            subtitle="@offnikitosns"
            url="https://t.me/offnikitosns"
            color="bg-[#229ED9]"
          />
          
          <SocialLinkCard 
            icon="MessageSquare" 
            title="Telegram (приватка)"
            subtitle="Приватный канал"
            url="https://t.me/PrivateNSRobot"
            color="bg-[#229ED9]"
          />
          
          <SocialLinkCard 
            icon="Users" 
            title="ВК (страничка)"
            subtitle="Никита"
            url="https://vk.com/nikita0ns"
            color="bg-[#0077FF]"
          />
          
          <SocialLinkCard 
            icon="Users" 
            title="ВК (группа)"
            subtitle="Группа ВКонтакте"
            url="#"
            color="bg-[#0077FF]"
            isLocked
          />
          
          <SocialLinkCard 
            icon="Video" 
            title="TikTok (личный)"
            subtitle="@nikitosns.happy"
            url="https://www.tiktok.com/@nikitosns.happy?_t=ZP-8wBbUyOEo7K&_r=1"
            color="bg-[#000000]"
          />
        </div>
        
        {/* Проекты */}
        <div ref={projectsRef} className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-center animate-typing-delayed-3">Мои проекты</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <ProjectCard 
              title="NSMegaShop" 
              description="Магазин с широким ассортиментом товаров" 
              url="https://t.me/NSMegaShopsRobot"
            />
            
            <ProjectCard 
              title="NsAbuBos" 
              description="Бот для удобных покупок" 
              url="https://t.me/NSAbuBosRobot"
            />
            
            <ProjectCard 
              title="NSGarant" 
              description="Сервис гарантий (в разработке)" 
              url="#"
              isDevelopment
            />
            
            <ProjectCard 
              title="NSAI" 
              description="Искусственный интеллект в Telegram" 
              url="https://t.me/NSAIRobot"
            />
          </div>
        </div>
        
        {/* Мерч */}
        <div className="mb-12 animate-fade-in">
          <Card className="bg-gradient-to-br from-nikitos-dark to-nikitos-dark/70 border border-nikitos-primary/30 shadow-lg hover:shadow-nikitos-primary/20 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={48} className="text-nikitos-accent" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 animate-typing-delayed-4">Мой мерч</h3>
                  <p className="text-gray-300 mb-4 animate-typing-delayed-5">Эксклюзивная одежда и аксессуары для настоящих фанатов</p>
                  
                  <Button 
                    className="w-full bg-nikitos-accent hover:bg-nikitos-accent/80 text-white"
                    onClick={() => window.open("https://nsshop-merch.vsemaykishop.ru/", "_blank")}
                  >
                    <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                    Перейти в магазин мерча
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Контактная форма */}
        <div ref={contactRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center animate-typing-delayed-6">Связаться со мной</h2>
          
          <Card className="bg-gradient-to-br from-nikitos-dark to-nikitos-dark/70 border border-nikitos-primary/30 shadow-lg">
            <CardContent className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-medium mb-2">Сообщение отправлено!</h3>
                  <p className="text-gray-300">Спасибо за обращение, я свяжусь с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Ваше имя
                    </label>
                    <Input
                      id="name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Сообщение
                    </label>
                    <Textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                      placeholder="Напишите ваше сообщение..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-nikitos-primary hover:bg-nikitos-primary/80"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="mr-2 h-4 w-4" />
                        Отправить в Telegram
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Сообщение будет отправлено боту <a href="https://t.me/NikitosNSHelpsRobot" target="_blank" className="text-nikitos-primary hover:underline">@NikitosNSHelpsRobot</a>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Футер */}
        <footer className="text-center text-gray-400 text-sm mt-12 animate-fade-in">
          <p>© {new Date().getFullYear()} NikitosNS. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
};

type SocialLinkCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  url: string;
  color: string;
  isLocked?: boolean;
};

const SocialLinkCard = ({ icon, title, subtitle, url, color, isLocked = false }: SocialLinkCardProps) => {
  return (
    <a 
      href={isLocked ? "#" : url} 
      target={isLocked ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      className={`block ${isLocked ? 'cursor-not-allowed opacity-80' : 'hover:scale-[1.01] hover:shadow-lg'} transition-all animate-fade-in`}
    >
      <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 transition-all">
        <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        
        {isLocked ? (
          <div className="flex-shrink-0">
            <Icon name="Lock" size={20} className="text-gray-400" />
          </div>
        ) : (
          <div className="flex-shrink-0">
            <Icon name="ArrowUpRight" size={20} className="text-gray-400" />
          </div>
        )}
      </div>
    </a>
  );
};

type ProjectCardProps = {
  title: string;
  description: string;
  url: string;
  isDevelopment?: boolean;
};

const ProjectCard = ({ title, description, url, isDevelopment = false }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden group bg-gradient-to-br from-nikitos-dark to-nikitos-dark/70 border border-nikitos-primary/30 shadow-lg hover:shadow-nikitos-primary/20 transition-all animate-fade-in">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold truncate">{title}</h3>
            {isDevelopment && (
              <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded-full">
                В разработке
              </span>
            )}
          </div>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        </div>
        
        <Button 
          onClick={() => !isDevelopment && window.open(url, "_blank")}
          className={`w-full ${isDevelopment 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-nikitos-primary hover:bg-nikitos-primary/80'}`}
          disabled={isDevelopment}
        >
          <Icon name={isDevelopment ? "Clock" : "ExternalLink"} className="mr-2 h-4 w-4" />
          {isDevelopment ? "Скоро" : "Открыть"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;
