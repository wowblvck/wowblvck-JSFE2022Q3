const generateRandomCars = (count = 100) => {
  const carModel = [
    "Aston Martin",
    "Porsche",
    "Lada",
    "Volkswagen",
    "Ferrari",
    "Mercedes",
    "Tesla",
    "Kia",
    "Hyundai",
    "Nissan",
    "Renault",
    "BMW",
    "Jeep",
    "Audi",
    "Peugeot",
    "SAAB",
    "Toyota",
    "Opel",
    "Mazda",
  ];

  const carBrand = [
    "Cayenne",
    "Optima",
    "Vesta",
    "Polo",
    "Model X",
    "Solaris",
    "Almera",
    "Logan",
    "X5",
    "Wrangler",
    "Astra",
    "Avensis",
    "Boxer",
    "CX-5",
    "Corolla",
    "9-3",
    "A5",
  ];

  const cars = [];

  for (let i = 0; i < count; i += 1) {
    const randomName = `${
      carModel[Math.floor(Math.random() * carModel.length)]
    } ${carBrand[Math.floor(Math.random() * carBrand.length)]}`;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    cars.push({ name: randomName, color: `#${randomColor}` });
  }
  return cars;
};

export default generateRandomCars;
