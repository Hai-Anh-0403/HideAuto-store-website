import { Suspense } from 'react';
import { CatalogBrowser } from '@/features/catalog/catalog-browser';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { TranslatedText } from '@/shared/ui/translated-text';

export default function ScriptsPage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <StoreHeader />
      <main id="main" className="shell section catalog-page">
        <p className="label">
          <TranslatedText en="SCRIPTS / CATALOG" vi="KỊCH BẢN / DANH MỤC" />
        </p>
        <div className="heading">
          <div>
            <h1>
              <TranslatedText
                en="Find the work you can automate."
                vi="Tìm công việc bạn có thể tự động hóa."
              />
            </h1>
            <p className="catalog-intro">
              <TranslatedText
                en="Search all scripts, then narrow the list by category, platform, runtime, and status."
                vi="Tìm tất cả kịch bản, sau đó lọc theo danh mục, nền tảng, môi trường chạy và trạng thái."
              />
            </p>
          </div>
        </div>
        <Suspense fallback={<p className="label">LOADING CATALOG…</p>}>
          <CatalogBrowser />
        </Suspense>
      </main>
      <StoreFooter />
    </>
  );
}
