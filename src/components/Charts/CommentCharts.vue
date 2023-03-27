<template>
  <div id="comment"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('comment')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    title: {
      text: 'CommentCharts'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      name: 'Date',
      type: 'category',
      show: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      show: false
    },
    series: [
      {
        data: [20, 24, 18, 16, 19, 24, 21],
        type: 'line',
        smooth: true,
        lineStyle: {},
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'skyblue'
              },
              {
                offset: 1,
                color: '#fff'
              }
            ],
            global: false
          }
        }
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="less">
#comment {
  width: 100%;
  height: 100%;
}
</style>
