'use client';
import { CheckCircle2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useLocale } from '@/shared/ui/locale-provider';
import type { CatalogScript } from '@/features/catalog/data';

export function ContactForm({ product }: { product: CatalogScript }) {
  const [sent, setSent] = useState(false);
  const { t } = useLocale();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent)
    return (
      <section className="contact-form confirmation" aria-live="polite">
        <CheckCircle2 size={36} />
        <h2>{t('contact.requestSent')}</h2>
        <p>
          {t('contact.requestSentDesc', {
            name: product.name,
            seller: product.seller,
          })}
        </p>
      </section>
    );

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h1>{t('contact.startConversation')}</h1>
      <p className="lead">{t('contact.conversationLead')}</p>
      <p className="label">
        {t('contact.productLabel', {
          name: product.name.toUpperCase(),
          seller: product.seller.toUpperCase(),
          price: product.price,
        })}
      </p>
      <label>
        {t('contact.yourName')}
        <input
          required
          name="name"
          placeholder={t('contact.fullNamePlaceholder')}
        />
      </label>
      <label>
        {t('contact.emailAddress')}
        <input
          required
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </label>
      <label>
        {t('contact.whatDoYouNeed')}
        <textarea
          required
          name="message"
          rows={5}
          placeholder={t('contact.messagePlaceholder')}
        />
      </label>
      <button className="primary" type="submit">
        <Send size={16} /> {t('contact.sendRequest')}
      </button>
    </form>
  );
}
