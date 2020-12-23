$(document).ready(() => {
    let globalTime = new Date();

    let rawData = localStorage.getItem('rawData');
    if(rawData != '') {
        $('#textbox').val(rawData);
    }
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#textbox').keyup(() => {
        localStorage.setItem('rawData', $('#textbox').val());
        $('#hiddenData').val($('#textbox').val());

        let textbox = $('#textbox').val();
        let Noofwords = textbox.split(' ');
        let localTime = new Date();
        let diff = Math.round(localTime.getTime() - globalTime.getTime());
        let min = diff/60000;
        let wpm = Math.round(Noofwords.length/min);
        $('#typingSpeed').html(`${wpm} WPM`);
        
    });

    $('#newFile').click(() => {
        let textbox = $('#textbox').val();
        if(textbox != '') {
            $('#msg').html('Do you want to delete previous content?');
            $('#mainModal').modal('toggle');
        }
    });

    $('#newFileBtn').click(() => {
       $('#textbox').val('');
       localStorage.removeItem('rawData');
       $('#mainModal').modal('toggle');
    });

    $('#save').click(() => {
        $('#saveFilename').show('slow');
    });

    $('#cancelSave').click(() => {
        $('#saveFilename').hide('slow');
    });

    $('#confirmSave').click(() => {
        let filename = $('#filename').val();

        if(filename == '') { 
            filename = 'filename.txt';
            document.title = 'Notepad- filename';
        } else {
            let ext = filename.split('.');
            ext[1] = 'txt';
            document.title = `Notepad- ${ext[0]}`;
            filename = ext.join('.');
        }

        s = $('#textbox').val();
        s = s.replace(/\n/g,'\r\n');
		var blob = new Blob([s], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    });

    $('#sendMailBtn').click(() => {
        $('#mailModal').modal('toggle');


    });
});
