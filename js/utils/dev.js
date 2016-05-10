var consoleDiv = document.createElement('div');
consoleDiv.style.position = 'absolute';
consoleDiv.style.zIndex = 999;
consoleDiv.style.left = window.innerWidth/2-30+100+'px';
consoleDiv.style.top = '0px';
consoleDiv.style.color = '#FFFFFF';
consoleDiv.style.backgroundColor = 'rgba(50,50,50,0.5)';
consoleDiv.id = 'consoleDiv';
$('body').append(consoleDiv);

function _log(log, append){
    if(append){
        $('#consoleDiv').html($('#consoleDiv').html()+", "+log);
    }else {
        $('#consoleDiv').html(log);
    }
    console.log(log)
}