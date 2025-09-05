
$(document).ready(function(){
   var user = JSON.parse(localStorage.getItem("userInfo")); 
   if(!user){
      alert("请先登录");
      window.location.href = "/student/login.html"; // 跳转页面  
   }
   $("#username").text(user.username);   

   loadStudents(); 
})

$("#findStudent").click(function(){
    loadStudents(); 
});

var page = 1;
var size = 8;

$("#nextPage").click(function(){
    page++;
    $("#currentPage").text(page);
    loadStudents();
});

$("#prePage").click(function(){
    page--;
    $("#currentPage").text(page);
    loadStudents();
});



function loadStudents(){
    // page = Number($("#currentPage").text());
    $("tbody").empty();
    if(page <= 1){
        $("#prePage").hide();
    }else{
        $("#prePage").show();
    }


    var studentName = $("#studentName").val().trim();  
    var classId = $("#classId").val().trim();  

    var params = new URLSearchParams({
        name:studentName,
        classId:classId,
        page:page,
        size:size
    });

    console.log(params.toString());

    fetch("http://127.0.0.1:8080/api/getStudents?"+params.toString(),{
        method:"get",
        credentials: 'include'//cookie跨域
    })
    .then(response =>
    {
        if(response.status==401){
            window.location.href = "/student/login.html"; // 跳转页面  
        };
       return response.json();
    })  
    .then(map => {  
        
         map.students.map(student =>{
            $("tbody").append(`
                <tr>
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${student.gender}</td>
                    <td>${student.age}</td>
                    <td>${student.classId ?? ""}</td>
                    <td>${student.className ?? ""}</td>
                    <td>
                       <button onclick="editStudent(${student.studentId},'${student.name}','${student.gender}','${student.age}','${student.classId}')">编辑</button>
                       <button onclick="delStudent(${student.studentId})">删除</button>                  
                    </td>
                </tr>              
            `)
        });

        var totalPage = map.totalPage;
        $("#totalPage").text(totalPage);
        if(page >= totalPage){
            $("#nextPage").hide();
        }else{
                $("#nextPage").show();
            }

    });  
}

loadClasses();

function loadClasses(){
    fetch("http://127.0.0.1:8080/api/getAllMajors",{
        method:"get",
        credentials: 'include'//cookie跨域
    }).then(res=>res.json())
    .then(majors=>{
        $("#f_class").empty();
        $("#f_class").append('<option value="" disabled selected hidden>请选择班级</option>');
        majors.map(major =>{    
            $("#f_class").append(`
                <option value="${major.classId}">${major.className}</option>           
            `);
        })
       
    })
}


      // 显示弹窗   添加学生
$('#addStudent').click(function () {
    $('#f_name').val('');
    $('#f_gender').val('');
    $('#f_age').val('');
    $('#f_class').val('');
    $('#f_studentId').val('');
    $("#popupTitle").text("新增学生")
    $('#overlay, #popup').fadeIn();
 });

//編輯學生
function editStudent(studentId,name,gender,age,classId){
    $('#f_name').val(name);
    $('#f_gender').val(gender);
    $('#f_age').val(age);
    $('#f_class').val(classId);
    $('#f_studentId').val(studentId);
    $("#popupTitle").text("编辑学生")
    $('#overlay, #popup').fadeIn();
};

//刪除學生
function delStudent(studentId){
    if(!confirm("确定删除该学生吗？")){
        return;
    }
    // 使用fetch API发送POST请求到服务器
   fetch("http://127.0.0.1:8080/api/delStudent/"+studentId,{
        method:"delete",
        credentials: 'include'//cookie跨域
    })
    .then(response =>response.json())  //此段代码作用是将返回的JSON数据转换为JavaScript对象
    .then(data => { 
        if(data.code==200){
            alert(data.msg);
            loadStudents(); //重新加载学生列表
        }else{
            alert("操作失败")
        }
     })
     .catch(error=>{
        alert("网络异常")
     }); 
}

      // 关闭弹窗
$('#closePopup, #overlay').click(function () {
    $('#overlay, #popup').fadeOut();
});
 

$('#saveStudent').click(function () {
    $('#overlay, #popup').fadeOut();

    var name = $('#f_name').val();
    var gender = $('#f_gender').val();
    var age= $('#f_age').val();
    var classId =$('#f_class').val();
    var studentId = $('#f_studentId').val();

    if(!name || !gender|| !age || !classId){
        alert("请填写完整信息")
        return;
    }

     fetch("http://127.0.0.1:8080/api/saveStudent",{
        method:"post",
        credentials: 'include',//cookie跨域
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,gender,age,classId,studentId})
    })
    .then(response =>response.json())  
    .then(data => { 
        if(data.code==200){
            alert(data.msg)
            loadStudents(); //重新加载学生列表
        }else{
            alert("操作失败")
        }
     })
     .catch(error=>{
        alert("网络异常")
     }); 



});







   
   
   
