document.addEventListener('DOMContentLoaded', function() {
    const defaultName = "player_stats";
    const input = document.getElementById( "filename" );
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: "data"}, function(response) {
                const a = document.createElement("a");
                const blob = new Blob([JSON.stringify( response.data )], {type: "application/json"});
                const filename = `${ input.value || defaultName }.json`;
                const url = window.URL.createObjectURL(blob);
                a.setAttribute( "target", "_blank" );
                a.setAttribute('href', url);
                a.setAttribute('download', filename );
                a.click();
            });
        });
    });
});

