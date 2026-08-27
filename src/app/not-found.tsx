import Link from 'next/link';
import { StoreHeader } from '@/shared/ui/store-header';
import { TranslatedText } from '@/shared/ui/translated-text';

export default function NotFound() {
  return (
    <>
      <StoreHeader />
      <main className="shell section system-page">
        <p className="label">404 / NOT FOUND</p>
        <h1>
          <TranslatedText
            en="This page is no longer here."
            vi="Trang này không còn tồn tại."
          />
        </h1>
        <p className="lead">
          <TranslatedText
            en="The script or developer may have moved, been retired, or the address may be incorrect."
            vi="Kịch bản hoặc developer có thể đã được chuyển, ngừng phát hành, hoặc địa chỉ không chính xác."
          />
        </p>
        <div className="actions">
          <Link className="primary" href="/scripts">
            <TranslatedText en="Browse scripts" vi="Xem kịch bản" />
          </Link>
          <Link className="secondary" href="/">
            <TranslatedText en="Return home" vi="Về trang chủ" />
          </Link>
        </div>
      </main>
    </>
  );
}
