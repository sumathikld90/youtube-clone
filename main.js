window.onload = function() {
    console.log("On Load");
    get_videos();

    $('#videoModal' )
    .on('hidden.bs.modal', function() {
        console.log('hide');
        var video = document.getElementById('video_player');
        if (video.firstChild) {
         video.removeChild(video.firstChild);
         
     }



        //video.firstElementChild.setAttribute('src', null);
    })
   

}
/*
document.getElementById('videomodal' ).onhide =  function() {
   console.log("Modal Hiding")
   var video = document.getElementById('video_player');

}*/

function post_new_comment() {
   console.log("Clicking new comment")
   var video_id = document.getElementById("video_id").value
   var comment_text = document.getElementById("comment").value
   var data = new FormData();
   data.append('video_id', video_id);
   data.append('comment_text', comment_text);
   data.append('user_id', 1);
   const xhttp = new XMLHttpRequest();
   xhttp.onload = function() {

   }
   xhttp.open("POST", "http://localhost:5000/send_comment");
   xhttp.send(data);
}

function play_video(url, id) {
   console.log("Playiing " + url);
   $('#videoModal').modal('show');
   var video = document.getElementById('video_player');
   var source = document.createElement('source'); //<source></source>

   source.setAttribute('src', url);
   source.setAttribute('type', 'video/mp4');

   video.appendChild(source);
   video.play();
   document.getElementById("video_id").setAttribute("value", id)

   const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      var commentArray = JSON.parse(this.responseText);
      console.log(commentArray);
      finalHtml = "";
      for(let i = 0; i < commentArray.length; i++) {
          let comment = commentArray[i];
         finalHtml += `<div class="single_comment"><div class="comment_user">${comment.first_name},${comment.last_name} </div>
         <div class="comment_text">${comment.comment_text}</div><div class="comment_time">${comment.created}</div></div>
         `
      }
      document.getElementById("comments").innerHTML = finalHtml
    }
    xhttp.open("GET", "http://localhost:5000/get_comments/"+id);
    xhttp.send();


}
function send_like (video_id) {
   const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

    }
    xhttp.open("GET", "http://localhost:5000/send_like/"+video_id);
    xhttp.send();
    document.getElementById("like_"+video_id).innerHTML=parseInt(document.getElementById("like_"+video_id).innerHTML)+1
}
function send_dislike (video_id) {
   const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

    }
    xhttp.open("GET", "http://localhost:5000/send_dislike/"+video_id);
    xhttp.send();
    document.getElementById("dislike_"+video_id).innerHTML=parseInt(document.getElementById("dislike_"+video_id).innerHTML)+1
}
   

function get_videos() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

        var videoArray = JSON.parse(this.responseText);
        finalHtml = "";
        for(let i = 0; i < videoArray.length; i++) {
            let video = videoArray[i];
        finalHtml += `<div class="video">
        <div class="thumbnail" onclick="play_video('${video.videourl}', ${video.id})">
           <img src="${video.thumbnail}" alt="" />
        </div>
  
        <div class="details">
           <div class="author">
              <img src="${video.profile_picture}" alt="" />
           </div>
           <div class="title">
              <h3>
                 ${video.title}
              </h3>
              <a href="">
                       ${video.first_name}, ${video.last_name}
                 </a>
                 <span> ${video.views} • ${video.uploaded} </span>
           </div>
           <div class="buttons">
            <button class="dislike" onclick="send_dislike(${video.id})"><img src="img/dislike.webp"><span id="dislike_${video.id}">${video.dislikes}</span><button>
            <button class="like" onclick="send_like(${video.id})"><img src="img/like.png"><span id="like_${video.id}">${video.likes}</span><button>
           </div>
        </div>
  
     </div>`
        }
        document.getElementById("videos").innerHTML = finalHtml;
    }
    xhttp.open("GET", "http://localhost:5000/get_videos");
    xhttp.send();
    
}