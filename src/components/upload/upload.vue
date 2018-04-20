<template>
	<div class="tables-wrap" id="upLoadBox">
		<div class="tables-title">
			<span id="title"></span>
			<span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
		</div>
		<div class="upload-file-box">
			<div class="upload-file">
				<a href="javascript:;" title="Unselected File" style="background-color: #2061ae">
					Select File
					<input type="file" id="picker" name="file" @change="upload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
				</a>
				<span id="fileName">{{fileName}}</span>
			</div>
			<div class="tables-container">
				<h3>History</h3>
				<table id="fileTable" width="100%" cellpadding="0" cellspacing="0" border="0">
					<thead>
						<tr>
							<th>Upload Date</th>
							<th>Channel</th>
							<th>Detail</th>
							<th>Operation</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<div class="progress-ba none">
			<p id="text" class="text">DATA UPLOADING, PLEASE WAIT...</p>
			<div id="progress" class="progress">
				<span id="num" class="progressbarNum">0%</span>
				<span id="progressBar" class="percentage" style="width: 0%" role="progressbar" aria-valuemin="0" aria-valuemax="100"></span>
			</div>
			<div id="errMsg" class="errMsg">
	
			</div>
		</div>
		<span id="operate" hidden>
			<svg-icon sign="icon-trash"></svg-icon>
		</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import "./webuploader.min";
	import xhrUrls from '../../assets/config/xhrUrls'
	import { post } from "../../assets/config/http"
	import { formatDate } from '../../assets/js/formatDate.js'
	let HC_SEARCH = xhrUrls.HC_SEARCH
	export default {
		name: "upload",
		data() {
			return {
				isShow: false,
				fileName: "Unselected File",
				progress: 0,
				name: '',
				Data: {
					channel: '',
					start: 0,
				},
				tableData:'',
				uploader: null,
				downloadFileId: xhrUrls.HC_DOWNLOAD,
				fileDel: xhrUrls.HC_DELETE,
				delete: null,
			};
		},
		props: ['uploadLink', 'types', 'title'],
		mounted() {
			// 进度条
			this.init();
			
			this.onRemoveRecord();
		},
		methods: {
			upload(e) {
				$('#progress').show()
				$('#errMsg').hide()
				$('.upload-file-box').addClass('none').next().removeClass('none');
				this.fileName = e.target.files[0].name
				this.uploader.option('server', this.uploadLink)
				this.uploader.addFiles(e.target.files[0]);
				
			},
			//进度条
			init() {
				let that = this;
				this.uploader = WebUploader.create({
					// swf文件路径
					//swf: "../../assets/js/uploads/Uploader.swf",
					// 文件接收服务端。
					server: '',
					auto: true,
					accept: {
						title: "xls",
						mimeTypes: "xls/",
						extensions: "xls,xlsx"
					},
					fileVal: "file",
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: false,
					duplicate :true,
					timeout:0
				});
	
				// 文件上传过程中创建进度条实时显示。
				this.uploader.on("uploadProgress", function(file, percentage) {
					var percent = Math.round(percentage * 100);
					this.progress = percent
					$("#num").html("" + percent + " %");
					if (percent == 1) {
						$("#num").html("" + percent + " %").css("color", "#fff");
					}
					$("#progressBar").css("width", "" + percent + "%");
				});
	
				// 上传成功
				this.uploader.on("uploadSuccess", (file, res) => {
					if (res.code == 200) {
						$("#num").html("100%").css("color", "#fff");
						$("#progressBar").css("width", "100%");
						$("#text").html("UPLOAD SUCCESS!");
						setTimeout(() => {
							$('#fileName').html("Unselected File")
							$('#picker').val('');
							$('.upload-file-box').removeClass('none').next().addClass('none');
							$("#num").html("0%").css("color", "#a0a0a1");
							$("#progressBar").css("width", "0%");
							$("#text").html("DATA UPLOADING, PLEASE WAIT...");
							that.getHistoryData(this.types, this.title)
							this.refreshData()
						}, 1000);
					} else {
						let errMsg = res.errMsg.replace(/\,/g, '<br>')
						$("#text").html("UPLOAD ERROR!");
						$('#progress').hide()
						$('#errMsg').show().html('')
						$("#num").html("0%");
						$("#progressBar").css("width", "0%");
					}
				});
				// 上传错误
				this.uploader.on("uploadError", function(file, res) {
					$("#text").html("UPLOAD ERROR!");
					$('#progress').hide()
					$('#errMsg').show().html(res.errMsg)
					$("#num").html("0%");
					$("#progressBar").css("width", "0%");
					setTimeout(() => {
						$('#fileName').html("Unselected File")
						$('#picker').val('');
						// $('.upload-file-box').removeClass('none').next().addClass('none');
					}, 3000);
				});
				this.uploader.on("fileQueued", function(params) {});
			},
			getHistoryData(type, name){
				this.Data.channel = type
				this.name = name
				post(HC_SEARCH, this.Data)
          .then(res => {
            let data = res.data.data.data
            this.tableData = data
          })
			},
			
			// 历史记录
			dataTable(type, name) {
				var that = this;
				$('#title').html(name + '  &nbsp;RECORD')
				$("#fileTable").DataTable({
					searching: false,
					lengthChange: false,
					autoWidth: false,
					info: false,
					bDestroy: true,
					ordering: false,
					pagingType: "simple_numbers",
					pageLength: 5,
          "paging": this.tableData.length > 5? true : false,
          data: this.tableData,
					columns: [{
							width: '150px',
							data: "createDate",
							render: function(data, type, row) {
								let date = new Date(data);
								let timer = formatDate(date, 'yyyy/MM/dd')
								return '<div style="text-align: center; font-weight: 400;">' + timer + '</div>';
							}
						},
						{
							width: '150px',
							data: "channel",
							render: function(data, type, row) {
								return '<div style="text-align: center;">' + data + '</div>';
							}
						},
						{
							width: '150px',
							"targets": 0,
							data: "fileName",
							render: function(data, type, row) {
								return '<div style="text-align: center;"><a title="' + data + '" style="color:#1f61ae; /*overflow: hidden;text-overflow:ellipsis;white-space: nowrap;*/display:block;" href="' + xhrUrls.HC_DOWNLOAD + '/' + row.id + '">Download</a></div>';
							}
						},
						{
							width: '150px',
							data: "id",
							render: function(data, type, row) {
								return '<div style="text-align: center;" title="DELETE"><a style="color:red; font-size:18px; cursor: pointer;" class="removeRecord" data-id="' + row.id + '">' + $("#operate").html() + '</a></div>';
							}
						}
					]
	
				});
			},
			//刷新图表
			refreshData() {
				this.$Hub.$emit('refreshData');
			},
	
			//删除
			onRemoveRecord() {
				let that = this;
				$(document).off('click', '.removeRecord').on('click', '.removeRecord', function(event) {
					event.preventDefault();
					var id = $(this).attr("data-id");
					layer.confirm('Do you want to delete this file?', {
						title: 'Prompt information',
						btn: ['Confirm', 'Cancel'],
					}, function(index) {
						layer.close(index);
						post(xhrUrls.HC_DELETE + '/' + id).then((res) => {
							if (res.data.code == 200) {
								layer.msg('Delete the success !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
									layer.close(index);
									that.getHistoryData(that.Data.channel, that.name)
								})
							} else {
								layer.msg('Delete failed !', {
									time: 2000,
									skin: 'fontColor'
								}, function(index) {
									layer.close(index);
								})
							}
						}, function(index) {
							layer.close(index);
						})
					})
	
				});
			},

			//关闭上传弹窗
			closeLayerButton() {
				this.$emit('closeLayer')
				$('.upload-file-box').removeClass('none').next().addClass('none');
				$('#fileName').html("Unselected File")
				$('#picker').val('');
				$("#text").html("DATA UPLOADING, PLEASE WAIT...");
			}
		},
		watch:{
			tableData(){
				this.$nextTick(() => {
          this.dataTable(this.Data.channel, this.name);
        })
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';

  .tables-wrap .upload-file-box .tables-container table td, 
  .tables-wrap .upload-file-box .tables-container table th
    height: 25px
    font-weight: 400
    color: #717071
  table.dataTable thead th, 
	table.dataTable thead td 
    padding: 10px 20px
  table.dataTable.no-footer 
    border-bottom: 0
  .dataTables_wrapper 
		.dataTables_paginate 
			.paginate_button.disabled 
				border: 1px solid transparent
  .tables-wrap 
    width: 900px
    max-height: 90%
    background-color: #fff
    border-radius: 15px
    z-index: 99999
    overflow: hidden
    min-height: 340px
    display none
    .none 
      display: none
    .tables-title 
      position: relative
      padding-left: 45px
      font-size: 30px
      line-height: 100px
      color: #a0a0a1
      .icon 
        e-pos(top:35%, y:-50%)
        right: 25px
        font-size: 30px
        color: #A0A0A1
        cursor: pointer
    .upload-file-box 
      .upload-file 
        position: relative
        margin-bottom: 30px
        margin-left: 50px
        a 
          display: inline-block
          border: 1px solid #2061ae
          border-radius: 10px
          position: relative
          padding: 8px 20px
          color: #fff
          cursor: pointer
          font-size: 20px
        span 
          position: absolute
          top: 50%
          transform: translateY(-50%)
          padding-left: 20px
          max-width: 500px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          display: inline-block
          font-size: 18px
        input 
          border: 0
          width: 120px
          position: absolute
          top: 0
          left: 0
          cursor: pointer
          opacity: 0
    .tables-container 
      padding: 0 50px 100px 50px
      font-size: 18px
      .dataTables_info 
        display: none !important
      .icon-trash 
        cursor: pointer
      h3 
        font-weight: 400
        color: #aeadae
        margin-bottom: 15px
        font-size: 26px
      table 
        border-top: 1px solid #EBEBEB
        border-left: 1px solid #EBEBEB
        border-radius: 10px
        th, td 
          height: 50px
          border-bottom: 1px solid #EBEBEB
          border-right: 1px solid #EBEBEB
          text-align: center
          vertical-align: center
	.progress-ba 
			padding: 0 80px
			text-align: center
			.text 
				font-size: 28px
				color: #a0a0a1
				margin-bottom: 30px
				margin-top: 50px
			.progress 
				position: relative
				border-radius: 30px
				width: 100%
				background: #f5f6f8
				height: 30px
				position: relative
				display: inline-block
				text-align: center
				line-height: 30px
				color: #a0a0a1
				.percentage 
					position: absolute
					border-radius: 30px
					width: 80%
					height: 100%
					left: 0
					top: 0
					background: #1f61ae
				.progressbarNum 
					e-pos(left:50%, x:-50%)
					z-index: 1

	
</style>
