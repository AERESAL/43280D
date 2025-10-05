import React from 'react';
import Link from 'next/link';

export default function PrintButton() {
  return (
    <Link href="/print" className="print-button no-print">
      🖨️ Print / Export to PDF
    </Link>
  );
}
