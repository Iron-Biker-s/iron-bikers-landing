/**
 * Iron Biker's Club — Formularios web → Google Sheets
 * =====================================================
 * Recibe POSTs de /#contacto y /unete y los escribe como filas.
 *
 * Mejoras sobre la versión anterior (retrocompatible, no rompe nada):
 *  - Si llega un campo que no existe como encabezado, se crea la
 *    columna automáticamente al final (los campos nuevos de /unete
 *    se registran sin tocar la hoja a mano).
 *  - Si `sheet_name` apunta a una hoja inexistente, la crea con la
 *    columna `timestamp` en vez de fallar.
 *  - Los checkboxes llegan como "on" → se guardan como "Sí".
 *  - Se ignoran parámetros internos (sheet_name) al crear columnas.
 *
 * INSTALACIÓN:
 *  1. Pegar este código en Apps Script (reemplaza el actual).
 *  2. Implementar → Administrar implementaciones → editar →
 *     "Nueva versión" (obligatorio para que el web app use el código
 *     nuevo; si no, sigue corriendo la versión vieja).
 *  3. La URL /exec no cambia — no hay que tocar la landing.
 */

const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function sanitizeValue(value) {
  if (typeof value !== 'string') return value;
  const triggers = ['=', '+', '-', '@'];
  if (triggers.some(t => value.startsWith(t))) {
    return "'" + value;
  }
  return value;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    /* Honeypot: si `empresa` tiene valor es un bot → éxito falso, sin
       escribir la fila (defensa extra aunque el JS del sitio falle) */
    if (e.parameter.empresa) {
      return ContentService.createTextOutput(
        JSON.stringify({ result: 'success' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheetName = e.parameter.sheet_name || 'Sheet1';
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    let sheet = doc.getSheetByName(sheetName);

    /* Si la hoja no existe, se crea con el encabezado base */
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(['timestamp']);
    }

    /* Encabezados actuales (sin espacios ni celdas vacías) */
    let headers = sheet
      .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
      .getValues()[0]
      .map(String)
      .map(h => h.trim())
      .filter(h => h !== '');

    if (headers.length === 0) {
      sheet.getRange(1, 1).setValue('timestamp');
      headers = ['timestamp'];
    }

    /* Columnas nuevas para campos que lleguen por primera vez */
    const internal = ['sheet_name', 'empresa'];
    const incoming = Object.keys(e.parameter)
      .filter(k => internal.indexOf(k) === -1);
    const missing = incoming.filter(k => headers.indexOf(k) === -1);
    if (missing.length > 0) {
      sheet
        .getRange(1, headers.length + 1, 1, missing.length)
        .setValues([missing]);
      headers = headers.concat(missing);
    }

    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(function (header) {
      if (header === 'id') return Utilities.getUuid();
      if (header === 'timestamp') return new Date();

      let rawValue = e.parameter[header] || '';
      if (rawValue === 'on') rawValue = 'Sí'; // checkboxes marcados
      return sanitizeValue(rawValue);
    });

    const newRange = sheet.getRange(nextRow, 1, 1, newRow.length);
    newRange.setNumberFormat('@');
    newRange.setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
