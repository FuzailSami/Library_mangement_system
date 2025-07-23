
        // Global state
        let library = {
            books: [],
            members: [],
            transactions: [],
            nextBookId: 1,
            nextMemberId: 1,
            nextTransactionId: 1
        };

        let currentEditId = null;
        let currentView = 'books';

        // Initialize the system
        function init() {
            loadSampleData();
            updateStats();
            refreshDropdowns();
            displayData(currentView);
        }

        // Load sample data
        function loadSampleData() {
            library.books = [
                {
                    id: 1,
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    isbn: "978-0-7432-7356-5",
                    genre: "Fiction",
                    year: 1925,
                    totalCopies: 3,
                    availableCopies: 2,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    isbn: "978-0-06-112008-4",
                    genre: "Fiction",
                    year: 1960,
                    totalCopies: 2,
                    availableCopies: 1,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 3,
                    title: "1984",
                    author: "George Orwell",
                    isbn: "978-0-452-28423-4",
                    genre: "Fiction",
                    year: 1949,
                    totalCopies: 4,
                    availableCopies: 4,
                    dateAdded: new Date().toISOString()
                }
            ];

            library.members = [
                {
                    id: 1,
                    name: "Alice Johnson",
                    email: "alice@email.com",
                    phone: "555-0101",
                    type: "Student",
                    joinDate: new Date().toISOString(),
                    activeLoans: 1
                },
                {
                    id: 2,
                    name: "Bob Smith",
                    email: "bob@email.com",
                    phone: "555-0102",
                    type: "Faculty",
                    joinDate: new Date().toISOString(),
                    activeLoans: 1
                }
            ];

            library.transactions = [
                {
                    id: 1,
                    memberId: 1,
                    memberName: "Alice Johnson",
                    bookId: 1,
                    bookTitle: "The Great Gatsby",
                    issueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    returnDate: null,
                    status: "borrowed",
                    fine: 0
                },
                {
                    id: 2,
                    memberId: 2,
                    memberName: "Bob Smith",
                    bookId: 2,
                    bookTitle: "To Kill a Mockingbird",
                    issueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                    dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                    returnDate: null,
                    status: "overdue",
                    fine: 6
                }
            ];

            library.nextBookId = 4;
            library.nextMemberId = 3;
            library.nextTransactionId = 3;
        }

        // Tab switching
        function switchTab(tabName) {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabName + 'Tab').classList.add('active');

            currentView = tabName;
            displayData(currentView);
            refreshDropdowns();
        }

        // Add book
        function addBook() {
            const title = document.getElementById('bookTitle').value.trim();
            const author = document.getElementById('bookAuthor').value.trim();
            const isbn = document.getElementById('bookISBN').value.trim();
            const genre = document.getElementById('bookGenre').value;
            const year = parseInt(document.getElementById('bookYear').value);
            const copies = parseInt(document.getElementById('bookCopies').value);

            if (!title || !author || !isbn || !genre || !year || !copies) {
                alert('Please fill in all required fields');
                return;
            }

            // Check for duplicate ISBN
            if (library.books.some(book => book.isbn === isbn && book.id !== currentEditId)) {
                alert('A book with this ISBN already exists');
                return;
            }

            const book = {
                id: currentEditId || library.nextBookId++,
                title,
                author,
                isbn,
                genre,
                year,
                totalCopies: copies,
                availableCopies: copies,
                dateAdded: new Date().toISOString()
            };

            if (currentEditId) {
                const index = library.books.findIndex(b => b.id === currentEditId);
                library.books[index] = { ...library.books[index], ...book };
                currentEditId = null;
            } else {
                library.books.push(book);
            }

            clearBookForm();
            updateStats();
            refreshDropdowns();
            displayData('books');
            alert('Book ' + (currentEditId ? 'updated' : 'added') + ' successfully!');
        }

        // Clear book form
        function clearBookForm() {
            document.getElementById('bookTitle').value = '';
            document.getElementById('bookAuthor').value = '';
            document.getElementById('bookISBN').value = '';
            document.getElementById('bookGenre').value = '';
            document.getElementById('bookYear').value = '';
            document.getElementById('bookCopies').value = '1';
            currentEditId = null;
        }

        // Add member
        function addMember() {
            const name = document.getElementById('memberName').value.trim();
            const email = document.getElementById('memberEmail').value.trim();
            const phone = document.getElementById('memberPhone').value.trim();
            const type = document.getElementById('memberType').value;

            if (!name || !email || !phone || !type) {
                alert('Please fill in all required fields');
                return;
            }

            // Check for duplicate email
            if (library.members.some(member => member.email === email && member.id !== currentEditId)) {
                alert('A member with this email already exists');
                return;
            }

            const member = {
                id: currentEditId || library.nextMemberId++,
                name,
                email,
                phone,
                type,
                joinDate: new Date().toISOString(),
                activeLoans: 0
            };

            if (currentEditId) {
                const index = library.members.findIndex(m => m.id === currentEditId);
                library.members[index] = { ...library.members[index], ...member };
                currentEditId = null;
            } else {
                library.members.push(member);
            }

            clearMemberForm();
            updateStats();
            refreshDropdowns();
            displayData('members');
            alert('Member ' + (currentEditId ? 'updated' : 'added') + ' successfully!');
        }

        // Clear member form
        function clearMemberForm() {
            document.getElementById('memberName').value = '';
            document.getElementById('memberEmail').value = '';
            document.getElementById('memberPhone').value = '';
            document.getElementById('memberType').value = '';
            currentEditId = null;
        }

        // Issue book
        function issueBook() {
            const memberId = parseInt(document.getElementById('loanMember').value);
            const bookId = parseInt(document.getElementById('loanBook').value);
            const loanDays = parseInt(document.getElementById('loanDays').value);

            if (!memberId || !bookId || !loanDays) {
                alert('Please fill in all required fields');
                return;
            }

            const book = library.books.find(b => b.id === bookId);
            const member = library.members.find(m => m.id === memberId);

            if (book.availableCopies <= 0) {
                alert('No copies of this book are available');
                return;
            }

            const transaction = {
                id: library.nextTransactionId++,
                memberId,
                memberName: member.name,
                bookId,
                bookTitle: book.title,
                issueDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + loanDays * 24 * 60 * 60 * 1000).toISOString(),
                returnDate: null,
                status: 'borrowed',
                fine: 0
            };

            library.transactions.push(transaction);
            book.availableCopies--;
            member.activeLoans++;

            // Clear form
            document.getElementById('loanMember').value = '';
            document.getElementById('loanBook').value = '';
            document.getElementById('loanDays').value = '14';

            updateStats();
            refreshDropdowns();
            displayData('transactions');
            alert('Book issued successfully!');
        }

        // Show return modal
        function showReturnModal() {
            const activeLoans = library.transactions.filter(t => t.status === 'borrowed' || t.status === 'overdue');
            const select = document.getElementById('returnLoanSelect');
            
            select.innerHTML = '<option value="">Choose loan to return</option>';
            
            activeLoans.forEach(loan => {
                const option = document.createElement('option');
                option.value = loan.id;
                option.textContent = `${loan.memberName} - ${loan.bookTitle} (Due: ${new Date(loan.dueDate).toLocaleDateString()})`;
                select.appendChild(option);
            });

            document.getElementById('returnModal').style.display = 'block';
        }

        // Return book
        function returnBook() {
            const transactionId = parseInt(document.getElementById('returnLoanSelect').value);
            
            if (!transactionId) {
                alert('Please select a loan to return');
                return;
            }

            const transaction = library.transactions.find(t => t.id === transactionId);
            const book = library.books.find(b => b.id === transaction.bookId);
            const member = library.members.find(m => m.id === transaction.memberId);

            // Calculate fine for overdue books
            const returnDate = new Date();
            const dueDate = new Date(transaction.dueDate);
            const overdueDays = Math.max(0, Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
            const fine = overdueDays * 1; // $1 per day

            transaction.returnDate = returnDate.toISOString();
            transaction.status = 'returned';
            transaction.fine = fine;

            book.availableCopies++;
            member.activeLoans--;

            closeModal('returnModal');
            updateStats();
            refreshDropdowns();
            displayData('transactions');
            
            if (fine > 0) {
                alert(`Book returned successfully! Fine: ${fine} for ${overdueDays} overdue days.`);
            } else {
                alert('Book returned successfully!');
            }
        }

        // Close modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Update statistics
        function updateStats() {
            const totalBooks = library.books.reduce((sum, book) => sum + book.totalCopies, 0);
            const availableBooks = library.books.reduce((sum, book) => sum + book.availableCopies, 0);
            const totalMembers = library.members.length;
            const activeLoans = library.transactions.filter(t => t.status === 'borrowed' || t.status === 'overdue').length;

            document.getElementById('totalBooks').textContent = totalBooks;
            document.getElementById('availableBooks').textContent = availableBooks;
            document.getElementById('totalMembers').textContent = totalMembers;
            document.getElementById('activeLoans').textContent = activeLoans;

            // Update overdue status
            library.transactions.forEach(transaction => {
                if (transaction.status === 'borrowed') {
                    const dueDate = new Date(transaction.dueDate);
                    const today = new Date();
                    if (today > dueDate) {
                        transaction.status = 'overdue';
                        const overdueDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
                        transaction.fine = overdueDays * 1;
                    }
                }
            });
        }

        // Refresh dropdowns
        function refreshDropdowns() {
            // Member dropdown
            const memberSelect = document.getElementById('loanMember');
            memberSelect.innerHTML = '<option value="">Choose Member</option>';
            library.members.forEach(member => {
                const option = document.createElement('option');
                option.value = member.id;
                option.textContent = `${member.name} (${member.type})`;
                memberSelect.appendChild(option);
            });

            // Book dropdown (only available books)
            const bookSelect = document.getElementById('loanBook');
            bookSelect.innerHTML = '<option value="">Choose Book</option>';
            library.books.filter(book => book.availableCopies > 0).forEach(book => {
                const option = document.createElement('option');
                option.value = book.id;
                option.textContent = `${book.title} by ${book.author} (${book.availableCopies} available)`;
                bookSelect.appendChild(option);
            });
        }

        // Display data in table
        function displayData(type, searchTerm = '', filter = '') {
            const tableContent = document.getElementById('tableContent');
            let data = [];
            let headers = [];
            let title = '';

            switch (type) {
                case 'books':
                    data = library.books;
                    headers = ['ID', 'Title', 'Author', 'ISBN', 'Genre', 'Year', 'Total Copies', 'Available', 'Actions'];
                    title = 'Books Library';
                    break;
                case 'members':
                    data = library.members;
                    headers = ['ID', 'Name', 'Email', 'Phone', 'Type', 'Join Date', 'Active Loans', 'Actions'];
                    title = 'Library Members';
                    break;
                case 'transactions':
                    data = library.transactions;
                    headers = ['ID', 'Member', 'Book', 'Issue Date', 'Due Date', 'Return Date', 'Status', 'Fine', 'Actions'];
                    title = 'Loan Transactions';
                    break;
                case 'reports':
                    generateReportData();
                    return;
            }

            // Filter data based on search and filter
            if (searchTerm) {
                data = data.filter(item => {
                    return Object.values(item).some(value => 
                        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    );
                });
            }

            if (data.length === 0) {
                tableContent.innerHTML = `
                    <div class="empty-state">
                        <h3>No ${type} found</h3>
                        <p>No ${type} match your search criteria</p>
                    </div>
                `;
                return;
            }

            let tableHTML = `
                <h2>${title}</h2>
                <table>
                    <thead>
                        <tr>
                            ${headers.map(header => `<th>${header}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(item => {
                tableHTML += '<tr>';
                
                switch (type) {
                    case 'books':
                        tableHTML += `
                            <td>${item.id}</td>
                            <td><strong>${item.title}</strong></td>
                            <td>${item.author}</td>
                            <td>${item.isbn}</td>
                            <td><span class="status-badge status-available">${item.genre}</span></td>
                            <td>${item.year}</td>
                            <td>${item.totalCopies}</td>
                            <td>${item.availableCopies}</td>
                            <td class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editBook(${item.id})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteBook(${item.id})">Delete</button>
                            </td>
                        `;
                        break;
                    case 'members':
                        tableHTML += `
                            <td>${item.id}</td>
                            <td><strong>${item.name}</strong></td>
                            <td>${item.email}</td>
                            <td>${item.phone}</td>
                            <td><span class="status-badge status-available">${item.type}</span></td>
                            <td>${new Date(item.joinDate).toLocaleDateString()}</td>
                            <td>${item.activeLoans}</td>
                            <td class="action-buttons">
                                <button class="btn btn-sm btn-primary" onclick="editMember(${item.id})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteMember(${item.id})">Delete</button>
                            </td>
                        `;
                        break;
                    case 'transactions':
                        const statusClass = item.status === 'returned' ? 'status-available' : 
                                          item.status === 'overdue' ? 'status-overdue' : 'status-borrowed';
                        tableHTML += `
                            <td>${item.id}</td>
                            <td>${item.memberName}</td>
                            <td>${item.bookTitle}</td>
                            <td>${new Date(item.issueDate).toLocaleDateString()}</td>
                            <td>${new Date(item.dueDate).toLocaleDateString()}</td>
                            <td>${item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}</td>
                            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
                            <td>${item.fine}</td>
                            <td class="action-buttons">
                                ${item.status !== 'returned' ? 
                                    `<button class="btn btn-sm btn-warning" onclick="renewLoan(${item.id})">Renew</button>` : ''}
                                <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${item.id})">Delete</button>
                            </td>
                        `;
                        break;
                }
                
                tableHTML += '</tr>';
            });

            tableHTML += '</tbody></table>';
            tableContent.innerHTML = tableHTML;
        }

        // Edit functions
        function editBook(id) {
            const book = library.books.find(b => b.id === id);
            if (!book) return;

            document.getElementById('bookTitle').value = book.title;
            document.getElementById('bookAuthor').value = book.author;
            document.getElementById('bookISBN').value = book.isbn;
            document.getElementById('bookGenre').value = book.genre;
            document.getElementById('bookYear').value = book.year;
            document.getElementById('bookCopies').value = book.totalCopies;

            currentEditId = id;
            switchTab('books');
        }

        function editMember(id) {
            const member = library.members.find(m => m.id === id);
            if (!member) return;

            document.getElementById('memberName').value = member.name;
            document.getElementById('memberEmail').value = member.email;
            document.getElementById('memberPhone').value = member.phone;
            document.getElementById('memberType').value = member.type;

            currentEditId = id;
            switchTab('members');
        }

        // Delete functions
        function deleteBook(id) {
            // Check if book has active loans
            const hasActiveLoans = library.transactions.some(t => 
                t.bookId === id && (t.status === 'borrowed' || t.status === 'overdue')
            );

            if (hasActiveLoans) {
                alert('Cannot delete book with active loans');
                return;
            }

            if (confirm('Are you sure you want to delete this book?')) {
                library.books = library.books.filter(b => b.id !== id);
                updateStats();
                refreshDropdowns();
                displayData('books');
                alert('Book deleted successfully!');
            }
        }

        function deleteMember(id) {
            // Check if member has active loans
            const hasActiveLoans = library.transactions.some(t => 
                t.memberId === id && (t.status === 'borrowed' || t.status === 'overdue')
            );

            if (hasActiveLoans) {
                alert('Cannot delete member with active loans');
                return;
            }

            if (confirm('Are you sure you want to delete this member?')) {
                library.members = library.members.filter(m => m.id !== id);
                updateStats();
                refreshDropdowns();
                displayData('members');
                alert('Member deleted successfully!');
            }
        }

        function deleteTransaction(id) {
            if (confirm('Are you sure you want to delete this transaction?')) {
                const transaction = library.transactions.find(t => t.id === id);
                
                // If transaction is active, return the book
                if (transaction && (transaction.status === 'borrowed' || transaction.status === 'overdue')) {
                    const book = library.books.find(b => b.id === transaction.bookId);
                    const member = library.members.find(m => m.id === transaction.memberId);
                    if (book) book.availableCopies++;
                    if (member) member.activeLoans--;
                }

                library.transactions = library.transactions.filter(t => t.id !== id);
                updateStats();
                refreshDropdowns();
                displayData('transactions');
                alert('Transaction deleted successfully!');
            }
        }

        // Renew loan
        function renewLoan(id) {
            const transaction = library.transactions.find(t => t.id === id);
            if (!transaction) return;

            const newDueDate = new Date(transaction.dueDate);
            newDueDate.setDate(newDueDate.getDate() + 14);
            
            transaction.dueDate = newDueDate.toISOString();
            transaction.status = 'borrowed';
            transaction.fine = 0;

            updateStats();
            displayData('transactions');
            alert('Loan renewed successfully!');
        }

        // Search functionality
        function performSearch() {
            const searchTerm = document.getElementById('searchInput').value;
            const filter = document.getElementById('filterSelect').value;
            
            if (filter && filter !== currentView) {
                switchTabByName(filter);
            }
            
            displayData(currentView, searchTerm, filter);
        }

        function clearSearch() {
            document.getElementById('searchInput').value = '';
            document.getElementById('filterSelect').value = '';
            displayData(currentView);
        }

        function switchTabByName(tabName) {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn.textContent.toLowerCase().includes(tabName)) {
                    btn.classList.add('active');
                }
            });

            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabName + 'Tab').classList.add('active');

            currentView = tabName;
        }

        // Generate reports
        function generateReport() {
            generateReportData();
        }

        function generateReportData() {
            const overdueCount = library.transactions.filter(t => t.status === 'overdue').length;
            const genreCounts = {};
            library.books.forEach(book => {
                genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
            });
            const popularGenre = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b, '-');
            
            const completedLoans = library.transactions.filter(t => t.status === 'returned');
            const avgDuration = completedLoans.length > 0 ? 
                Math.round(completedLoans.reduce((sum, loan) => {
                    const duration = (new Date(loan.returnDate) - new Date(loan.issueDate)) / (1000 * 60 * 60 * 24);
                    return sum + duration;
                }, 0) / completedLoans.length) : 0;

            const totalFines = library.transactions.reduce((sum, t) => sum + t.fine, 0);

            document.getElementById('overdueBooks').textContent = overdueCount;
            document.getElementById('popularGenre').textContent = popularGenre;
            document.getElementById('avgLoanDuration').textContent = avgDuration;
            document.getElementById('totalFines').textContent = `${totalFines}`;

            // Display detailed report in table
            const tableContent = document.getElementById('tableContent');
            tableContent.innerHTML = `
                <h2>📊 Library Analytics Report</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3>📚 Collection Overview</h3>
                        <p><strong>Total Books:</strong> ${library.books.reduce((sum, book) => sum + book.totalCopies, 0)}</p>
                        <p><strong>Unique Titles:</strong> ${library.books.length}</p>
                        <p><strong>Most Popular Genre:</strong> ${popularGenre} (${genreCounts[popularGenre] || 0} books)</p>
                        <p><strong>Average Publication Year:</strong> ${Math.round(library.books.reduce((sum, book) => sum + book.year, 0) / library.books.length) || 0}</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3>👥 Membership Stats</h3>
                        <p><strong>Total Members:</strong> ${library.members.length}</p>
                        <p><strong>Active Borrowers:</strong> ${library.members.filter(m => m.activeLoans > 0).length}</p>
                        <p><strong>Most Common Type:</strong> ${getMostCommonMemberType()}</p>
                        <p><strong>Average Loans per Member:</strong> ${(library.members.reduce((sum, m) => sum + m.activeLoans, 0) / library.members.length).toFixed(1) || 0}</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3>📋 Transaction Summary</h3>
                        <p><strong>Total Transactions:</strong> ${library.transactions.length}</p>
                        <p><strong>Books Currently Out:</strong> ${library.transactions.filter(t => t.status === 'borrowed' || t.status === 'overdue').length}</p>
                        <p><strong>Overdue Books:</strong> ${overdueCount}</p>
                        <p><strong>Return Rate:</strong> ${((library.transactions.filter(t => t.status === 'returned').length / library.transactions.length) * 100).toFixed(1) || 0}%</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3>💰 Financial Overview</h3>
                        <p><strong>Total Fines Collected:</strong> ${totalFines}</p>
                        <p><strong>Outstanding Fines:</strong> ${library.transactions.filter(t => t.status !== 'returned').reduce((sum, t) => sum + t.fine, 0)}</p>
                        <p><strong>Average Fine per Overdue:</strong> ${overdueCount > 0 ? (library.transactions.filter(t => t.status === 'overdue').reduce((sum, t) => sum + t.fine, 0) / overdueCount).toFixed(2) : 0}</p>
                        <p><strong>Revenue This Month:</strong> ${totalFines}</p>
                    </div>
                </div>
            `;
        }

        function getMostCommonMemberType() {
            const typeCounts = {};
            library.members.forEach(member => {
                typeCounts[member.type] = (typeCounts[member.type] || 0) + 1;
            });
            return Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'N/A');
        }

        // Export data
        function exportData() {
            const data = {
                books: library.books,
                members: library.members,
                transactions: library.transactions,
                exportDate: new Date().toISOString()
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'library_data_' + new Date().toISOString().split('T')[0] + '.json';
            link.click();
            
            URL.revokeObjectURL(url);
            alert('Library data exported successfully!');
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modals = document.getElementsByClassName('modal');
            for (let modal of modals) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            }
        }

        // Initialize the system when page loads
        window.onload = init;
