import React, { useState, useMemo } from "react";

export default function DataTable({ 
  data, 
  columns, 
  title, 
  showSearch = true, 
  showExport = true, 
  showDateRange = true,
  itemsPerPage = 10 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filteredData = [...data];

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter(item => {
        if (item.date) {
          const itemDate = new Date(item.date);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          return itemDate >= startDate && itemDate <= endDate;
        }
        return true;
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortConfig, dateRange]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '⇅';
  };

  const handleExport = (format) => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log(`Exporting data in ${format} format...`);
      // In a real app, this would trigger actual export functionality
      alert(`Exporting ${processedData.length} records in ${format} format`);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("Refreshing data...");
      setIsRefreshing(false);
    }, 1500);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div style={styles.container}>
      {/* Table Header */}
      <div style={styles.tableHeader}>
        <h3 style={styles.tableTitle}>{title}</h3>
        <div style={styles.headerActions}>
          {showDateRange && (
            <div style={styles.dateRangeContainer}>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                style={styles.dateInput}
                placeholder="Start Date"
              />
              <span style={styles.dateSeparator}>to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                style={styles.dateInput}
                placeholder="End Date"
              />
            </div>
          )}
          
          <button 
            style={styles.refreshButton}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? "🔄" : "🔄"} Refresh
          </button>
        </div>
      </div>

      {/* Search and Export Controls */}
      <div style={styles.controlsRow}>
        {showSearch && (
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search across all columns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button
                style={styles.clearSearch}
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        )}

        {showExport && (
          <div style={styles.exportContainer}>
            <span style={styles.exportLabel}>Export:</span>
            <button 
              style={styles.exportButton}
              onClick={() => handleExport('PDF')}
            >
              📄 PDF
            </button>
            <button 
              style={styles.exportButton}
              onClick={() => handleExport('Excel')}
            >
              📊 Excel
            </button>
            <button 
              style={styles.exportButton}
              onClick={() => handleExport('CSV')}
            >
              📋 CSV
            </button>
          </div>
        )}
      </div>

      {/* Data Stats */}
      <div style={styles.statsRow}>
        <span style={styles.statsText}>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, processedData.length)} of {processedData.length} entries
          {searchTerm && ` (filtered from ${data.length} total entries)`}
        </span>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    ...styles.tableHeaderCell,
                    ...(column.sortable !== false ? styles.sortableHeader : {})
                  }}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div style={styles.headerContent}>
                    <span>{column.label}</span>
                    {column.sortable !== false && (
                      <span style={styles.sortIcon}>
                        {getSortIcon(column.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {paginatedData.map((row, index) => (
              <tr key={index} style={styles.tableRow}>
                {columns.map((column) => (
                  <td key={column.key} style={styles.tableCell}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div style={styles.noData}>
            <span style={styles.noDataIcon}>📊</span>
            <p style={styles.noDataText}>No data found</p>
            <p style={styles.noDataSubtext}>
              {searchTerm ? "Try adjusting your search terms" : "No records available"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          <div style={styles.paginationControls}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.disabledButton : {})
              }}
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              ⏮️ First
            </button>
            
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.disabledButton : {})
              }}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀️ Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  style={{
                    ...styles.paginationButton,
                    ...(currentPage === pageNum ? styles.activePage : {})
                  }}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.disabledButton : {})
              }}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ▶️
            </button>
            
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.disabledButton : {})
              }}
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last ⏭️
            </button>
          </div>

          <div style={styles.itemsPerPageContainer}>
            <label style={styles.itemsPerPageLabel}>
              Show:
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  // In a real app, you'd update itemsPerPage via props
                }}
                style={styles.itemsPerPageSelect}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    overflow: "hidden"
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb"
  },
  tableTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  dateRangeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  dateInput: {
    padding: "6px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px"
  },
  dateSeparator: {
    color: "#6b7280",
    fontSize: "14px"
  },
  refreshButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  controlsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    flexWrap: "wrap",
    gap: "16px"
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    padding: "0 12px",
    minWidth: "300px"
  },
  searchIcon: {
    color: "#6b7280",
    marginRight: "8px"
  },
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    padding: "10px 0",
    fontSize: "14px",
    flex: 1
  },
  clearSearch: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "4px",
    marginLeft: "8px"
  },
  exportContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  exportLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500"
  },
  exportButton: {
    padding: "6px 12px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
  },
  statsRow: {
    padding: "12px 24px",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb"
  },
  statsText: {
    fontSize: "14px",
    color: "#6b7280"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableHead: {
    backgroundColor: "#f9fafb"
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb"
  },
  sortableHeader: {
    cursor: "pointer",
    userSelect: "none"
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sortIcon: {
    marginLeft: "8px",
    fontSize: "12px",
    color: "#6b7280"
  },
  tableBody: {
    backgroundColor: "white"
  },
  tableRow: {
    borderBottom: "1px solid #f3f4f6",
    transition: "background-color 0.2s"
  },
  tableCell: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#374151"
  },
  noData: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6b7280"
  },
  noDataIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    display: "block"
  },
  noDataText: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "8px"
  },
  noDataSubtext: {
    fontSize: "14px"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    flexWrap: "wrap",
    gap: "16px"
  },
  paginationInfo: {
    fontSize: "14px",
    color: "#6b7280"
  },
  paginationControls: {
    display: "flex",
    gap: "4px"
  },
  paginationButton: {
    padding: "6px 12px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "#374151",
    cursor: "pointer",
    fontSize: "12px",
    borderRadius: "4px",
    transition: "all 0.2s"
  },
  activePage: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6"
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed"
  },
  itemsPerPageContainer: {
    display: "flex",
    alignItems: "center"
  },
  itemsPerPageLabel: {
    fontSize: "14px",
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  itemsPerPageSelect: {
    padding: "4px 8px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "14px",
    margin: "0 4px"
  }
};
