$(function () {
	var languages = [];
	var organizations =[];
	var subscriptions =[];
	var subDesc =[];
	var projects = [];
	var reposDesc = {};
	var subsObj = {};
	var pd = [];
	var view ={};
		 $('form#run').submit(function(e){	
        var username = $('#username').val();        
		e.preventDefault();
		
var jqxhr = $.getJSON( "https://api.github.com/users/" + username, function() {
  console.log( "success" );  
})
  .done(function() {
	 console.log( "second success" );
	console.log(jqxhr);
	var jsonStr = JSON.stringify(jqxhr.responseJSON);
	console.log(jsonStr);
	  
var data = jqxhr.responseJSON;  
	console.log("yes");
	 view ={
    "name": data.name,
	"login" :data.login,
	"login": data.login,
	"email": data.email,
	"blog": data.blog,
	"location": data.location,
	"joiningYear": new Date(data.created_at).getFullYear(),
	"company": data.company,
	"public_repos": data.public_repos,
	"repos_label": data.public_repos > 1 ? 'repositories' : 'repository',
    "public_gists": data.public_gists,
	"followers": data.followers,
    "followers_label": data.followers > 1 ? 'followers' : 'follower',
	"resume_url": window.location
	};
 // Grab the template script
	 
  var theTemplateScript = $("#resume-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  // Pass our data to the template
  var theCompiledHtml = theTemplate(view);

  // Add the compiled html to the page
  $('#resume').html(theCompiledHtml);
})
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );  
});	

 var testData = $.getJSON('https://api.github.com/users/'+username+'/repos', function() {		
  console.log( "success hai: " );  
})
.done(function() {
	console.log( "success hai2: " ); 	
	var newData = $.parseJSON(JSON.stringify(testData));
		for(var lang=0; lang < newData.responseJSON.length; lang++) {
			var skill = newData.responseJSON[lang].language;
			var project = newData.responseJSON[lang].name;
			var desc = newData.responseJSON[lang].description;
			if(languages.indexOf(skill) < 0 && skill !== null) {			
			languages.push(skill);
			}	
			if(projects.indexOf(project) < 0 && project !== null) {			
			projects.push(project);			
			}
            if(pd.indexOf(desc) < 0 && desc !== null) {			
			pd.push(desc);			
			}
			reposDesc[project] = desc;			
			}		
			console.log(reposDesc);	
			view["projDesc"] = reposDesc;			
			view["languages"] = languages;
			
			if(projects.length > 6){
			view["projects"] = projects.slice(0,5);
			}
			if(pd.length > 6){
			view["pd"] = pd.slice(0,5);
			}
					
 // Grab the template script
	 
  var theTemplateScript = $("#resume-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  // Pass our data to the template
  var theCompiledHtml = theTemplate(view);

  // Add the compiled html to the page
  $('#resume').html(theCompiledHtml);			
});

var orgData = $.getJSON('https://api.github.com/users/'+username+'/orgs', function() {		
  console.log( "success hai: " );  
})
.done(function() {
	console.log( "success hai2: " ); 	
	var oData = $.parseJSON(JSON.stringify(orgData));
		for(var org=0; org < oData.responseJSON.length; org++) {
			var orgs = oData.responseJSON[org].login;
			if(organizations.indexOf(orgs) < 0 && orgs !== null) {			
			organizations.push(orgs);
			}			
			}
			view["organizations"] = organizations.toString();	
 // Grab the template script
	 
  var theTemplateScript = $("#resume-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  // Pass our data to the template
  var theCompiledHtml = theTemplate(view);

  // Add the compiled html to the page
  $('#resume').html(theCompiledHtml);			
});
	$("#print").click(function(){
                    window.print();
                    return false;
                });
  });
    });



 