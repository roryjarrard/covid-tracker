import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const plugins = {}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    x: [
      {
        type: 'time',
        time: {
          unit: 'day',
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],

    y: {
      grid: {
        display: false,
      },
      ticks: {
        // include dollar sign in the ticks
        callback: function (value, index, values) {
          return numeral(value).format('0a')
        },
      },
    },
  },
}

function LineGraph() {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchChartData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, 'cases')
          setData(chartData)
        })
    }

    fetchChartData()
  }, [])

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = []
    let lastDataPoint

    for (let date in data[casesType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date.toString(),
          y: data[casesType][date] - lastDataPoint,
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[casesType][date]
    }
    return chartData
  }

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                type: 'line',
                data: data,
                backgroundColor: 'rgba(204,16,52,0.8)',
                borderColor: '#CC1034',
              },
            ],
          }}
          options={options}
          plugins={plugins}
        />
      )}
    </div>
  )
}

export default LineGraph
