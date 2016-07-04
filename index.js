var consts = {
  serialPort: '/dev/pts/27'
};

var SerialPort = require('serialport'),
  port = new SerialPort(consts.serialPort);

var timer;

port.on('open', function() {
  console.log('Serial port opened');
});

port.on('data', function (data) {
  console.log('Received data: ', data.toString());

  if (data == 'enable') {
    // confirm enable
    timer = setInterval(function () {
      write();
    }, 3000);
  } else if (data == 'disable') {
    // confirm disable

    clearInterval(timer);
  }
});

var write = function () {
  var g = Math.floor(Math.random() * 180),
    d = Math.floor(Math.random() * 40) - 20,
    type = d > 0 ? 0 : 1;

  var writeString = '{"g":' + g + ', "d":' + d + ', "r":' + type + '}';

  port.write(writeString, function (err) {
    if (err) {
      return console.log('Writing error: ', err);
    }
    console.log(writeString, 'successfully writed');
  });
};