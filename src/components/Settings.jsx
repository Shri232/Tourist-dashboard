import React, { useState, useEffect } from "react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      systemName: "Tourist Safety Dashboard",
      timezone: "UTC+5:30",
      language: "English",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12-hour",
      theme: "light",
      autoRefresh: true,
      refreshInterval: 30,
      dataRetention: 365
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      emergencyAlerts: true,
      incidentUpdates: true,
      systemMaintenance: true,
      emailAddress: "admin@touristsafety.com",
      phoneNumber: "+1-555-123-4567",
      alertFrequency: "immediate",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "06:00"
      }
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 120,
      passwordExpiry: 90,
      loginAttempts: 3,
      ipWhitelist: true,
      auditLogging: true,
      dataEncryption: true,
      autoLogout: true,
      requireStrongPassword: true,
      allowedIPs: ["192.168.1.100", "10.0.0.50"]
    },
    dashboard: {
      defaultView: "overview",
      showStatistics: true,
      showMap: true,
      showAlerts: true,
      mapProvider: "google",
      maxIncidents: 50,
      autoSave: true,
      compactMode: false,
      showTooltips: true,
      animationsEnabled: true
    },
    alerts: {
      criticalThreshold: 5,
      warningThreshold: 10,
      autoEscalation: true,
      escalationTime: 30,
      broadcastRange: 10,
      alertChannels: ["email", "sms", "push", "dashboard"],
      emergencyContacts: [
        { name: "Emergency Services", number: "911", priority: 1 },
        { name: "Safety Coordinator", number: "+1-555-SAFETY", priority: 2 },
        { name: "Regional Manager", number: "+1-555-MANAGER", priority: 3 }
      ]
    },
    integration: {
      weatherAPI: {
        enabled: true,
        provider: "OpenWeatherMap",
        apiKey: "****-****-****-****",
        updateInterval: 15
      },
      emergencyServices: {
        enabled: true,
        endpoint: "https://api.emergency.gov",
        timeout: 30
      },
      gps: {
        enabled: true,
        provider: "GPS Tracker Pro",
        accuracy: "high",
        updateInterval: 10
      },
      backup: {
        enabled: true,
        frequency: "daily",
        retention: 30,
        cloudProvider: "AWS S3"
      }
    }
  });

  const [tempSettings, setTempSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  useEffect(() => {
    const isDifferent = JSON.stringify(settings) !== JSON.stringify(tempSettings);
    setHasChanges(isDifferent);
  }, [settings, tempSettings]);

  const handleSave = () => {
    setSettings(tempSettings);
    setHasChanges(false);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 3000);
  };

  const handleReset = () => {
    setTempSettings(settings);
    setHasChanges(false);
  };

  const updateSetting = (section, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (section, parentKey, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [key]: value
        }
      }
    }));
  };

  const menuItems = [
    { key: "general", label: "General Settings", icon: "⚙️" },
    { key: "notifications", label: "Notifications", icon: "🔔" },
    { key: "security", label: "Security", icon: "🔒" },
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "alerts", label: "Alert System", icon: "🚨" },
    { key: "integration", label: "Integrations", icon: "🔗" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>⚙️ Settings</h1>
        <p style={styles.subtitle}>Configure system preferences and operational parameters</p>
        {hasChanges && (
          <div style={styles.saveBar}>
            <span style={styles.changesText}>You have unsaved changes</span>
            <div style={styles.saveActions}>
              <button style={styles.resetButton} onClick={handleReset}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {showSaveConfirm && (
        <div style={styles.successMessage}>
          ✅ Settings saved successfully!
        </div>
      )}

      <div style={styles.mainContent}>
        {/* Sidebar Menu */}
        <div style={styles.sidebar}>
          {menuItems.map(item => (
            <button
              key={item.key}
              style={{
                ...styles.menuItem,
                ...(activeSection === item.key ? styles.activeMenuItem : {})
              }}
              onClick={() => setActiveSection(item.key)}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={styles.content}>
          {activeSection === "general" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>General Settings</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.settingGroup}>
                  <label style={styles.label}>System Name</label>
                  <input
                    type="text"
                    value={tempSettings.general.systemName}
                    onChange={(e) => updateSetting("general", "systemName", e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Timezone</label>
                  <select
                    value={tempSettings.general.timezone}
                    onChange={(e) => updateSetting("general", "timezone", e.target.value)}
                    style={styles.select}
                  >
                    <option value="UTC-8:00">Pacific Time (UTC-8)</option>
                    <option value="UTC-5:00">Eastern Time (UTC-5)</option>
                    <option value="UTC+0:00">GMT (UTC+0)</option>
                    <option value="UTC+5:30">India Time (UTC+5:30)</option>
                    <option value="UTC+8:00">China Time (UTC+8)</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Language</label>
                  <select
                    value={tempSettings.general.language}
                    onChange={(e) => updateSetting("general", "language", e.target.value)}
                    style={styles.select}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Date Format</label>
                  <select
                    value={tempSettings.general.dateFormat}
                    onChange={(e) => updateSetting("general", "dateFormat", e.target.value)}
                    style={styles.select}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Theme</label>
                  <select
                    value={tempSettings.general.theme}
                    onChange={(e) => updateSetting("general", "theme", e.target.value)}
                    style={styles.select}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Auto Refresh Interval (seconds)</label>
                  <input
                    type="number"
                    value={tempSettings.general.refreshInterval}
                    onChange={(e) => updateSetting("general", "refreshInterval", parseInt(e.target.value))}
                    style={styles.input}
                    min="5"
                    max="300"
                  />
                </div>

                <div style={styles.checkboxGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={tempSettings.general.autoRefresh}
                      onChange={(e) => updateSetting("general", "autoRefresh", e.target.checked)}
                      style={styles.checkbox}
                    />
                    Enable Auto Refresh
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Notification Settings</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.notificationSection}>
                  <h3 style={styles.subSectionTitle}>Notification Channels</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.emailNotifications}
                        onChange={(e) => updateSetting("notifications", "emailNotifications", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Email Notifications
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.smsNotifications}
                        onChange={(e) => updateSetting("notifications", "smsNotifications", e.target.checked)}
                        style={styles.checkbox}
                      />
                      SMS Notifications
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.pushNotifications}
                        onChange={(e) => updateSetting("notifications", "pushNotifications", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Push Notifications
                    </label>
                  </div>
                </div>

                <div style={styles.notificationSection}>
                  <h3 style={styles.subSectionTitle}>Alert Types</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.emergencyAlerts}
                        onChange={(e) => updateSetting("notifications", "emergencyAlerts", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Emergency Alerts
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.incidentUpdates}
                        onChange={(e) => updateSetting("notifications", "incidentUpdates", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Incident Updates
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.systemMaintenance}
                        onChange={(e) => updateSetting("notifications", "systemMaintenance", e.target.checked)}
                        style={styles.checkbox}
                      />
                      System Maintenance
                    </label>
                  </div>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={tempSettings.notifications.emailAddress}
                    onChange={(e) => updateSetting("notifications", "emailAddress", e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    value={tempSettings.notifications.phoneNumber}
                    onChange={(e) => updateSetting("notifications", "phoneNumber", e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.quietHoursSection}>
                  <h3 style={styles.subSectionTitle}>Quiet Hours</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.notifications.quietHours.enabled}
                        onChange={(e) => updateNestedSetting("notifications", "quietHours", "enabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable Quiet Hours
                    </label>
                  </div>
                  <div style={styles.timeRange}>
                    <div style={styles.settingGroup}>
                      <label style={styles.label}>Start Time</label>
                      <input
                        type="time"
                        value={tempSettings.notifications.quietHours.start}
                        onChange={(e) => updateNestedSetting("notifications", "quietHours", "start", e.target.value)}
                        style={styles.input}
                        disabled={!tempSettings.notifications.quietHours.enabled}
                      />
                    </div>
                    <div style={styles.settingGroup}>
                      <label style={styles.label}>End Time</label>
                      <input
                        type="time"
                        value={tempSettings.notifications.quietHours.end}
                        onChange={(e) => updateNestedSetting("notifications", "quietHours", "end", e.target.value)}
                        style={styles.input}
                        disabled={!tempSettings.notifications.quietHours.enabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Security Settings</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.securitySection}>
                  <h3 style={styles.subSectionTitle}>Authentication</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.security.twoFactorAuth}
                        onChange={(e) => updateSetting("security", "twoFactorAuth", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Two-Factor Authentication
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.security.requireStrongPassword}
                        onChange={(e) => updateSetting("security", "requireStrongPassword", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Require Strong Passwords
                    </label>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={tempSettings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", parseInt(e.target.value))}
                      style={styles.input}
                      min="5"
                      max="480"
                    />
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Max Login Attempts</label>
                    <input
                      type="number"
                      value={tempSettings.security.loginAttempts}
                      onChange={(e) => updateSetting("security", "loginAttempts", parseInt(e.target.value))}
                      style={styles.input}
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div style={styles.securitySection}>
                  <h3 style={styles.subSectionTitle}>Access Control</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.security.ipWhitelist}
                        onChange={(e) => updateSetting("security", "ipWhitelist", e.target.checked)}
                        style={styles.checkbox}
                      />
                      IP Whitelist
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.security.auditLogging}
                        onChange={(e) => updateSetting("security", "auditLogging", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Audit Logging
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.security.dataEncryption}
                        onChange={(e) => updateSetting("security", "dataEncryption", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Data Encryption
                    </label>
                  </div>

                  {tempSettings.security.ipWhitelist && (
                    <div style={styles.ipWhitelistSection}>
                      <label style={styles.label}>Allowed IP Addresses</label>
                      {tempSettings.security.allowedIPs.map((ip, index) => (
                        <div key={index} style={styles.ipItem}>
                          <input
                            type="text"
                            value={ip}
                            onChange={(e) => {
                              const newIPs = [...tempSettings.security.allowedIPs];
                              newIPs[index] = e.target.value;
                              updateSetting("security", "allowedIPs", newIPs);
                            }}
                            style={styles.input}
                          />
                          <button
                            style={styles.removeButton}
                            onClick={() => {
                              const newIPs = tempSettings.security.allowedIPs.filter((_, i) => i !== index);
                              updateSetting("security", "allowedIPs", newIPs);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        style={styles.addButton}
                        onClick={() => {
                          const newIPs = [...tempSettings.security.allowedIPs, ""];
                          updateSetting("security", "allowedIPs", newIPs);
                        }}
                      >
                        + Add IP Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "dashboard" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Dashboard Settings</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.settingGroup}>
                  <label style={styles.label}>Default View</label>
                  <select
                    value={tempSettings.dashboard.defaultView}
                    onChange={(e) => updateSetting("dashboard", "defaultView", e.target.value)}
                    style={styles.select}
                  >
                    <option value="overview">Overview</option>
                    <option value="tourists">Tourist Registry</option>
                    <option value="incidents">Active Incidents</option>
                    <option value="alerts">Alerts Center</option>
                    <option value="map">Map View</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Map Provider</label>
                  <select
                    value={tempSettings.dashboard.mapProvider}
                    onChange={(e) => updateSetting("dashboard", "mapProvider", e.target.value)}
                    style={styles.select}
                  >
                    <option value="google">Google Maps</option>
                    <option value="openstreet">OpenStreetMap</option>
                    <option value="mapbox">Mapbox</option>
                  </select>
                </div>

                <div style={styles.settingGroup}>
                  <label style={styles.label}>Max Incidents Display</label>
                  <input
                    type="number"
                    value={tempSettings.dashboard.maxIncidents}
                    onChange={(e) => updateSetting("dashboard", "maxIncidents", parseInt(e.target.value))}
                    style={styles.input}
                    min="10"
                    max="500"
                  />
                </div>

                <div style={styles.dashboardToggles}>
                  <h3 style={styles.subSectionTitle}>Display Options</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.dashboard.showStatistics}
                        onChange={(e) => updateSetting("dashboard", "showStatistics", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Show Statistics
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.dashboard.showMap}
                        onChange={(e) => updateSetting("dashboard", "showMap", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Show Map
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.dashboard.compactMode}
                        onChange={(e) => updateSetting("dashboard", "compactMode", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Compact Mode
                    </label>
                  </div>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.dashboard.animationsEnabled}
                        onChange={(e) => updateSetting("dashboard", "animationsEnabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable Animations
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "alerts" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Alert System</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.alertThresholds}>
                  <h3 style={styles.subSectionTitle}>Alert Thresholds</h3>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Critical Alert Threshold</label>
                    <input
                      type="number"
                      value={tempSettings.alerts.criticalThreshold}
                      onChange={(e) => updateSetting("alerts", "criticalThreshold", parseInt(e.target.value))}
                      style={styles.input}
                      min="1"
                      max="100"
                    />
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Warning Alert Threshold</label>
                    <input
                      type="number"
                      value={tempSettings.alerts.warningThreshold}
                      onChange={(e) => updateSetting("alerts", "warningThreshold", parseInt(e.target.value))}
                      style={styles.input}
                      min="1"
                      max="100"
                    />
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Escalation Time (minutes)</label>
                    <input
                      type="number"
                      value={tempSettings.alerts.escalationTime}
                      onChange={(e) => updateSetting("alerts", "escalationTime", parseInt(e.target.value))}
                      style={styles.input}
                      min="5"
                      max="120"
                    />
                  </div>
                </div>

                <div style={styles.emergencyContacts}>
                  <h3 style={styles.subSectionTitle}>Emergency Contacts</h3>
                  {tempSettings.alerts.emergencyContacts.map((contact, index) => (
                    <div key={index} style={styles.contactItem}>
                      <input
                        type="text"
                        placeholder="Contact Name"
                        value={contact.name}
                        onChange={(e) => {
                          const newContacts = [...tempSettings.alerts.emergencyContacts];
                          newContacts[index].name = e.target.value;
                          updateSetting("alerts", "emergencyContacts", newContacts);
                        }}
                        style={styles.contactInput}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={contact.number}
                        onChange={(e) => {
                          const newContacts = [...tempSettings.alerts.emergencyContacts];
                          newContacts[index].number = e.target.value;
                          updateSetting("alerts", "emergencyContacts", newContacts);
                        }}
                        style={styles.contactInput}
                      />
                      <select
                        value={contact.priority}
                        onChange={(e) => {
                          const newContacts = [...tempSettings.alerts.emergencyContacts];
                          newContacts[index].priority = parseInt(e.target.value);
                          updateSetting("alerts", "emergencyContacts", newContacts);
                        }}
                        style={styles.prioritySelect}
                      >
                        <option value={1}>Priority 1</option>
                        <option value={2}>Priority 2</option>
                        <option value={3}>Priority 3</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "integration" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Integration Settings</h2>
              <div style={styles.integrationGrid}>
                <div style={styles.integrationCard}>
                  <h3 style={styles.integrationTitle}>🌤️ Weather API</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.integration.weatherAPI.enabled}
                        onChange={(e) => updateNestedSetting("integration", "weatherAPI", "enabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable Weather Integration
                    </label>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Provider</label>
                    <select
                      value={tempSettings.integration.weatherAPI.provider}
                      onChange={(e) => updateNestedSetting("integration", "weatherAPI", "provider", e.target.value)}
                      style={styles.select}
                      disabled={!tempSettings.integration.weatherAPI.enabled}
                    >
                      <option value="OpenWeatherMap">OpenWeatherMap</option>
                      <option value="AccuWeather">AccuWeather</option>
                      <option value="WeatherAPI">WeatherAPI</option>
                    </select>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>API Key</label>
                    <input
                      type="password"
                      value={tempSettings.integration.weatherAPI.apiKey}
                      onChange={(e) => updateNestedSetting("integration", "weatherAPI", "apiKey", e.target.value)}
                      style={styles.input}
                      disabled={!tempSettings.integration.weatherAPI.enabled}
                    />
                  </div>
                </div>

                <div style={styles.integrationCard}>
                  <h3 style={styles.integrationTitle}>🚨 Emergency Services</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.integration.emergencyServices.enabled}
                        onChange={(e) => updateNestedSetting("integration", "emergencyServices", "enabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable Emergency Services Integration
                    </label>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>API Endpoint</label>
                    <input
                      type="url"
                      value={tempSettings.integration.emergencyServices.endpoint}
                      onChange={(e) => updateNestedSetting("integration", "emergencyServices", "endpoint", e.target.value)}
                      style={styles.input}
                      disabled={!tempSettings.integration.emergencyServices.enabled}
                    />
                  </div>
                </div>

                <div style={styles.integrationCard}>
                  <h3 style={styles.integrationTitle}>📍 GPS Tracking</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.integration.gps.enabled}
                        onChange={(e) => updateNestedSetting("integration", "gps", "enabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable GPS Integration
                    </label>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Accuracy Level</label>
                    <select
                      value={tempSettings.integration.gps.accuracy}
                      onChange={(e) => updateNestedSetting("integration", "gps", "accuracy", e.target.value)}
                      style={styles.select}
                      disabled={!tempSettings.integration.gps.enabled}
                    >
                      <option value="high">High (&lt; 5m)</option>
                      <option value="medium">Medium (&lt; 20m)</option>
                      <option value="low">Low (&lt; 100m)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.integrationCard}>
                  <h3 style={styles.integrationTitle}>💾 Backup System</h3>
                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={tempSettings.integration.backup.enabled}
                        onChange={(e) => updateNestedSetting("integration", "backup", "enabled", e.target.checked)}
                        style={styles.checkbox}
                      />
                      Enable Automatic Backup
                    </label>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.label}>Backup Frequency</label>
                    <select
                      value={tempSettings.integration.backup.frequency}
                      onChange={(e) => updateNestedSetting("integration", "backup", "frequency", e.target.value)}
                      style={styles.select}
                      disabled={!tempSettings.integration.backup.enabled}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  },
  header: {
    marginBottom: "24px",
    position: "relative"
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1f2937",
    margin: "0 0 8px 0"
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: "0 0 16px 0"
  },
  saveBar: {
    position: "sticky",
    top: "0",
    backgroundColor: "#fef3c7",
    border: "1px solid #f59e0b",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    zIndex: 100
  },
  changesText: {
    color: "#92400e",
    fontWeight: "600"
  },
  saveActions: {
    display: "flex",
    gap: "8px"
  },
  resetButton: {
    padding: "8px 16px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer"
  },
  saveButton: {
    padding: "8px 16px",
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  successMessage: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    border: "1px solid #a7f3d0",
    fontWeight: "600"
  },
  mainContent: {
    display: "flex",
    gap: "24px"
  },
  sidebar: {
    width: "280px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "16px",
    height: "fit-content",
    position: "sticky",
    top: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb"
  },
  menuItem: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "4px",
    textAlign: "left",
    transition: "all 0.2s"
  },
  activeMenuItem: {
    backgroundColor: "#3b82f6",
    color: "white"
  },
  menuIcon: {
    fontSize: "16px"
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb"
  },
  section: {
    maxWidth: "800px"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "24px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "8px"
  },
  subSectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "16px"
  },
  settingsGrid: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "1fr"
  },
  settingGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white"
  },
  select: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  notificationSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  },
  securitySection: {
    backgroundColor: "#fef2f2",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #fecaca"
  },
  timeRange: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  quietHoursSection: {
    backgroundColor: "#f0f9ff",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #bae6fd"
  },
  ipWhitelistSection: {
    marginTop: "16px"
  },
  ipItem: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    alignItems: "center"
  },
  removeButton: {
    padding: "6px 10px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer"
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer"
  },
  dashboardToggles: {
    backgroundColor: "#f0fdf4",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #bbf7d0"
  },
  alertThresholds: {
    backgroundColor: "#fff7ed",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #fed7aa"
  },
  emergencyContacts: {
    backgroundColor: "#fef2f2",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #fecaca"
  },
  contactItem: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: "8px",
    marginBottom: "12px",
    alignItems: "center"
  },
  contactInput: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "12px"
  },
  prioritySelect: {
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer"
  },
  integrationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px"
  },
  integrationCard: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb"
  },
  integrationTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }
};
