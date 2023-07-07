var users = [
    {
        id: 1,
        name: "An Vu"
    },
    {
        id: 2,
        name: "Phong Tran" 
    },
    {
        id: 3,
        name: "Phong Tran"
    }
];
var comments = [
    {
        id: 1,
        user_id: 1,
        content: "Anh Son chua ra video!!"
    },
    {
        id: 2,
        user_id: 2,
        content: "Vua ra xong em oi"
    },
    {
        id: 3,
        user_id: 1,
        content: "Cam on anh ^^"
    }
];
function getComment(){
    return new Promise((resolve) => {
        resolve(comments);
    })
}
function getUsersById(UserIds){
    return new Promise((resolve) => {
        var result = users.filter((user) => {
            if(UserIds.includes(user.id))    return user;
        })
        setTimeout(resolve(result),1000);
    })
}
getComment()
    .then((comments)=>{
        var UserIds = comments.map((comment)=>{
            return comment.user_id;
        })
        return getUsersById(UserIds)
            .then((Users) => {
                return {
                    user: Users,
                    comment: comments
                };
            })
    })
    .then((data)=>{
        var commentBlock = document.querySelector('.comment-box');
        var html = "";
        console.log(data);
        data.comment.forEach((element) => {
            var username;
            for(var u of data.user){
                if(u.id === element.user_id){
                    username = u.name;
                    break;
                }
            }
            html += `<li>${username}: ${element.content} </li>`
        });
        commentBlock.innerHTML = html;
    })
   //
   var courseAPI = 'http://localhost:3000/courses';
   function getCourse(){
    var coursesTemp;
        fetch(courseAPI)
            .then((response) => {
                return response.json();
            })
            .then((courses) => {
                renderCourses(courses);
            });
     
   }
   function createCourseSubmit(){
    var CourseAdded = document.querySelector('.create-button');
    CourseAdded.onclick = () =>{
        var NameAdded = document.querySelector('.name-input').value;
        var DescriptionAdded = document.querySelector('.description-input').value;
            if(CourseAdded.innerText === 'Create'){
                createCourse({
                    name: NameAdded,
                    description: DescriptionAdded
                });
            }
            else{
                var id = CourseAdded.getAttribute('course-id');
                ChangeCourse(id,{
                    name: NameAdded,
                    description: DescriptionAdded
                });
            }
        }
    }
   function createCourse(data){
        var option = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(courseAPI,option)
            .then((response) => {
                return response.json();
            })    
            .then((courses) => {
                getCourse();
            });

   }
   function DeleteCourse(id){
        var option = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(courseAPI + '/' + id,option)
                .then((response) => {
                    return response.json();
                })    
                .then((courses) => {
                    var deleteItem = document.querySelector('.course-item-' + id);
                    deleteItem.remove();
                });
   }
   function ChangeButtonCreate(id){
        var CreateBtn = document.querySelector('.create-button');
        CreateBtn.innerText = "Sua";
        CreateBtn.setAttribute('course-id',id);
   }
   function ChangeCourse(id,data){
        var option = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(courseAPI + '/' + id,option)
                .then((response) => {
                    return response.json();
                })    
                .then((courses) => {
                    getCourse();
                });
        var CreateBtn = document.querySelector('.create-button');
        CreateBtn.innerText = "Create";
   }
   function renderCourses(courses){
        var htmls = courses.map((course) => {
            return ` 
            <li class = "course-item-${course.id}">   
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick = "DeleteCourse(${course.id})">Xoa</button>
                <button onclick = "ChangeButtonCreate(${course.id})">Sua</button>
            </li>
            `;
        });
        document.querySelector('.course-list').innerHTML = htmls.join('');
   }
   function start(){
        getCourse();
        createCourseSubmit();
   }
   start();

   // 
