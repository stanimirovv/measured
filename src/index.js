const conf = {
  canvas: { height: 150, width: 300, style: 'border:1px solid green;position:fixed;top:0;left:0' },
  header: { text: '15px Arial ', x: 10, y: 20 },
  defaultRefreshTimeMs: 1000,
};

const textMarginBottom = 40; // Margin before the drawing of the graph starts

function MarkChart(customConf) {
  // Add custo config, if there is any
  if (customConf !== undefined) {
    Object.assign(conf, customConf);
  }

  this.c = document.createElement('canvas');
  let measureToViewIdx = 0;
  this.c.addEventListener('click', () => { measureToViewIdx += 1; this.measureToViewLabel = undefined; this.update(); });

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  this.select = (measureName) => {
    this.measureToViewLabel = measureName;
  };

  this.autorefresh = (customRefreshTimeMs) => {
    let refreshTimeMs = conf.defaultRefreshTimeMs;
    if (customRefreshTimeMs !== undefined) {
      refreshTimeMs = customRefreshTimeMs;
    }
    window.setInterval(() => { this.update(); }, refreshTimeMs);
  };

  // TODO format may be complicated now sicne we don't return the entire map
  function fetchAndComputeMeasureToView() {
    const measures = window.performance.getEntriesByType('measure');
    const computedMeasures = {};
    for (const measure of measures) {
      if (computedMeasures[measure.name] === undefined) {
        computedMeasures[measure.name] = {};
        computedMeasures[measure.name].values = [];
        computedMeasures[measure.name].min = 999999999;
        computedMeasures[measure.name].max = 0;
      }
      computedMeasures[measure.name].values.push(measure.duration);
      // Make data less precise so it is easier to display and comprehend
      const roundedMeasureDuration = Math.round(measure.duration);
      computedMeasures[measure.name].min = Math.min(roundedMeasureDuration, computedMeasures[measure.name].min);
      computedMeasures[measure.name].max = Math.max(roundedMeasureDuration, computedMeasures[measure.name].max);
      computedMeasures[measure.name].name = measure.name;
    }

    let measure;
    if (this.measureToViewLabel) {
      measure = computedMeasures[this.measureToViewLabel];
    } else {
      console.log(computedMeasures);
      const measureNames = Object.keys(computedMeasures);
      const idx = measureToViewIdx % measureNames.length;
      const key = measureNames[idx];
      measure = computedMeasures[key];
    }
    return measure;
  }

  this.draw = () => {
    // Create canvas
    this.c.width = conf.canvas.width;
    this.c.height = conf.canvas.height;
    this.c.style = conf.canvas.style;
    document.body.appendChild(this.c);
  };

  this.update = () => {
    const ctx = this.c.getContext('2d');
    ctx.fillStyle = 'black';
    // Clear the board
    ctx.fillRect(0, 0, conf.canvas.width, conf.canvas.height);
    ctx.fillStyle = 'green';
    ctx.font = conf.header.text;

    // Fetch data
    const measureToView = fetchAndComputeMeasureToView();
    if (measureToView === undefined) {
      ctx.fillText(`Measure ${this.measureToView} doesn't exist`, conf.header.x, conf.header.y);
      return;
    }

    // Create Header
    ctx.font = conf.header.text;
    const headding = `${measureToView.name} (${measureToView.min} - ${measureToView.max})`;
    ctx.fillText(headding, conf.header.x, conf.header.y);

    // Visualise pillars, the width of an individual pillair depends on the total amount of pillairs
    const pillairWidth = conf.canvas.width / measureToView.values.length;
    // offset for next pillair, width is dynamic with respect to width and number of measures
    let currentXIdx = 0;
    // height coefficient
    const heightCoefficient = (conf.canvas.height - textMarginBottom) / measureToView.max;
    for (const value of measureToView.values) {
      ctx.fillStyle = getRandomColor();
      const pillairHeight = heightCoefficient * value;
      ctx.fillRect(currentXIdx, (conf.canvas.height - pillairHeight), pillairWidth, pillairHeight);
      currentXIdx += pillairWidth;
    }
  };
}
