import React from 'react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="print-button no-print">
      🖨️ Print / Export to PDF
    </button>
  );
}
