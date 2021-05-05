
// 讀取 trainTable
var loadTrainModel = $("#trainTable").DataTable(
    {
        "ajax": {
            "url": "/AIDashBoard/getTrainingModel",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": null, "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<input type='radio' value='" + sData.TrainNO + "' name='model'>");
                }
            },
            { "data": "TaskName" },
            { "data": "ALGORITHMNO" },
            { "data": "UserName" },            
            { "data": "CREATETIME" }
        ],
        "columnDefs": [
            {
                "className": "dt-body-center dt-head-center",
                "targets": "_all",
            },
        ],        
        "autoWidth": true
    });

$("#addTestTask").click(function () {
    if ($('input:radio[name=model]:checked').val() != null && $("#userName").val() != "" && $("#taskName").val() != "" && $("testPath").val() != "") {
        $.ajax({
            type: "post",
            url: '/AIDashBoard/createTestData',
            data: {
                userName: $("#userName").val(),
                taskName: $("#taskName").val(),
                path: $("#testPath").val(),                
                trainNO: $('input:radio[name=model]:checked').val(),                
            },
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.notify({
                        icon: 'pe-7s-gift',
                        message: "新增成功"
                    }, {
                        type: 'info',
                        timer: 4000
                    });
                    $('#userName').val("");
                    $("#taskName").val("");
                    $("#testPath").val("")                    
                    var checkedRadio = document.getElementsByName("model");                    
                    for (var i = 0; i < checkedRadio.length; i++) {
                        checkedRadio[i].checked = false;
                    }         
                    loadData.ajax.reload();
                }
                else {
                    alert(data);
                }
            },
            error: function (errMsg) {
                alert("錯誤");
            }
        })

    }
    else {
        alert("資料輸入不完整");
    }
});
 

// 讀取 trainTable
var loadData = $("#testTable").DataTable(
    {
        "ajax": {
            "url": "/AIDashBoard/getTestingData",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "STATUS" },
            { "data": "TaskName" },
            { "data": "TrainNO" },            
            { "data": "UserName" },
            { "data": "CREATETIME" },
            {
                "data": null, "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<button class='removeBtn'" + " id='" + sData.TestNO + "' onClick=remove(this)" + ">" + "<i class='fa fa-trash'>" + "</i>" + "</button>");
                }
            }
        ],
        "columnDefs": [
            {
                "className": "dt-body-center dt-head-center",
                "targets": "_all",
            }
        ],
        "autoWidth": false
    });




// 刪除訓練資料功能
function remove(myObj) {    
    $.ajax({
        type: "post",
        url: '/AIDashBoard/deleteTestingData',
        data: {
            TestNO: myObj.id
        },
        dataType: "json",
        success: function (data) {
            if (data) {
                $.notify({
                    icon: 'pe-7s-gift',
                    message: "刪除成功"
                }, {
                    type: 'info',
                    timer: 4000
                });
                loadData.ajax.reload();
            }
            else {
                alert(data);
            }
        },
        error: function (errMsg) {
            alert("錯誤");
        }
    })

}