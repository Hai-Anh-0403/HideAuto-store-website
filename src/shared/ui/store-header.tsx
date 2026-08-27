import Image from 'next/image';
import Link from 'next/link';
import { LogIn, Search } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { TranslatedText } from './translated-text';

export function StoreHeader() {
  return (
    <header>
      <div className="shell nav">
        <Link className="brand" href="/">
          <Image src="/images/icon.png" alt="HideAuto" width={28} height={28} />
          <span>HIDEAUTO</span>
        </Link>
        <nav>
          <Link href="/scripts">
            <TranslatedText en="Scripts" vi="Kịch bản" />
          </Link>
          <Link href="/developers">
            <TranslatedText en="Hire a Developer" vi="Thuê lập Deverloper" />
          </Link>
          <Link href="/#docs">
            <TranslatedText en="Docs" vi="Tài liệu" />
          </Link>
        </nav>
        <div className="nav-actions">
          <form className="header-search" action="/scripts">
            <Search size={15} />
            <input
              name="q"
              placeholder="Search scripts"
              aria-label="Search scripts"
            />
          </form>
          <LanguageSwitcher />
          <Link className="login-button" href="/auth/sign-in">
            <LogIn size={16} />
            <TranslatedText en="Sign in" vi="Đăng nhập" />
          </Link>
        </div>
      </div>
    </header>
  );
}
