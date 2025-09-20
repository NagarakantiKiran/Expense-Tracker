import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE',
  '#FF6699', '#33CC99', '#FF9933', '#FF6666', '#CCCCCC'
];

// Abbreviate value for label (e.g., $3K)
const formatValue = (value) => {
  if (value >= 1e6) return `$${(value/1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${Math.round(value/1e3)}K`;
  return `$${value.toFixed(2)}`;
};

// Custom label with leader lines, always outside, staggered if crowded
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value, index, percent }) => {
  const RADIAN = Math.PI / 180;
  const labelRadius = outerRadius + 38 + (index % 2 === 0 ? 10 : 0); // stagger every other label
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  const sx = cx + (outerRadius + 8) * Math.cos(-midAngle * RADIAN);
  const sy = cy + (outerRadius + 8) * Math.sin(-midAngle * RADIAN);
  return (
    <g>
      {/* Leader line */}
      <polyline
        points={`${sx},${sy} ${x},${y}`}
        stroke={COLORS[index % COLORS.length]}
        fill="none"
        strokeWidth={1.2}
      />
      {/* Label text, always outside, never clipped */}
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
        style={{ pointerEvents: 'none', background: 'white' }}
      >
        {name}: {formatValue(value)}
      </text>
    </g>
  );
};

const CategoryPieChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-gray-400 text-center py-8">No data for pie chart.</div>;
  }
  return (
    <div className="flex justify-center items-center" style={{ marginTop: 32, marginBottom: 16 }}>
      <ResponsiveContainer width={420} height={340}>
        <PieChart margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={60}
            fill="#8884d8"
            labelLine={true}
            label={renderCustomizedLabel}
            isAnimationActive={false}
            paddingAngle={2}
          >
            {data.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={formatValue}/>
          <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 13, marginTop: 8 }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
