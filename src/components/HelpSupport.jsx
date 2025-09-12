import React, { useState } from "react";

export default function HelpSupport() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [supportTicket, setSupportTicket] = useState({
    title: "",
    category: "technical",
    priority: "medium",
    description: "",
    email: "",
    phone: ""
  });
  const [showTicketForm, setShowTicketForm] = useState(false);

  const menuItems = [
    { key: "getting-started", label: "Getting Started", icon: "🚀" },
    { key: "user-guide", label: "User Guide", icon: "📚" },
    { key: "faq", label: "FAQ", icon: "❓" },
    { key: "troubleshooting", label: "Troubleshooting", icon: "🔧" },
    { key: "api-docs", label: "API Documentation", icon: "⚡" },
    { key: "contact", label: "Contact Support", icon: "📞" },
    { key: "resources", label: "Resources", icon: "📋" }
  ];

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "How do I access the Tourist Safety Dashboard?",
          answer: "You can access the dashboard through your web browser using the provided URL. Contact your system administrator for login credentials."
        },
        {
          question: "What browsers are supported?",
          answer: "The dashboard is optimized for Chrome, Firefox, Safari, and Edge. We recommend using the latest versions for the best experience."
        },
        {
          question: "How often is the data updated?",
          answer: "Most data is updated in real-time. Some statistical reports may have a 5-10 minute delay depending on the data source."
        }
      ]
    },
    {
      category: "Tourist Management",
      questions: [
        {
          question: "How do I register a new tourist?",
          answer: "Navigate to the Tourist Registry, click 'Add Tourist', fill in the required information including identification details, emergency contacts, and planned activities."
        },
        {
          question: "Can I bulk import tourist data?",
          answer: "Yes, you can import tourist data via CSV or Excel files. Use the 'Import' function in the Tourist Registry section."
        },
        {
          question: "How do I track tourist safety scores?",
          answer: "Safety scores are automatically calculated based on risk factors, location history, and activity participation. View detailed breakdowns in each tourist's profile."
        }
      ]
    },
    {
      category: "Incidents & Alerts",
      questions: [
        {
          question: "How do I report an emergency incident?",
          answer: "Click the 'Emergency Alert' button on the dashboard, select incident type, location, and severity. The system will automatically notify response teams."
        },
        {
          question: "What types of alerts can I create?",
          answer: "You can create weather alerts, security warnings, area restrictions, evacuation notices, and custom announcements."
        },
        {
          question: "How are emergency contacts notified?",
          answer: "The system sends notifications via email, SMS, and push notifications based on the contact preferences and alert severity level."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "Why am I getting login errors?",
          answer: "Check your username/password, ensure your account is active, and verify that your IP address is whitelisted. Contact IT support if problems persist."
        },
        {
          question: "How do I export data?",
          answer: "Use the export buttons available in each section. You can export to CSV, Excel, or PDF formats depending on the data type."
        },
        {
          question: "Can I integrate with external systems?",
          answer: "Yes, the dashboard provides REST APIs and webhooks for integration. Check the API documentation for technical details."
        }
      ]
    }
  ];

  const quickLinks = [
    { title: "System Status", url: "#", icon: "🟢", description: "Check current system health" },
    { title: "Feature Updates", url: "#", icon: "🆕", description: "Latest feature releases" },
    { title: "Training Videos", url: "#", icon: "🎥", description: "Watch how-to guides" },
    { title: "Best Practices", url: "#", icon: "⭐", description: "Recommended workflows" },
    { title: "Community Forum", url: "#", icon: "💬", description: "Join user discussions" },
    { title: "Release Notes", url: "#", icon: "📝", description: "View changelog" }
  ];

  const contactMethods = [
    {
      method: "Emergency Hotline",
      details: "+1-800-EMERGENCY",
      availability: "24/7",
      icon: "🚨",
      description: "For critical incidents and emergencies"
    },
    {
      method: "Technical Support",
      details: "support@touristsafety.com",
      availability: "Mon-Fri 8AM-6PM",
      icon: "🔧",
      description: "For technical issues and troubleshooting"
    },
    {
      method: "Training Support",
      details: "training@touristsafety.com",
      availability: "Mon-Fri 9AM-5PM",
      icon: "📚",
      description: "For training and user education"
    },
    {
      method: "Account Management",
      details: "+1-555-ACCOUNT",
      availability: "Mon-Fri 8AM-6PM",
      icon: "👤",
      description: "For account and billing inquiries"
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Simulate ticket submission
    alert("Support ticket submitted successfully! Ticket ID: #TSS-2025-001");
    setSupportTicket({
      title: "",
      category: "technical",
      priority: "medium",
      description: "",
      email: "",
      phone: ""
    });
    setShowTicketForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>❓ Help & Support</h1>
        <p style={styles.subtitle}>Find answers, get support, and learn how to use the Tourist Safety Dashboard</p>
      </div>

      {/* Quick Search */}
      <div style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for help topics, features, or issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>🔍 Search</button>
        </div>
      </div>

      {/* Quick Links */}
      <div style={styles.quickLinksSection}>
        <h2 style={styles.sectionTitle}>Quick Links</h2>
        <div style={styles.quickLinksGrid}>
          {quickLinks.map((link, index) => (
            <div key={index} style={styles.quickLinkCard}>
              <div style={styles.quickLinkIcon}>{link.icon}</div>
              <div style={styles.quickLinkContent}>
                <h3 style={styles.quickLinkTitle}>{link.title}</h3>
                <p style={styles.quickLinkDescription}>{link.description}</p>
              </div>
              <button style={styles.quickLinkButton}>View →</button>
            </div>
          ))}
        </div>
      </div>

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

        {/* Content Area */}
        <div style={styles.content}>
          {activeSection === "getting-started" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🚀 Getting Started</h2>
              
              <div style={styles.gettingStartedGrid}>
                <div style={styles.stepCard}>
                  <div style={styles.stepNumber}>1</div>
                  <div style={styles.stepContent}>
                    <h3>Initial Setup</h3>
                    <p>Configure your dashboard settings, user preferences, and notification channels.</p>
                    <ul style={styles.stepList}>
                      <li>Set up your profile and contact information</li>
                      <li>Configure notification preferences</li>
                      <li>Choose your default dashboard view</li>
                      <li>Set up emergency contact lists</li>
                    </ul>
                    <button style={styles.stepButton}>Start Setup</button>
                  </div>
                </div>

                <div style={styles.stepCard}>
                  <div style={styles.stepNumber}>2</div>
                  <div style={styles.stepContent}>
                    <h3>Tourist Registration</h3>
                    <p>Learn how to register and manage tourist information in the system.</p>
                    <ul style={styles.stepList}>
                      <li>Register individual tourists</li>
                      <li>Import tourist data in bulk</li>
                      <li>Set up safety monitoring</li>
                      <li>Configure check-in/check-out processes</li>
                    </ul>
                    <button style={styles.stepButton}>Learn More</button>
                  </div>
                </div>

                <div style={styles.stepCard}>
                  <div style={styles.stepNumber}>3</div>
                  <div style={styles.stepContent}>
                    <h3>Emergency Response</h3>
                    <p>Master the emergency response features and alert systems.</p>
                    <ul style={styles.stepList}>
                      <li>Create and manage alerts</li>
                      <li>Coordinate incident response</li>
                      <li>Use the emergency communication system</li>
                      <li>Track response team deployment</li>
                    </ul>
                    <button style={styles.stepButton}>View Guide</button>
                  </div>
                </div>

                <div style={styles.stepCard}>
                  <div style={styles.stepNumber}>4</div>
                  <div style={styles.stepContent}>
                    <h3>Monitoring & Analytics</h3>
                    <p>Utilize the dashboard's monitoring and reporting capabilities.</p>
                    <ul style={styles.stepList}>
                      <li>Monitor real-time tourist locations</li>
                      <li>Generate safety reports</li>
                      <li>Analyze incident patterns</li>
                      <li>Export data for external analysis</li>
                    </ul>
                    <button style={styles.stepButton}>Explore Features</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "user-guide" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📚 User Guide</h2>
              
              <div style={styles.guideSection}>
                <h3>Dashboard Overview</h3>
                <p>The Tourist Safety Dashboard provides a comprehensive view of all tourist safety operations.</p>
                
                <div style={styles.guideContent}>
                  <h4>Main Dashboard Components:</h4>
                  <ul style={styles.guideList}>
                    <li><strong>Tourist Registry:</strong> Manage tourist registrations, profiles, and safety scores</li>
                    <li><strong>Active Incidents:</strong> Monitor and coordinate emergency response</li>
                    <li><strong>Alerts Center:</strong> Create and manage safety alerts and notifications</li>
                    <li><strong>Resource Management:</strong> Track emergency vehicles, equipment, and personnel</li>
                    <li><strong>Restricted Zones:</strong> Manage area access controls and safety restrictions</li>
                    <li><strong>Map View:</strong> Real-time geographic display of tourists and incidents</li>
                  </ul>
                </div>

                <div style={styles.guideContent}>
                  <h4>Navigation:</h4>
                  <ul style={styles.guideList}>
                    <li>Use the sidebar menu to access different sections</li>
                    <li>Click on statistics cards to drill down into details</li>
                    <li>Use the search function to quickly find specific tourists or incidents</li>
                    <li>Filter data using the available filter options</li>
                  </ul>
                </div>

                <div style={styles.guideContent}>
                  <h4>Common Tasks:</h4>
                  <ul style={styles.guideList}>
                    <li><strong>Register a Tourist:</strong> Go to Tourist Registry → Add Tourist → Fill form → Save</li>
                    <li><strong>Report an Incident:</strong> Click Emergency Alert → Select type → Add details → Submit</li>
                    <li><strong>Send Alert:</strong> Go to Alerts Center → Create Alert → Choose recipients → Send</li>
                    <li><strong>View Reports:</strong> Navigate to any section → Click export/report button</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "faq" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>❓ Frequently Asked Questions</h2>
              
              {filteredFAQs.length === 0 ? (
                <div style={styles.noResults}>
                  <p>No FAQ items found matching your search.</p>
                </div>
              ) : (
                filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex} style={styles.faqCategory}>
                    <h3 style={styles.faqCategoryTitle}>{category.category}</h3>
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} style={styles.faqItem}>
                        <button
                          style={styles.faqQuestion}
                          onClick={() => setSelectedFAQ(selectedFAQ === `${categoryIndex}-${faqIndex}` ? null : `${categoryIndex}-${faqIndex}`)}
                        >
                          <span>{faq.question}</span>
                          <span style={styles.faqToggle}>
                            {selectedFAQ === `${categoryIndex}-${faqIndex}` ? "−" : "+"}
                          </span>
                        </button>
                        {selectedFAQ === `${categoryIndex}-${faqIndex}` && (
                          <div style={styles.faqAnswer}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === "troubleshooting" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🔧 Troubleshooting</h2>
              
              <div style={styles.troubleshootingGrid}>
                <div style={styles.troubleshootingCard}>
                  <h3>🔐 Login Issues</h3>
                  <div style={styles.troubleshootingSteps}>
                    <h4>Common Solutions:</h4>
                    <ul>
                      <li>Verify username and password are correct</li>
                      <li>Check if account is active and not locked</li>
                      <li>Clear browser cache and cookies</li>
                      <li>Try using an incognito/private browsing window</li>
                      <li>Ensure your IP address is whitelisted</li>
                    </ul>
                    <p><strong>Still having issues?</strong> Contact technical support with your username and error message.</p>
                  </div>
                </div>

                <div style={styles.troubleshootingCard}>
                  <h3>📊 Data Not Loading</h3>
                  <div style={styles.troubleshootingSteps}>
                    <h4>Check These Items:</h4>
                    <ul>
                      <li>Verify your internet connection is stable</li>
                      <li>Refresh the page (Ctrl+F5 or Cmd+Shift+R)</li>
                      <li>Check if filters are too restrictive</li>
                      <li>Ensure you have permission to view the data</li>
                      <li>Try switching to a different browser</li>
                    </ul>
                    <p><strong>If data is still missing:</strong> Check system status or contact support.</p>
                  </div>
                </div>

                <div style={styles.troubleshootingCard}>
                  <h3>📱 Mobile Issues</h3>
                  <div style={styles.troubleshootingSteps}>
                    <h4>Mobile Optimization:</h4>
                    <ul>
                      <li>Use latest browser version on mobile device</li>
                      <li>Enable JavaScript in browser settings</li>
                      <li>Rotate device to landscape for better viewing</li>
                      <li>Zoom out if elements appear cut off</li>
                      <li>Close other apps to free up memory</li>
                    </ul>
                    <p><strong>Note:</strong> Some advanced features work best on desktop computers.</p>
                  </div>
                </div>

                <div style={styles.troubleshootingCard}>
                  <h3>🔔 Notification Problems</h3>
                  <div style={styles.troubleshootingSteps}>
                    <h4>Notification Setup:</h4>
                    <ul>
                      <li>Check notification settings in your profile</li>
                      <li>Verify email and phone number are correct</li>
                      <li>Check spam/junk folders for email alerts</li>
                      <li>Enable browser notifications when prompted</li>
                      <li>Test notifications with a sample alert</li>
                    </ul>
                    <p><strong>Emergency alerts not working?</strong> Contact support immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "api-docs" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>⚡ API Documentation</h2>
              
              <div style={styles.apiSection}>
                <div style={styles.apiOverview}>
                  <h3>API Overview</h3>
                  <p>The Tourist Safety Dashboard provides RESTful APIs for integration with external systems.</p>
                  
                  <div style={styles.apiDetails}>
                    <div style={styles.apiDetailItem}>
                      <strong>Base URL:</strong> https://api.touristsafety.com/v1
                    </div>
                    <div style={styles.apiDetailItem}>
                      <strong>Authentication:</strong> Bearer Token (JWT)
                    </div>
                    <div style={styles.apiDetailItem}>
                      <strong>Rate Limiting:</strong> 1000 requests per hour
                    </div>
                    <div style={styles.apiDetailItem}>
                      <strong>Data Format:</strong> JSON
                    </div>
                  </div>
                </div>

                <div style={styles.apiEndpoints}>
                  <h3>Main Endpoints</h3>
                  
                  <div style={styles.endpointCard}>
                    <div style={styles.endpointHeader}>
                      <span style={styles.httpMethod}>GET</span>
                      <span style={styles.endpointPath}>/tourists</span>
                    </div>
                    <p>Retrieve list of registered tourists with optional filtering</p>
                    <div style={styles.codeBlock}>
                      <code>curl -H "Authorization: Bearer YOUR_TOKEN" https://api.touristsafety.com/v1/tourists</code>
                    </div>
                  </div>

                  <div style={styles.endpointCard}>
                    <div style={styles.endpointHeader}>
                      <span style={styles.httpMethod}>POST</span>
                      <span style={styles.endpointPath}>/incidents</span>
                    </div>
                    <p>Create a new incident report</p>
                    <div style={styles.codeBlock}>
                      <code>curl -X POST -H "Authorization: Bearer YOUR_TOKEN" -d '{JSON_DATA}' https://api.touristsafety.com/v1/incidents</code>
                    </div>
                  </div>

                  <div style={styles.endpointCard}>
                    <div style={styles.endpointHeader}>
                      <span style={styles.httpMethod}>POST</span>
                      <span style={styles.endpointPath}>/alerts</span>
                    </div>
                    <p>Send emergency alert to registered tourists</p>
                    <div style={styles.codeBlock}>
                      <code>curl -X POST -H "Authorization: Bearer YOUR_TOKEN" -d '{JSON_DATA}' https://api.touristsafety.com/v1/alerts</code>
                    </div>
                  </div>
                </div>

                <div style={styles.apiResources}>
                  <h3>Additional Resources</h3>
                  <ul>
                    <li><a href="#" style={styles.apiLink}>Complete API Reference</a></li>
                    <li><a href="#" style={styles.apiLink}>Authentication Guide</a></li>
                    <li><a href="#" style={styles.apiLink}>Code Examples</a></li>
                    <li><a href="#" style={styles.apiLink}>SDK Downloads</a></li>
                    <li><a href="#" style={styles.apiLink}>Webhook Documentation</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📞 Contact Support</h2>
              
              <div style={styles.contactGrid}>
                {contactMethods.map((method, index) => (
                  <div key={index} style={styles.contactCard}>
                    <div style={styles.contactIcon}>{method.icon}</div>
                    <div style={styles.contactContent}>
                      <h3 style={styles.contactMethod}>{method.method}</h3>
                      <div style={styles.contactDetails}>{method.details}</div>
                      <div style={styles.contactAvailability}>{method.availability}</div>
                      <p style={styles.contactDescription}>{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.ticketSection}>
                <h3>Submit Support Ticket</h3>
                <p>For complex issues or feature requests, submit a detailed support ticket.</p>
                
                {!showTicketForm ? (
                  <button
                    style={styles.submitTicketButton}
                    onClick={() => setShowTicketForm(true)}
                  >
                    📝 Create Support Ticket
                  </button>
                ) : (
                  <form onSubmit={handleTicketSubmit} style={styles.ticketForm}>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Title*</label>
                        <input
                          type="text"
                          value={supportTicket.title}
                          onChange={(e) => setSupportTicket({...supportTicket, title: e.target.value})}
                          style={styles.formInput}
                          required
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Category*</label>
                        <select
                          value={supportTicket.category}
                          onChange={(e) => setSupportTicket({...supportTicket, category: e.target.value})}
                          style={styles.formSelect}
                          required
                        >
                          <option value="technical">Technical Issue</option>
                          <option value="training">Training Request</option>
                          <option value="feature">Feature Request</option>
                          <option value="bug">Bug Report</option>
                          <option value="account">Account Issue</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Priority*</label>
                        <select
                          value={supportTicket.priority}
                          onChange={(e) => setSupportTicket({...supportTicket, priority: e.target.value})}
                          style={styles.formSelect}
                          required
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Email*</label>
                        <input
                          type="email"
                          value={supportTicket.email}
                          onChange={(e) => setSupportTicket({...supportTicket, email: e.target.value})}
                          style={styles.formInput}
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Phone Number</label>
                      <input
                        type="tel"
                        value={supportTicket.phone}
                        onChange={(e) => setSupportTicket({...supportTicket, phone: e.target.value})}
                        style={styles.formInput}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Description*</label>
                      <textarea
                        value={supportTicket.description}
                        onChange={(e) => setSupportTicket({...supportTicket, description: e.target.value})}
                        style={styles.formTextarea}
                        rows="6"
                        placeholder="Please provide detailed information about your issue or request..."
                        required
                      />
                    </div>

                    <div style={styles.formActions}>
                      <button
                        type="button"
                        style={styles.cancelButton}
                        onClick={() => setShowTicketForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" style={styles.submitButton}>
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeSection === "resources" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📋 Resources</h2>
              
              <div style={styles.resourcesGrid}>
                <div style={styles.resourceCard}>
                  <h3>📖 Documentation</h3>
                  <ul style={styles.resourceList}>
                    <li><a href="#" style={styles.resourceLink}>User Manual (PDF)</a></li>
                    <li><a href="#" style={styles.resourceLink}>Quick Reference Guide</a></li>
                    <li><a href="#" style={styles.resourceLink}>Feature Overview</a></li>
                    <li><a href="#" style={styles.resourceLink}>Security Guidelines</a></li>
                  </ul>
                </div>

                <div style={styles.resourceCard}>
                  <h3>🎥 Training Materials</h3>
                  <ul style={styles.resourceList}>
                    <li><a href="#" style={styles.resourceLink}>Getting Started Video</a></li>
                    <li><a href="#" style={styles.resourceLink}>Advanced Features Tutorial</a></li>
                    <li><a href="#" style={styles.resourceLink}>Emergency Response Training</a></li>
                    <li><a href="#" style={styles.resourceLink}>Best Practices Webinar</a></li>
                  </ul>
                </div>

                <div style={styles.resourceCard}>
                  <h3>📊 Templates & Forms</h3>
                  <ul style={styles.resourceList}>
                    <li><a href="#" style={styles.resourceLink}>Tourist Registration Template</a></li>
                    <li><a href="#" style={styles.resourceLink}>Incident Report Form</a></li>
                    <li><a href="#" style={styles.resourceLink}>Emergency Contact Sheet</a></li>
                    <li><a href="#" style={styles.resourceLink}>Safety Checklist</a></li>
                  </ul>
                </div>

                <div style={styles.resourceCard}>
                  <h3>🔧 Technical Resources</h3>
                  <ul style={styles.resourceList}>
                    <li><a href="#" style={styles.resourceLink}>API Documentation</a></li>
                    <li><a href="#" style={styles.resourceLink}>Integration Guide</a></li>
                    <li><a href="#" style={styles.resourceLink}>System Requirements</a></li>
                    <li><a href="#" style={styles.resourceLink}>Troubleshooting Guide</a></li>
                  </ul>
                </div>
              </div>

              <div style={styles.downloadSection}>
                <h3>💾 Downloads</h3>
                <div style={styles.downloadGrid}>
                  <div style={styles.downloadItem}>
                    <span style={styles.downloadIcon}>📱</span>
                    <div>
                      <div style={styles.downloadTitle}>Mobile App</div>
                      <div style={styles.downloadDescription}>Tourist Safety Dashboard mobile companion</div>
                    </div>
                    <button style={styles.downloadButton}>Download</button>
                  </div>
                  
                  <div style={styles.downloadItem}>
                    <span style={styles.downloadIcon}>🖥️</span>
                    <div>
                      <div style={styles.downloadTitle}>Desktop Client</div>
                      <div style={styles.downloadDescription}>Offline-capable desktop application</div>
                    </div>
                    <button style={styles.downloadButton}>Download</button>
                  </div>
                  
                  <div style={styles.downloadItem}>
                    <span style={styles.downloadIcon}>📊</span>
                    <div>
                      <div style={styles.downloadTitle}>Report Templates</div>
                      <div style={styles.downloadDescription}>Pre-built Excel and PDF templates</div>
                    </div>
                    <button style={styles.downloadButton}>Download</button>
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
    marginBottom: "24px"
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
    margin: 0
  },
  searchSection: {
    marginBottom: "32px"
  },
  searchContainer: {
    display: "flex",
    gap: "12px",
    maxWidth: "600px"
  },
  searchInput: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "white"
  },
  searchButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  quickLinksSection: {
    marginBottom: "32px"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "16px"
  },
  quickLinksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px"
  },
  quickLinkCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  quickLinkIcon: {
    fontSize: "24px",
    backgroundColor: "#f3f4f6",
    padding: "12px",
    borderRadius: "8px"
  },
  quickLinkContent: {
    flex: 1
  },
  quickLinkTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0"
  },
  quickLinkDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  quickLinkButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer"
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
    padding: "32px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb"
  },
  section: {
    maxWidth: "100%"
  },
  gettingStartedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px"
  },
  stepCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb",
    display: "flex",
    gap: "20px"
  },
  stepNumber: {
    backgroundColor: "#3b82f6",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
    flexShrink: 0
  },
  stepContent: {
    flex: 1
  },
  stepList: {
    margin: "12px 0",
    paddingLeft: "20px"
  },
  stepButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "12px"
  },
  guideSection: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb"
  },
  guideContent: {
    marginBottom: "24px"
  },
  guideList: {
    paddingLeft: "20px",
    lineHeight: "1.6"
  },
  faqCategory: {
    marginBottom: "32px"
  },
  faqCategoryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid #e5e7eb"
  },
  faqItem: {
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden"
  },
  faqQuestion: {
    width: "100%",
    padding: "16px",
    backgroundColor: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1f2937",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left"
  },
  faqToggle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#6b7280"
  },
  faqAnswer: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    color: "#374151",
    borderTop: "1px solid #e5e7eb",
    lineHeight: "1.6"
  },
  noResults: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280"
  },
  troubleshootingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px"
  },
  troubleshootingCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb"
  },
  troubleshootingSteps: {
    marginTop: "16px"
  },
  apiSection: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb"
  },
  apiOverview: {
    marginBottom: "32px"
  },
  apiDetails: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginTop: "16px"
  },
  apiDetailItem: {
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6",
    fontSize: "14px"
  },
  apiEndpoints: {
    marginBottom: "32px"
  },
  endpointCard: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginBottom: "16px"
  },
  endpointHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },
  httpMethod: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600"
  },
  endpointPath: {
    fontFamily: "monospace",
    fontSize: "14px",
    fontWeight: "600"
  },
  codeBlock: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "12px",
    borderRadius: "6px",
    fontFamily: "monospace",
    fontSize: "12px",
    marginTop: "8px",
    overflow: "auto"
  },
  apiResources: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  },
  apiLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "500"
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "32px"
  },
  contactCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb",
    display: "flex",
    gap: "16px"
  },
  contactIcon: {
    fontSize: "32px",
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "12px",
    height: "fit-content"
  },
  contactContent: {
    flex: 1
  },
  contactMethod: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 8px 0"
  },
  contactDetails: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#3b82f6",
    marginBottom: "4px"
  },
  contactAvailability: {
    fontSize: "14px",
    color: "#059669",
    fontWeight: "500",
    marginBottom: "8px"
  },
  contactDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  ticketSection: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb"
  },
  submitTicketButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },
  ticketForm: {
    marginTop: "20px"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },
  formInput: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white"
  },
  formSelect: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  formTextarea: {
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    resize: "vertical",
    fontFamily: "inherit"
  },
  formActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer"
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  resourcesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px"
  },
  resourceCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e7eb"
  },
  resourceList: {
    listStyle: "none",
    padding: 0,
    margin: "16px 0 0 0"
  },
  resourceLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6"
  },
  downloadSection: {
    backgroundColor: "#f0f9ff",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #bae6fd"
  },
  downloadGrid: {
    display: "grid",
    gap: "16px"
  },
  downloadItem: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  downloadIcon: {
    fontSize: "24px",
    backgroundColor: "#f3f4f6",
    padding: "12px",
    borderRadius: "8px"
  },
  downloadTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937"
  },
  downloadDescription: {
    fontSize: "14px",
    color: "#6b7280"
  },
  downloadButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "auto"
  }
};
