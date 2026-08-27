import Link from 'next/link';
import { TranslatedText } from './translated-text';

export function StoreFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-content">
        <div className="footer-brand">
          <p className="label">HIDEAUTO / SCRIPT STORE</p>
          <p>
            <TranslatedText
              en="Practical automation scripts with clear requirements and direct seller contact."
              vi="Kịch bản tự động hóa thiết thực với yêu cầu rõ ràng và liên hệ trực tiếp người bán."
            />
          </p>
        </div>
        <div className="footer-links">
          <div>
            <p className="label">
              <TranslatedText en="DISCOVER" vi="KHÁM PHÁ" />
            </p>
            <Link href="/scripts">
              <TranslatedText en="Browse scripts" vi="Khám phá kịch bản" />
            </Link>
            <Link href="/developers">
              <TranslatedText en="Hire a Developer" vi="Thuê lập Deverloper" />
            </Link>
          </div>
          <div>
            <p className="label">
              <TranslatedText en="RESOURCES" vi="TÀI NGUYÊN" />
            </p>
            <Link href="/#docs">
              <TranslatedText en="Documentation" vi="Tài liệu" />
            </Link>
            <Link href="/contact">
              <TranslatedText en="Contact seller" vi="Liên hệ người bán" />
            </Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          <TranslatedText
            en="DIRECT SELLER CONTACT · NO CHECKOUT"
            vi="LIÊN HỆ TRỰC TIẾP · KHÔNG THANH TOÁN"
          />
        </span>
        <span>© 2026 HIDEAUTO</span>
      </div>
    </footer>
  );
}
