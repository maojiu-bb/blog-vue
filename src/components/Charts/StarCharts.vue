<template>
  <div id="star"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('star')!
  const myChart = echarts.init(chartDom)
  const option: EChartsOption = {
    title: {
      text: 'StarCharts'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: [12, 20, 15, 8, 7, 11, 13],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="less">
#star {
  width: 100%;
  height: 100%;
}
</style>
