/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { MdGTranslate } from 'react-icons/md'
import LocaleContext from '../contexts/LocaleContext'
import useLanguage from '../hooks/useLanguage';

export default function LangToggler() {
  const { locale, toggleLocale } = useContext(LocaleContext)
  const text = useLanguage("app");

  return (
    <button
      type="button"
      title={locale === 'id' ? 'Indonesia' : 'English'}
      className="toggle-locale nav-link me-3"
      onClick={toggleLocale}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: '8px', 
        cursor: 'pointer'
      }}
    >
      <div style={{fontSize: '16px'}} className="d-flex rounded-pill align-items-center mt-3 text-blue-light"> 
      <MdGTranslate className="me-1" /> {text.nav.lang}
      </div>
    </button>
  )
}
