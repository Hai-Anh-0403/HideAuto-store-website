import Link from 'next/link';
import { Message } from './message';

export function StoreFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-content">
        <div className="footer-brand">
          <p className="label">HIDEAUTO / SCRIPT STORE</p>
          <p>
            <Message id="footer.description" />
          </p>
        </div>
        <div className="footer-links">
          <div>
            <p className="label">
              <Message id="footer.discover" />
            </p>
            <Link href="/scripts">
              <Message id="footer.browseScripts" />
            </Link>
            <Link href="/developers">
              <Message id="navigation.sellers" />
            </Link>
          </div>
          <div>
            <p className="label">
              <Message id="footer.resources" />
            </p>
            <Link href="/#docs">
              <Message id="footer.documentation" />
            </Link>
            <Link href="/contact">
              <Message id="footer.contactSeller" />
            </Link>
          </div>
          <div>
            <p className="label">
              <Message id="footer.policies" />
            </p>
            <Link href="/legal/policies">
              <Message id="footer.policies" />
            </Link>
            <Link href="/legal/terms">
              <Message id="footer.terms" />
            </Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          <Message id="footer.directContact" />
        </span>
        <span>© 2026 HIDEAUTO</span>
      </div>
    </footer>
  );
}
