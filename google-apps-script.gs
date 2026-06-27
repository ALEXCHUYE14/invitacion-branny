function doPost(e) {
  var ss    = SpreadsheetApp.openById("1EHIpiZaxNDeO8tdGTp1wwEWTlaXsD7a1-NlY5aPJGDA");
  var sheet = ss.getActiveSheet();

  var nombre  = (e.parameter.nombre  || "").toString().trim();
  var dni     = (e.parameter.dni     || "").toString().trim();
  var celular = (e.parameter.celular || "").toString().trim();
  var pases   = parseInt(e.parameter.pases || "1", 10);
  if (isNaN(pases) || pases < 1 || pases > 5) { pases = 1; }
  var fecha   = Utilities.formatDate(new Date(), "America/Lima", "dd/MM/yyyy HH:mm:ss");

  if (sheet.getLastRow() < 1) {
    sheet.appendRow(["Fecha", "Nombre Completo", "DNI", "Celular", "Pases"]);
  }

  sheet.appendRow([fecha, nombre, dni, celular, pases]);

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

    var exists   = false;
    var dniQuery = e.parameter.dni.toString().trim();

    if (lastRow > 1) {
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
