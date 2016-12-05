;(function(exports, undefined){
  
  function redirect(url){
    location.href = url;
  }
  
  exports.recognize = function recognize(file){
    Tesseract
    .recognize(file)
    .then(function(data){
      redirect('/?q=' + data.text.match(/\d{6}/)[0]);
    });
  }
  
})(window);