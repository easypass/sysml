/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * @author zhangpn / https://github.com/zhangpn
 */

define(['underscore'], function (_underscore) {
    'use strict';
    var _metaID = 'SysML.META.js',
        META_TYPES = {
            'Actor': 'Actor',
            'FCO': 'FCO',
            'Package': 'Package',
            'SysMLMetaLanguage': 'SysMLMetaLanguage',
            'UseCase': 'UseCase',
            'UseCaseDiagram': 'UseCaseDiagram'
        },
        client = WebGMEGlobal.Client;

    function _getMetaTypes() {
        var metaNodes = client.getAllMetaNodes(),
            dictionary = {},
            i,
            name;

        for (i = 0; i < metaNodes.length; i += 1) {
            name = metaNodes[i].getAttribute('name');
            if (META_TYPES[name]) {
                dictionary[name] = metaNodes[i].getId();
            }
        }

        return dictionary;
    }

    function _getMetaTypesOf(objId) {
        var orderedMetaList = Object.keys(META_TYPES).sort(),
            metaDictionary = _getMetaTypes(),
            i,
            result = [];

        for (i = 0; i < orderedMetaList.length; i += 1) {
            if (client.isTypeOf(objId, metaDictionary[orderedMetaList[i]])) {
                result.push(orderedMetaList[i]);
            }
        }

        return result;
    }

    //META ASPECT TYPE CHECKING
    var _isActor = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Actor]);
    };
    var _isFCO = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.FCO]);
    };
    var _isPackage = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Package]);
    };
    var _isSysMLMetaLanguage = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.SysMLMetaLanguage]);
    };
    var _isUseCase = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UseCase]);
    };
    var _isUseCaseDiagram = function (objID) {
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.UseCaseDiagram]);
    };


    //return utility functions
    return {
        getMetaTypes: _getMetaTypes,
        getMetaTypesOf: _getMetaTypesOf,
        TYPE_INFO: {
            isActor: _isActor,
            isFCO: _isFCO,
            isPackage: _isPackage,
            isSysMLMetaLanguage: _isSysMLMetaLanguage,
            isUseCase: _isUseCase,
            isUseCaseDiagram: _isUseCaseDiagram
        }
    };
});