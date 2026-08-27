'use client';

import Link from 'next/link';
import { useLocale } from '@/shared/ui/locale-provider';

export default function ErrorPage({ reset }: { reset: () => void }) {
  const { locale } = useLocale();
  const vi = locale === 'vi';
  return (
    <main className="shell section system-page">
      <p className="label">SYSTEM / ERROR</p>
      <h1>{vi ? 'Không thể tải nội dung này.' : 'Something did not load.'}</h1>
      <p className="lead">
        {vi
          ? 'Liên kết hiện tại của bạn vẫn an toàn. Hãy thử lại hoặc quay về danh mục kịch bản.'
          : 'Your current link is safe. Try again, or return to the script catalog.'}
      </p>
      <div className="actions">
        <button className="primary" type="button" onClick={reset}>
          {vi ? 'Thử lại' : 'Try again'}
        </button>
        <Link className="secondary" href="/scripts">
          {vi ? 'Xem kịch bản' : 'Browse scripts'}
        </Link>
      </div>
    </main>
  );
}
