const BookingSchedule = () => {
  const bookings = [
    {
      id: 1,
      facility: "Ruang Diskusi Alpha",
      user: "Budi Santoso",
      time: "09:00 - 11:00",
    },
    {
      id: 2,
      facility: "Laboratorium Komputer",
      user: "Tim Proyek A",
      time: "10:00 - 12:00",
    },
    {
      id: 3,
      facility: "Ruang Rapat Cendrawasih",
      user: "Himpunan Mahasiswa",
      time: "13:00 - 15:00",
    },
    {
      id: 4,
      facility: "Kamera Sony A7 III",
      user: "Ani Yudhoyono",
      time: "14:00 - 16:00",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-xl text-gray-800 mb-4">Jadwal Hari Ini</h3>
      <ul className="space-y-4">
        {bookings.map((item) => (
          <li
            key={item.id}
            className="py-3 px-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="font-semibold text-gray-800">{item.facility}</p>
            <p className="text-sm text-gray-600">{item.user}</p>
            <p className="text-sm text-orange-600 font-medium">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingSchedule;
