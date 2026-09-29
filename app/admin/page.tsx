"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function AdminPage() {
  // State untuk menyimpan data sementara dari form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // State untuk menyimpan daftar proyek dari database
  const [projects, setProjects] = useState<any[]>([]);

  // Fungsi untuk menarik data dari database (Read)
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) console.error("Gagal menarik data:", error);
    else setProjects(data || []);
  };

  // Jalankan fungsi fetchProjects saat halaman pertama kali dibuka
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fungsi untuk mengirim data baru ke database (Create)
  const handleAddProject = async (formData: any) => {
  try {
    const response = await fetch('/api/admin/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Gagal menambahkan proyek');
    }

    alert('Proyek berhasil ditambahkan secara aman!');
    // Reset form atau perbarui state di sini
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      {/* Bagian Form (Create) */}
      <form onSubmit={handleAddProject} className="bg-gray-100 p-6 rounded-lg mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Tambah Portofolio Baru</h2>
        
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Judul Proyek"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Deskripsi Proyek"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="URL Gambar (misal: https://link-gambar.com/img.png)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Simpan Proyek
          </button>
        </div>
      </form>

      {/* Bagian Tabel (Read) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Daftar Portofolio</h2>
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">Judul</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">Belum ada proyek.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="p-3 font-medium">{project.title}</td>
                    <td className="p-3 text-sm text-gray-600 truncate max-w-xs">{project.description}</td>
                    <td className="p-3">
                      <button className="text-red-500 text-sm hover:underline">Hapus (TBA)</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}