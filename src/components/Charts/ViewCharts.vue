<template>
  <div id="view"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('view')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    title: {
      text: 'ViewCharts'
    },

    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      name: 'Date',
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      name: 'Count',
      axisLine: {
        symbol: 'arrow',
        lineStyle: {
          type: 'solid'
        }
      }
    },
    series: [
      {
        data: [20, 24, 35, 34, 12, 30, 20],
        type: 'line',
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="less">
#view {
  width: 100%;
  height: 100%;
}
</style>
