[**hapi**](https://github.com/hapijs/hapi) process monitoring

# Installation

```
npm install -g good-console-cli
```

# Usage

Good log output is in JSON. If you have a stream of this JSON you can pipe it into this cli
in order to view it formatted with `good-console`.

```sh
$ cat good.log | good-console-cli
160402/214607.966, [response], http://localhost:8080: get /api/hello {} 404 (43ms)
160402/221244.176, [ops], memory: 58Mb, uptime (seconds): 1602.074, load: 1.908203125,2.1650390625,2.07958984375
160402/221710.582, [request,info], data: info test message
160402/221710.590, [request,error], data: error test message
$
```

You can also tail follow files to continuously stream them into the good-console-cli

```sh
$ tail -f good.log | good-console-cli
160402/214607.966, [response], http://localhost:8080: get /api/hello {} 404 (43ms)
160402/221244.176, [ops], memory: 58Mb, uptime (seconds): 1602.074, load: 1.908203125,2.1650390625,2.07958984375
160402/221710.582, [request,info], data: info test message
160402/221710.590, [request,error], data: error test message
```

You can also glob (`*.log`), even with tails:

```sh
$ tail -f *.log | good-console-cli
160402/214607.966, [response], http://localhost:8080: get /api/hello {} 404 (43ms)
160402/221244.176, [ops], memory: 58Mb, uptime (seconds): 1602.074, load: 1.908203125,2.1650390625,2.07958984375
160402/221710.582, [request,info], data: info test message
160402/221710.590, [request,error], data: error test message
```

By default it outputs all tags. The equivalent of `*` for good reporters. You may specify tags for each event type.

Supported events: `request`, `response`, `error`, `log`, `ops`

```sh
$ cat good.log | good-console-cli --request=error
160402/214607.966, [response], http://localhost:8080: get /api/hello {} 404 (43ms)
160402/221244.176, [ops], memory: 58Mb, uptime (seconds): 1602.074, load: 1.908203125,2.1650390625,2.07958984375
160402/221710.590, [request,error], data: error test message
```

Note, above it ignored the `request` tagged with `info` since we specified only `error`.

You can specify 0 events to see everything, or a combination of them all.

```sh
$ cat good.log | good-console-cli --request=tag --response=tag --ops=tag --error=again --log=tag
```

You may also specify multiple tags delimited by a comma `,` or by specifying the argument multiple times.

```sh
$ cat good.log | good-console-cli --request=error,info
$ cat good.log | good-console-cli --request=error --request=info
```

If you wish to ignore an event, the the easiest way currently is to specify a known non existent tag.

```sh
$ cat good.log | good-console-cli --request=none --ops=skip --request=-
```
