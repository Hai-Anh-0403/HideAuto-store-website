'use client';
import { CheckCircle2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useLocale } from '@/shared/ui/locale-provider';
import type { CatalogScript } from '@/features/catalog/data';
export function ContactForm({ product }: { product: CatalogScript }) {
  const [sent, setSent] = useState(false);
  const { locale } = useLocale();
  const vi = locale === 'vi';
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <section className="contact-form confirmation" aria-live="polite">
        <CheckCircle2 size={36} />
        <h2>{vi ? 'Đã gửi yêu cầu.' : 'Request sent.'}</h2>
        <p>
          {vi
            ? `Yêu cầu về ${product.name} đã sẵn sàng gửi đến ${product.seller}. Bạn sẽ nhận được phản hồi trong một ngày làm việc.`
            : `Your request about ${product.name} is ready for ${product.seller}. Expect a reply within one business day.`}
        </p>
      </section>
    );
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h1>{vi ? 'Bắt đầu trao đổi.' : 'Start a conversation.'}</h1>
      <p className="lead">
        {vi
          ? 'Hỏi về phạm vi, bàn giao, điều khoản license hoặc yêu cầu riêng.'
          : 'Ask about scope, delivery, license terms, or a custom requirement.'}
      </p>
      <p className="label">
        {vi ? 'SẢN PHẨM:' : 'PRODUCT:'} {product.name.toUpperCase()} /{' '}
        {product.seller.toUpperCase()} / {product.price}
      </p>
      <label>
        {vi ? 'Tên của bạn' : 'Your name'}
        <input
          required
          name="name"
          placeholder={vi ? 'Họ và tên' : 'Full name'}
        />
      </label>
      <label>
        {vi ? 'Địa chỉ email' : 'Email address'}
        <input
          required
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </label>
      <label>
        {vi ? 'Bạn cần gì?' : 'What do you need?'}
        <textarea
          required
          name="message"
          rows={5}
          placeholder={
            vi
              ? 'Mô tả nhu cầu, môi trường và câu hỏi của bạn.'
              : 'Describe your use case, environment, and questions.'
          }
        />
      </label>
      <button className="primary" type="submit">
        <Send size={16} /> {vi ? 'Gửi yêu cầu' : 'Send request'}
      </button>
    </form>
  );
}
