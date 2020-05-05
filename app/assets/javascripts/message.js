$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     let html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper">
           <div class="message__upper__user-name">
             ${message.user_name}
           </div>
           <div class="message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     let html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper">
           <div class="message__upper__user-name">
             ${message.user_name}
           </div>
           <div class="message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 let formData = new FormData(this);
 let url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    let html = buildHTML(data);
       $('.messages').append(html);
       $('form')[0].reset();
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
       $('.submit-btn').prop('disabled', false);
     })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  });
})

  let reloadMessages = function() {
    let last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages,30000);
  }
});