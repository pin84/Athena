<div class="weui-cells weui-cells_form">
<div class="weui-cell">
    <!--<div class="weui-cell__hd"><label class="weui-label">主题</label></div>-->
    <div class="weui-cell__bd">
        <input class="weui-input" id="title" type="text" placeholder="主题"/>
    </div>
</div>
<div class="weui-cell">
    <!--<div class="weui-cell__hd"><label class="weui-label">地点</label></div>-->
    <div class="weui-cell__bd">
        <input class="weui-input" id="location" type="text" placeholder="地点"/>
    </div>
</div>
<div class="weui-cell">
    <div class="weui-cell__bd">
        <textarea class="weui-textarea" id="description" placeholder="这一刻的想法..." rows="3"></textarea>
        <!--<div class="weui-textarea-counter"><span>0</span>/200</div>-->
    </div>
</div>
<div class="weui-gallery" id="gallery">
    <span class="weui-gallery__img" id="galleryImg"></span>
    <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
        </a>
    </div>
</div>
<div class="weui-cell" id="uploader">
    <div class="weui-cell__bd">
        <div class="weui-uploader">
            <!--<div class="weui-uploader__hd">-->
            <!--<p class="weui-uploader__title">图片上传</p>-->
            <!--<div class="weui-uploader__info">0/2</div>-->
            <!--</div>-->
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">

                </ul>
                <div class="weui-uploader__input-box ">
                    <!--<input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/jpg,image/jpeg,image/png" />-->
                    <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/jpg,image/jpeg,image/png" multiple="multiple"/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>



    //loading提示
    var $loadingToast = $('#loadingToast');

    //weui弹框事件
    var $iosDialog2 = $('#iosDialog2');
    var $dialogbd = $('.weui-dialog__bd')
    $('#dialogs').on('click', '.weui-dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });

    function unique1(arr){
        var newArr = [];//新建一个数组
        for(var i=0,len=arr.length;i<len;i++){
            if(newArr.indexOf(arr[i]) == -1){//若新数组中未包含该项则将其存入新数组
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    var uploadCount = 0;
    var uploadCustomFileList = [];
    var countA= [];
    weui.uploader('#uploader', {
        url: '/growthInfo/upload',
        auto: false,
        type: 'file',
        compress: {
            width: 1600,
            height: 1600,
            quality: .8
        },
        onBeforeQueued: function(files) {
            // `this` 是轮询到的文件, `files` 是所有文件
            countA=[];
            if(["image/jpg", "image/jpeg", "image/png"].indexOf(this.type) < 0){
                weui.alert('请上传正确的图片类型（jpg/jpeg/png）');
                return false; // 阻止文件添加
            }
            if(this.size > 20 * 1024 * 1024){
                weui.alert('请上传不超过20M的图片');
                return false;
            }
            if (files.length > 9) { // 防止一下子选择过多文件
                weui.alert('一次只能上传9张图片，请重新选择');
                return false;
            }
            if (uploadCount + 1 > 9) {
                weui.alert('最多只能上传9张图片');
                return false;
            }

            ++uploadCount;
            // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function(){
            uploadCustomFileList.push(this);
            // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
            // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

            // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
            // countA.push(this.id)

            // this.stop(); // 中断上传

            // return true; // 阻止默认行为，不显示预览图的图像
        },
        onBeforeSend: function(data, headers){

            // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
            // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

            // return false; // 阻止文件上传
        },
        onProgress: function(procent){

            // return true; // 阻止默认行为，不使用默认的进度显示
        },
        onSuccess: function (ret) {
            countA.push(ret.data)
            // return true; // 阻止默认行为，不使用默认的成功态
        },
        onError: function(err){
            // return true; // 阻止默认行为，不使用默认的失败态
        }
    });

    var $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
        $uploaderFiles = $("#uploaderFiles");
    var index; //第几张图片
    $uploaderFiles.on("click", "li", function(){
        index = $(this).index();
        $galleryImg.attr("style", this.getAttribute("style"));
        $gallery.fadeIn(100);
    });

    $gallery.on("click", function(){
        $gallery.fadeOut(100);
    });
    //删除图片
    $(".weui-gallery__del").click(function(e) {
        var target = e.target;
        var id = target.getAttribute('data-id');
        for (var i = 0, len = uploadCustomFileList.length; i < len; ++i) {
            var file = uploadCustomFileList[i];
            if (file.id == id) {
                index = i;
                break;
            }
        }
        uploadCustomFileList.splice(index, 1);
        $uploaderFiles.find("li").eq(index).remove();
        uploadCount = uploadCount-1
    });
    //点击提交事件
    var flag = true;

    //弹出式提示
    var $toast = $('#toast');
    var $toastContent = $('.weui-toast__content');

    $('#submit').click(function(){

        var title = $.trim($('#title').val());
        var description = $.trim($('#description').val());
        var location = $.trim($('#location').val())
        if( title =='' || description =='' || location ==''){
            weui.alert('请填写相关信息！');
            return
        }else if(/[@#\>\<]+/g.test(title) || /[@#\>\<]+/g.test(description) || /[@#\>\<]+/g.test(location)){
            weui.alert('请不要输入非法字符！');
            return
        }
        weui.confirm('是否确认提交', {
            title: '提示框',
            buttons: [{
                label: '取消',
                type: 'default',
                onClick: function () {

                }
            }, {
                label: '确定',
                type: 'primary',
                onClick: function () {
                    $loadingToast.fadeIn(100)
                    var promise = new Promise(function (resolve, reject) {
                        uploadCustomFileList.forEach(function (file) {
                            file.upload();
                        });
                        setInterval(function () {
                            if (uploadCustomFileList.length == countA.length) {
                                resolve()
                            }
                        }, 0);

                    });
                    promise.then(function() {
                        //拿取照片事件
                        // var photos = [];
                        // $('.hidden-img-url').each(function(){
                        //     photos.push($(this).val())
                        // })
                        var postData = {
                            title: $('#title').val(),
                            description: $('#description').val(),
                            location: $('#location').val()
                        }
                        postData.photos = countA.join(',')
                        postData.videos = ''
                        // if(flag) {
                        //     flag = false;
                        $.ajax({
                            type: 'POST',
                            url: '/growthInfo/save',
                            data: postData,
                            dataType: 'JSON',
                            success: function (res) {
                                if (res.code == 0) {
                                    $loadingToast.fadeOut(100)
                                    $toast.fadeIn(100);
                                    $toastContent.html('发布成功！')
                                    setTimeout(function () {
                                        $toast.fadeOut(100);

                                        history.back();
                                    }, 2000);
                                } else {

                                    $toast.fadeIn(100);
                                    $toastContent.html(res.msg)
                                    setTimeout(function () {
                                        $toast.fadeOut(100);
                                    }, 2000);
                                }
                                return false
                            }
                        });


                    })
                }
            }]
        });



        // }
    })
