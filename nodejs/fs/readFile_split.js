const fs = require(`fs`);
const os = require(`os`);
fs.readFile(`./split.txt`, `utf8`, (err, data) => {
	console.log(typeof data);
    data.split(os.EOL).forEach(line => {
        console.log(line);
    });
});