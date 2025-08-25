import React from 'react';

const species = [
  { name: 'Guenon' },
  { name: 'Macaque' },
  { name: 'Tamarin' },
  { name: 'Marmoset' },
  { name: 'Capuchin' },
];

const SpeciesList = () => {
  return (
    <ul>
      {species.map((s) => (
        <li key={s.name} className="p-2 border-b border-gray-700">
          {s.name}
        </li>
      ))}
    </ul>
  );
};

export default SpeciesList;
