import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminFooter from '../../Components/Admin/AdminFooter/AdminFooter'
import AdminDashboard from '../../Components/Admin/AdminDashboard/AdminDashboard'

function AdminDashboardPage() {
    return (
        <div>
            <AdminNavbar/>
            <AdminDashboard/>
            <AdminFooter/>
            
        </div>
    )
}

export default AdminDashboardPage
