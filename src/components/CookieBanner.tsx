import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'cookie-consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
          <Link to="/privacy" className="text-siemens underline hover:text-siemens-dark">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChoice('declined')}
            className="border-siemens text-siemens-dark hover:bg-siemens-light"
          >
            Отказаться
          </Button>
          <Button
            size="sm"
            onClick={() => handleChoice('accepted')}
            className="bg-siemens font-semibold hover:bg-siemens-dark"
          >
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
