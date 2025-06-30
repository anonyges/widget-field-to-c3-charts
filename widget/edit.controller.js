/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
/* author: anonyges@gmail.com
  modified: 250625 */
"use strict";
(function () {
  angular
    .module("cybersponse")
    .controller("editFieldToC3Charts100Ctrl", editFieldToC3Charts100Ctrl);

  editFieldToC3Charts100Ctrl.$inject = ["$scope", "$uibModalInstance", "config", "Field", "anonygesJSUtil_v1", "anonygesFormEntityServiceUtil_v1"];

  function editFieldToC3Charts100Ctrl($scope, $uibModalInstance, config, Field, anonygesJSUtil_v1, anonygesFormEntityServiceUtil_v1) {
    $scope.config = config;
    $scope.container_uid = "ac-" + crypto.randomUUID();
    $scope.chart_uid = "ac-" + crypto.randomUUID();



    // -------------------------------------------------------- Title Start  --------------------------------------------------------
    $scope.config.title = anonygesJSUtil_v1.default_value_if_undefined($scope.config.title, "");
    $scope.data_cs_title = new Field({
      "name": "data_cs_title",
      "formType": "text",
      "title": "Title",
      "writeable": true,
      "validation": {
        "required": false
      }
    });
    $scope.config.title_show = anonygesJSUtil_v1.default_value_if_undefined($scope.config.title_show, false);
    // -------------------------------------------------------- Title End  --------------------------------------------------------




    // -------------------------------------------------------- FormEntityService Util start  --------------------------------------------------------
    $scope.config.ap_formentityservice_1 = anonygesJSUtil_v1.default_value_as_object($scope.config.ap_formentityservice_1);
    $scope.ap_formentityservice_1 = anonygesFormEntityServiceUtil_v1.init($scope, $scope.config.ap_formentityservice_1, "form_ap_formentityservice_1");


    function bt_refresh_module_debug_field() {
      $scope.data_cs_module_field_debug_renderer_model = Object();
      for (const _field_name of $scope.ap_formentityservice_1.scope.config.selected_module_field_names) {
        try {
          const value = anonygesJSUtil_v1.default_value_if_undefined($scope.ap_formentityservice_1.get_field(_field_name)["value"], null);
          $scope.data_cs_module_field_debug_renderer_model[_field_name] = value;
        }
        catch (_error) {
          $scope.data_cs_module_field_debug_renderer_model[_field_name] = null;
        }
      }

      $scope.data_cs_module_field_debug_renderer_model = JSON.stringify($scope.data_cs_module_field_debug_renderer_model)
      delete $scope.data_cs_module_field_debug_renderer;
      $scope.data_cs_module_field_debug_renderer = new Field({
        "formType": "json",
        "writeable": true,
        "validation": {
          "required": true
        }
      });
    }


    $scope.ap_formentityservice_1.scope.$on("a_remove_module_field_to_watch", function (event, json_data) {
      bt_refresh_module_debug_field();
    });


    $scope.ap_formentityservice_1.scope.$on("a_add_module_field_to_watch", function (event, json_data) {
      bt_refresh_module_debug_field();
    });


    bt_refresh_module_debug_field();
    // -------------------------------------------------------- FormEntityService Util end  --------------------------------------------------------



    // -------------------------------------------------------- Select Chart Type start  --------------------------------------------------------
    $scope.chart_types = ["line", "timeseries", "spline", "step", "area", "bar", "scatter", "pie", "donut", "gauge"];
    $scope.chart_type_changed = chart_type_changed;

    function chart_type_changed() {
      switch ($scope.config.selected_chart_type) {
        case "line": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 30, 200, 100, 400, 150, 250],
                ["data2", 50, 20, 10, 40, 15, 25]
              ],
              type: "line"
            }
          }
          break;
        }
        case "timeseries": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              x: "x",
              columns: [
                ["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
                ["data1", 30, 200, 100, 400, 150, 250],
                ["data2", 130, 340, 200, 500, 250, 350]
              ]
            },
            axis: {
              x: {
                type: "timeseries",
                tick: {
                  format: "%Y-%m-%d"
                }
              }
            }
          }
          break;
        }
        case "spline": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 30, 200, 100, 400, 150, 250],
                ["data2", 130, 100, 140, 200, 150, 50]
              ],
              type: "spline"
            }
          }
          break;
        }
        case "step": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 300, 350, 300, 0, 0, 100],
                ["data2", 130, 100, 140, 200, 150, 50]
              ],
              types: {
                data1: "step",
                data2: "area-step"
              }
            }
          }
          break;
        }
        case "area": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 300, 350, 300, 0, 0, 0],
                ["data2", 130, 100, 140, 200, 150, 50],
                ["data3", 130, 100, 140, 200, 150, 50]
              ],
              types: {
                data1: "area",
                data2: "area-spline",
                data3: "area-step"
              }
            }
          }
          break;
        }
        case "bar": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 30, 200, 100, 400, 150, 250],
                ["data2", 130, 100, 140, 200, 150, 50]
              ],
              type: "bar"
            },
            bar: {
              width: {
                ratio: 0.5
              }
            }
          }
          break;
        }
        case "scatter": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              xs: {
                setosa: "setosa_x",
                versicolor: "versicolor_x",
              },
              // iris data from R
              columns: [
                ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
              ],
              type: "scatter"
            },
            axis: {
              x: {
                label: "Sepal.Width",
                tick: {
                  fit: false
                }
              },
              y: {
                label: "Petal.Width"
              }
            }
          }
          break;
        }
        case "pie": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 30],
                ["data2", 120],
              ],
              type: "pie"
            }
          }
          break;
        }
        case "donut": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data1", 30],
                ["data2", 120],
              ],
              type: "donut"
            },
            donut: {
              title: "Iris Petal Width"
            }
          }
          break;
        }
        case "gauge": {
          $scope.config.data_cs_chart_json_structure_model = {
            data: {
              columns: [
                ["data", 91.4]
              ],
              type: "gauge"
            },
            gauge: {
              label: {
                show: false // to turn off the min/max labels.
              },
              min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
              max: 100, // 100 is default
              units: "%",
              width: 39 // for adjusting arc thickness
            },
            color: {
              pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"], // the three color levels for the percentage values.
              threshold: {
                unit: "value", // percentage is default
                max: 200, // 100 is default
                values: [30, 60, 90, 100]
              }
            },
            size: {
              height: 180
            }
          }
          break;
        }
        default: {
          $scope.config.data_cs_chart_json_structure_model = "";
          break;
        }
      }

      delete $scope.data_cs_chart_json_structure;
      $scope.data_cs_chart_json_structure = new Field({
        "formType": "json",
        "writeable": true
      });

      bt_redraw_chart();
    }


    $scope.data_cs_chart_json_structure = new Field({
      "formType": "json",
      "writeable": true
    });
    // -------------------------------------------------------- Select Chart Type end  --------------------------------------------------------



    // -------------------------------------------------------- Rendered Chart start  --------------------------------------------------------
    $scope.bt_redraw_chart = bt_redraw_chart;
    function bt_redraw_chart() {
      if (anonygesJSUtil_v1.is_json_string($scope.config.data_cs_chart_json_structure_model) && anonygesJSUtil_v1.is_json_string($scope.data_cs_module_field_debug_renderer_model)) {
        const template = JSON.parse($scope.config.data_cs_chart_json_structure_model);
        const value = JSON.parse($scope.data_cs_module_field_debug_renderer_model);
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
    // -------------------------------------------------------- Rendered Chart end  --------------------------------------------------------



    // -------------------------------------------------------- UI start  --------------------------------------------------------
    $scope.bt_cancel = bt_cancel;
    $scope.bt_save = bt_save;


    function bt_cancel() {
      $uibModalInstance.dismiss("cancel");
    }


    function bt_save() {
      if ($scope.editWidgetForm.$invalid) {
        $scope.editWidgetForm.$setTouched();
        $scope.editWidgetForm.$focusOnFirstError();
        return;
      }
      $uibModalInstance.close($scope.config);
    }
    // -------------------------------------------------------- UI end  --------------------------------------------------------
  }
})();
