'use client';

import { useEffect } from 'react';

export function ClosePageButton() {
  return (
    <button className="btn btn-soft" onClick={() => window.close()}>
      ❌ Close
    </button>
  );
}
