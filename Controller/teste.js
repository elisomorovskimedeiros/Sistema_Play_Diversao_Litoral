let moment = require("moment");

let data = new Date();
moment(data).set('date', 8);
moment(data).set('month', 9);
moment(data).set('year', 2019);
moment(data).set('hour', 14);
moment(data).set('minute',00);

console.log("data");
