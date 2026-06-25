function doPost(e) {
  var ss    = SpreadsheetApp.openById("1EHIpiZaxNDeO8tdGTp1wwEWTlaXsD7a1-NlY5aPJGDA");
  var sheet = ss.getActiveSheet();

  var nombre  = (e.parameter.nombre  || "").toString().trim();
  var dni     = (e.parameter.dni     || "").toString().trim();
  var celular = (e.parameter.celular || "").toString().trim();
  var fecha   = Utilities.formatDate(new Date(), "America/Lima", "dd/MM/yyyy HH:mm:ss");

  if (sheet.getLastRow() < 1) {
    sheet.appendRow(["Fecha", "Nombre Completo", "DNI", "Celular"]);
  }

  sheet.appendRow([fecha, nombre, dni, celular]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  /* Verificación de DNI duplicado: ?action=check&dni=12345678 */
  if (e && e.parameter && e.parameter.action === "check" && e.parameter.dni) {
    var ss    = SpreadsheetApp.openById("1EHIpiZaxNDeO8tdGTp1wwEWTlaXsD7a1-NlY5aPJGDA");
    var sheet = ss.getActiveSheet();
    var lastRow = sheet.getLastRow();

    var exists = false;
    var dniQuery = e.parameter.dni.toString().trim();

    if (lastRow > 1) {
      /* La columna DNI es la 3ª (índice 2). Leemos solo esa columna para eficiencia. */
      var dniValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < dniValues.length; i++) {
        if (dniValues[i][0] && dniValues[i][0].toString().trim() === dniQuery) {
          exists = true;
          break;
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ exists: exists }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
