import React from "react";
import useLanguage from "../hooks/useLanguage";

export default function NotFoundPage() {
  const text = useLanguage("app");

  return (
    <section className="d-flex flex-column align-items-center justify-content-center vh-100"> {/* Gunakan vh-100 dan flex-column */}
      <h1 className="display-1 text-blue fw-bold">404</h1> 
      <p className="lead">{text.notFound.pageNotFound}</p> 
    </section>
  );
}