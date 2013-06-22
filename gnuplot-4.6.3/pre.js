self.addEventListener('message', function(e) {
  var data = e.data;
  if (!data) return;
  var cmd = data['cmd'];
  var transaction = data['transaction'];
  var name = data['name'];
  var content = data['content'];
  var result = {
    transaction: transaction
  };
  switch (cmd) {
    case 'run':
      try {
        shouldRunNow = true;
        if (content)
          Module.run(content);
        else
          Module.run();
      } catch(err) {
        
        Module.printErr('Exit called, reset state.');
        gnuplot_create();
      };
      result['content'] = 'FINISH';
      self.postMessage(result);  
      break;
      
    case 'putFile':
      if (FS.findObject(name))
        FS.deleteFile(name);
      var arrc = content;
      if (typeof(content) == "string")
        arrc = Module['intArrayFromString'](content, true);
      FS.createDataFile('/', name, arrc);
      result['content'] = 'OK';
      self.postMessage(result);
      break;

    case 'getFile':
      var file = FS.findObject(name);
      result['content'] = file.contents || 0;
      self.postMessage(result);
      break;

    default:
      result['content'] = 'unknown cmd';
      self.postMessage(result);
  };
}, false);


var Module = {
    'noInitialRun': true,
    print: function(text) {
        self.postMessage({'transaction': -1, 'content': text});
    },
    printErr: function(text) {
        self.postMessage({'transaction': -2, 'content': text});
    },
  
};
function gnuplot_create() {
