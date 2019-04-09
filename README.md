# Overview
Attaches to the [window.performance measures](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance) ; draws the measures with same name in a graph so you can easily track different values.

![example 1](https://raw.githubusercontent.com/stanimirovv/measured/master/media/example-1.png)
![example 2](https://raw.githubusercontent.com/stanimirovv/measured/master/media/example-2.png)

# Usage
Either include the file or use: [link](https://raw.githubusercontent.com/stanimirovv/measured/master/build/index.js) (Note: it will contain the latest version)


``` javascript
        // Create the object
        mc = new MarkChart();
        // Draw the Canvase
        mc.draw();
        // Select measure to track, this is optional, you can click on the canvas to move through the different measures
        mc.select('mySetTimeout');
        // Update the canvas with measures
        mc.update();

        // You can also make an automatic update on time:
        // mc.autorefresh(); // You can optionally pass the miliseconds of refresh, default is 1000 and is part of the config
```

## Custom configuration

TODO

# Example
see example.html for a running example

# Contributing

All contributions are welcome
Some commands to help development:

```
npm run lint - run eslint, based on airbnb style, but some rules are relaxed
npm run build - uglify/minify and put in build dir
```

Open to a lot of changes, it's nice but not mandatory for the pull request to be linted.

# Roadmap
- [x] Visualise the measures
- [x] add Toggling between measures by clicking
- [x] Make styles configurable
- [ ] Enable custom fill colors 
- [ ] Extend configuration
- [ ] Add several preset styles for size
- [ ] Add different preset layouts

# License
See attached license
