import { supabase } from "@/utils/supabase";

export default async function Home() {
  // Menarik data dari database langsung di sisi server
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal menarik data:", error);
  }

  return (
    <main className="p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-12 text-center mt-10">
        <h1 className="text-4xl font-extrabold mb-4">Portofolio Saya</h1>
        <p className="text-gray-400 text-lg">Kumpulan proyek dan karya yang pernah saya buat.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!projects || projects.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">Belum ada proyek yang dipublikasikan.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border border-gray-800 rounded-xl overflow-hidden shadow-sm hover:border-gray-600 transition duration-300">
              {/* Cek apakah ada URL gambar, jika tidak tampilkan kotak abu-abu */}
              {project.image_url ? (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-900 flex items-center justify-center text-gray-600">
                  Tanpa Gambar
                </div>
              )}
              
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}