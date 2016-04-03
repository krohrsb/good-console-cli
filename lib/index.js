const ReadLine = require('readline');
const Stream = require('stream');
const GoodConsole = require('good-console');
const internals = {};

internals.parseLogs = function (inStream, outStream, events) {

    const readLine = ReadLine.createInterface({
        input: inStream,
        output: outStream,
        terminal: false
    });

    const lineStream = new Stream.Readable({ objectMode: true });

    lineStream._read = function () {};

    const reporter = GoodConsole(events);

    reporter.init(lineStream, null, (err) => {
        if (err) {
            console.log(err);
        } else {
            readLine.on('line', (line) => {
                if (line.match(/^\{/)) {
                    try {
                        const entry = JSON.parse(line);
                        lineStream.push(entry);
                    } catch (err) {
                        console.log(err);
                    }

                }

            });
        }

    });

};

module.exports = internals;
