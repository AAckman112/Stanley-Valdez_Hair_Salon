import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ClientDashboard.css'

function ClientDashboard() {
    const navigate = useNavigate();

    //sends the user back to the login page
    function logout() {
        navigate('/');
    }

    return(
    <body>

        <header>
            <strong>Stanley Valdez Salon</strong>

            <nav>
                <a href="#" className="active">Overview</a>
                <a href="#">Appointments</a>
                <a href="#">Gallery</a>
                <a href="#">Stylists</a>
            </nav>

            <div>
                <span>User Name</span>
                <a href="#" className="btn-light">Settings</a>
                <a href="#" className="btn-primary">Book Appointment</a>
                <button id="logoutBtn" className="btn-light" onClick={logout}>Logout</button>
            </div>
        </header>


        <main>

            {/* L Col */}
            <div>

                <h1>Welcome back, Client</h1>
                <p>View details, manage appointments, or adjust your preferences.</p>

                {/* Appointment card */}
                <section className="appointment-card">
                    <div>
                        <span>Status</span>
                        <span>Reservation #</span>
                    </div>

                    <h2>Appointment</h2>

                    <div>
                        <span>Date and time</span>
                        <span>Estimated duration</span>
                    </div>

                    <div className="appointment-stylist">
                        <div>
                            <p>Stylist Name</p>
                            <p>Stylist Title</p>
                        </div>
                        <p>Location</p>
                    </div>

                    <div>
                        <a href="#" className="btn-light">Reschedule</a>
                        <a href="#" className="btn-text">Cancel</a>
                    </div>
                </section>

                {/* History */}
                <section>
                    <h2>History</h2>
                    <p>Your past appointments.</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Date &amp; Time</th>
                                <th>Services</th>
                                <th>Stylist</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>Service</td>
                                <td>Stylist</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>Service</td>
                                <td>Stylist</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>Services</td>
                                <td>Stylist</td>
                                <td><a href="#">Rebook</a></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </div>

            {/* R Col */}
            <aside>

                {/* I dont know what to put on these lowkey im just following the figma */}
                {/* Stylist profile? */}
                <section>
                    <h2>Stylist Profile</h2>
                    <p>Preferred Stylists</p>

                    <div className="card">
                        <div>
                            <div>
                                <p>Stanley Valdez</p>
                                <p>Founder and Stylist</p>
                            </div>
                        </div>

                        <p>Specializes in cutting hair.</p>
                    </div>
                </section>

                {/* Saved */}
                <section>
                    <h2>Saved Services</h2>
                    <p>Your favorites</p>

                    <div className="card">
                        <div>
                            <h3>Signature Cut</h3>
                            <span>50 mins</span>
                        </div>
                        <p>Have our stylists give you the signature Stanley cut.</p>
                        <a href="#" className="btn-outline">Book</a>
                    </div>

                    <div className="card">
                        <div>
                            <h3>Cut and Color</h3>
                            <span>1-2 hours</span>
                        </div>
                        <p>Our professional stylists will provide the signature cut, then color to the client's liking!</p>
                        <a href="#" className="btn-outline">Book</a>
                    </div>
                </section>
            </aside>
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

export default ClientDashboard;
