import 'react-data-grid/lib/styles.css';
import React, { useEffect, useState } from 'react';
import { supabase } from './SupabaseClient';
import DataGrid from 'react-data-grid';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Author')
                .select('name, email, picture, last_login')
                .order('name', { ascending: true });

            if (error) {
                console.log('Error fetching data', error);
            } else {
                console.log(data);
                setUsers(data);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    // Define columns for react-data-grid
    const columns = [
        {
            key: 'picture',
            name: '',
            width: '48px',
            editable: false, // Pictures are typically not editable
            renderCell({ row }) {
                return (
                  <div className='w-full flex items-center justify-center'>  
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundImage: `url(${row.picture || 'logo192.png'})`,
                      backgroundSize: 'cover', // Ensures the image covers the entire div
                      backgroundPosition: 'center', // Centers the image within the div
                      backgroundRepeat: 'no-repeat' // Prevents the image from repeating
                    }}
                  />
                  </div>
                );
              }
          },
        {
            key: 'name',
            name: 'Name',
            editable: true, // Make 'Name' field editable
        },
        {
            key: 'email',
            name: 'E-mail',
            editable: false, // Make 'E-mail' field editable
        },
        {
            key: 'last_login',
            name: 'Last Login',
            editable: true,
            renderCell ({ row }) {
                // Parse the date string and format it
                const date = new Date(row.last_login);
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZoneName: 'short'
                }).format(date);
            
                return <span>{formattedDate}</span>;
              }
        }

    ];

    // Function to handle row updates
    const handleRowsChange = (updatedRows) => {
        setUsers(updatedRows);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="container mx-auto p-4 h-screen">
                <DataGrid
                    columns={columns}
                    rows={users}
                    onRowsChange={handleRowsChange}
                />
            </div>
        </div>
    );
};

export default Users;