;(function (window) {
  var diff = require('variable-diff');
  window.__PAINLESS__ = [];

  function createPainlessStartFn(painlessHarnesses, karma) {
    function onTestDone(test, groupName) {
      var log;
      if (test.error) {
        log = [test.error.message ? test.error.message : test.error];
        if (test.error.actual && test.error.expected) {
          log.push(diff(test.error.expected, test.error.actual).text);
        }
        if (test.error.stack) {
          log.push(test.error.stack);
        }
      }

      karma.result({
        id: '',
        description: test.name,
        suite: [groupName || ''],
        success: test.success,
        skipped: false,
        time: test.time,
        log: log ? log : [],
        assertionErrors: []
      });
    }

    return function runTest() {
      var testCount = painlessHarnesses.reduce(function onReduce(prev, harness) {
        return prev + harness.groups.reduce(function onGroupReduce(prev, group) {
            return prev + group.tests.length;
          }, 0);
      }, 0);

      karma.info({total: testCount});

      function recurse(index) {
        var groupName;
        var stream = painlessHarnesses[index].run();

        stream.on('data', function(info) {
          if (info.type === 'group.start') {
            groupName = info.data.name;
          }
        });
        stream.on('data', function(info) {
          if (info.type === 'test.end') {
            onTestDone(info.data, groupName);
          }
        });

        stream.on('end', function() {
          if (index < painlessHarnesses.length - 1) {
            recurse(index + 1);
          } else {
            karma.complete({
              coverage: window.__coverage__
            });
          }
        });
      }
      recurse(0);
    }
  }

  window.__karma__.start = createPainlessStartFn(window.__PAINLESS__, window.__karma__);
})(window);