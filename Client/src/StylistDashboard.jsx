import { useState, useEffect } from 'react'

function StylistDashboard() {
    return(
    <body>
        <header>
            <strong>Stanley Valdez Salon</strong>
            
            <nav>
                <a href="#" class="active">Overview</a>
                <a href="#">Appointments</a>
                <a href="#">Gallery</a>
                <a href="#">Clients</a>
            </nav>

            <div>
                <span>User Name</span>
                <a href="#" class="btn-light">Settings</a>
            </div>
        </header>
        
        <main>
            <div>
                <h1>Welcome back, Stylist</h1>
                <p>View details, manage appointments, or adjust your preferences.</p>
                <section class="appointment-card">
                    <div>
                        <span>Status</span>
                        <span>Reservation #</span>
                    </div>
                    <h2>Appointment</h2>
                    <div>
                        <span>Date and time</span>
                        <span>Estimated duration</span>
                    </div>
                    
                    <div class="appointment-stylist">
                        <p>Client Name</p>
                        <p>Client Contact</p>
                        <p>Client Preferences</p>
                    </div>
                    
                    <div>
                        <a href="#" class="btn-light">Reschedule</a>
                        <a href="#" class="btn-text">Cancel</a>
                    </div>
                </section>

      <section>
        <h2>History</h2>
        <p>Your past appointments.</p>

        <table>
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Services</th>
              <th>Client</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date</td>
              <td>Service</td>
              <td>Client</td>
              <td><a href="#">Rebook</a></td>
            </tr>
            <tr>
              <td>Date</td>
              <td>Service</td>
              <td>Client</td>
              <td><a href="#">Rebook</a></td>
            </tr>
            <tr>
              <td>Date</td>
              <td>Services</td>
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

export default StylistDashboard;