import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "./Toast";
export default function Region({ notifySuccess, notifyError }) {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [selectedRegion, setSelectedRegion] = useState(null);

    const getRegions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://testpsyedu.limsa.uz/region");
            setRegions(res?.data?.data || []);
        } catch (error) {
            notifyError("Regionsni olishda xatolik yuz berdi!");
            console.error("Failed to fetch regions:", error);
        } finally {
            setLoading(false);
        }
    };

    const addRegion = async (data) => {
        try {
            await axios.post("https://testpsyedu.limsa.uz/region", { name: data.name });
            notifySuccess("Region muvaffaqiyatli qo'shildi!");
            getRegions();
            reset();
            setModal(false);
        } catch (error) {
            notifyError("Region qo'shishda xatolik yuz berdi!");
            console.error("Region qo'shilmadi:", error);
        }
    };

    const deleteRegion = async (id) => {
        const confirmDelete = window.confirm("Rostdan ham ushbu regionni o‘chirmoqchimisiz?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        if (!token) {
            notifyError("Token mavjud emas. Iltimos, qayta login qiling.");
            return;
        }

        try {
            await axios.delete(`https://testpsyedu.limsa.uz/region/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            notifySuccess("Region muvaffaqiyatli o‘chirildi!");
            getRegions();
        } catch (error) {
            notifyError("Token noto‘g‘ri yoki muddati tugagan. Qayta login qiling.");
            console.error("Regionni o‘chirishda xatolik:", error);
        }
    };

    const editRegion = async (data) => {
        if (!selectedRegion?.id) {
            notifyError("Tanlangan region ID mavjud emas.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            notifyError("Token mavjud emas. Iltimos, qayta login qiling.");
            return;
        }

        try {
            await axios.patch(
                `https://testpsyedu.limsa.uz/region/${selectedRegion.id}`,
                { name: data.name },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            notifySuccess("Region muvaffaqiyatli tahrirlandi!");
            getRegions();
            setModal(false);
            setSelectedRegion(null);
        } catch (error) {
            if (error.response?.status === 404) {
                notifyError("Region topilmadi (404). Iltimos, ma'lumotlarni tekshiring.");
            } else {
                notifyError("Tahrirlashda xatolik yuz berdi!");
            }
            console.error("Regionni tahrirlashda xatolik:", error);
        }
    };

    useEffect(() => {
        getRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            reset({ name: selectedRegion.name });
        } else {
            reset({ name: "" });
        }
    }, [selectedRegion, reset]);

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Regions</h1>
                <button
                    onClick={() => {
                        setSelectedRegion(null);
                        setModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Region
                </button>
            </div>

            {loading ? (
                <p className="text-center py-4">Loading...</p>
            ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">№</th>
                            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">Region Name</th>
                            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {regions.map((region, index) => (
                            <tr key={region.id}>
                                <td className="border px-4 py-2 text-sm text-gray-800">{index + 1}</td>
                                <td className="border px-4 py-2 text-sm text-gray-800">{region.name}</td>
                                <td className="border px-4 py-2 text-sm text-gray-800 space-x-2">
                                    <button
                                        onClick={() => deleteRegion(region.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setSelectedRegion(region);
                                            setModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">{selectedRegion ? "Edit Region" : "Add Region"}</h2>

                        <form onSubmit={handleSubmit(selectedRegion ? editRegion : addRegion)}>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Region name"
                                className="border px-3 py-2 w-full rounded mb-3"
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    {selectedRegion ? "Save Changes" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModal(false);
                                        setSelectedRegion(null);
                                        reset();
                                    }}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Toast />
        </div>
    );
}
