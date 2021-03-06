var SuapClient = function(){};

SuapClient.xhr;

SuapClient.getData = function({url, auth, didLoad}) {
  var args = arguments[0];
  this.xhr = new XMLHttpRequest();
  this.xhr.open("GET","https://suap.ifrn.edu.br/" + args.url, true);
  this.xhr.setRequestHeader("Content-Type","application/json");
  this.xhr.setRequestHeader("Authorization","Basic " + args.auth);
  this.xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
      console.log("The response of the request is:", this.response);
      args.didLoad && args.didLoad();
    }
  }
  this.xhr.send(null);
  return this.xhr;
}