'use client';

import Image from 'next/image';
import ItemTest from "@/components/ItemTest";
import { useState, useEffect } from 'react';

import { LOGIN_TEST_ENVIRONMENT, ARTICULO_TEST_ENVIRONMENT } from '@/hooks/Constans'

export default function Home() {

  const [testEnvironment, setTestEnvironment] = useState('');

  //* useEffect de Inicio
  useEffect(() => {
    setTestEnvironment(LOGIN_TEST_ENVIRONMENT)
    console.log('CARGADO');
  }, []);

  const handleSidebarClick = (environment) => {
    setTestEnvironment(environment);
  };

  return (
    <>
      {testEnvironment && (
        <div className="container-fluid">
          {/* Top Bar */}
          <header className="row topbar">
            <div className="col">
              <div className="d-flex flex-row align-items-center pt-3 mb-3">
                <div className="mr-auto">
                  <Image src="/public/img/Kinetlogo.png" width={175} height={50} alt="Logo Kinet" />
                </div>
                <div className="d-flex justify-content-center flex-fill">
                  <h1 className="h2">Dashboard</h1>
                </div>
              </div>
            </div>
          </header>

          {/* <div className="row el1"> */}
          <div className="row">
            <nav className="col col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky" >
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a id="loginLink" className="nav-link active text-center p-3" aria-current="page" onClick={() => handleSidebarClick(LOGIN_TEST_ENVIRONMENT)} href="#">Inicio de sesión </a>
                  </li>
                  <li className="nav-item">
                    <a id="loginLink" className="nav-link active text-center p-3" aria-current="page" onClick={() => handleSidebarClick(ARTICULO_TEST_ENVIRONMENT)} href="#">Articulo </a>
                  </li>
                </ul>
              </div>
            </nav>
            {/* <main id="mainContent" className="col col-md-10 ml-sm-auto px-4 el3"> */}
            <main id="mainContent" className="col col-md-10 ml-sm-auto px-4">
              <ItemTest testScope={testEnvironment} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
