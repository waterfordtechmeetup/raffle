$(document).ready(function() {

  $(".draw").click(function() {
    $.post("/draw", function(winner) {
      console.log(winner);
      $(".winner_name").text(winner.member.name);
      $(".profile_url").attr('href', "https://www.meetup.com/Waterford-Tech-Meetup/members/" + winner.member.member_id);

      if (winner.member_photo && winner.member_photo.photo_link) {
        $(".winner_photo").attr('src', winner.member_photo.photo_link);
      } else {
        $(".winner_photo").attr('src', '/public/images/unknown-profile.jpg');
      }
    });
  });

  $(".winner_name").text("???");
  $(".profile_url").attr('href', "https://www.meetup.com/Waterford-Tech-Meetup");
  $(".winner_photo").attr('src', '/public/images/unknown-profile.jpg');
  $(".winner").fadeIn();
  $(".polaroid").show();
});
