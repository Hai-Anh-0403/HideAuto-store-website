import { Message } from '@/shared/ui/message';

export function LegalDocument({ type }: { type: 'policies' | 'terms' }) {
  const isPolicies = type === 'policies';
  return (
    <article className="legal-document">
      <p className="label">
        <Message id={isPolicies ? 'legal.policiesLabel' : 'legal.termsLabel'} />
      </p>
      <h1>
        <Message id={isPolicies ? 'legal.policiesTitle' : 'legal.termsTitle'} />
      </h1>
      <p className="lead">
        <Message
          id={
            isPolicies ? 'legal.policiesDescription' : 'legal.termsDescription'
          }
        />
      </p>
      <p className="legal-notice">
        <Message id="legal.draftNotice" />
      </p>
      <div className="legal-sections">
        {isPolicies ? (
          <>
            <section>
              <h2>
                <Message id="legal.privacyTitle" />
              </h2>
              <p>
                <Message id="legal.privacyDescription" />
              </p>
            </section>
            <section>
              <h2>
                <Message id="legal.licenseTitle" />
              </h2>
              <p>
                <Message id="legal.licenseDescription" />
              </p>
            </section>
            <section>
              <h2>
                <Message id="legal.refundTitle" />
              </h2>
              <p>
                <Message id="legal.refundDescription" />
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2>
                <Message id="legal.marketplaceTitle" />
              </h2>
              <p>
                <Message id="legal.marketplaceDescription" />
              </p>
            </section>
            <section>
              <h2>
                <Message id="legal.sellerTermsTitle" />
              </h2>
              <p>
                <Message id="legal.sellerTermsDescription" />
              </p>
            </section>
            <section>
              <h2>
                <Message id="legal.contactTitle" />
              </h2>
              <p>
                <Message id="legal.contactDescription" />
              </p>
            </section>
          </>
        )}
      </div>
    </article>
  );
}
