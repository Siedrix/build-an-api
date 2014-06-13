var fs = require('fs'),
	enviroment;

var readConf = function (filePath) {
	var conf = fs.readFileSync(filePath).toString();

	return JSON.parse(conf);
};

console.log('Reading ', process.env.NODE_ENV || 'development', 'config');

if( process.env.NODE_ENV === 'production' ){
	enviroment = readConf('./config/prod.json');
	enviroment.env = 'production';
}else if(process.env.NODE_ENV === 'test'){
	enviroment = readConf('./config/test.json');
	enviroment.env = 'test';
}else{
	enviroment = readConf('./config/dev.json');
	enviroment.env = 'development';
}

module.exports = enviroment;