function nextMonth() {
  var now = new Date();
  if (now.getMonth() == 11) {
      var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
      var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  return current.toLocaleString("en-GB", {month: "long", year: "numeric"});
}

module.exports = {nextMonth};