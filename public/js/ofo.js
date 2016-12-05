;(function(exports, undefined){
  
  exports.recognize = function recognize(file){
    var loading = document.getElementById('loading');
    loading.style.display = 'fixed';
    Tesseract
    .recognize(file)
    .progress(function(info){
      info = info.status + '('+ Math.floor(parseFloat(info.progress) * 100) +'%)';
      loading.innerText = info;
    })
    .then(function(data){
      location.href = '/?q=' + data.text.match(/\d{6}/)[0];
    });
  }
  
})(window);