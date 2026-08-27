import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, MessageCircle } from 'lucide-react';
import { AdSlot } from '@/features/advertising/ad-slot';
import { scripts } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { platformsForScript } from '@/data/script-platforms';
import { TranslatedText } from '@/shared/ui/translated-text';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { developerSlug, developers } from '@/features/developers/data';
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
  const seller = developers.find((developer) => developer.name === x.seller);
  const relatedScripts = scripts
    .filter((script) => script.slug !== x.slug)
    .sort(
      (a, b) =>
        Number(b.category === x.category) - Number(a.category === x.category),
    )
    .slice(0, 3);

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
              {platformsForScript(x.slug).map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
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
        <section className="script-detail-info">
          <div>
            <p className="label">
              <TranslatedText en="PRODUCT DETAILS" vi="CHI TIẾT SẢN PHẨM" />
            </p>
            <h2>
              <TranslatedText
                en="Clear requirements before you start."
                vi="Yêu cầu rõ ràng trước khi bắt đầu."
              />
            </h2>
            <p className="lead">
              <TranslatedText
                en="Review compatibility, release details, and what is included before contacting the seller."
                vi="Xem khả năng tương thích, thông tin phát hành và nội dung đi kèm trước khi liên hệ người bán."
              />
            </p>
          </div>
          <dl className="script-detail-facts">
            <div>
              <dt>
                <TranslatedText en="VERSION" vi="PHIÊN BẢN" />
              </dt>
              <dd>{x.version}</dd>
            </div>
            <div>
              <dt>
                <TranslatedText en="LAST UPDATED" vi="CẬP NHẬT GẦN NHẤT" />
              </dt>
              <dd>{x.updated}</dd>
            </div>
            <div>
              <dt>
                <TranslatedText en="CATEGORY" vi="DANH MỤC" />
              </dt>
              <dd>{x.category}</dd>
            </div>
            <div>
              <dt>
                <TranslatedText en="RUNTIME" vi="MÔI TRƯỜNG CHẠY" />
              </dt>
              <dd>{x.runtime}</dd>
            </div>
            <div>
              <dt>
                <TranslatedText en="PLATFORMS" vi="NỀN TẢNG" />
              </dt>
              <dd>{platformsForScript(x.slug).join(' · ')}</dd>
            </div>
            <div>
              <dt>
                <TranslatedText en="SUPPORT" vi="HỖ TRỢ" />
              </dt>
              <dd>
                <TranslatedText
                  en="Direct seller contact"
                  vi="Liên hệ trực tiếp người bán"
                />
              </dd>
            </div>
          </dl>
        </section>
        <section className="script-detail-includes">
          <p className="label">
            <TranslatedText en="WHAT'S INCLUDED" vi="NỘI DUNG ĐI KÈM" />
          </p>
          <ul>
            <li>
              <Check size={17} />
              <TranslatedText
                en="Source files and practical examples"
                vi="Mã nguồn và ví dụ thực tế"
              />
            </li>
            <li>
              <Check size={17} />
              <TranslatedText
                en="Versioned setup documentation"
                vi="Tài liệu cài đặt có phiên bản"
              />
            </li>
            <li>
              <Check size={17} />
              <TranslatedText
                en="Twelve months of updates"
                vi="Cập nhật trong mười hai tháng"
              />
            </li>
          </ul>
        </section>
        {seller && (
          <section className="script-detail-seller">
            <Image
              src={seller.avatar}
              alt={`${seller.name} seller profile`}
              width={88}
              height={88}
            />
            <div>
              <p className="label">
                <TranslatedText en="PUBLISHED BY" vi="ĐƯỢC PHÁT HÀNH BỞI" />
              </p>
              <h2>{seller.name}</h2>
              <p>
                <TranslatedText en={seller.headline} vi={seller.headlineVi} />
              </p>
            </div>
            <Link href={`/developers/${seller.slug}`}>
              <TranslatedText en="View seller" vi="Xem người bán" />
            </Link>
          </section>
        )}
        <AdSlot slotId="script-detail-after-description" />
        <section className="script-recommendations">
          <div className="heading">
            <div>
              <p className="label">
                <TranslatedText en="RELATED SCRIPTS" vi="KỊCH BẢN LIÊN QUAN" />
              </p>
              <h2>
                <TranslatedText
                  en="Continue with similar tools."
                  vi="Khám phá thêm công cụ tương tự."
                />
              </h2>
            </div>
            <Link href="/scripts">
              <TranslatedText en="View all" vi="Xem tất cả" />
            </Link>
          </div>
          <div className="script-list-grid">
            {relatedScripts.map((script) => (
              <ScriptListItem key={script.slug} script={script} />
            ))}
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
