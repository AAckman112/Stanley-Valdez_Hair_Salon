import { useNavigate, Navigate } from 'react-router-dom'
import UserManagement from './UserManagement.jsx'
import './AdminDashboard.css'

// reads the logged in user's info (username, role) out of the saved login token
function getTokenInfo() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
        // a token is three parts joined by dots; the middle part holds the data
        const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

function AdminDashboard() {
    const navigate = useNavigate();
    const tokenInfo = getTokenInfo();

    // anyone who isn't a logged in admin is sent back to the login page
    if (!tokenInfo || tokenInfo.role !== 'admin') return <Navigate to="/" replace />;

    // log out: remove the token, then go to the login page
    function logout() {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    return (
    <>

        <header>
            <strong>Stanley Valdez Salon</strong>

            <nav>
                <a href="#" className="active">Overview</a>
                <a href="#">Appointments</a>
                <a href="#">Gallery</a>
                <a href="#users">Users</a>
            </nav>

            <div>
                <span>{tokenInfo.username}</span>
                <a href="#" className="btn-light">Settings</a>
                <button id="logoutBtn" className="btn-light" onClick={logout}>Logout</button>
            </div>
        </header>


        <main>
            <div>

                <h1>Welcome back, Admin</h1>
                <p>View details, manage appointments, or adjust your preferences.</p>

                {/* User CRUD: the admin can add, edit and delete users*/}
                <section id="users">
                    <UserManagement currentUsername={tokenInfo.username} />
                </section>

                {/* Appointment card (placeholder until Epic 4)
                Will be changing this into an appointment CRUD 
                card? Basically changing it to a similar structure 
                as the user CRUD but to edit, cancel, or add appointments. */}
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

                {/* History (placeholder until Epic 4) */}
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
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Sign Out</a>
            </nav>
        </footer>

    </>
    )
}

export default AdminDashboard;
