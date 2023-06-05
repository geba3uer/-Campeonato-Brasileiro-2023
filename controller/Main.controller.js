sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                // modelo

                //antes as variaveis
              //  var dadosGerais = {
               /*     rodada : '10a',
                    campeonato : "Brasileirão 2023 do canal Fiori"
                };

                // modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var view = this.getView();
                view.setModel(dadosModel, "ModeloDadosGerais");


*/
const dadosGerais = {};
const classificacao = {};
const partidas = {};

const dadosModel = new JSONModel(dadosGerais);
const classificacaoModel = new JSONModel(classificacao);
const partidasModel = new JSONModel(partidas);

this.getView().setModel(dadosModel, "ModeloDadosGerais");
this.getView().setModel(classificacaoModel, "ModeloClassificacao");
this.getView().setModel(partidasModel, "ModeloPartidas");

this.bucarDadosGerais();
this.buscarClassificacao();
this.buscarPartidas();
},

bucarDadosGerais: function () {
const dadosModel2 = this.getView().getModel("ModeloDadosGerais");

const configuracoes = {
    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
    method: "GET",
    async: true,
    crossDomain: true,
    headers: {
        "Authorization": "Bearer live_c96592332ac1ff56d923c7585fe0fa"
    }
};

$.ajax(configuracoes)
    .done(function (resposta) {
        debugger
        dadosModel2.setData(resposta)
        this.buscarPartidas(resposta.rodada_atual.rodada);
    }.bind(this))
    .fail(function (erro) {
        debugger
    });
},

buscarClassificacao: function () {
const classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

const configuracoes = {
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
    method: "GET",
    async: true,
    crossDomain: true,
    headers: {
        "Authorization": "Bearer live_c96592332ac1ff56d923c7585fe0fa"
    }
};

$.ajax(configuracoes)
    .done(function (resposta) {
        classificacaoModel2.setData({ "Classificacao": resposta })
    })
    .fail(function (erro) {
        debugger
    });
},

buscarPartidas: function (rodada) {
const partidasModel2 = this.getView().getModel("ModeloPartidas");

const configuracoes = {
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
    method: "GET",
    async: true,
    crossDomain: true,
    headers: {
        "Authorization": "Bearer live_c96592332ac1ff56d923c7585fe0fa"
    }
};

$.ajax(configuracoes)
    .done(function (resposta) {
        debugger
        partidasModel2.setData(resposta)
    })
    .fail(function (erro) {
        debugger
    });
            }
        });
        });
    
