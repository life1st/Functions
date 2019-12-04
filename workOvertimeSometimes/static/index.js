const rootEl = document.querySelector('.root')

const parseDate2Number = (d) => {
  // start 0101, to 1231, count 365
  const days_map = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const t = new Date(d)
  
  return days_map.splice(0, t.getMonth() + 1).reduce((acc, v) => acc + v, 0) + t.getDay()
}
const parseData = (data) => {
  return data.map(item => {
    const obj = new Date(item.date)
    return [parseDate2Number(obj), obj.getHours()]
  }).sort((a, b) => {
    return a[0] - b[0]
  })
}
axios.get('./data.json').then(({status, data: _data}) => {

  const d = parseData(_data)
  const [min, max] = [d[0][0], d[d.length - 1][0]]
  const hours = Array(24).fill(null).map((_, i) => `${i}H`)
  const days = Array(Math.ceil(max - min)).fill(null).map((_, i) => `day${i}`)
  const data = d.map(([date, time]) => {
    return [date - min, time, 1]
  })
  console.log(d, data)
  const option = {
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return `${params.data[0]}day, ${params.data[1]}:00`;
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
        data,
    }]
  };

  const [w, h] = [document.body.clientWidth, 800]

  const chartContainer = document.createElement('div')
  chartContainer.style.cssText = `width: ${w}px;height: ${h}px;`

  const chart = echarts.init(chartContainer).setOption(option)

  rootEl.appendChild(chartContainer)
})
