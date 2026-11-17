import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
    const navigate = useNavigate();

    //clears the stored credentials and sends the user back to the login page
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        navigate('/', { replace: true });
    }

    return(
    <body>

        <header>
            <strong>Stanley Valdez Salon</strong>

            <nav>
                <a href="#" className="active">Overview</a>
                <a href="#">Appointments</a>
                <a href="#">Gallery</a>
                <a href="#">Users</a>
            </nav>

            <div>
                <span>User Name</span>
                <a href="#" className="btn-light">Settings</a>
                <button id="logoutBtn" className="btn-light" onClick={logout}>Logout</button>
            </div>
        </header>


        <main>

            {/* L Col */}
            <div>

                <h1>Welcome back, Admin</h1>
                <p>View details, manage appointments, or adjust your preferences.</p>

                {/* Appointment card */}
                <section className="appointment-card">
                    <div>
                        <span>Up Next: </span>
                        <span>Status</span>
                        <span>Reservation #</span>
                    </div>

                    <h2>Appointment</h2>

                    <div>
                        <span>Date and time</span>
                        <span>Estimated duration</span>
                    </div>

                    <div className="appointment-stylist">
                        <p>Stylist Name</p>
                        <p>Client Name</p>
                        <p>Client Contact</p>
                        <p>Client Preferences</p>
                    </div>

                    <div>
                        <a href="#" className="btn-light">Reschedule</a>
                        <a href="#" className="btn-text">Cancel</a>
                    </div>
                </section>

                {/* History */}
                <section>
                    <h2>History</h2>
                    <p>Appointments Completed in the last 24 hours: </p>

                    <table>
                        <thead>
                            <tr>
                                <th>Date &amp; Time</th>
                                <th>Services</th>
                                <th>Stylist</th>
                                <th>Client</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>Service</td>
                                <td>Stylist</td>
                                <td>Client</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>Service</td>
                                <td>Stylist</td>
                                <td>Client</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>Services</td>
                                <td>Stylist</td>
                                <td>Client</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </div>
        </main>


        <footer>
            <p>&copy; 2026 Stanley Valdez Salon.</p>
            <nav>
                <a href="#">Overview</a>
                <a href="#">Appointments</a>
                <a href="#">Careers</a>
                <a href="#">Sign Out</a>
            </nav>
        </footer>

    </body>
    )
}

export default AdminDashboard;
