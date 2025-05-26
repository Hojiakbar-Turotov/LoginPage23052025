import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function News() {
    const [news, setNews] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState(true)

    // Yangiliklarni olish
    const getNews = async () => {
        try {
            const res = await axios.get("https://testpsyedu.limsa.uz/advertisement");
            setNews(res?.data?.data || []);
        } catch (error) {
            console.error("Yangiliklarni olishda xatolik:", error);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    // Yangilik qo'shish
    const addNews = async (data) => {
        if (!file) {
            alert("Iltimos, video fayl tanlang!");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("file", file);
        formData.append("finishAt", data.finishAt);

        try {
            await axios.post("https://testpsyedu.limsa.uz/advertisement", formData);
            setModal(false);
            reset();
            setFile(null);
            getNews();
        } catch (error) {
            console.error("Yangilik qo'shishda xatolik:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">News</h1>
                <button
                    onClick={() => {
                        setModal(!modal);
                        setVideos(!videos)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {modal ? "Close" : "Add News"}
                </button>
            </div>

            {
                videos ? <div className="flex flex-wrap gap-6">
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="w-[400px] h-[400px] border rounded-md overflow-hidden flex flex-col"
                            >
                                <video
                                    src={item.video}
                                    controls
                                    className="w-full h-[320px] object-cover"
                                />
                                <h3 className="p-2 font-semibold text-lg">{item.title}</h3>
                            </div>
                        ))
                    ) : (
                        <p>Yangiliklar topilmadi</p>
                    )}
                </div> : ""
            }

            {modal && (
                <div className="mt-6 bg-white p-6 rounded shadow max-w-md">
                    <form onSubmit={handleSubmit(addNews)} className="flex flex-col gap-4">
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Title"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <input
                            type="date"
                            {...register("finishAt", { required: true })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setModal(false);
                                    reset();
                                    setFile(null);
                                    setVideos(!videos)

                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            {/* <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add
                            </button> */}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
