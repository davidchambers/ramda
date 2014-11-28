var R = require('..');
var doctrine = require('doctrine');

var beginRx = /[/][*][*]/;
var endRx = /[*][/]/;

var commentBegin = R.findIndex(function(line) { return beginRx.test(line); });

function commentEnd(lines) {
    var idx = R.findIndex(function(line) { return endRx.test(line); }, lines);
    return idx > -1 ? idx + 1 : idx;
};

function getComments(str) {
    var lines = R.split('\n', str);
    return R.slice(commentBegin(lines), commentEnd(lines), lines).join('\n');
};  

module.exports = function tagmap(str) {
    return doctrine.parse(getComments(str), {unwrap: true});
};
