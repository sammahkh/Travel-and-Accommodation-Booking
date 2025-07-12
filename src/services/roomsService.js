export const fetchRooms = async () => {
  return [
    {
      roomId: 1,
      roomNumber: 101,
      roomPhotoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/33143786.jpg?k=4d0bca9d9795b80beb2cd9786946e043b23d1372eb633d5855d3aba6343d68d4&o=&hp=1',
      roomType: 'Standard',
      capacityOfAdults: 2,
      capacityOfChildren: 1,
      roomAmenities: [
        {
          name: 'Free Wi-Fi',
          description: 'High-speed internet available in all rooms.',
        },
        {
          name: 'TV',
          description: 'Flat-screen TV with cable channels.',
        },
        {
          name: 'Air Conditioning',
          description: 'Individually controlled air conditioning.',
        },
      ],
      price: 150.0,
      availability: true,
    },

    {
      roomId: 4,
      roomNumber: 401,
      roomPhotoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/33518061.jpg?k=f1817f9efd359ed681c1c5ca21faf9374a124f24788ce8a21c0d3d24a098386f&o=&hp=1',
      roomType: 'Economy',
      capacityOfAdults: 1,
      capacityOfChildren: 0,
      roomAmenities: [
        {
          name: 'Budget-Friendly',
          description: 'An economical choice for solo travelers.',
        },
        {
          name: 'Single Bed',
          description: 'Comfortable single bed for a restful sleep.',
        },
      ],
      price: 80.0,
      availability: false,
    },
    {
      roomId: 5,
      roomNumber: 501,
      roomPhotoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/33142495.jpg?k=9956c92b062724ceb086158d062ca22b4d10a5737fd2fc08879f44d2842d5091&o=&hp=1',
      roomType: 'Family Suite',
      capacityOfAdults: 4,
      capacityOfChildren: 2,
      roomAmenities: [
        {
          name: 'Adjoining Rooms',
          description: 'Ideal for families with connecting rooms.',
        },
        {
          name: 'Kitchenette',
          description: 'Convenient kitchenette for family meals.',
        },
        {
          name: 'Play Area',
          description: 'Dedicated play area for children.',
        },
      ],
      price: 300.0,
      availability: false,
    },

    {
      roomId: 2,
      roomNumber: 101,
      roomPhotoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/33143786.jpg?k=4d0bca9d9795b80beb2cd9786946e043b23d1372eb633d5855d3aba6343d68d4&o=&hp=1',
      roomType: 'Standard',
      capacityOfAdults: 2,
      capacityOfChildren: 1,
      roomAmenities: [
        {
          name: 'Free Wi-Fi',
          description: 'High-speed internet available in all rooms.',
        },
        {
          name: 'TV',
          description: 'Flat-screen TV with cable channels.',
        },
        {
          name: 'Air Conditioning',
          description: 'Individually controlled air conditioning.',
        },
      ],
      price: 150.0,
      availability: true,
    },
    {
      roomId: 6,
      roomNumber: 601,
      roomPhotoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/33142495.jpg?k=9956c92b062724ceb086158d062ca22b4d10a5737fd2fc08879f44d2842d5091&o=&hp=1',
      roomType: 'Executive Suite',
      capacityOfAdults: 2,
      capacityOfChildren: 1,
      roomAmenities: [
        {
          name: 'Business Center Access',
          description: "Exclusive access to the hotel's business center.",
        },
        {
          name: 'Meeting Room',
          description: 'Private meeting room for business needs.',
        },
        {
          name: 'Complimentary Breakfast',
          description: 'Daily complimentary breakfast included.',
        },
      ],
      price: 220.0,
      availability: true,
    },
  ];
};
