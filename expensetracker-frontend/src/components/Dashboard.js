import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showPersonalExpenseModal, setShowPersonalExpenseModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitType: 'equal', // equal, percentage, or full
    splits: {}
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);
  const [personalExpenseData, setPersonalExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Dummy data - replace with real data from your backend
  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: 'Roommates', 
      totalExpenses: 1200,
      members: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    },
    { 
      id: 2, 
      name: 'Trip to Paris', 
      totalExpenses: 3500,
      members: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com' }
      ]
    }
  ]);

  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' }
  ]);

  // Dummy data for expenses and settlements
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      groupId: 1,
      description: 'Groceries',
      amount: 150,
      paidBy: 1,
      date: '2024-03-15',
      splitType: 'equal',
      splits: {
        1: 75,
        2: 75
      },
      settled: {
        2: true
      }
    },
    {
      id: 2,
      groupId: 1,
      description: 'Utilities',
      amount: 200,
      paidBy: 2,
      date: '2024-03-10',
      splitType: 'equal',
      splits: {
        1: 100,
        2: 100
      },
      settled: {
        1: false
      }
    }
  ]);

  // Personal expense categories
  const expenseCategories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Bills & Utilities',
    'Entertainment',
    'Health & Fitness',
    'Travel',
    'Education',
    'Other'
  ];

  // Dummy data for personal expenses
  const [personalExpenses, setPersonalExpenses] = useState([
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 85.50,
      category: 'Food & Dining',
      date: '2024-03-15'
    },
    {
      id: 2,
      description: 'Gym Membership',
      amount: 50.00,
      category: 'Health & Fitness',
      date: '2024-03-10'
    }
  ]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    if (modalType === 'group') {
      const newGroup = {
        id: groups.length + 1,
        name: newItemName,
        totalExpenses: 0,
        members: selectedFriends
      };
      setGroups([...groups, newGroup]);
      setSelectedFriends([]);
    } else {
      setFriends([...friends, {
        id: friends.length + 1,
        name: newItemName,
        email: ''
      }]);
    }

    setNewItemName('');
    setShowAddModal(false);
  };

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
    setSelectedFriends([]);
  };

  const toggleFriendSelection = (friend) => {
    if (selectedFriends.find(f => f.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const openExpenseModal = (group) => {
    setSelectedGroup(group);
    setShowExpenseModal(true);
    setExpenseData({
      description: '',
      amount: '',
      paidBy: '',
      splitType: 'equal',
      splits: {}
    });
  };

  const handleExpenseSubmit = () => {
    if (!expenseData.description || !expenseData.amount || !expenseData.paidBy) {
      alert('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(expenseData.amount);
    let updatedGroups = [...groups];
    const groupIndex = updatedGroups.findIndex(g => g.id === selectedGroup.id);

    if (groupIndex !== -1) {
      updatedGroups[groupIndex] = {
        ...updatedGroups[groupIndex],
        totalExpenses: updatedGroups[groupIndex].totalExpenses + amount
      };
      setGroups(updatedGroups);
    }

    setShowExpenseModal(false);
    setExpenseData({
      description: '',
      amount: '',
      paidBy: '',
      splitType: 'equal',
      splits: {}
    });
  };

  const calculateSplitAmount = () => {
    const amount = parseFloat(expenseData.amount) || 0;
    if (expenseData.splitType === 'equal') {
      const memberCount = selectedGroup?.members.length || 1;
      return (amount / memberCount).toFixed(2);
    }
    return amount.toFixed(2);
  };

  const calculateBalances = (groupId) => {
    const groupExpenses = expenses.filter(exp => exp.groupId === groupId);
    const balances = {};
    const settledBalances = {};
    
    // Initialize balances for all members
    const group = groups.find(g => g.id === groupId);
    group.members.forEach(member => {
      balances[member.id] = {
        total: 0,
        settled: 0,
        pending: 0
      };
    });

    // Calculate net balances
    groupExpenses.forEach(expense => {
      const paidBy = expense.paidBy;
      
      // Process each split
      Object.entries(expense.splits).forEach(([memberId, amount]) => {
        if (memberId !== paidBy.toString()) {
          // Update payer's balance
          balances[paidBy].total += amount;
          if (expense.settled?.[memberId]) {
            balances[paidBy].settled += amount;
          } else {
            balances[paidBy].pending += amount;
          }

          // Update payer's balance
          balances[memberId].total -= amount;
          if (expense.settled?.[memberId]) {
            balances[memberId].settled -= amount;
          } else {
            balances[memberId].pending -= amount;
          }
        }
      });
    });

    return balances;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMemberName = (memberId) => {
    const group = selectedGroupDetails;
    const member = group.members.find(m => m.id === parseInt(memberId));
    return member ? member.name : 'Unknown';
  };

  const openGroupDetails = (group) => {
    setSelectedGroupDetails(group);
    setShowDetailsModal(true);
  };

  const handleSettleBalance = (expenseId, settlingMemberId) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === expenseId) {
        return {
          ...exp,
          settled: {
            ...exp.settled,
            [settlingMemberId]: true
          }
        };
      }
      return exp;
    }));
  };

  const getBalanceStatus = (balance) => {
    if (balance.total === 0) return 'neutral';
    if (Math.abs(balance.pending) < 0.01) return balance.total > 0 ? 'received' : 'paid';
    return balance.total > 0 ? 'positive' : 'negative';
  };

  const getBalanceText = (balance) => {
    if (balance.total === 0) return 'All settled';
    if (Math.abs(balance.pending) < 0.01) {
      return balance.total > 0 ? 'Received' : 'Paid';
    }
    return balance.total > 0 ? 'Gets back' : 'Owes';
  };

  const handleAddPersonalExpense = () => {
    if (!personalExpenseData.description || !personalExpenseData.amount || !personalExpenseData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newExpense = {
      id: personalExpenses.length + 1,
      ...personalExpenseData,
      amount: parseFloat(personalExpenseData.amount)
    };

    setPersonalExpenses([...personalExpenses, newExpense]);
    setShowPersonalExpenseModal(false);
    setPersonalExpenseData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const calculateTotalByCategory = () => {
    return personalExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">Expense Tracker</div>
        <div className="nav-links">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            My Expenses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
          <button 
            className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            My Groups
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'personal' ? (
            <div className="personal-expenses-section">
              <div className="section-header">
                <h2>Personal Expenses</h2>
                <button 
                  className="add-btn"
                  onClick={() => setShowPersonalExpenseModal(true)}
                >
                  + Add Expense
                </button>
              </div>

              <div className="expense-summary">
                <h3>Expense Summary</h3>
                <div className="category-cards">
                  {Object.entries(calculateTotalByCategory()).map(([category, total]) => (
                    <div key={category} className="category-card">
                      <div className="category-icon">
                        {category === 'Food & Dining' ? '🍽️' :
                         category === 'Shopping' ? '🛍️' :
                         category === 'Transportation' ? '🚗' :
                         category === 'Bills & Utilities' ? '📱' :
                         category === 'Entertainment' ? '🎮' :
                         category === 'Health & Fitness' ? '💪' :
                         category === 'Travel' ? '✈️' :
                         category === 'Education' ? '📚' : '📝'}
                      </div>
                      <div className="category-info">
                        <h4>{category}</h4>
                        <p className="category-amount">${total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="expense-history">
                <h3>Recent Expenses</h3>
                <div className="expense-list">
                  {personalExpenses
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(expense => (
                      <div key={expense.id} className="expense-item">
                        <div className="expense-header">
                          <div className="expense-info">
                            <h4>{expense.description}</h4>
                            <span className="expense-date">{formatDate(expense.date)}</span>
                          </div>
                          <div className="expense-amount">
                            ${expense.amount.toFixed(2)}
                          </div>
                        </div>
                        <div className="expense-category">
                          Category: {expense.category}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'friends' ? (
            <div className="friends-section">
              <div className="section-header">
                <h2>Friends</h2>
                <button 
                  className="add-btn"
                  onClick={() => openAddModal('friend')}
                >
                  + Add Friend
                </button>
              </div>
              <div className="friends-list">
                {friends.map(friend => (
                  <div key={friend.id} className="friend-card">
                    <div className="friend-info">
                      <span className="friend-avatar">
                        {friend.name.charAt(0)}
                      </span>
                      <div className="friend-details">
                        <h3>{friend.name}</h3>
                        <p>{friend.email}</p>
                      </div>
                    </div>
                    <button className="settle-btn">Settle Up</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="groups-section">
              <div className="section-header">
                <h2>My Groups</h2>
                <button 
                  className="add-btn"
                  onClick={() => openAddModal('group')}
                >
                  + New Group
                </button>
              </div>
              <div className="groups-grid">
                {groups.map(group => (
                  <div key={group.id} className="group-card">
                    <h3>{group.name}</h3>
                    <p className="expense-amount">
                      Total Expenses: ${group.totalExpenses}
                    </p>
                    <div className="group-members">
                      <p>Members:</p>
                      <div className="member-avatars">
                        {group.members.map(member => (
                          <span 
                            key={member.id} 
                            className="member-avatar"
                            data-tooltip={member.name}
                          >
                            {member.name.charAt(0)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="group-actions">
                      <button 
                        className="add-expense-btn"
                        onClick={() => openExpenseModal(group)}
                      >
                        Add Expense
                      </button>
                      <button 
                        className="view-btn"
                        onClick={() => openGroupDetails(group)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Group/Friend Creation Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New {modalType === 'group' ? 'Group' : 'Friend'}</h2>
            <input
              type="text"
              placeholder={`Enter ${modalType} name`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="modal-input"
            />

            {modalType === 'group' && (
              <div className="friend-selection">
                <h3>Add Members</h3>
                <div className="friends-checklist">
                  {friends.map(friend => (
                    <label key={friend.id} className="friend-option">
                      <input
                        type="checkbox"
                        checked={selectedFriends.some(f => f.id === friend.id)}
                        onChange={() => toggleFriendSelection(friend)}
                      />
                      <span className="friend-name">{friend.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleAddItem}
              >
                Add {modalType === 'group' ? 'Group' : 'Friend'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && selectedGroup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Expense</h2>
            <div className="expense-form">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="What's this expense for?"
                  value={expenseData.description}
                  onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Paid By</label>
                <select
                  value={expenseData.paidBy}
                  onChange={(e) => setExpenseData({...expenseData, paidBy: e.target.value})}
                  className="modal-input"
                >
                  <option value="">Select person</option>
                  {selectedGroup.members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Split Type</label>
                <select
                  value={expenseData.splitType}
                  onChange={(e) => setExpenseData({...expenseData, splitType: e.target.value})}
                  className="modal-input"
                >
                  <option value="equal">Split Equally</option>
                  <option value="percentage">Split by Percentage</option>
                  <option value="full">Full Amount</option>
                </select>
              </div>

              {expenseData.splitType === 'equal' && (
                <div className="split-preview">
                  <p>Each person will pay: ${calculateSplitAmount()}</p>
                </div>
              )}

              {expenseData.splitType === 'percentage' && (
                <div className="percentage-splits">
                  {selectedGroup.members.map(member => (
                    <div key={member.id} className="percentage-input">
                      <label>{member.name}</label>
                      <input
                        type="number"
                        placeholder="%"
                        min="0"
                        max="100"
                        value={expenseData.splits[member.id] || ''}
                        onChange={(e) => {
                          const splits = {...expenseData.splits, [member.id]: e.target.value};
                          setExpenseData({...expenseData, splits});
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowExpenseModal(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleExpenseSubmit}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {showDetailsModal && selectedGroupDetails && (
        <div className="modal-overlay">
          <div className="modal details-modal">
            <div className="modal-header">
              <h2>{selectedGroupDetails.name} - Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>

            <div className="details-content">
              {/* Current Balances */}
              <div className="balances-section">
                <h3>Current Balances</h3>
                <div className="balance-cards">
                  {Object.entries(calculateBalances(selectedGroupDetails.id)).map(([memberId, balance]) => {
                    const status = getBalanceStatus(balance);
                    return (
                      <div key={memberId} className={`balance-card ${status}`}>
                        <div className="balance-header">
                          <span 
                            className="member-avatar"
                            data-tooltip={getMemberName(memberId)}
                          >
                            {getMemberName(memberId).charAt(0)}
                          </span>
                          <span className="member-name">{getMemberName(memberId)}</span>
                        </div>
                        <div className="balance-details">
                          <div className="balance-amount">
                            {getBalanceText(balance)} ${Math.abs(balance.total).toFixed(2)}
                          </div>
                        </div>
                        {status === 'paid' || status === 'received' ? (
                          <div className="settlement-status">
                            <span className="status-icon">✓</span>
                            Fully Settled
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expense History */}
              <div className="expense-history">
                <h3>Expense History</h3>
                <div className="expense-list">
                  {expenses
                    .filter(exp => exp.groupId === selectedGroupDetails.id)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(expense => (
                      <div key={expense.id} className="expense-item">
                        <div className="expense-header">
                          <div className="expense-info">
                            <h4>{expense.description}</h4>
                            <span className="expense-date">{formatDate(expense.date)}</span>
                          </div>
                          <div className="expense-amount">
                            ${expense.amount}
                          </div>
                        </div>
                        
                        <div className="expense-details">
                          <p>Paid by: {getMemberName(expense.paidBy)}</p>
                          <div className="splits-list">
                            {Object.entries(expense.splits).map(([memberId, amount]) => (
                              <div key={memberId} className="split-item">
                                <span>{getMemberName(memberId)}</span>
                                <span>${amount}</span>
                                {memberId !== expense.paidBy.toString() && (
                                  <button
                                    className={`settle-btn ${expense.settled?.[memberId] ? 'settled' : ''}`}
                                    onClick={() => handleSettleBalance(expense.id, memberId)}
                                    disabled={expense.settled?.[memberId]}
                                  >
                                    {expense.settled?.[memberId] ? 'Settled' : 'Settle'}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Expense Modal */}
      {showPersonalExpenseModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Personal Expense</h2>
            <div className="expense-form">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="What's this expense for?"
                  value={personalExpenseData.description}
                  onChange={(e) => setPersonalExpenseData({
                    ...personalExpenseData,
                    description: e.target.value
                  })}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={personalExpenseData.amount}
                  onChange={(e) => setPersonalExpenseData({
                    ...personalExpenseData,
                    amount: e.target.value
                  })}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={personalExpenseData.category}
                  onChange={(e) => setPersonalExpenseData({
                    ...personalExpenseData,
                    category: e.target.value
                  })}
                  className="modal-input"
                >
                  <option value="">Select category</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={personalExpenseData.date}
                  onChange={(e) => setPersonalExpenseData({
                    ...personalExpenseData,
                    date: e.target.value
                  })}
                  className="modal-input"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowPersonalExpenseModal(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleAddPersonalExpense}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 