var lastISP = "";
var audio = new Audio('alert.mp3');

$(document).ready(async function () {
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        keyboard: false
      });
    myModal.show();
    let initialLoad = await updateInfo();
    lastISP = initialLoad.isp;
    setInterval(checkInterval, 15000);
});

async function checkInterval(){
    const info = await updateInfo();
    checkChanged(info);
}

function checkChanged(ipinfo) {
    console.log(lastISP+" vs "+ipinfo.isp);
    if (lastISP != ipinfo.isp){
        $('#divalert').html('<div class="alert alert-danger" role="alert">ISP changed to: '+ipinfo.isp+'</div>');
        audio.play();
        lastISP = ipinfo.isp;
    }
}

function updateInfo() {
    return new Promise(async function(resolve, reject){
        try {
            const ipinfo = await ajaxIpInfo();
            $('#liip').html(ipinfo.query);
            $('#lilocation').html(ipinfo.city);
            $('#liisp').html(ipinfo.isp);
            resolve(ipinfo);
        } catch (error) {
            reject(error);
        }
    });
}

function ajaxIpInfo() {
    return new Promise((resolve, reject) => {
        try {
            $.getJSON('http://ip-api.com/json/', function (data) {
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
}