var ipc = require('electron').ipcRenderer;
window.addEventListener('load', function(){
  document.querySelectorAll('[ipc-value-bind]').forEach(function(val){
    var l = function(e){
      ipc.send('IPCVarChanged',{
        varName:e.target.getAttribute('ipc-value-bind'),
        value:(e.target.type=="checkbox"?e.target.checked:e.target.value)
      });
    };
    val.addEventListener('click',l);
    val.addEventListener('input',l);
    l({"target":val});
  });
});
ipc.on('IPCVarChanged', function(e,v){
  if(document.querySelectorAll('[ipc-value-bind="'+v.varName+'"]').length>0){
    document.querySelectorAll('input[type=checkbox][ipc-value-bind="'+v.varName+'"]').forEach(function(val){
      val.checked = v.value;
    });
    document.querySelectorAll('input:not([type=checkbox])[ipc-value-bind="'+v.varName+'"]').forEach(function(val){
      val.value = v.value;
    });
    document.querySelectorAll(':not(input)[ipc-value-bind="'+v.varName+'"]').forEach(function(val){
      val.innerText = v.value;
    });
  }

  document.querySelectorAll('[ipc-class]').forEach(function(val){
    var i = JSON.parse(val.getAttribute('ipc-class'));
    for(var item in i){
      if(i[item] == v.varName){
        if(v.value === true){
          val.classList.add(item);
        } else {
          val.classList.remove(item);
        }
      }
    }
  });
});
