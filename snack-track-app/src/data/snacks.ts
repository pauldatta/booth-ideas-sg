export interface Snack {
  id: number;
  name: string;
  quantity: number;
  expiryDate: Date;
}

export const snacks: Snack[] = [
  { id: 1, name: 'Chips', quantity: 2, expiryDate: new Date('2025-12-31') },
  { id: 2, name: 'Cookies', quantity: 1, expiryDate: new Date('2025-11-30') },
  { id: 3, name: 'Granola Bars', quantity: 5, expiryDate: new Date('2026-01-15') },
];
