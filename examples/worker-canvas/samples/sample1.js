for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    con.fillStyle = 'rgb(' +
      Math.floor((Math.sin(i / 2) + 1) * 100) + ', ' +
      Math.floor((Math.sin(j / 2) + 1) * 100) + ', 0)';
    con.fillRect(i * 20, j * 20, 20, 20)
  }
}