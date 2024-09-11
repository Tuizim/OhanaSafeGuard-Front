let timeoutId;

function handleVisibilityChange(){
    if (document.hidden){
        timeoutId = setTimeout( function(){
            sessionStorage.clear();
            location.reload()
        },60000)
    }
    else{
        clearTimeout(timeoutId);
    }
}

document.addEventListener('visibilitychange',handleVisibilityChange)