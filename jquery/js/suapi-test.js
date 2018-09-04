var suapURL = "https://suap.ifrn.edu.br/";

function suapiLogin(username, password, acao){
    var uri = "api/v2/autenticacao/token/";
    var dados = { "username": username, "password": password};
    var dados_json = JSON.stringify(dados);
    $.ajax({
        url: suapURL+uri,
        dataType: 'json',
        data: dados_json,
        type: 'POST',
        contentType: 'application/json',
        success: function (data) {
          token = data.token;
          sessionStorage.setItem("token", token);
          acao();
        },
        error: function(){
          alert("Impossível recuperar dados");
        }
    });
}

function suapiToken(){
    return sessionStorage.getItem("token");
}

function suapiData(uri, token, metodo, dados, acao){
    var dados = { "token": suapiToken() };

    $.ajax({
        url: suapURL+uri,
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("Authorization", "JWT "+token); 
        },
        data: dados,
        dataType: 'json',
        type: metodo,
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            sessionStorage.setItem('dados', JSON.stringify(data));
            acao();
        },
        error: function(){
          alert("Cannot get data");
        }
    });

}
    
var acaoLogin = function(){
    var dados = JSON.parse(sessionStorage.getItem('dados'));
    $("#form-login").addClass("d-none");
    $("#usuario-nome").html(dados.nome_usual);
    $("#usuario-tipo").html(dados.tipo_vinculo);
    $("#usuario-email").html(dados.email);
    $("#dados-usuario").removeClass("d-none");

}
function recuperarDadosUsuario(){
    suapiData("api/v2/minhas-informacoes/meus-dados/", sessionStorage.getItem('token'), 'GET', "", acaoLogin);
}

$(document).ready(function(){
    if (suapiToken()){
        acaoLogin();
    }
});

$("#botao-login").click(function(e){
    var v_login = $("#login").val();
    var v_senha = $("#senha").val();
    suapiLogin(v_login, v_senha, recuperarDadosUsuario);
    
});



$("#botao-sair").click(function(e){
    sessionStorage.removeItem("token");
    location.reload();
});