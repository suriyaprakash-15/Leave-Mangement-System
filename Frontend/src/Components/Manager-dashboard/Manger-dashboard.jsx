import React from 'react';
import './Manger-dashboard.css';

const ManagerDashboard = () => {
    // Mock Data
    const urgentApprovals = [
        { id: 1, name: 'Priya Sharma', type: 'Permission • 2 hours', avatar: 'PS' }
    ];

    const teamAvailability = [
        { id: 1, name: 'Sarah Chen', role: 'Frontend Developer', status: 'Available', status_detail: 'Jan 15-17', avatar: 'SC' },
        { id: 2, name: 'Raj Patel', role: 'Backend Developer', status: 'Available', status_detail: 'Jan 12', avatar: 'RP' },
        { id: 3, name: 'Priya Sharma', role: 'UI/UX Designer', status: 'Available', status_detail: 'None planned', avatar: 'PS' },
        { id: 4, name: 'Mike Johnson', role: 'DevOps Engineer', status: 'On Leave', status_detail: 'Currently on leave', avatar: 'MJ' },
    ];

    return (
        <div className="manager-dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">Manureva</div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><button type="button" className="sidebar-link"><span className="icon"></span> Dashboard</button></li>
                        <li><button type="button" className="sidebar-link"><span className="icon"></span> Pending Approvals <span className="badge">3</span></button></li>
                        <li><button type="button" className="sidebar-link"><span className="icon"></span> Team Overview</button></li>
                        <li><button type="button" className="sidebar-link"><span className="icon"></span> Team Calendar</button></li>
                        <li><button type="button" className="sidebar-link"><span className="icon"></span> Leave History</button></li>
                        <li><button type="button" className="sidebar-link"><span className="icon"></span> Reports</button></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <h2>Manager Dashboard</h2>
                    <div className="header-right">
                        <span>Today: Monday, July 21, 2025</span>
                        <div className="user-profile">
                            <img src="https://i.pravatar.cc/40" alt="user" />
                        </div>
                    </div>
                </header>

                {/* Removed commented-out stats-grid section with <a href="#"> to fix warnings */}

                <section className="urgent-approvals list-card">
                {/* <section className="stats-grid"> */}
                    <div className="stat-card pending">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon"></span>
                        </div>
                        <div className="stat-info">
                            <h3>3</h3>
                            <p>Pending Approvals</p>
                            <button type="button" className="review-link">Review now →</button>
                        </div>
                    </div>
                    <div className="stat-card team">
                         <div className="stat-icon-wrapper">
                            <span className="stat-icon"></span>
                        </div>
                        <div className="stat-info">
                            <h3>4</h3>
                            <p>Team Members</p>
                            <span>3 available</span>
                        </div>
                    </div>
                    <div className="stat-card approved">
                         <div className="stat-icon-wrapper">
                            <span className="stat-icon"></span>
                        </div>
                        <div className="stat-info">
                            <h3>18</h3>
                            <p>Approved This Month</p>
                            <span className="positive-change">+12% from last month</span>
                        </div>
                    </div>
                    <div className="stat-card upcoming">
                        <div className="stat-icon-wrapper">
                            <span className="stat-icon"></span>
                        </div>
                        <div className="stat-info">
                            <h3>5</h3>
                            <p>Upcoming Leaves</p>
                            <span>Next 7 days</span>
                        </div>
                    </div>
                {/* </section> */}
                <div className="Urgentapprovals">
                    <h4>Urgent Approvals</h4>
                    <ul>
                        {urgentApprovals.map(item => (
                            <li key={item.id} className="urgent-list-item">
                                <div className="approval-info">
                                    <div className="avatar-placeholder">{item.avatar.substring(0,1)}</div>
                                    <div>
                                        <div className="name">{item.name}</div>
                                        <div className="type">
                                            <span className="person-icon"></span>
                                            {item.type}
                                        </div>
                                    </div>
                                </div>
                                <button className="review-btn">Review</button>
                            </li>
                        ))}
                    </ul>
                </div>
                </section>

                <section className="team-availability list-card">
                    <h4>Team Availability</h4>
                    <ul>
                        {teamAvailability.map(member => (
                            <li key={member.id}>
                                <div className="member-info">
                                     <div className="avatar-placeholder">{member.avatar.substring(0,1)}</div>
                                     <div>
                                        <div className="name">
                                            <span className="person-icon"></span>
                                            {member.name}
                                        </div>
                                        <div className="role">{member.role}</div>
                                    </div>
                                </div>
                                <div className={`availability-status ${member.status.toLowerCase().replace(' ', '-')}`}>
                                    <span>{member.status}</span>
                                    <small>{member.status_detail}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default ManagerDashboard;
