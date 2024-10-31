import React, { useEffect, useState } from 'react';
import { supabase } from './SupabaseClient';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchUsers = async () => {
            setLoading(true);
            let data, error;

            const response = await supabase
            .from('Author')
            .select('*')
            .order('name', { ascending: true }); 
            data = response.data;
            error = response.error;

            if (error) {
                console.log('Error fetching data', error);
            } else {
                setUsers(data);
            }
            setLoading(false);
        };
        fetchUsers();
      
    },[])

    return(
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
           <table className="table-auto w-full border-collapse border border-gray-200">
           <thead>
             <tr className="bg-gray-100">
               <th className="border px-4 py-2">Name</th>
               <th className="border px-4 py-2">E-mail</th>
               <th className="border px-4 py-2">Picture</th>
             </tr>
           </thead>
           <tbody>
            {users.map((user)=>(
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2"><img src={user.picture ? user.picture : "logo192.png"} alt="" height={48} width={48} className='rounded-full'/></td>
                  </tr>
            ))}
            </tbody>
            </table>
        </div>

    )
};

export default Users;