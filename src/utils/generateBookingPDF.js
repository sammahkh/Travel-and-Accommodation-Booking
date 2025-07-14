import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateBookingPDF = (booking) => {
  if (!booking || typeof booking !== 'object') return;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Booking Confirmation', 14, 20);

  autoTable(doc, {
    head: [
      [
        'Confirmation #',
        'Room No.',
        'Room Type',
        'Hotel',
        'Booking Date',
        'Payment',
        'Cost',
      ],
    ],
    body: [
      [
        booking.confirmationNumber,
        booking.roomNumber,
        booking.roomType,
        booking.hotelName,
        new Date(booking.bookingDateTime).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        booking.paymentMethod,
        `$${booking.totalCost}`,
      ],
    ],
    startY: 30,
  });

  doc.text(`Total: $${booking.totalCost}`, 14, doc.lastAutoTable.finalY + 10);
  doc.save('booking_confirmation.pdf');
};
