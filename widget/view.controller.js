/* Copyright start
  Copyright (C) 2008 - 2024 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
"use strict";
(function () {
  angular
    .module("cybersponse")
    .controller("fieldToC3Charts100Ctrl", fieldToC3Charts100Ctrl);

  fieldToC3Charts100Ctrl.$inject = ["$scope", "config", "anonygesJSUtil_v1", "anonygesFormEntityServiceUtil_v1"];

  function fieldToC3Charts100Ctrl($scope, config, anonygesJSUtil_v1, anonygesFormEntityServiceUtil_v1) {
    $scope.config = config;
    $scope.container_uid = "ac-" + crypto.randomUUID();
    $scope.chart_uid = "ac-" + crypto.randomUUID();


    // -------------------------------------------------------- FormEntityService Util start  --------------------------------------------------------
    $scope.config.ap_formentityservice_1 = anonygesJSUtil_v1.default_value_as_object($scope.config.ap_formentityservice_1);
    $scope.ap_formentityservice_1 = anonygesFormEntityServiceUtil_v1.init($scope, $scope.config.ap_formentityservice_1, "form_ap_formentityservice_1");


    $scope.ap_formentityservice_1.scope.$on("a_field_updated", function (event, json_data) {
      anonygesJSUtil_v1.waitForElementAndExecuteFunction($scope.chart_uid, bt_redraw_chart);
    });
    // -------------------------------------------------------- FormEntityService Util end  --------------------------------------------------------



    // -------------------------------------------------------- UI start  --------------------------------------------------------
    $scope.bt_redraw_chart = bt_redraw_chart;
    function bt_redraw_chart() {
      $scope.jinja_value = Object();

      for (const _field_name of $scope.config.ap_formentityservice_1["selected_module_field_names"]) {
        const _field = $scope.ap_formentityservice_1.get_field(_field_name);
        if (_field.hasOwnProperty("value"))
          $scope.jinja_value[_field_name] = _field["value"];
        else
          $scope.jinja_value[_field_name] = _field;
      }


      if (anonygesJSUtil_v1.is_json_string($scope.config.data_cs_chart_json_structure_model)) {
        const template = JSON.parse($scope.config.data_cs_chart_json_structure_model);
        const value = $scope.jinja_value;
        anonygesJSUtil_v1.jinja(template, value)
          .then(function (_response) {
            $scope.chart_data = _response.result;
            $scope.chart_data["bindto"] = "#" + $scope.chart_uid;
            $scope.chart = c3.generate($scope.chart_data);
          })
          .catch(function (_error) {
            console.error(_error);
          });
      }
    }
    // -------------------------------------------------------- UI end  --------------------------------------------------------

    anonygesJSUtil_v1.waitForElementAndExecuteFunction($scope.chart_uid, bt_redraw_chart);
  }
})();
