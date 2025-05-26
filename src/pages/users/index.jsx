import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)
    const fetchUsers = async () => {
        setloading(true)
        try {
            const response = await axios.get("https://testpsyedu.limsa.uz/users")
            setUsers(response?.data?.data)
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div>
            <h1 className='text-2xl font-bold py-2'>Users</h1>
            <table class="min-w-full table-auto border-collapse border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">№</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">FirstName</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">LastName</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">SchoolName</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {
                        loading ? <div className="loader"></div> :
                            users && users.map((item, index) => (
                                <tr key={item.id}>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{index + 1}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{item?.firstName}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{item?.lastName}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{item?.phone}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{item?.schoolName}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">{item?.region?.name}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                                        <button className='bg-red-500'>Delete</button>
                                        <button className='bg-blue-500'>Edit</button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>

        </div>
    )
}
