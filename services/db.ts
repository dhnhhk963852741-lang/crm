
const DB_PREFIX = 'WATERBERRY_V2_';

const DEFAULT_CUSTOMERS = [
  { id: '1', name: 'אבי כהן', company: 'אלביט', email: 'avi@elbit.com', phone: '050-1234567', status: 'Active', tags: ['High Value', 'Tech'], notes: [] },
  { id: '2', name: 'ליאת רז', company: 'Wix', email: 'liat@wix.com', phone: '052-9876543', status: 'Premium', tags: ['Enterprise'], notes: [] }
];

export const db = {
  get: (key: string) => {
    try {
      const data = localStorage.getItem(DB_PREFIX + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('DB Get Error:', e);
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('DB Set Error:', e);
    }
  },
  
  checkAuth: (email: string, pass: string) => {
    return email === '2806mor@gmail.com' && pass === '32615873Mor';
  },

  getLeads: () => db.get('leads') || [],
  addLead: (lead: any) => {
    const leads = db.getLeads();
    const newLead = { ...lead, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toLocaleDateString() };
    db.set('leads', [...leads, newLead]);
    return newLead;
  },
  
  getCustomers: () => db.get('customers') || DEFAULT_CUSTOMERS,
  getCustomerById: (id: string) => {
    const customers = db.getCustomers();
    return customers.find((c: any) => c.id === id);
  },
  addCustomer: (cust: any) => {
    const customers = db.getCustomers();
    const newCust = { ...cust, id: Date.now().toString(), tags: [], notes: [] };
    db.set('customers', [...customers, newCust]);
    return newCust;
  },
  updateCustomer: (id: string, updates: any) => {
    const customers = db.getCustomers();
    const updated = customers.map((c: any) => c.id === id ? { ...c, ...updates } : c);
    db.set('customers', updated);
    return updated.find((c: any) => c.id === id);
  },

  addCustomerNote: (customerId: string, note: string) => {
    const customer = db.getCustomerById(customerId);
    if (customer) {
      const newNote = { id: Date.now(), text: note, date: new Date().toLocaleString() };
      const notes = [...(customer.notes || []), newNote];
      db.updateCustomer(customerId, { notes });
      return newNote;
    }
  },

  getSales: () => db.get('sales') || [
    { id: '1', client: 'Acme Corp', amount: '₪4,500', status: 'Closed', date: 'היום' },
    { id: '2', client: 'Globex', amount: '₪12,000', status: 'Negotiation', date: 'אתמול' }
  ],
  addSale: (sale: any) => {
    const sales = db.getSales();
    const newSale = { ...sale, id: Date.now().toString(), date: 'עכשיו' };
    db.set('sales', [...sales, newSale]);
    return newSale;
  },

  getTasks: () => db.get('tasks') || [
    { id: '1', text: 'שיחה עם משקיעים', completed: false, due: '14:00', priority: 'High' }
  ],
  setTasks: (tasks: any[]) => db.set('tasks', tasks),

  getEmployees: () => db.get('employees') || [
    { id: '1', name: 'ישראל ישראלי', role: 'מנהל מכירות', email: 'israel@wb.com', performance: '98%' },
    { id: '2', name: 'דנה לוי', role: 'תמיכה טכנית', email: 'dana@wb.com', performance: '92%' }
  ],
  addEmployee: (emp: any) => {
    const emps = db.getEmployees();
    const newEmp = { ...emp, id: Date.now().toString(), performance: '100%' };
    db.set('employees', [...emps, newEmp]);
    return newEmp;
  },

  getTickets: () => db.get('tickets') || [
    { id: '#TK-101', user: 'אבי כהן', issue: 'בעיית התחברות', priority: 'High', status: 'Open' }
  ],
  addTicket: (ticket: any) => {
    const tks = db.getTickets();
    const newTk = { ...ticket, id: '#TK-' + Math.floor(Math.random() * 900 + 100) };
    db.set('tickets', [...tks, newTk]);
    return newTk;
  }
};
