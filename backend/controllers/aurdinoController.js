const { parser } = require('../config/serialConfig');
const clients = new Set();

const parseSerialData = (line) => {
  const result = {
    weight: null,
    percentage: null,
    alert: false,
    raw: line
  };

  try {
    if (line.startsWith("WT:")) {
      line.split(',').forEach(part => {
        if (part.startsWith("WT:")) {
          result.weight = parseFloat(part.substring(3));
        } 
        else if (part.startsWith("PC:")) {
          result.percentage = parseFloat(part.substring(3));
        }
        else if (part === "AL:1") {
          result.alert = true;
        }
      });
    }
    else if (line.startsWith("CW:")) {
      result.weight = parseFloat(line.substring(3));
    }

    console.log('Parsed:', result);
  } catch(e) {
    console.error('Parse error:', e);
  }
  
  return result;
};

parser.on('data', data => {
  const parsed = parseSerialData(data.toString());
  clients.forEach(client => {
    try {
      client.res.write(`data: ${JSON.stringify(parsed)}\n\n`);
    } catch(err) {
      clients.delete(client);
    }
  });
});

module.exports = {
  handleSerialConnection: (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const client = { res };
    clients.add(client);

    req.on('close', () => clients.delete(client));
    req.on('error', () => clients.delete(client));
    
    res.write('data: {"status":"connected"}\n\n');
  }
};