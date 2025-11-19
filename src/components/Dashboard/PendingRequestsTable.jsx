import { CheckCircleIcon, XCircleIcon } from "lucide-react";

const PendingRequestsTable = () => {
    const requests = [
        { id: 1, user: 'Budi Santoso', facility: 'Ruang Diskusi Alpha', date: '12 Okt 2025', status: 'Menunggu' },
        { id: 2, user: 'Ani Yudhoyono', facility: 'Proyektor Epson EB-X500', date: '11 Okt 2025', status: 'Menunggu' },
        { id: 3, user: 'Citra Lestari', facility: 'Laboratorium Komputer', date: '11 Okt 2025', status: 'Menunggu' },
        { id: 4, user: 'Dewi Persik', facility: 'Kamera DSLR Canon 80D', date: '10 Okt 2025', status: 'Menunggu' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Permintaan Menunggu Persetujuan</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-gray-500 border-b">
                            <th className="py-3 px-2">Mahasiswa</th>
                            <th className="py-3 px-2">Fasilitas</th>
                            <th className="py-3 px-2">Tanggal</th>
                            <th className="py-3 px-2 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(item => (
                            <tr key={item.id} className="border-b last:border-none hover:bg-gray-50">
                                <td className="py-4 px-2 font-medium text-gray-700">{item.user}</td>
                                <td className="py-4 px-2 text-gray-600">{item.facility}</td>
                                <td className="py-4 px-2 text-gray-600">{item.date}</td>
                                <td className="py-4 px-2 text-center space-x-2">
                                    <button className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-200">
                                        <CheckCircleIcon className="w-4 h-4" />
                                    </button>
                                     <button className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                                        <XCircleIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingRequestsTable;