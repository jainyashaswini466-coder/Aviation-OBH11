import React from 'react';

const DUMMY_USER = {
  name: 'Aarav Sharma',
  pastBookings: [
    {
      id: 'PNR-9482X',
      route: 'HYD → DEL',
      airline: 'IndiGo',
      flightNo: '6E-204',
      date: '14 Oct 2026',
      status: 'Completed',
    },
    {
      id: 'PNR-7104K',
      route: 'DEL → LHR',
      airline: 'Air India',
      flightNo: 'AI-111',
      date: '22 Aug 2026',
      status: 'Completed',
    },
    {
      id: 'PNR-3391M',
      route: 'BLR → BOM',
      airline: 'Akasa Air',
      flightNo: 'QP-1108',
      date: '05 Jun 2026',
      status: 'Completed',
    },
  ],
};
const token = localStorage.getItem('token')

fetch('http://localhost:5000/profile',{
    method:'POST',
    headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${token}`
    }
})





export default function Profile({ user = DUMMY_USER }) {
  // Get initials for a simple avatar circle
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-slate-800">
      {/* Header: Person's Name */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Passenger Profile
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
        </div>
      </div>

      {/* Past Bookings List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Past Bookings</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {user.pastBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{booking.route}</span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {booking.id}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {booking.airline} ({booking.flightNo}) • {booking.date}
                </p>
              </div>

              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
