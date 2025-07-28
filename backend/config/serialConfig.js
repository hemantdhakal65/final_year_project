const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({
  path: 'COM5',
  baudRate: 57600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('open', () => console.log('Serial connected'));
port.on('error', err => console.error('Port error:', err));

parser.on('data', data => console.log('Raw:', data.trim()));

module.exports = { port, parser };