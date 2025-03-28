/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Beranda from "./pages/Beranda";
import LocaleContext from './contexts/LocaleContext';
import NotFoundPage from './pages/NotFoundPage';
import UsersList from './pages/UsersList';
import JanjiList from './pages/JanjiList';
import EdukasiList from './pages/EdukasiList';
import TinjauanList from './pages/TinjauanList';
import AddUsers from './pages/AddUsers';
import EditUsers from './pages/EditUsers';
import AddEdukasi from './pages/AddEdukasi';
import EditEdukasi from './pages/EditEdukasi';
import AddTinjauan from './pages/AddTinjauan';
import EditTinjauan from './pages/EditTinjauan';
import AddJanji from './pages/AddJanji';
import EditJanji from './pages/EditJanji';
import BuatJanjiPage from './pages/BuatJanjiPage';

function App() {
  const [locale, setLocale] = useState('id')

  const toggleLocale = () => {
    localStorage.setItem('locale', (locale === 'id' ? 'en' : 'id'))
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'))
  }

  const localeContextValue = useMemo(() => ({
    locale,
    toggleLocale
  }), [locale])

  useEffect(() => {

    if (localStorage.locale && ['id', 'en'].includes(localStorage.locale)) {
      setLocale(localStorage.locale)
    }

  }, [])

  return (
      <LocaleContext.Provider value={localeContextValue}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Beranda />}/>
      <Route path="/*" element={<NotFoundPage />}/>
      <Route path="/users" element={<UsersList />}/>
      <Route path="/janji" element={<JanjiList />}/>
      <Route path="/edukasi" element={<EdukasiList />}/>
      <Route path="/tinjauan" element={<TinjauanList />}/>
      <Route path="/users/add" element={<AddUsers />}/>
      <Route path="/users/edit/:id" element={<EditUsers />}/>
      <Route path="/edukasi/add" element={<AddEdukasi />}/>
      <Route path="/edukasi/edit/:id" element={<EditEdukasi />}/>
      <Route path="/tinjauan/add" element={<AddTinjauan />}/>
      <Route path="/tinjauan/edit/:id" element={<EditTinjauan />}/>
      <Route path="/janji/add" element={<AddJanji />}/>
      <Route path="/janji/edit/:id" element={<EditJanji />}/>
      <Route path="/buatJanji" element={<BuatJanjiPage />}/>

      </Routes>
      </BrowserRouter>
      </LocaleContext.Provider>
  );
}

export default App;
