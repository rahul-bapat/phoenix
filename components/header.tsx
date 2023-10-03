import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import Tooltip from './tool-tip';
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps, Entry, NavLinks } from "../typescript/layout";

export default function Header({ header, entries }: { header: HeaderProps, entries: Entry }) {

  const router = useRouter();
  const [getHeader, setHeader] = useState(header);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function buildNavigation(ent: Entry, hd: HeaderProps) {
    let newHeader = { ...hd };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink: NavLinks) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {}
          });
        }
      });
    }
    return newHeader
  }

  async function fetchData() {
    try {
      if (header && entries) {
        const headerRes = await getHeaderRes();
        const newHeader = buildNavigation(entries, headerRes)
        setHeader(newHeader);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (header && entries) {
      onEntryChange(() => fetchData());
    }
  }, [header]);
  const headerData = getHeader ? getHeader : undefined;

  return (
    <header className={`nav__container ${isMenuOpen ? 'open' : ''}`}>
      <nav role="navigation" className="nav__wrapper" >
        <div className="grid-v2 container-v2 nav__bar nav__bar--top">
          <div className="nav__bar__leading">
            <div className="nav__bar__logo">
              <a href="#" className="logo-link">
                <img src="/jll-logo-positive.svg" alt={headerData && headerData.title}
                  title={headerData && headerData.title} className="cq-dd-image logo" loading="lazy" width="100" height="43" />
              </a>
            </div>
            <div className={`max-width header-div ${isMenuOpen ? 'open' : ''}`}>
              <nav className='menu'>
                <ul className={`nav-ul header-ul ${isMenuOpen ? 'open' : ''}`}>
                  {headerData ? (
                    headerData.navigation_menu.map((list) => {
                      const className =
                        router.asPath === list.page_reference[0].url ? 'active' : '';
                      return (
                        <li
                          key={list.label}
                          className='nav-li'
                          {...list.page_reference[0].$?.url as {}}
                        >
                          <Link href={list.page_reference[0].url} className={className}>
                            {list.label}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <Skeleton width={300} />
                  )}
                </ul>
              </nav>
            </div>
          </div>
          <div className="nav__bar-trailing">
            <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}