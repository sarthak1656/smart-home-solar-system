  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { 
    LogOut, 
    Search, 
    Filter, 
    Download, 
    Eye, 
    MessageSquare, 
    X,
    Plus,
    Trash
  } from 'lucide-react';

  const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    
    const navigate = useNavigate();

    // Fetch Inquiries
    useEffect(() => {
      const fetchInquiries = async () => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (!adminInfo) {
          navigate('/admin/login');
          return;
        }

        const { token } = JSON.parse(adminInfo);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const { data } = await axios.get(
            'https://smart-home-solar-system-backend.onrender.com/api/inquiries',
            config
          );
          setInquiries(data);
          setFilteredInquiries(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('adminInfo');
            navigate('/admin/login');
          }
          setLoading(false);
        }
      };

      fetchInquiries();
    }, [navigate]);

    // Filter Logic
    useEffect(() => {
      let result = inquiries;

      if (statusFilter !== 'All') {
        result = result.filter(inq => inq.status === statusFilter);
      }

      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(inq => 
          inq.firstName.toLowerCase().includes(lowerTerm) ||
          inq.lastName.toLowerCase().includes(lowerTerm) ||
          inq.email.toLowerCase().includes(lowerTerm) ||
          inq.phone.includes(lowerTerm)
        );
      }

      setFilteredInquiries(result);
    }, [inquiries, searchTerm, statusFilter]);

    // Update Status
    const updateStatus = async (id, status) => {
      const adminInfo = localStorage.getItem('adminInfo');
      const { token } = JSON.parse(adminInfo);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await axios.patch(
          `https://smart-home-solar-system-backend.onrender.com/api/inquiries/${id}`,
          { status },
          config
        );
        
        const updatedList = inquiries.map(inq => 
          inq._id === id ? { ...inq, status } : inq
        );
        setInquiries(updatedList);
        
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const deleteInquiryById = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this lead?');
      if (!confirmDelete) return;
      const adminInfo = localStorage.getItem('adminInfo');
      const { token } = JSON.parse(adminInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.delete(
          `https://smart-home-solar-system-backend.onrender.com/api/inquiries/${id}`,
          config
        );
        const updated = inquiries.filter((inq) => inq._id !== id);
        setInquiries(updated);
        setFilteredInquiries((prev) => prev.filter((inq) => inq._id !== id));
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Add Note
    const handleAddNote = async (e) => {
      e.preventDefault();
      if (!noteContent.trim()) return;

      const adminInfo = localStorage.getItem('adminInfo');
      const { token } = JSON.parse(adminInfo);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.post(
          `https://smart-home-solar-system-backend.onrender.com/api/inquiries/${selectedInquiry._id}/notes`,
          { content: noteContent },
          config
        );

        const updatedList = inquiries.map(inq => 
          inq._id === selectedInquiry._id ? data : inq
        );
        setInquiries(updatedList);
        setSelectedInquiry(data);
        setNoteContent('');
      } catch (error) {
        console.error(error);
      }
    };

    // Export CSV
    const exportToCSV = () => {
      const headers = ["Date", "First Name", "Last Name", "Email", "Phone", "Service", "Status", "Address", "Message"];
      const csvContent = [
        headers.join(","),
        ...filteredInquiries.map(inq => [
          new Date(inq.createdAt).toLocaleDateString(),
          inq.firstName,
          inq.lastName,
          inq.email,
          inq.phone,
          inq.service,
          inq.status,
          `"${inq.address}"`, // Quote address to handle commas
          `"${inq.message.replace(/"/g, '""')}"` // Escape quotes
        ].join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "solar_leads.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleLogout = () => {
      localStorage.removeItem('adminInfo');
      navigate('/admin/login');
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800';
        case 'Contacted': return 'bg-yellow-100 text-yellow-800';
        case 'In Progress': return 'bg-purple-100 text-purple-800';
        case 'Closed': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    // Stats
    const stats = {
      total: inquiries.length,
      new: inquiries.filter(i => i.status === 'New').length,
      inProgress: inquiries.filter(i => i.status === 'In Progress').length,
      closed: inquiries.filter(i => i.status === 'Closed').length
    };

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage your solar leads effectively.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-semibold text-slate-500 uppercase">Total Leads</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-semibold text-blue-500 uppercase">New</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.new}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-semibold text-purple-500 uppercase">In Progress</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.inProgress}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-semibold text-green-500 uppercase">Closed Deals</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.closed}</p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <button 
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors font-semibold"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Service</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry._id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {inquiry.firstName} {inquiry.lastName}
                          </p>
                          <p className="text-xs text-slate-500">{inquiry.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {inquiry.service}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button 
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="text-slate-400 hover:text-emerald-500 transition-colors p-2"
                            >
                              <Eye size={20} />
                            </button>
                            <button
                              onClick={() => deleteInquiryById(inquiry._id)}
                              className="text-slate-400 hover:text-red-600 transition-colors p-2"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredInquiries.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                  No inquiries found matching your filters.
                </div>
              )}
            </div>
          )}

          {/* Modal */}
          {selectedInquiry && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-bold text-slate-900">Lead Details</h2>
                  <button 
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {selectedInquiry.firstName} {selectedInquiry.lastName}
                      </h3>
                      <div className="text-sm text-slate-500 space-y-1 mt-1">
                        <p>{selectedInquiry.email}</p>
                        <p>{selectedInquiry.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => updateStatus(selectedInquiry._id, e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <span className="text-xs text-slate-400 text-right">
                        {new Date(selectedInquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Service Interest</p>
                      <p className="text-slate-900 font-medium">{selectedInquiry.service}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="text-slate-900 font-medium">{selectedInquiry.address}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</p>
                    <div className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm leading-relaxed">
                      {selectedInquiry.message || "No message provided."}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <MessageSquare size={18} className="text-emerald-500" />
                      Internal Notes
                    </h4>
                    
                    <div className="space-y-4 mb-4 max-h-40 overflow-y-auto">
                      {selectedInquiry.notes && selectedInquiry.notes.map((note, index) => (
                        <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                          <p className="text-sm text-slate-800">{note.content}</p>
                          <p className="text-[10px] text-slate-400 mt-1 text-right">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      {(!selectedInquiry.notes || selectedInquiry.notes.length === 0) && (
                        <p className="text-sm text-slate-400 italic">No notes added yet.</p>
                      )}
                    </div>

                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Add a private note..."
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                      <button 
                        type="submit"
                        disabled={!noteContent.trim()}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default AdminDashboard;
