$(document).ready(function() {
    hideElements();   
    var clip = new ZeroClipboard($("#copy-btn"));
    $('input[name="Submit"]').on("click", function() {
        var oldUrl = $('#old-url').val();
        convertURL(oldUrl);
    });

//    $(".copy").on("click", function() {
//        copyToClipboard(new_url);
//    });

    clip.on("load", function (client) {
    console.log("Flash movie loaded and ready.");

    client.on("complete", function (client, args) {
      console.log("Copied text to clipboard: " + args.text);
    });
  });

  $('input[name="Clear"]').on("click", function() {
	$("#new-URL").html("");
	$("#old-url").val("");
	hideElements();
  });
  
  function hideElements() {
	$(".copy").hide();
	$('h2').hide();
	$('input[name="Clear"]').hide();

  }

    function convertURL(url) {
        var splitURL = url.split('/');
	var new_url = "";
	if(splitURL[3] == "a")
	{
        splitURL[5] = "spreadsheet";
        splitURL[6] = "ccc?key=";
        splitURL[8] = splitURL[8].slice(4);
	}
	else if(splitURL[3] == "spreadsheets")
	{
	splitURL[3] = "spreadsheet";
	splitURL[4] = "ccc?key=";
	splitURL[6] = splitURL[6].slice(4);
	}
	new_url = constructNewURL(splitURL);
        $("h2").show();
        $(".copy").show();
	$('input[name="Clear"]').show();
        $("#new-URL").html('<a href="' + new_url + '" target="_blank">' + new_url + '</a>');
    }
    
    function constructNewURL(modified_split_URL) {
	var gedit = modified_split_URL.pop();
	var key = modified_split_URL.pop();
	var constructed_url = modified_split_URL.join('/')+key+gedit;
	return constructed_url;
    }
	
    
    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

});
