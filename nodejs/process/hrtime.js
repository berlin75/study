var time = process.hrtime();
setTimeout(function() {
    var diff = process.hrtime(time);
    console.log('耗时 %d 纳秒', diff[0] * 1e9 + diff[1]);
}, 1000);