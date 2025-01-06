import React, { useState } from 'react';
import './AdminContactInquiries.css';

// This would typically come from an API or database
const mockInquiries = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "I have a question about your services.", date: "2023-06-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Can you provide more information about pricing?", date: "2023-06-02" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", message: "I'm interested in a custom solution.", date: "2023-06-03" },
  // Add more mock data as needed
];

function AdminContactInquiries() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredInquiries = mockInquiries.filter(inquiry =>
      inquiry.name.toLowerCase().includes(term) ||
      inquiry.email.toLowerCase().includes(term) ||
      inquiry.message.toLowerCase().includes(term)
    );

    setInquiries(filteredInquiries);
  };

  return (
    <div className="admin-contact-inquiries">
      <h1>Contact Inquiries</h1>
      <input
        type="text"
        placeholder="Search inquiries..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry.name}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.message}</td>
              <td>{inquiry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContactInquiries;

