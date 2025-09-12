import React from "react";

const QuickStatisticsPanel = () => {
  const statsData = {
    touristsPerState: [
      { name: "Madhya Pradesh", value: 2543, color: "#3b82f6" },
      { name: "Tamil Nadu", value: 1876, color: "#f59e0b" },
      { name: "Kerala", value: 1245, color: "#10b981" },
      { name: "Rajasthan", value: 945, color: "#8b5cf6" },
      { name: "Goa", value: 721, color: "#ec4899" }
    ],
    trafficSources: [
      { source: "Direct", percentage: 42 },
      { source: "Website", percentage: 28 },
      { source: "Partner Apps", percentage: 18 },
      { source: "Social Media", percentage: 12 }
    ],
    recentActivity: [
      { time: "10:32 AM", event: "Tourist group entered Bandipur Reserve" },
      { time: "10:15 AM", event: "Medical assistance requested in Goa" },
      { time: "09:48 AM", event: "New restricted zone created in Tamil Nadu" },
      { time: "09:22 AM", event: "Weather alert issued for Manali region" }
    ]
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Calculate the maximum value for scaling the bars
  const maxTouristValue = Math.max(...statsData.touristsPerState.map(state => state.value));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quick Statistics</h2>
        <div style={styles.timeFilter}>
          <button style={{...styles.timeButton, ...styles.timeButtonActive}}>Today</button>
          <button style={styles.timeButton}>Week</button>
          <button style={styles.timeButton}>Month</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📊</span> Tourists by State
          </h3>
          <div style={styles.stateBars}>
            {statsData.touristsPerState.map((state, index) => (
              <div key={index} style={styles.stateRow}>
                <div style={styles.stateNameContainer}>
                  <div style={{...styles.colorDot, backgroundColor: state.color}}></div>
                  <span style={styles.stateName}>{state.name}</span>
                </div>
                <div style={styles.barContainer}>
                  <div 
                    style={{
                      ...styles.bar,
                      width: `${(state.value / maxTouristValue) * 100}%`,
                      backgroundColor: state.color
                    }}
                  ></div>
                </div>
                <span style={styles.stateValue}>{formatNumber(state.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.twoColSection}>
          <div style={styles.trafficSection}>
            <h3 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>🔍</span> Traffic Sources
            </h3>
            <div style={styles.donutChartContainer}>
              <div style={styles.donutChart}>
                {statsData.trafficSources.map((source, index) => {
                  // Calculate the segment position in the donut
                  const prevSegmentsTotal = statsData.trafficSources
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.percentage, 0);
                  
                  return (
                    <div
                      key={index}
                      style={{
                        ...styles.donutSegment,
                        backgroundColor: getTrafficSourceColor(source.source),
                        transform: `rotate(${prevSegmentsTotal * 3.6}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((source.percentage * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((source.percentage * 3.6) * Math.PI / 180)}%, 50% 50%)`
                      }}
                    ></div>
                  );
                })}
                <div style={styles.donutHole}>
                  <span style={styles.donutTotal}>100%</span>
                </div>
              </div>
              <div style={styles.trafficLegend}>
                {statsData.trafficSources.map((source, index) => (
                  <div key={index} style={styles.legendItem}>
                    <div style={{
                      ...styles.legendDot,
                      backgroundColor: getTrafficSourceColor(source.source)
                    }}></div>
                    <span style={styles.legendText}>{source.source}</span>
                    <span style={styles.legendValue}>{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={styles.activitySection}>
            <h3 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>🕒</span> Recent Activity
            </h3>
            <div style={styles.activityList}>
              {statsData.recentActivity.map((activity, index) => (
                <div key={index} style={styles.activityItem}>
                  <div style={styles.activityTime}>{activity.time}</div>
                  <div style={styles.activityEvent}>{activity.event}</div>
                </div>
              ))}
            </div>
            <button style={styles.viewMoreButton}>View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color for traffic source
const getTrafficSourceColor = (source) => {
  switch (source) {
    case "Direct":
      return "#3b82f6";
    case "Website":
      return "#10b981";
    case "Partner Apps":
      return "#f59e0b";
    case "Social Media":
      return "#8b5cf6";
    default:
      return "#64748b";
  }
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "24px",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0
  },
  timeFilter: {
    display: "flex",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "4px"
  },
  timeButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  timeButtonActive: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  section: {
    marginBottom: "24px"
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#334155",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center"
  },
  sectionIcon: {
    fontSize: "16px",
    marginRight: "8px"
  },
  stateBars: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  stateRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  stateNameContainer: {
    display: "flex",
    alignItems: "center",
    width: "140px"
  },
  colorDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  stateName: {
    fontSize: "14px",
    color: "#475569",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  barContainer: {
    flex: 1,
    height: "8px",
    backgroundColor: "#f1f5f9",
    borderRadius: "4px",
    overflow: "hidden"
  },
  bar: {
    height: "100%",
    borderRadius: "4px"
  },
  stateValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    width: "60px",
    textAlign: "right"
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "8px 0 24px"
  },
  twoColSection: {
    display: "flex",
    flex: 1,
    gap: "24px"
  },
  trafficSection: {
    flex: 1
  },
  activitySection: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  donutChartContainer: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  donutChart: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#f1f5f9"
  },
  donutSegment: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)"
  },
  donutHole: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  donutTotal: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a"
  },
  trafficLegend: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1
  },
  legendItem: {
    display: "flex",
    alignItems: "center"
  },
  legendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  legendText: {
    fontSize: "13px",
    color: "#475569",
    flex: 1
  },
  legendValue: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0f172a"
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1
  },
  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#f1f5f9"
    }
  },
  activityTime: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    whiteSpace: "nowrap"
  },
  activityEvent: {
    fontSize: "13px",
    color: "#334155",
    lineHeight: "1.4"
  },
  viewMoreButton: {
    marginTop: "16px",
    padding: "8px 0",
    backgroundColor: "transparent",
    color: "#3b82f6",
    border: "none",
    borderTop: "1px solid #e2e8f0",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "#2563eb"
    }
  }
};

export default QuickStatisticsPanel;
