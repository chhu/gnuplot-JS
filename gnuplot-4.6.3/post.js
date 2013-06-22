    shouldRunNow = true;
    self['Runtime'] = Runtime;
    self['FS'] = FS;
};
gnuplot_create();
// This is to avoid name mangling from closure compilers 
self['FS'] = FS;
self['FS']['root'] = FS.root;
self['FS']['deleteFile'] = FS.deleteFile;
self['FS']['findObject'] = FS.findObject;
self['FS']['createDataFile'] = FS.createDataFile;
self['FS']['getFileContents'] = function(name) {
    var file = FS.findObject(name);
    if (!file) return null;
    return file.contents;
};

