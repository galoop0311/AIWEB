// 讀取 trainTable
var loadData = $("#trainTable").DataTable(
    {
        "ajax": {
            "url": "/AIDashBoard/getTrainingData",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "STATUS" },
            { "data": "TaskName" },
            { "data": "ALGORITHMNO" },
            { "data": "UserName" },
            { "data": "CREATETIME" },
            {
                "data": null, "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<button class='removeBtn'" + " id='" + sData.TrainNO + "' onClick=remove(this)" + ">" + "<i class='fa fa-trash'>" + "</i>" + "</button>");
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


// 新增任務事件
$("#addTask").click(function () {
    if ($("#userName").val() != "" && $("#taskName").val() != "" && $("#trainingPath").val() != "" && $("#batchSize").val() != "" && $('input:radio[name=algorithm]:checked').val() != null && $("#deeps").val()!="") {                      
        //alert($("#userName").val() + "\n" + $("#taskName").val() + "\n" + $("#trainingPath").val() + "\n" + $("#batchSize").val() + "\n" + $('input:radio[name=algorithm]:checked').val() + "\n" + $("#deeps").val());
        $.ajax({
            type: "post",
            url: '/AIDashBoard/createTrainingData',
            data: {
                userName: $("#userName").val(),
                taskName: $("#taskName").val(),
                trainingPath: $("#trainingPath").val(),
                batchSize: $("#batchSize").val(),
                algorithm: $('input:radio[name=algorithm]:checked').val(),
                deeps: $("#deeps").val()
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
                    $("#trainingPath").val("")
                    $("#batchSize").val("");
                    $("#deeps").val("");
                    var checkedRadio = document.getElementsByName("algorithm");
                    for (var i= 0; i<checkedRadio.length;i++){
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
        alert("請確認資料是否輸入完整");
    }
});


// 刪除訓練資料功能
function remove(myObj) {   
    $.ajax({
        type: "post",
        url: '/AIDashBoard/deleteTrainingData',
        data: {
            TrainNO: myObj.id
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
