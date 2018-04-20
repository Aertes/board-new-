jQuery(function ($) {
  //DataTables default setting
  $.extend($.fn.dataTable.defaults, {
    "info": true,
    "searching": false,
    "pageLength": 10,
    "lengthChange": true,
    "order": [],//默认不对任何列进行排序
    "bSort": false,//排序
    "pagingType": "simple_numbers",
    "sLoadingRecords": "<div class='center'>正在加载数据...</div>",
    "sZeroRecords": "<div class='center'>暂无数据</div>",
    /*"stateSave": true,*/
    /*"bDestroy":true,*/
    "dom": 'rt<"bottom stabottom row"<"col-sm-6"<"floatL marginRight20"l><"floatL"i>><"col-md-6"p>>',
    "processing": true,
    "serverSide": true,
    "language": {
      "processing": "<span><img style='display:inline-block;width:30px;height:30px;' src='/resources/admin/images/dataLoad.gif'/>&nbsp;&nbsp;&nbsp;数据加载中...</span>",
      "lengthMenu": "每页 _MENU_ 条",
      "zeroRecords": "<div class='center'>没有匹配结果</div>",
      "sEmptyTable": "<div class='center'>暂无数据</div>",
      "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
      "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
      "infoFiltered": "(由 _MAX_ 项结果过滤)",
      "infoPostFix": "",
      "url": "",
      "paginate": {
        "first": "首页",
        "previous": "上一页",
        "next": "下一页",
        "last": "末页"
      }
    }
  });
});
