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
  const seriesData = parseData(data)

  const [x_min, x_max] = [
    Math.min(...seriesData.map(item => item[0])),
    Math.max(...seriesData.map(item => item[0]))
  ]

  const hours = Array(24).fill(null).map((_, i) => `${i}H`)
  const days = Array(Math.ceil(x_max - x_min)).fill(null).map((_, i) => `day${i}`)

  const option = {
    tooltip: {
      position: 'top',
      formatter: function (params) {
        const [day, hour, str] = params.data
        return `
        Day: ${day} \n
        Hour: ${hour} \n
        stamp: ${str}
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
        data: days,
        axisLine: {
            show: false
        }
    },
    series: [{
        type: 'scatter',
        data: seriesData,
    }]
  };

  const [w, h] = [document.body.clientWidth, 800]

  const chartContainer = document.createElement('div')
  chartContainer.style.cssText = `width: ${w}px;height: ${h}px;`

  const chart = echarts.init(chartContainer).setOption(option)
  rootEl.appendChild(chartContainer)
})