import { DeveloperDirectory } from '@/features/developers/developer-directory';
import { StoreHeader } from '@/shared/ui/store-header';
import { TranslatedText } from '@/shared/ui/translated-text';
export default function DevelopersPage() {
  return (
    <>
      <StoreHeader />
      <main className="shell section developer-directory-page">
        <p className="label">
          <TranslatedText en="SELLERS / DIRECTORY" vi="NGƯỜI BÁN / DANH SÁCH" />
        </p>
        <div className="heading">
          <div>
            <h1>
              <TranslatedText
                en="Meet the sellers."
                vi="Gặp gỡ các người bán."
              />
            </h1>
          </div>
        </div>
        <DeveloperDirectory />
      </main>
    </>
  );
}
