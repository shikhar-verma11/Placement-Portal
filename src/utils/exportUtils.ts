export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header] !== undefined && row[header] !== null ? String(row[header]) : '';
          // Escape quotes and wrap in quotes if contains comma
          const escaped = value.replace(/"/g, '""');
          return escaped.includes(',') || escaped.includes('\n') ? `"${escaped}"` : escaped;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printFormattedReport(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Placement Portal - NAAC & NIRF Official Audit Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #111; }
          h1 { font-size: 22px; margin-bottom: 4px; color: #1a365d; }
          p { color: #4a5568; font-size: 13px; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e0; padding: 8px 12px; text-align: left; }
          th { background-color: #f7fafc; font-weight: 600; }
          .header-badge { display: inline-block; padding: 4px 10px; background: #e2e8f0; border-radius: 4px; font-size: 11px; font-weight: bold; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <div class="header-badge">OFFICIAL ACCREDITATION AUDIT REPORT (2026 BATCH)</div>
        <h1>Training & Placement Cell - Placement Performance Report</h1>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
        <div>${element.innerHTML}</div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
