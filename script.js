/**
 * 城北化学工業株式会社 コーポレートサイト メインスクリプト
 * CodePen等のプレビュー環境でも確実に動作するよう readyState 判定を導入
 */

const initSite = () => {
  const body = document.body;
  const loader = document.getElementById('loader');

  // JSが有効であることを示すクラスを付与（スクロールフェード用）
  body.classList.add('js-enabled');
  body.classList.remove('is-loading');

  // ==========================================
  // 1. オープニング要素のクリーンアップ（CSSアニメーション完了後にDOMから非表示化）
  // ==========================================
  if (loader) {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 2200);
  }

  // ==========================================
  // 2. ヘッダーのスクロール追従制御
  // ==========================================
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ==========================================
  // 3. モバイルメニュー（ハンバーガー）開閉制御
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const globalNav = document.getElementById('global-nav');
  const navLinks = document.querySelectorAll('.header__nav-link, .header__btn');

  if (hamburgerBtn && globalNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      globalNav.classList.toggle('is-active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        globalNav.classList.remove('is-active');
      });
    });
  }

  // ==========================================
  // 4. Intersection Observer によるスクロール出現演出
  // ==========================================
  const fadeElements = document.querySelectorAll('.js-fade-up');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // 非対応ブラウザ向けフォールバック
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }
};

// DOMContentLoaded が既に発火済みでも確実に実行する分岐
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
