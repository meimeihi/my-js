var IsiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
var IsAndroid = /(Android)/i.test(navigator.userAgent);

$(function(){

    // 菜单控制
    $('.menu_ctrl, .close_menu, .menu-nav dd').click(menuToggle)

    $(".pro-item").click(function(){
        $(".products-box").find('.pro-item').removeClass('active');
        $(this).addClass('active');
        selectPaytype();
        updatePayTip();
    })

    $(".pay-item").click(function(){
        $(".paytype").find('.pay-item').removeClass('active');
        $(this).addClass('active');
        updatePayTip();
    })

    $(".order-item").click(function(){
        $(this).find('.detail').slideToggle();
        $(this).find('.silde').toggleClass('down');
    })

    $('#closeLoginBox').click(function(){
        layer.closeAll();
    })

    $(document).on('click', ".download_btn", function(){
        if($(this).hasClass('AndroidSelect'))
        {
            Android_Download_select();
            return;
        }
        location.href = $(this).data('href');
        try {
            gtag_report_conversion();
        } catch (error) {}
    })

    $(".testFight").click(function(){
        location.href = $(this).data('href');

        try {
            gtag_report_conversion();
        } catch (error) {}
    })
})

function menuToggle()
{
    $('.menu-nav').toggle();
    $('.close_menu').toggle();
}

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    };
    return null;
}

function proPageInit()
{
    $(".products-box").find(".pro-item").eq(0).addClass('active');
    $(".paytype").find('.pay-item').eq(0).addClass('active');
    checkGooglepayItem();
    updatePayTip();
}

// 选择支付方式
function selectPaytype(){
    // 当前如果当前产品不支持谷歌支付，但是当前选择的是谷歌支付，但是则更换支付方式
    if( !checkGooglepayItem() && $("#googlepay_btn").hasClass('active') ){
        $(".pay-item").removeClass('active');
        $(".pay-item").eq(0).addClass('active');
    }
}

function checkGooglepayItem(){
    var res = $(".products-box").find(".pro-item").filter(".active").hasClass('googlepay');
    if(res){
        $("#googlepay_btn").show();
    }else{
        $("#googlepay_btn").hide();
    }
    return res;
}

function updatePayTip(){
    var product = $(".products-box").find(".pro-item").filter(".active");
    $("#selectName").text(product.data('name'));
    var paytype = $(".pay-item").filter(".active").data('paytype');
    // 展示美元
    if(paytype == 4 || paytype == 5)
    {
        $('#selectPrice').text(product.data('price_usd'));
    }else{
        $('#selectPrice').text(product.data('price'));

    }
}