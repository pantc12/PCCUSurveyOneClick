javascript: (function() {
    if (!window.jQuery) {
        var jq = document.createElement('script'); jq.type = 'text/javascript';
        jq.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(jq);
    }

    var mainFrame = window.frames[0];
    var downFrame = mainFrame.frames["downFrame"];
    var rightFrame = downFrame.frames["rightFrame"];


    $('a', rightFrame.document).filter(function() {
        return this.href.match(/netSBB1\/netSBB055A/);
    }).each(function (index, item) {
        var tmpFrame = $('<frame>').attr("id", "tmpFrame" + index);
        $('body').append(tmpFrame);

        $("#tmpFrame" + index).load(function() {
            var target = document.getElementById("tmpFrame" + index).contentDocument;
            var text = target.getElementsByTagName("body")[0].innerHTML;
            var regex = /id.*?(rdBtn.*?)"/g;
            var stack = [];

            while ((m = regex.exec(text)) !== null ) {
               stack.push(m[1]);
            } 
            var regex = /id.*?(chk.*?)"/g;

            while ((m = regex.exec(text)) !== null ) {
               stack.push(m[1]);
            }

            var regex = /id.*?(gvData.*?)"/g;

            while ((m = regex.exec(text)) !== null ) {
               stack.push(m[1]);
            }

            var regex = /id.*?(gvTeaTarget.*?)"/g;

            while ((m = regex.exec(text)) !== null ) {
               stack.push(m[1]);
            }

            while(option=stack.pop()){  
                $('#'+option,target).attr("checked", "true");
            }  

            $('#btnIns', target).click();
        });

        $("#tmpFrame" + index).attr("src", item.href);
     
    });


})();
