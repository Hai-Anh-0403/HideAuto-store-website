import { DeveloperDirectory } from '@/features/developers/developer-directory';
import { StoreHeader } from '@/shared/ui/store-header';
import { TranslatedText } from '@/shared/ui/translated-text';
export default function DevelopersPage() {
  return (
    <>
      <StoreHeader />
      <main className="shell section developer-directory-page">
        <p className="label">
          <TranslatedText
            en="DEVELOPERS / DIRECTORY"
            vi="LẬP TRÌNH VIÊN / DANH SÁCH"
          />
        </p>
        <div className="heading">
          <div>
            <h1>
              <TranslatedText
                en="Meet the developers."
                vi="Gặp gỡ các lập trình viên."
              />
            </h1>
          </div>
        </div>
        <DeveloperDirectory />
      </main>
    </>
  );
}
