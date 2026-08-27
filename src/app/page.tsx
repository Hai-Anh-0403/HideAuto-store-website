import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { AdSlot } from '@/features/advertising/ad-slot';
import { scripts } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { developers } from '@/features/developers/data';
import { SellerSummaryCard } from '@/features/developers/seller-summary-card';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { Message } from '@/shared/ui/message';
import { TranslatedText } from '@/shared/ui/translated-text';

const rails = [
  {
    label: '02',
    title: 'Top views',
    titleVi: 'Xem nhiều nhất',
    sort: 'views',
    items: [...scripts].sort((a, b) => b.views - a.views).slice(0, 6),
  },
  {
    label: '03',
    title: 'Newest',
    titleVi: 'Mới nhất',
    sort: 'newest',
    items: [...scripts]
      .sort((a, b) => b.updated.localeCompare(a.updated))
      .slice(0, 6),
  },
  {
    label: '04',
    title: 'Most watched',
    titleVi: 'Được quan tâm nhất',
    sort: 'watched',
    items: [...scripts].sort((a, b) => b.watches - a.watches).slice(0, 6),
  },
  {
    label: '05',
    title: 'Recently updated',
    titleVi: 'Cập nhật gần đây',
    sort: 'updated',
    items: [...scripts]
      .sort((a, b) => b.updated.localeCompare(a.updated))
      .slice(0, 6),
  },
];

function ScriptRail({
  label,
  title,
  titleVi,
  sort,
  items,
}: (typeof rails)[number]) {
  return (
    <section className="shell section script-rail">
      <div className="heading">
        <div>
          <p className="label">
            {label} /{' '}
            <TranslatedText
              en="DISCOVER SCRIPTS"
              vi="KHÁM PHÁ KỊCH BẢN"
            />
          </p>
          <h2>
            <TranslatedText en={title} vi={titleVi} />
          </h2>
        </div>
        <Link href={`/scripts?sort=${sort}`}>
          <TranslatedText en="View all" vi="Xem tất cả" />{' '}
          <ArrowRight size={15} />
        </Link>
      </div>
      <div className="script-list-grid">
        {items.map((script) => (
          <ScriptListItem key={script.slug} script={script} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <StoreHeader />
      <main id="main">
        <section className="shell hero">
          <p className="label">
            01 / <TranslatedText en="SCRIPT MARKETPLACE" vi="CHỢ KỊCH BẢN" />
          </p>
          <div className="hero-grid frame">
            <div>
              <p className="label">
                <TranslatedText
                  en="AUTOMATION / DIRECT CONTACT"
                  vi="TỰ ĐỘNG HÓA / LIÊN HỆ TRỰC TIẾP"
                />
              </p>
              <h1>
                <Message id="home.heroLineOne" />
                <br />
                <Message id="home.heroLineTwo" />{' '}
                <em>
                  <Message id="home.heroEmphasis" />
                </em>
              </h1>
              <p className="lead">
                <TranslatedText
                  en="Find practical automation tools, compare the requirements, then contact the seller directly to discuss delivery."
                  vi="Tìm công cụ tự động hóa thiết thực, so sánh yêu cầu rồi liên hệ trực tiếp người bán để trao đổi."
                />
              </p>
              <div className="actions">
                <Link className="primary" href="/scripts">
                  <TranslatedText en="Browse scripts" vi="Khám phá kịch bản" />{' '}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hero-featured">
              <p className="label">
                <Message id="home.featuredScripts" />
              </p>
              {scripts.slice(0, 4).map((script) => (
                <ScriptListItem key={script.slug} script={script} />
              ))}
            </div>
          </div>
        </section>
        <ScriptRail {...rails[0]} />
        <div className="shell">
          <AdSlot slotId="home-after-top-views" />
        </div>
        <ScriptRail {...rails[1]} />
        <div className="shell">
          <AdSlot slotId="home-between-rails" />
        </div>
        <ScriptRail {...rails[2]} />
        <ScriptRail {...rails[3]} />
        <section className="shell section script-rail" id="hideauto-scripts">
          <div className="heading">
            <div>
              <p className="label">
                06 / <Message id="home.hideAutoScripts" />
              </p>
              <h2>
                <Message id="home.hideAutoScriptsTitle" />
              </h2>
            </div>
            <Link href="/scripts">
              <Message id="home.viewAllHideAutoScripts" />{' '}
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="script-list-grid">
            {scripts.slice(0, 6).map((script) => (
              <ScriptListItem key={script.slug} script={script} />
            ))}
          </div>
        </section>
        <section className="shell section" id="developers">
          <div className="heading">
            <div>
              <p className="label">
                07 / <Message id="home.community" />
              </p>
              <h2>
                <TranslatedText
                  en="Featured sellers."
                  vi="Người bán tiêu biểu."
                />
              </h2>
            </div>
            <Link href="/developers">
              <Message id="seller.viewAll" /> <ArrowRight size={15} />
            </Link>
          </div>
          <div className="seller-summary-grid">
            {developers.slice(0, 3).map((seller) => (
              <SellerSummaryCard key={seller.slug} seller={seller} />
            ))}
          </div>
        </section>
        <section className="shell delivery" id="docs">
          <div>
            <p className="label">
              08 / <Message id="home.clearDelivery" />
            </p>
            <h2>
              <TranslatedText
                en="What happens after you contact a seller."
                vi="Điều gì xảy ra sau khi bạn liên hệ người bán."
              />
            </h2>
          </div>
          <ol>
            {[
              [
                '01',
                'Compare requirements',
                'So sánh yêu cầu',
                'Check compatibility, available files, and the starting price.',
                'Kiểm tra tính tương thích, tệp đi kèm và giá khởi điểm.',
              ],
              [
                '02',
                'Contact the seller',
                'Liên hệ người bán',
                'Send the script context and your questions in one request.',
                'Gửi ngữ cảnh kịch bản và các câu hỏi của bạn trong một yêu cầu.',
              ],
              [
                '03',
                'Agree delivery',
                'Thỏa thuận bàn giao',
                'Discuss terms privately before any purchase happens.',
                'Trao đổi riêng về các điều khoản trước khi tiến hành giao dịch.',
              ],
            ].map(([n, tEn, tVi, dEn, dVi]) => (
              <li key={n}>
                <span>{n}</span>
                <div>
                  <h3>
                    <TranslatedText en={tEn} vi={tVi} />
                  </h3>
                  <p>
                    <TranslatedText en={dEn} vi={dVi} />
                  </p>
                </div>
                <Check size={17} />
              </li>
            ))}
          </ol>
        </section>
        <div className="shell footer-ad">
          <AdSlot slotId="home-footer" />
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
