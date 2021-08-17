(function() {
  'use strict';

  this.cronapi = this.cronapi || {};

   /**
   * @categoryName My Functions
   */
  this.cronapi.myfunctions = this.cronapi.myfunctions || {};
  
  /**
  * @type function
  * @name Converte base64 em blob
  * @description base64ToBlob
  * @multilayer false
  * @returns {ObjectType.STRING}
  */
  this.cronapi.myfunctions.base64ToBlob = function(/** @type {ObjectType.STRING} @description data: data */ data, /** @type {ObjectType.STRING} @description mimeType: mimeType */ mimeType) {
    let binary = atob(data);
    let buffer = new ArrayBuffer(binary.length);
    let blob = new Uint8Array(buffer);
    for (var i = 0; i < binary.length; i++) {
      blob[i] = binary.charCodeAt(i);
    }
    return new Blob( [blob], { type:mimeType });
  };
  
  /**
  * @type function
  * @name Converte arquivo em base64
  * @description Convert file in base64
  * @multilayer false
  * @param {ObjectType.OBJECT} id: id do componente
  */
  this.cronapi.myfunctions.convertFileToBase64 = function(/** @type {ObjectType.OBJECT} @description id: id do componente @blockType ids_from_screen*/ id, /** @type {ObjectType.STATEMENTSENDER} @description Retorno da função */ retorno) {
    var reader = new FileReader();
    var screen = this.cronapi.screen;
    var file = document.getElementById(id).files[0];
    if(file != null && file != undefined && file != ""){
      var filePos = (file.name).lastIndexOf(".");
      var fileName = (file.name).substr(0, filePos);
      var extension = (file.name).substr(filePos, file.name.length);
      reader.readAsDataURL(file);
      reader.onload = function () {
        let value = reader.result;
        let pos = value.indexOf("base64,");
        let finalB64 = value.substr(pos+7, value.length);
        const res = {
          "nome_arquivo": fileName,
          "nome_arquivo_completo": file.name,
          "extensao": extension,
          "tipo_arquivo": file.type,
          "arquivo": finalB64
        };
        retorno(res);
      };
      reader.onerror = function (error) {
        console.log("error conversão: ", error);
        retorno(null);
      }
    }
  };

  /**
  * @type function
  * @name Download arquivo
  * @description download de arquivo
  * @multilayer false
  * @param {ObjectType.STRING} blob: blob para download
  * @param {ObjectType.STRING} Nome: nome do arquivo
  */
  this.cronapi.myfunctions.downloadFile = function(/** @type {ObjectType.STRING} @description blob: blob para download */ blob, /** @type {ObjectType.STRING} @description filename: nome do arquivo */ filename) {
    try {
      var finalURL = URL.createObjectURL(blob);
      this.cronapi.internal.downloadUrl(finalURL, filename);
    } catch (e) {
      alert("Não foi possível realizar o download do arquivo");
    }
  };

  /**
  * @type function
  * @name Cria URL de um blob
  * @description returnUrlToBlob
  * @multilayer false
  * @param {ObjectType.STRING} blob: blob
  * @returns {ObjectType.STRING}
  */
  this.cronapi.myfunctions.returnUrlToBlob = function(/** @type {ObjectType.STRING} @description blob: blob */ blob) {
    try {
      var finalURL = URL.createObjectURL(blob);
      return finalURL;
    } catch (e) {
      alert("Não foi possível visualizar o item");
      return "error";
    }
  };

}).bind(window)();