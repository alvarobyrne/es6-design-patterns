var chokidar = require('chokidar');
chokidar.watch(['index.js','index.html'],{}).on('change',(a,b)=>{
    console.log("a : ",a);
    console.log("b : ",b);
    location.reload();
})

var get_source = function(main_dir, dir, file){
        var disclaimer = "";
        if(file != "Facade")
            var url = "Model/design_patterns/" + main_dir + "/" + dir + "/" + file + ".js";
        else var url = "Model/design_patterns/"+file + ".js";
        $.ajax({
            url: url,
            dataType: "script",
            success: function(data){
                let ace_file = "editor_"+file;
                console.log("ace_file : ",ace_file);
                var editor = ace.edit(ace_file);
                editor.on('change', (arg, activeEditor) => {
                  const aceEditor = activeEditor;
                  const newHeight = aceEditor.getSession().getScreenLength() *
                    (aceEditor.renderer.lineHeight + aceEditor.renderer.scrollBar.getWidth());
                   aceEditor.container.style.height = `${newHeight}px`;
                  aceEditor.resize();
                });
                editor.setTheme("ace/theme/chrome");
                editor.getSession().setMode("ace/mode/javascript");
                // editor.getSession().setUseWrapMode(true);
                // editor.setReadOnly(true);
                editor.setValue(disclaimer+data,-1);
            },
            error: function(data){
                var editor = ace.edit("editor_"+file);
                editor.setTheme("ace/theme/chrome");
                editor.getSession().setMode("ace/mode/javascript");
                editor.getSession().setUseWrapMode(true);
                //editor.setReadOnly(true);
                editor.setValue(disclaimer+"//Not yet",-1);
            }
        });
    }
