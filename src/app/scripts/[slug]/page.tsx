import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, MessageCircle } from 'lucide-react';
import { AdSlot } from '@/features/advertising/ad-slot';
import { scripts } from '@/features/catalog/data';
import { TranslatedText } from '@/shared/ui/translated-text';
import { StoreHeader } from '@/shared/ui/store-header';
import { developerSlug } from '@/features/developers/data';
export function generateStaticParams() {
  return scripts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: PageProps<'/scripts/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const script = scripts.find((item) => item.slug === slug);
  if (!script) return { title: 'Script not found — HideAuto' };
  return { title: `${script.name} — HideAuto`, description: script.outcome };
}
export default async function ScriptPage({
  params,
}: PageProps<'/scripts/[slug]'>) {
  const { slug } = await params;
  const x = scripts.find((s) => s.slug === slug);
  if (!x) notFound();
  return (
    <>
      <StoreHeader />
      <main className="shell section">
        <p className="label">
          <Link href="/scripts">
            <TranslatedText en="SCRIPTS" vi="KỊCH BẢN" />
          </Link>{' '}
          / {x.name.toUpperCase()}
        </p>
        <div className="hero-grid">
          <section>
            <p className="label">
              {x.status} / VERSION {x.version}
            </p>
            <h1>{x.name}</h1>
            <p className="lead">{x.outcome}</p>
            <p className="label">
              <TranslatedText en="SELLER:" vi="NGƯỜI BÁN:" />{' '}
              <Link href={`/developers/${developerSlug(x.seller)}`}>
                {x.seller.toUpperCase()}
              </Link>{' '}
              / <TranslatedText en="VERIFIED PROFILE" vi="HỒ SƠ ĐÃ XÁC MINH" />
            </p>
            <figure className="detail-media">
              <Image
                src={x.image}
                alt={`Preview for ${x.name}`}
                width={1200}
                height={675}
                priority
              />
              <figcaption>
                <TranslatedText
                  en="AUTOMATION PREVIEW"
                  vi="XEM TRƯỚC TỰ ĐỘNG HÓA"
                />
              </figcaption>
            </figure>
            <h2>
              <TranslatedText
                en="Built for repeatable work."
                vi="Được xây dựng cho công việc lặp lại."
              />
            </h2>
            <p className="lead">
              <TranslatedText
                en="Clear requirements, practical examples, versioned documentation, and dependable releases."
                vi="Yêu cầu rõ ràng, ví dụ thực tế, tài liệu có phiên bản và các bản phát hành đáng tin cậy."
              />
            </p>
            <div className="tags">
              <span>{x.runtime}</span>
              <span>
                <TranslatedText en="SOURCE + EXAMPLES" vi="MÃ NGUỒN + VÍ DỤ" />
              </span>
              <span>
                <TranslatedText en="12 MONTHS UPDATES" vi="CẬP NHẬT 12 THÁNG" />
              </span>
            </div>
          </section>
          <aside className="purchase">
            <p className="label">
              <TranslatedText en="STARTING PRICE" vi="GIÁ KHỞI ĐIỂM" />
            </p>
            <strong>{x.price}</strong>
            <p>
              <TranslatedText
                en="Starting price · agree scope and terms directly with the seller"
                vi="Giá khởi điểm · trao đổi phạm vi và điều khoản trực tiếp với người bán"
              />
            </p>
            <button>
              <TranslatedText en="Personal" vi="Cá nhân" />{' '}
              <span>
                <TranslatedText en="1 activation" vi="1 kích hoạt" />
              </span>
            </button>
            <button>
              <TranslatedText en="Team" vi="Nhóm" />{' '}
              <span>
                <TranslatedText en="5 activations" vi="5 kích hoạt" />
              </span>
            </button>
            <Link
              className="primary contact-link"
              href={`/contact?script=${x.slug}`}
            >
              <MessageCircle size={16} />{' '}
              <TranslatedText en="Contact seller" vi="Liên hệ người bán" />
            </Link>
            <small>
              <Check size={14} />{' '}
              <TranslatedText
                en="Typical reply: within one business day"
                vi="Thường phản hồi trong một ngày làm việc"
              />
            </small>
          </aside>
        </div>
        <AdSlot slotId="script-detail-after-description" />
      </main>
    </>
  );
}
