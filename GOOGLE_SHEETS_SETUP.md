# Configuración: Formulario → Google Sheets

Sigue estos pasos para conectar el formulario de la landing con tu Google Sheet.

## 1. Crear la hoja de cálculo

1. Ve a [Google Sheets](https://docs.google.com/spreadsheets) y crea una hoja en blanco.
2. En la primera fila (fila 1), escribe exactamente estos encabezados:

```
A1: timestamp
B1: nombre
C1: telefono
D1: marca
E1: modelo
F1: placa
```

> **Importante:** los encabezados deben coincidir exactamente con los atributos `name` de los inputs del formulario.

## 2. Crear el Apps Script

1. Dentro de tu Google Sheet, ve a **Extensiones > Apps Script**.
2. Elimina el contenido por defecto de `Code.gs` y pega el siguiente código:

```javascript
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
    const sheetName = e.parameter.sheet_name || 'Sheet1';
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      if (header === 'id') return Utilities.getUuid();
      if (header === 'timestamp') return new Date();

      const rawValue = e.parameter[header] || '';
      return sanitizeValue(rawValue);
    });

    const newRange = sheet.getRange(nextRow, 1, 1, newRow.length);
    newRange.setNumberFormat('@');
    newRange.setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: e.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Guarda el proyecto con **Archivo > Guardar**.

## 3. Ejecutar la configuración inicial

1. En el editor de Apps Script, selecciona la función `initialSetup` en el selector de funciones.
2. Haz clic en **Ejecutar** (▶️).
3. La primera vez pedirá permisos. Acepta todos los permisos necesarios.

> Este paso guarda el ID de la hoja activa para que el script sepa dónde escribir.

## 4. Desplegar como Web App

1. Ve a **Implementar > Nuevo implementación**.
2. Haz clic en el engranaje ⚙️ y selecciona **Aplicación web**.
3. Configura:
   - **Descripción:** `Formulario Iron Biker's`
   - **Ejecutar como:** `Yo`
   - **Acceso:** `Cualquiera`
4. Haz clic en **Implementar**.
5. Copia la **URL de la aplicación web**.

## 5. Actualizar la landing page

1. Abre `index.html`.
2. Busca esta línea en el formulario:

```html
<form class="space-y-8" id="contactForm" action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" method="POST">
```

3. Reemplaza `YOUR_SCRIPT_ID` con el ID de tu URL. Si tu URL es:

```
https://script.google.com/macros/s/AKfycbzXXXXXXXX/exec
```

Entonces usa:

```html
action="https://script.google.com/macros/s/AKfycbzXXXXXXXX/exec"
```

4. Guarda, commitea y sube a GitHub.

## 6. Probar

1. Abre la página publicada.
2. Llena el formulario y envíalo.
3. Verifica que los datos aparezcan en el Google Sheet.

## Notas de seguridad

- El script está configurado para acceso `Cualquiera`, lo cual permite que cualquier visitante envíe datos. No expongas hojas con información sensible.
- Si aparece la advertencia "Google no ha verificado esta aplicación", haz clic en **Avanzado > Ir a...** para continuar. Es normal para proyectos personales no verificados.
- Si quieres evitar spam, se puede agregar un campo honeypot o validación adicional en el futuro.
