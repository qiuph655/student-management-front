$("#submitBtn").click(function(e){
    e.preventDefault();
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();

    //是空字符串、null、undefined、false、0 或 NaN
    if(!username || !password){
        $("#msg").text("用户名或密码不能为空");
        return; //结束方法
    }

    $("#submitBtn").prop("disabled", true);
    $("#submitBtn").text("正在登录中");

    fetch("http://127.0.0.1:8080/api/login",{
        method:"post",
        credentials: 'include',//cookie跨域
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    })
    .then(response =>response.json())  
    .then(data => { 
        if(data.code==200){
              localStorage.setItem('userInfo',JSON.stringify(data.data));
              window.location.href = "/student/student.html"; // 跳转页面  
        }else{
            $("#msg").text(data.msg);
        }
     })
     .catch(error=>{
         $("#msg").text("网络异常");
          console.error("登录错误:", error); 
     }); 
    $("#submitBtn").prop("disabled", false);
    $("#submitBtn").text("登录");
});