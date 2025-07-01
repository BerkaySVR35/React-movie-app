import React from "react";

export default function NavSearchResult({ movies, totalResults }) {
  return (
    <div className="col-4 text-end">
      <strong>{totalResults}</strong> Kayıt Bulundu.
    </div>
  );
}
