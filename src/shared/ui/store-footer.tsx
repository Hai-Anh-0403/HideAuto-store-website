'use client';

import Link from 'next/link';
import { useLocale } from './locale-provider';

export function StoreFooter() {
  const { t } = useLocale();

  return (
    <footer className="footer">
      <div className="shell footer-content">
        <div className="footer-brand">
          <p className="label">HIDEAUTO / SCRIPT STORE</p>
          <p>{t('footer.description')}</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="label">{t('footer.discover')}</p>
            <Link href="/scripts">{t('footer.browseScripts')}</Link>
            <Link href="/developers">{t('navigation.sellers')}</Link>
          </div>
          <div>
            <p className="label">{t('footer.resources')}</p>
            <Link href="/#docs">{t('footer.documentation')}</Link>
            <Link href="/contact">{t('footer.contactSeller')}</Link>
          </div>
          <div>
            <p className="label">{t('footer.policies')}</p>
            <Link href="/legal/policies">{t('footer.policies')}</Link>
            <Link href="/legal/terms">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{t('footer.directContact')}</span>
        <span>© 2026 HIDEAUTO</span>
      </div>
    </footer>
  );
}
