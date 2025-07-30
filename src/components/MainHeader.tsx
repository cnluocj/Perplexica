'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './MainHeader.module.css';
import Image from 'next/image';

const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navBoxRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle clicks outside the menu
  const handleOutsideClick = (e: MouseEvent) => {
    if (navBoxRef.current && !navBoxRef.current.contains(e.target as Node)) {
      setIsMobileMenuOpen(false);
    }
  };

  // Setup outside click handling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "https://www.medstarai.com/home", label: "网站首页", external: true },
    { href: "https://www.medstarai.com/zhicheng", label: "职称评审", external: true },
    { href: "https://www.medstarai.com/business", label: "业务板块", external: true },
    { href: "/medical-science", label: "AI写作", external: false }, // 新增的AI写作tab
    { href: "https://www.medstarai.com/training", label: "培训课程", external: true },
    { href: "https://www.medstarai.com/news", label: "新闻通知", external: true },
    { href: "https://www.medstarai.com/about", label: "关于我们", external: true },
  ];

  return (
    <>
      {/* Desktop Top Bar */}
      <div className={styles.topBg}>
        <div className={`${styles.topCon} ${styles.pageContainer} ${styles.topContainer}`}>
          <div className={styles.logo}>
            <a href="https://www.medstarai.com/home">
              <Image src="/images/home/医职帮logo.png" alt="医职帮 Logo" width={180} height={50} className={styles.logoImage} priority />
            </a>
          </div>
          <nav className={`${styles.navBg} ${styles.navContainer}`}>
            <div className={styles.tNav}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.href} className={`${styles.navLi} ${pathname === item.href || (!item.external && pathname && pathname.startsWith(item.href)) ? styles.another : ''}`}>
                    {item.external ? (
                      <a href={item.href} title={item.label} className={styles.navLink} target="_self">
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <a href={item.href} title={item.label} className={styles.navLink}>
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`${styles.phoneHeader} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.headerTop}>
          <div className={styles.headerTel}>
            <a href="https://www.medstarai.com/home">
              <Image src="/images/home/医职帮logo.png" alt="医职帮 Logo" width={150} height={42} className={styles.mobileLogo} />
            </a>
          </div>
          <div className={styles.headerMenu} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Flyout */}
      <div className={`${styles.navFlyout} ${isMobileMenuOpen ? styles.open : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={styles.navBox} ref={navBoxRef} onClick={(e) => e.stopPropagation()}>
          <div className={styles.closeButton} onClick={toggleMobileMenu}>
            <span>×</span>
          </div>
          <h4>快捷导航</h4>
          <ul>
            {navItems.map(item => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} title={item.label} onClick={toggleMobileMenu} target="_self">{item.label}</a>
                ) : (
                  <a href={item.href} title={item.label} onClick={toggleMobileMenu}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainHeader; 