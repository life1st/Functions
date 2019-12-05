const rootEl = document.querySelector('.root')

const parseDate = (timeStr) => {
  const DAYS_MAP = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const timeObj = new Date(timeStr)

  const mm = timeObj.getMonth() + 1
  const dd = timeObj.getDate()
  const day = DAYS_MAP.filter((_, i) => i + 1 < mm).reduce((acc, v) => acc + v, 0) + dd

  const hour = timeObj.getHours()
  const minute = timeObj.getMinutes()

  return {
    day,
    time: minute > 30 ? hour + 0.5 : hour
  }
}
const parseData = (data) => {
  return data.map(item => {
    const timeStr = item.date
    const {day, time} = parseDate(timeStr)
    
    
    return [day, time, [timeStr]]
  })
}
axios.get('./data.json').then(({data}) => {
  const seriesData = Object.keys(data)
  .map(series => parseData(data[series]))
  .reduce((acc, val, i) => {
    
    acc.push({
      type: 'scatter',
      data: val,
      name: Object.keys(data)[i]
    })

    return acc
  }, [])
  

  let [x_min, x_max] = [0, 0]
  seriesData.map(series => {
    const [min, max] = [
      Math.min(...series.data.map(item => item[0])),
      Math.max(...series.data.map(item => item[0])),
    ]

    if (min < x_min) {
      x_min = min
    }
    if (max > x_max) {
      x_max = max
    }
  })

  const hours = Array(24).fill(null).map((_, i) => `${i}H`)
  const days = Array(Math.ceil(x_max - x_min)).fill(null).map((_, i) => `day${i}`)

  const option = {
    legend: {
      data: seriesData.map(series => series.name)
    },
    tooltip: {
      position: 'top',
      formatter: function (params) {
        const [day, hour, str] = params.data
        const t = new Date(str)
        const WEEK_MAP = [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ]
        return `
        repo: ${params.seriesName}\n
        Day: ${t.getMonth() + 1}-${t.getDate()} \n
        Hour: ${hour} \n
        ${WEEK_MAP[t.getDay()]}
        `;
      }
    },
    yAxis: {
      type: 'category',
      data: hours,
      splitLine: {
          show: true,
          lineStyle: {
              color: '#999',
              type: 'dashed'
          }
      },
      axisLine: {
          show: false
      }
    },
    xAxis: {
        type: 'category',
        splitArea: {
          show: true,
          interval: function(index, val) {
            return index % 7 > 5
          }
        },
        data: days,
        axisLine: {
            show: false
        }
    },
    series: seriesData
  };

  const [w, h] = [document.body.clientWidth, 800]

  const chartContainer = document.createElement('div')
  chartContainer.style.cssText = `width: ${w}px;height: ${h}px;`

  const chart = echarts.init(chartContainer).setOption(option)
  rootEl.appendChild(chartContainer)
})