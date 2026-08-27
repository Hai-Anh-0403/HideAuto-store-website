import Link from 'next/link';
import { ContactForm } from '@/features/support/components/contact-form';
import { scripts } from '@/features/catalog/data';
import { TranslatedText } from '@/shared/ui/translated-text';
import { StoreHeader } from '@/shared/ui/store-header';

export default async function ContactPage({
  searchParams,
}: PageProps<'/contact'>) {
  const { script } = await searchParams;
  const selectedSlug = typeof script === 'string' ? script : undefined;
  const product =
    scripts.find((item) => item.slug === selectedSlug) ?? scripts[0];
  return (
    <>
      <StoreHeader />
      <main className="shell section">
        <p className="label">
          <TranslatedText
            en="CONTACT SELLER / REQUEST DETAILS"
            vi="LIÊN HỆ NGƯỜI BÁN / CHI TIẾT YÊU CẦU"
          />
        </p>
        <div className="hero-grid">
          <ContactForm product={product} />
          <aside className="purchase">
            <p className="label">
              <TranslatedText
                en="WHAT HAPPENS NEXT"
                vi="ĐIỀU GÌ XẢY RA TIẾP THEO"
              />
            </p>
            <h2>
              <TranslatedText
                en="Direct and clear."
                vi="Trực tiếp và rõ ràng."
              />
            </h2>
            <p>
              <TranslatedText
                en="The seller replies within one business day with availability, final price, and next steps."
                vi="Người bán phản hồi trong một ngày làm việc về khả năng cung cấp, giá cuối cùng và bước tiếp theo."
              />
            </p>
            <small>
              <TranslatedText
                en="Your details are shared only with the seller for this request."
                vi="Thông tin của bạn chỉ được chia sẻ với người bán cho yêu cầu này."
              />
            </small>
            <Link href="/scripts">
              <TranslatedText
                en="Return to catalog →"
                vi="Quay lại danh mục →"
              />
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
