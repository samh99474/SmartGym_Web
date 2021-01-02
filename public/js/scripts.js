/*!
    * Start Bootstrap - Agency v6.0.3 (https://startbootstrap.com/theme/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */

/*Ajax om2m*/
$(document).ready(function () {

    $("#submit_postMachine").click(function () {
        if ($('#input_postMachine').val().length == 0) {
            alert("請輸欲新增之裝置名稱")
            return
        } else {
            if ($('#input_postMachine_descriptor').val().length == 0) {
                $.ajax('/CreateSensor',   // request url
                    {
                        method: "POST",
                        data: { "input_postMachine": $("#input_postMachine").val() },
                        success: function (data, status, xhr) {// success callback function
                            alert("成功新增" + "，" + data + "，" + status+ "，" + xhr)
                        },
                        error: function (data, status, xhr) {
                            alert("失敗新增，可能重複輸入已存在之項目" + "，" + data + "，" + status+ "，" + xhr)
                        }
                    });
            } else {
                
                existing_sensor = new Boolean(false);
                $.ajax('/CreateSensor',   // request url
                    {
                        method: "POST",
                        data: { "input_postMachine": $("#input_postMachine").val() },
                        success: function (data, status, xhr) {// success callback function
                            existing_sensor = false;
                        },
                        error: function (data, status, xhr) {
                            existing_sensor = true;
                            //失敗新增Sensor，可能重複輸入已存在之項目
                        }
                    });
            
                    $.ajax('/CreateDescriptor',   // request url
                        {
                            method: "POST",
                            data: {
                                "input_postMachine": $("#input_postMachine").val(),
                                "input_postMachine_descriptor": $("#input_postMachine_descriptor").val()
                            },
                            success: function (data, status, xhr) {// success callback function
                                if(existing_sensor){
                                    alert("成功在既有的Sensor新增Descriptor" + "，" + data + "，" + status+ "，" + xhr)
                                }else{
                                    alert("成功新增Sensor，並新增Descriptor" + "，" + data + "，" + status+ "，" + xhr)
                                }
                            },
                            error: function (data, status, xhr) {
                                alert("失敗新增Descriptor" + "，" + data + "，" + status+ "，" + xhr)
                            }
                        });
            }
        }
    });
    $("#submit_deleteMachine").click(function(){
        $.ajax('/DeleteSensor',   // request url
            {
                method:"POST",
                data:{"input_deleteMachine": $("#input_deleteMachine").val()},
                success: function (data, status, xhr) {// success callback function
                    
            }
        });
    });


    $("#submit_postMachine_Use").click(function(){
        $.ajax('/CreateContent',   // request url
            {
                method:"POST",
                data:{"input_postMachine_Use": $("#input_postMachine_Use").val(),
                      "input_postMachine_descriptor_Use": $("#input_postMachine_descriptor_Use").val() },
                      success: function (data, status, xhr) {// success callback function
                        alert("成功新增" + "，" + data + "，" + status+ "，" + xhr)
                    },
                    error: function (data, status, xhr) {
                        alert("失敗新增，可能重複輸入已存在之項目" + "，" + data + "，" + status+ "，" + xhr)
                    }
        });

    });

});

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    //carousel slide interval time
    $('.carousel').carousel({
        interval: 3000
    })

    /////////////////////////////////////////Gauge Defult Opts Options
    var opts_temperature = {
        // options here

        // color configs
        colorStart: "#6fadcf",
        colorStop: void 0,
        gradientType: 0,
        strokeColor: "#e0e0e0",
        generateGradient: true,
        percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],

        // customize pointer
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            iconScale: 1.0
        },

        // static labels
        staticLabels: {
            font: "10px sans-serif",
            labels: [0, 15, 20, 25, 30, 50],
            fractionDigits: 0
        },
        // static zones
        staticZones: [
            { strokeStyle: "#3DAEF0", min: 0, max: 15 },
            { strokeStyle: "#397CE7", min: 15, max: 20 },
            { strokeStyle: "#30B32D", min: 20, max: 25 },
            { strokeStyle: "#FFDD00", min: 25, max: 30 },
            { strokeStyle: "#F03E3E", min: 30, max: 50 },
        ],
        // render ticks
        renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: "#333333",
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: "#666666"
        },

        // the span of the gauge arc
        angle: -0.05,

        // line thickness
        lineWidth: 0.44,

        // radius scale
        radiusScale: 1.0,

        // font size
        fontSize: 40,

        // if false, max value increases automatically if value > maxValue
        limitMax: false,

        // if true, the min value of the gauge will be fixed
        limitMin: false,

        // High resolution support
        highDpiSupport: true
    };

    var opts_humidity = {
        // options here

        // color configs
        colorStart: "#6fadcf",
        colorStop: void 0,
        gradientType: 0,
        strokeColor: "#e0e0e0",
        generateGradient: true,
        percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],

        // customize pointer
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            iconScale: 1.0
        },

        // static labels
        staticLabels: {
            font: "10px sans-serif",
            labels: [0, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            fractionDigits: 0
        },
        // static zones
        staticZones: [
            { strokeStyle: "#F03E3E", min: 0, max: 40 },
            { strokeStyle: "#30B32D", min: 40, max: 70 },
            { strokeStyle: "#3DAEF0", min: 70, max: 100 }
        ],
        // render ticks
        renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: "#333333",
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: "#666666"
        },

        // the span of the gauge arc
        angle: -0.05,

        // line thickness
        lineWidth: 0.44,

        // radius scale
        radiusScale: 1.0,

        // font size
        fontSize: 40,

        // if false, max value increases automatically if value > maxValue
        limitMax: false,

        // if true, the min value of the gauge will be fixed
        limitMin: false,

        // High resolution support
        highDpiSupport: true
    };

    var target_temperature = document.getElementById('gauge_temperature');
    var gauge_temperature = new Gauge(target_temperature).setOptions(opts_temperature);
    document.getElementById("preview-textfield").className = "preview-textfield";
    gauge_temperature.setTextField(document.getElementById("preview-textfield"));

    gauge_temperature.maxValue = 50;
    gauge_temperature.setMinValue(0);
    gauge_temperature.set(20);
    gauge_temperature.animationSpeed = 32

    /////測試調整溫度按鈕
    $(".submit_temperature").click(function () {
        gauge_temperature.set($("#input_temperature").val());
    });
    /////

    var target_humidity = document.getElementById('gauge_humidity');
    var gauge_humidity = new Gauge(target_humidity).setOptions(opts_humidity);
    document.getElementById("preview-textfield2").className = "preview-textfield2";
    gauge_humidity.setTextField(document.getElementById("preview-textfield2"));
    gauge_humidity.maxValue = 100;
    gauge_humidity.setMinValue(0);
    gauge_humidity.set(50);

    gauge_humidity.animationSpeed = 32
    ///////////////////////////////////////

})(jQuery); // End of use strict
