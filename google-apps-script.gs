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
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
