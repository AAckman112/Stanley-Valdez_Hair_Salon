import { useState, useEffect } from 'react'
import './UserManagement.css'

const ROLES = ['admin', 'stylist', 'client']

// what a blank form looks like
const EMPTY_FORM = { firstName: '', lastName: '', username: '', password: '', role: 'client' }

// function takes currentUsername as a parameter so
function UserManagement({ currentUsername }) {
    const [users, setUsers] = useState([]);     // read user information from the database
    const [message, setMessage] = useState(''); // read successfully or not from previous line
    // null = form closed; an object = form open (if it has an _id, user can be edited)
    const [form, setForm] = useState(null); // sets form to blank to add new user.

    // load the users once when the component first appears
    useEffect(() => {
        loadUsers();
    }, []);

    // every request goes through here so the login token is added in one place
    async function api(url, options = {}) {
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Something went wrong.');
        }
        return data;
    }

    /** READ: GET /api/users
     * Load users from the database and put them in the users state variable. */
    async function loadUsers() {
        try {
            setUsers(await api('/api/users'));
        } catch (error) {
            setMessage(error.message);
        }
    }

    // CREATE (POST) or UPDATE (PUT), depending on whether the form is empty(adding new user) or has an _id (editing existing user)
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (form._id) {
                const { _id, firstName, lastName, username, role } = form;
                await api(`/api/users/${_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ firstName, lastName, username, role }),
                });
                setMessage('Changes saved.');
            } else {
                await api('/api/users', { method: 'POST', body: JSON.stringify(form) });
                setMessage('User added.');
            }
            setForm(null);     // close the form
            loadUsers();       // reload so the table matches the database
        } catch (error) {
            setMessage(error.message);
        }
    }

    // DELETE: DELETE /api/users/:id
    async function handleDelete(user) {
        if (!window.confirm(`Delete ${user.username}?`)) return;
        try {
            await api(`/api/users/${user._id}`, { method: 'DELETE' });
            setMessage('User deleted.');
            loadUsers();
        } catch (error) {
            setMessage(error.message);
        }
    }

    // when something is changed, save it in the form state variable
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="um-box">
            <h2>Users</h2>

            {message && <p className="um-message">{message}</p>}

            <button className="um-btn um-btn-light" onClick={() => { setMessage(''); setForm(EMPTY_FORM); }}>
                Add user
            </button>

            {/* add / edit form (only drawn when form isn't null) */}
            {form && (
                <form className="um-form" onSubmit={handleSubmit}>
                    {/*if id has a value, then edit user is displayed, if null, then add user is displayed.*/}
                    <h2>{form._id ? 'Edit user' : 'Add user'}</h2>

                    <input className="um-input" name="firstName" placeholder="First name"
                        value={form.firstName} onChange={handleChange} required />
                    <input className="um-input" name="lastName" placeholder="Last name"
                        value={form.lastName} onChange={handleChange} required />
                    <input className="um-input" name="username" placeholder="Username"
                        value={form.username} onChange={handleChange} required />

                    {/* password box only visible when adding a new user, you arent allowed to change anyone elses password obviously */}
                    {!form._id && (
                        <input className="um-input" type="password" name="password" placeholder="Password"
                            value={form.password} onChange={handleChange} required />
                    )}
                    {/* role dropdown lets you choose between admin, stylist, and client */}
                    <select className="um-input" name="role" value={form.role} onChange={handleChange}>
                        {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>

                    <button className="um-btn" type="submit">Save</button>
                    <button className="um-btn um-btn-light" type="button" onClick={() => setForm(null)}>
                        Cancel
                    </button>
                </form>
            )}

            {/* the user table, basically just the html for the table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/*iterates through users array and makes a row for each one*/}
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                
                                <button className="um-btn um-btn-light" onClick={() => setForm({
                                    _id: user._id,
                                    firstName: user.firstName || '',
                                    lastName: user.lastName || '',
                                    username: user.username || '',
                                    role: user.role || 'client',
                                })}>
                                    Edit
                                </button>
                                <button
                                    className="um-btn um-btn-danger"
                                    onClick={() => handleDelete(user)}
                                    disabled={user.username === currentUsername}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
