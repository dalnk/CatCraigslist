var socket = io.connect();

socket.on('update', function(data) {
  $(".alive").text("Alive: " data.alive);
})
