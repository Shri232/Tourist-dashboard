import React from "react";

// Reusable Chart Components
export const LineChart = ({ data, title, color = "#3b82f6" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.chartArea}>
        <svg width="100%" height="200" style={styles.svg}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="40"
              y1={40 + (y * 1.2)}
              x2="95%"
              y2={40 + (y * 1.2)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={data.map((point, index) => {
              const x = 40 + (index * (300 / (data.length - 1)));
              const y = 180 - (point.value / maxValue) * 140;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = 40 + (index * (300 / (data.length - 1)));
            const y = 180 - (point.value / maxValue) * 140;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Y-axis labels */}
          {[0, maxValue/4, maxValue/2, (3*maxValue)/4, maxValue].map((value, index) => (
            <text
              key={index}
              x="35"
              y={185 - (index * 35)}
              fontSize="12"
              fill="#6b7280"
              textAnchor="end"
            >
              {Math.round(value)}
            </text>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div style={styles.xAxisLabels}>
          {data.map((point, index) => (
            <span key={index} style={styles.xLabel}>
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BarChart = ({ data, title, color = "#10b981" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.chartArea}>
        <svg width="100%" height="250" style={styles.svg}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="60"
              y1={40 + (y * 1.6)}
              x2="95%"
              y2={40 + (y * 1.6)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const barWidth = 40;
            const barHeight = (item.value / maxValue) * 160;
            const x = 70 + (index * 60);
            const y = 200 - barHeight;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  rx="4"
                />
                <text
                  x={x + barWidth/2}
                  y={y - 5}
                  fontSize="12"
                  fill="#374151"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {item.value}
                </text>
                <text
                  x={x + barWidth/2}
                  y={220}
                  fontSize="11"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
          
          {/* Y-axis labels */}
          {[0, maxValue/4, maxValue/2, (3*maxValue)/4, maxValue].map((value, index) => (
            <text
              key={index}
              x="55"
              y={205 - (index * 40)}
              fontSize="12"
              fill="#6b7280"
              textAnchor="end"
            >
              {Math.round(value)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export const PieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const colors = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.pieChartContainer}>
        <svg width="200" height="200" style={styles.svg}>
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            const x1 = 100 + 80 * Math.cos(startAngleRad);
            const y1 = 100 + 80 * Math.sin(startAngleRad);
            const x2 = 100 + 80 * Math.cos(endAngleRad);
            const y2 = 100 + 80 * Math.sin(endAngleRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        <div style={styles.pieLegend}>
          {data.map((item, index) => (
            <div key={index} style={styles.legendItem}>
              <div 
                style={{
                  ...styles.legendColor,
                  backgroundColor: colors[index % colors.length]
                }}
              ></div>
              <span style={styles.legendText}>
                {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HeatMap = ({ data, title }) => {
  const maxValue = Math.max(...data.flat());
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.heatMapContainer}>
        <div style={styles.heatMapGrid}>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.heatMapRow}>
              {row.map((value, colIndex) => {
                const intensity = value / maxValue;
                const alpha = Math.max(0.1, intensity);
                return (
                  <div
                    key={colIndex}
                    style={{
                      ...styles.heatMapCell,
                      backgroundColor: `rgba(239, 68, 68, ${alpha})`
                    }}
                    title={`Risk Level: ${value}`}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={styles.heatMapLegend}>
          <span style={styles.legendLabel}>Low Risk</span>
          <div style={styles.gradientBar}></div>
          <span style={styles.legendLabel}>High Risk</span>
        </div>
      </div>
    </div>
  );
};

export const GaugeChart = ({ value, max, title, color = "#3b82f6" }) => {
  const percentage = (value / max) * 100;
  const angle = (percentage / 100) * 180; // Half circle
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.gaugeContainer}>
        <svg width="200" height="120" style={styles.svg}>
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M 20 100 A 80 80 0 ${angle > 90 ? 1 : 0} 1 ${20 + 160 * Math.cos((180 - angle) * Math.PI / 180)} ${100 - 80 * Math.sin((180 - angle) * Math.PI / 180)}`}
            fill="none"
            stroke={color}
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Center text */}
          <text x="100" y="90" fontSize="24" fontWeight="bold" textAnchor="middle" fill={color}>
            {value}
          </text>
          <text x="100" y="110" fontSize="14" textAnchor="middle" fill="#6b7280">
            of {max}
          </text>
        </svg>
        <div style={styles.gaugeLabels}>
          <span>0</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export const AreaChart = ({ data, title, color = "#8b5cf6" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.chartArea}>
        <svg width="100%" height="200" style={styles.svg}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="40"
              y1={40 + (y * 1.2)}
              x2="95%"
              y2={40 + (y * 1.2)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <polygon
            fill={`${color}20`}
            stroke={color}
            strokeWidth="2"
            points={`40,180 ${data.map((point, index) => {
              const x = 40 + (index * (300 / (data.length - 1)));
              const y = 180 - (point.value / maxValue) * 140;
              return `${x},${y}`;
            }).join(' ')} ${40 + ((data.length - 1) * (300 / (data.length - 1)))},180`}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = 40 + (index * (300 / (data.length - 1)));
            const y = 180 - (point.value / maxValue) * 140;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Y-axis labels */}
          {[0, maxValue/4, maxValue/2, (3*maxValue)/4, maxValue].map((value, index) => (
            <text
              key={index}
              x="35"
              y={185 - (index * 35)}
              fontSize="12"
              fill="#6b7280"
              textAnchor="end"
            >
              {Math.round(value)}
            </text>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div style={styles.xAxisLabels}>
          {data.map((point, index) => (
            <span key={index} style={styles.xLabel}>
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "20px"
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    textAlign: "center"
  },
  chartArea: {
    position: "relative"
  },
  svg: {
    overflow: "visible"
  },
  xAxisLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    paddingLeft: "40px",
    paddingRight: "20px"
  },
  xLabel: {
    fontSize: "12px",
    color: "#6b7280",
    textAlign: "center"
  },
  pieChartContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    justifyContent: "center"
  },
  pieLegend: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  legendColor: {
    width: "16px",
    height: "16px",
    borderRadius: "2px"
  },
  legendText: {
    fontSize: "14px",
    color: "#374151"
  },
  heatMapContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px"
  },
  heatMapGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  heatMapRow: {
    display: "flex",
    gap: "2px"
  },
  heatMapCell: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  },
  heatMapLegend: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  gradientBar: {
    width: "100px",
    height: "20px",
    background: "linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 1))",
    borderRadius: "10px"
  },
  legendLabel: {
    fontSize: "12px",
    color: "#6b7280"
  },
  gaugeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  gaugeLabels: {
    display: "flex",
    justifyContent: "space-between",
    width: "160px",
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "8px"
  }
};
