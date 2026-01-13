'use client';
import { useState, useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/auth';
import UserMenu from '../userMenu/UserMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '../../hook/useAuth';
import './navbar.scss';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const Navbar: FC = () => {
  useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoToLogin = () => {
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };
  const handleGoToDownload = () => {
    router.push('/download');
    closeMenu();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  if (!mounted) {
    return (
      <header className="navbar">
        <nav className="hors-connexion">
          <div className="logo-container">
            <Link href="/">
              <Image
                src="/Logo(2).png"
                alt="logo"
                width={120}
                height={110}
                className="logo-nav"
              />
            </Link>
          </div>
          <div className="menus">
            <ul className="menu">
              <li className="dropdown">
                <span className="dropdown-toggle">
                  <span className="label">Jeu</span>
                  <ChevronDown size={16} className="chevron" />
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <Link href="/ladders">Ladders</Link>
                  </li>
                  <li>
                    <Link href="/classes">Classes</Link>
                  </li>
                  <li>
                    <Link href="/decouvrir">Découvrir</Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <span className="dropdown-toggle">
                  <span className="label">Actus</span>
                  <ChevronDown size={16} className="chevron" />
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <Link href="/actus">News</Link>
                  </li>
                  <li>
                    <Link href="/actus/patchs">Patch notes</Link>
                  </li>
                  <li>
                    <Link href="/actus/events">Événements</Link>
                  </li>
                </ul>
              </li>

              {/* Boutique simple (pas de dropdown) */}
              <li>
                <Link href="/boutique">Boutique</Link>
              </li>

              <li>
                <span className="dropdown-toggle">
                  <span className="label">Autres</span>
                  <ChevronDown size={16} className="chevron" />
                </span>
              </li>
            </ul>
          </div>
          <div className="connexion">
            <ul className="connecter">
              <div className="langue">
                <li className="planete">
                  <Image
                    src="/assets/planete.png"
                    alt="planete"
                    width={32}
                    height={32}
                  />
                </li>
                <li>FR</li>
              </div>
              <li className="compte">
                <Image
                  src="/assets/icons8-user-48.png"
                  alt="icône compte"
                  width={32}
                  height={32}
                  style={{ cursor: 'pointer' }}
                />
              </li>
              <li>
                <button className="jouer" onClick={handleGoToDownload}>
                  Jouer
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="navbar">
      <nav className="hors-connexion">
        <div className="logo-container">
          <Link href="/">
            <Image
              src="/Logo(2).png"
              alt="logo"
              width={120}
              height={110}
              className="logo-nav"
            />
          </Link>
        </div>

        <div className={menuOpen ? 'menus open' : 'menus'}>
          <ul className="menu">
            {/* JEU */}
            <li
              className={`dropdown ${openDropdown === 'jeu' ? 'active' : ''}`}
            >
              <span
                className="dropdown-toggle"
                onClick={() => toggleDropdown('jeu')}
              >
                <span className="label">Jeu</span>
                <ChevronDown
                  size={16}
                  className={`chevron ${openDropdown === 'jeu' ? 'open' : ''}`}
                />
              </span>

              <ul className="dropdown-menu">
                <li>
                  <Link href="/ladders" onClick={closeMenu}>
                    Ladders
                  </Link>
                </li>
                <li>
                  <Link href="/classes" onClick={closeMenu}>
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href="/decouvrir" onClick={closeMenu}>
                    Découvrir
                  </Link>
                </li>
              </ul>
            </li>

            {/* ACTUS */}
            <li
              className={`dropdown ${openDropdown === 'actus' ? 'active' : ''}`}
            >
              <span
                className="dropdown-toggle"
                onClick={() => toggleDropdown('actus')}
              >
                <span className="label">Actus</span>
                <ChevronDown
                  size={16}
                  className={`chevron ${
                    openDropdown === 'actus' ? 'open' : ''
                  }`}
                />
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/actus" onClick={closeMenu}>
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/actus/patchs" onClick={closeMenu}>
                    Patch notes
                  </Link>
                </li>
                <li>
                  <Link href="/actus/events" onClick={closeMenu}>
                    Événements
                  </Link>
                </li>
              </ul>
            </li>

            {/* BOUTIQUE simple */}
            <li className="nav-link boutique-link">
              <Link href="/boutique" onClick={closeMenu}>
                <span className="label">Boutique</span>
                <ArrowUpRight size={16} className="arrow-diagonal" />
              </Link>
            </li>

            {/* AUTRES */}
            <li
              className={`dropdown ${
                openDropdown === 'autres' ? 'active' : ''
              }`}
            >
              <span
                className="dropdown-toggle"
                onClick={() => toggleDropdown('autres')}
              >
                <span className="label">Autres</span>
                <ChevronDown
                  size={16}
                  className={`chevron ${
                    openDropdown === 'autres' ? 'open' : ''
                  }`}
                />
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/faq" onClick={closeMenu}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" onClick={closeMenu}>
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Bouton Jouer uniquement mobile */}
          {menuOpen && (
            <button className="jouer" onClick={handleGoToDownload}>
              Jouer
            </button>
          )}
        </div>

        <div className="connexion">
          <ul className="connecter">
            <div className="langue">
              <li className="planete">
                <Image
                  src="/assets/planete.png"
                  alt="planete"
                  width={32}
                  height={32}
                />
              </li>
              <li>FR</li>
            </div>
            <li className="compte">
              {user ? (
                <UserMenu />
              ) : (
                <Image
                  src="/assets/icons8-user-48.png"
                  alt="icône compte"
                  width={32}
                  height={32}
                  style={{ cursor: 'pointer' }}
                  onClick={handleGoToLogin}
                />
              )}
            </li>
            <li>
              <button className="jouer" onClick={handleGoToDownload}>
                Jouer
              </button>
            </li>
          </ul>

          <div className="burger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
