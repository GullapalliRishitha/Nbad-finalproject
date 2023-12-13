import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import Menu from '../NavigationMenu/NavigationMenu';

const Homepage = ({ user, onSignOut }) => {
  const chartRef = useRef(null);
  const lineChartRef = useRef(null);
  const [expensesData, setExpensesData] = useState([]);

  const data_p = {
    data: [],
    backgroundColor: [
      '#008000',
      '#7fffd4',
      '#ee82ee',
      '#d2691e',
      '#2f4f4f',
      '#ff0000',
      '#800080',
      '#fd6b19',
    ],
    labels: [],
  };

  useEffect(() => {
    function createD3PieChart(data) {
      if (chartRef.current) {
        d3.select(chartRef.current).select('svg').remove();
      }
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal()
        .range(data_p.backgroundColor);

      const pie = d3.pie()
        .value(d => d.amount);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.description));

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.description);
    }

    function createLineGraph(data) {
      const labels = data.map(expenses => expenses.description);
      const amounts = data.map(expenses => expenses.amount);

      const ctx = lineChartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Amount',
              data: amounts,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    function fetchBudget() {
      axios.get('http://161.35.177.15:3001/expenses', {
        headers: {
          'X-User-ID': user._id,
        },
      })
        .then((res) => {
          createD3PieChart(res.data);
          setExpensesData(res.data);
          createLineGraph(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    fetchBudget();
  }, [user._id]);

  return (
    <div>
      <Menu />
      <h2>Welcome!!</h2>
      <button onClick={onSignOut}>Sign Out</button>
      <h2>Pie Chart generated through D3JS</h2>
      <div id="chart" ref={chartRef}></div><br />
      {expensesData && (
        <>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((expenses) => (
                <tr key={expenses._id}>
                  <td>{expenses.description}</td>
                  <td>{expenses.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div id="line-chart">
        <canvas ref={lineChartRef}></canvas>
      </div><br />
    </div>
  );
};

export default Homepage;
