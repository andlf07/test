/* Resuelve los siguientes enunciados agregando el código abajo de cada función (donde dice Code Here) */
/* La pregunta 0 es un ejemplo de como debe ser el desarrollo */
/* La solución debe ser posible ejecutarla en cualquier interprete de JavaScript browser o node */

const clients = [
  { id: 1, rut: "86620855", name: "DANIEL TORO" },
  { id: 2, rut: "7317855K", name: "NICOLAS DUJOVNE" },
  { id: 3, rut: "73826497", name: "ERNESTO BRICENO" },
  { id: 4, rut: "88587715", name: "JORDAN RODRIGUEZ" },
  { id: 5, rut: "94020190", name: "ALEJANDRO PINTO" },
  { id: 6, rut: "99804238", name: "DENIS RODRIGUEZ" },
];

const accounts = [
  { clientId: 6, insuranceId: 1, balance: 15000 },
  { clientId: 1, insuranceId: 3, balance: 18000 },
  { clientId: 5, insuranceId: 3, balance: 135000 },
  { clientId: 2, insuranceId: 2, balance: 5600 },
  { clientId: 3, insuranceId: 1, balance: 23000 },
  { clientId: 5, insuranceId: 2, balance: 15000 },
  { clientId: 3, insuranceId: 3, balance: 45900 },
  { clientId: 2, insuranceId: 3, balance: 19000 },
  { clientId: 4, insuranceId: 3, balance: 51000 },
  { clientId: 5, insuranceId: 1, balance: 89000 },
  { clientId: 1, insuranceId: 2, balance: 1600 },
  { clientId: 5, insuranceId: 3, balance: 37500 },
  { clientId: 6, insuranceId: 1, balance: 19200 },
  { clientId: 2, insuranceId: 3, balance: 10000 },
  { clientId: 3, insuranceId: 2, balance: 5400 },
  { clientId: 3, insuranceId: 1, balance: 9000 },
  { clientId: 4, insuranceId: 3, balance: 13500 },
  { clientId: 2, insuranceId: 1, balance: 38200 },
  { clientId: 5, insuranceId: 2, balance: 17000 },
  { clientId: 1, insuranceId: 3, balance: 1000 },
  { clientId: 5, insuranceId: 2, balance: 600 },
  { clientId: 6, insuranceId: 1, balance: 16200 },
  { clientId: 2, insuranceId: 2, balance: 10000 },
];

const insurances = [
  { id: 1, name: "SEGURO APV" },
  { id: 2, name: "SEGURO DE VIDA" },
  { id: 3, name: "SEGURO COMPLEMENTARIO DE SALUD" },
];

const newInsurancesArray = insurances.reduce((result, insurance) => {
  const matchingAccounts = accounts.filter(
    (account) => account.insuranceId === insurance.id
  );
  const clientsToAdd = [];
  const existingClients = {};

  matchingAccounts.forEach((account) => {
    const client = clients.find((client) => client.id === account.clientId);
    const existingClient = existingClients[client.id];

    if (existingClient) {
      existingClient.balance += account.balance;
    } else {
      existingClients[client.id] = {
        ...client,
        balance: account.balance,
      };
      clientsToAdd.push(existingClients[client.id]);
    }
  });

  clientsToAdd.sort((a, b) => b.balance - a.balance); // Ordenar por balance

  result[insurance.id] = {
    name: insurance.name,
    clients: clientsToAdd,
  };

  return result;
}, {});

/* 0.- EJEMPLO: Arreglo con los ids de clientes */
function listClientsIds() {
  /* CODE HERE */
  return clients.map((client) => client.id);
}

/* 1.- Arreglo con los ids de clientes ordenados por rut */
function listClientsIdsSortedByRUT() {
  // Ordenar segun Rut
  const sortByRut = clients.sort((a, b) => a.rut.localeCompare(b.rut));
  // Obtener solo los ids de los clientes
  const getIds = sortByRut.map((client) => client.id);
  return getIds;
}

/* 2.- Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los seguros que participa. */
function sortClientsTotalBalances() {
  // Creamos un array vacío para almacenar los nuevos clientes
  const newClients = [];

  // Iteramos a través de cada objeto del array newInsurancesArray
  // y agregamos los clientes de cada objeto al array newClients
  for (const key in newInsurancesArray) {
    newClients.push(...newInsurancesArray[key].clients);
  }

  // Utilizamos el método reduce para acumular el balance de los clientes duplicados.
  const resultArray = newClients.reduce((acc, obj) => {
    // Buscamos si hay algún objeto en el array acc que tenga las mismas propiedades
    // (id, rut y name) que el objeto actual del array newClients.
    const matchingObj = acc.find(
      (o) => o.id === obj.id && o.rut === obj.rut && o.name === obj.name
    );

    // Si hay un objeto con las mismas propiedades, sumamos el balance del objeto
    // actual al balance del objeto existente en acc.
    if (matchingObj) {
      matchingObj.balance += obj.balance;
    } else {
      // Si no hay un objeto con las mismas propiedades, agregamos el objeto actual
      // al array acc.
      acc.push({ ...obj });
    }
    // Retornamos el array acc actualizado para la próxima iteración.
    return acc;
  }, []);

  // Creamos un nuevo array con los nombres de los clientes en resultArray.
  const clientsNames = resultArray.map((client) => client.name);

  // Retornamos el array clientsNames
  return clientsNames;
}

/* 3.- Objeto en que las claves sean los nombres de los seguros y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre. */
function insuranceClientsByRUT() {
  // Se crea un objeto vacío que se llenará con los datos de salida.
  const resultObject = {};

  // Se recorre el array "newInsurancesArray" y se itera por cada objeto contenido en él.
  for (const key in newInsurancesArray) {
    // Se guarda el objeto actual en la variable "value".
    const value = newInsurancesArray[key];

    // Se crea un nuevo array llamado "clientsRutArray" que contiene los ruts de los clientes de la compañía actual ("value").
    // Se ordena alfabéticamente por nombre de cliente utilizando la función "sort()" con "localeCompare()".
    // Se utiliza la función "map()" para obtener solamente los ruts.
    const clientsRutArray = value.clients
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((client) => client.rut);

    // Se agrega al objeto "resultObject" una nueva propiedad con el nombre de la compañía actual ("value.name") y el array de ruts de sus clientes ("clientsRutArray").
    resultObject[value.name] = clientsRutArray;
  }

  return resultObject;
}

/* 4.- Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 30.000 en el "Seguro APV" */
function higherClientsBalances() {
  const apvInsurance = newInsurancesArray["1"];
  // Se filtran los clientes del seguro APV que tienen un saldo mayor a 30.000
  const filteredClients = apvInsurance.clients.filter(
    (client) => client.balance > 30000
  );

  // Se crea un nuevo arreglo con los saldos de los clientes filtrados y se ordena decrecientemente
  const sortedBalances = filteredClients
    .map((client) => client.balance)
    .sort((a, b) => b - a);

  return sortedBalances;
}

/* 5.- Arreglo con ids de los seguros ordenados crecientemente por la cantidad TOTAL de dinero que administran. */
function insuranceSortedByHighestBalance() {
  // objeto para almacenar la cantidad total de dinero administrado por cada seguro
  const totalBalances = {};

  // iterar sobre el objeto de seguros y sumar los balances de los clientes
  for (const key in newInsurancesArray) {
    const insurance = newInsurancesArray[key];

    let total = 0;
    for (const client of insurance.clients) {
      total += client.balance;
    }
    totalBalances[insurance.name] = total;
  }

  // crear un arreglo con los ids de los seguros ordenados según la cantidad total de dinero que administran
  const sortedIds = Object.entries(totalBalances)
    .sort((a, b) => a[1] - b[1])
    .map(
      ([name]) => insurances.find((insurance) => insurance.name === name).id
    );
  return sortedIds;
}

/* 6.- Objeto en que las claves sean los nombres de los Seguros y los valores el número de clientes que solo tengan cuentas en ese seguro. */
function uniqueInsurance() {
  // Iteramos sobre los valores de los objetos de seguros y acumulamos los resultados en un objeto vacío
  const result = Object.values(newInsurancesArray).reduce((acc, seguro) => {
    // Obtenemos un arreglo con los ids de los clientes para este seguro
    const clientes = seguro.clients.map((cliente) => cliente.id);

    // Filtramos los ids de los clientes que aparecen una sola vez en el arreglo y que no aparecen en ningún otro seguro
    acc[seguro.name] = clientes.filter((cliente) => {
      // Obtenemos el número de veces que aparece el cliente en otros seguros
      const count = Object.values(newInsurancesArray)
        .filter((s) => s !== seguro) // Excluimos el seguro actual
        .flatMap((s) => s.clients) // Convertimos todos los clientes de todos los otros seguros en un solo arreglo
        .filter((c) => c.id === cliente).length; // Filtramos los clientes que tienen el mismo id que el cliente actual

      // Devolvemos verdadero si el cliente aparece una sola vez en el arreglo y no aparece en ningún otro seguro
      return (
        clientes.indexOf(cliente) === clientes.lastIndexOf(cliente) &&
        count === 0
      );
    }).length; // Obtenemos el número de clientes que cumplen los criterios y lo agregamos al objeto de resultados

    // Devolvemos el objeto acumulado con los resultados parciales
    return acc;
  }, {});

  return result;
}

/* 7.- Objeto en que las claves sean los nombres de los Seguros y los valores el id de su cliente con menos fondos. */
function clientWithLessFunds() {
  // Iteramos sobre los valores de los objetos de seguros y acumulamos los resultados en un objeto vacío
  const result = Object.values(newInsurancesArray).reduce((acc, seguro) => {
    // Obtenemos el cliente con el balance más bajo para este seguro
    const cliente = seguro.clients.reduce(
      // Comparamos el balance de cada cliente con el balance actual de `min` para encontrar el mínimo
      (min, c) => (c.balance < min.balance ? c : min),
      seguro.clients[0] // Valor inicial para `min`
    );

    // Agregamos una entrada al objeto de resultados para el seguro actual, con el id del cliente con el balance más bajo
    acc[seguro.name] = cliente.id;

    // Devolvemos el objeto acumulado con los resultados parciales
    return acc;
  }, {});
  return result;
}

/* 8.- Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el "SEGURO COMPLEMENTARIO DE SALUD" con un saldo de 15000 para este nuevo cliente.  */
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// NO MODIFICAR ARREGLOS ORIGINALES PARA NO ALTERAR LAS RESPUESTAS ANTERIORES AL EJECUTAR LA SOLUCIÓN
function newClientRanking() {
  // Creamos un nuevo cliente con sus datos y saldo
  const newClient = {
    id: 7,
    rut: "26858585",
    name: "LUIS ANDRADE",
    balance: 15000,
  };

  // Obtenemos el seguro complementario de salud desde el objeto newInsurancesArray
  const insuranceHealth = newInsurancesArray["3"];

  // Agregamos el nuevo cliente al arreglo de clientes del seguro complementario de salud
  insuranceHealth.clients.push(newClient);

  // Obtenemos el array de clientes ordenados por su saldo total
  const sortedClients = sortClientsTotalBalances(newInsurancesArray);

  // Obtenemos el índice del nuevo cliente en el array ordenado
  const index = sortedClients.findIndex(
    (cliente) => cliente === newClient.name
  );
  return index + 1;
}

/* Impresión de soluciones. No modificar. */
console.log("--------------- Start Pregunta 0 ---------------");
console.log(listClientsIds());
console.log("--------------- End Pregunta 0 ---------------");
console.log("--------------- Start Pregunta 1 ---------------");
console.log(listClientsIdsSortedByRUT());
console.log("--------------- End Pregunta 1 ---------------");
console.log("--------------- Start Pregunta 2 ---------------");
console.log(sortClientsTotalBalances());
console.log("--------------- End Pregunta 2 ---------------");
console.log("--------------- Start Pregunta 3 ---------------");
console.log(insuranceClientsByRUT());
console.log("--------------- End Pregunta 3 ---------------");
console.log("--------------- Start Pregunta 4 ---------------");
console.log(higherClientsBalances());
console.log("--------------- End Pregunta 4 ---------------");
console.log("--------------- Start Pregunta 5 ---------------");
console.log(insuranceSortedByHighestBalance());
console.log("--------------- End Pregunta 5 ---------------");
console.log("--------------- Start Pregunta 6 ---------------");
console.log(uniqueInsurance());
console.log("--------------- End Pregunta 6 ---------------");
console.log("--------------- Start Pregunta 7 ---------------");
console.log(clientWithLessFunds());
console.log("--------------- End Pregunta 7 ---------------");
console.log("--------------- Start Pregunta 8 ---------------");
console.log(newClientRanking());
console.log("--------------- End Pregunta 8 ---------------");
