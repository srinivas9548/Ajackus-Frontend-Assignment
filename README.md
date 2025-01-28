# User Management Application

A simple user management web application built with React. This project allows users to view, add, edit, and update user information, including name, email, and company details. It integrates with a mock API to simulate backend functionality.

---

## Features

- View a list of users.
- Add new users with unique IDs using UUID.
- Edit existing user details via a popup form.
- Update user data dynamically in both the frontend and the mock API.
- Close the popup after updating user information.

---

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend (Mock API)**: JSONPlaceholder
- **Other Libraries**:
  - `uuid` for generating unique user IDs
  - `fetch` for API calls

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/srinivas9548/Ajackus-Frontend-Assignment.git
   cd Ajackus-Frontend-Assignment

## Requirements

### User Interface

1. **Display User List**  
   - Show a list of users with the following details:  
     - ID  
     - First Name  
     - Last Name  
     - Email  
     - Department
     - Actions  

2. **Actions**  
   - Provide buttons or links to perform the following actions:  
     - **Add User**: Open a form to input details for a new user.  
     - **Edit User**: Open a form to edit the details of an existing user.  
     - **Delete User**: Remove a user from the list.

3. **User Form**  
   - A form should allow users to input:  
     - name 
     - Email  
     - Department  

---

## Backend Interaction

1. **API Used**  
   - Use [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free online REST API for demonstration purposes.  

2. **Endpoints**  
   - **Fetch Users**: GET `/users`  
     Fetch a list of all users.  
   - **Add User**: POST `/users`  
     Simulate adding a new user.  
   - **Edit User**: PUT `/users/{id}`  
     Update the details of an existing user.  
   - **Delete User**: DELETE `/users/{id}`  
     Simulate deleting a user.

---

## Functionality

1. **View Users**  
   - Display all users by fetching data from the `/users` endpoint.  

2. **Add User**  
   - Allow users to add a new user via a form.  
   - Send a POST request to the `/users` endpoint with the new user data.  
   - Note: JSONPlaceholder won't actually persist the user but will simulate a successful response.

3. **Edit User**  
   - Fetch the current data for a user and pre-fill it in the edit form.  
   - Allow users to edit the details and submit changes.  
   - Send a PUT request to `/users/{id}` to update the user's information.  

4. **Delete User**  
   - Provide the ability to delete a user by sending a DELETE request to `/users/{id}`.  

---

## Error Handling

1. **API Failure Scenarios**  
   - Handle errors gracefully when API requests fail.  

2. **User Feedback**  
   - Display appropriate error messages to the user in case of:  
     - Failed fetch requests.  
     - Issues with adding, updating, or deleting users.  

3. **Validation**  
   - Ensure proper validation of user input fields in the form.  

---

## Notes

- JSONPlaceholder is a mock API and doesn't store any actual data. All actions like adding, editing, and deleting are simulated, and data resets upon refreshing the page.  
- Ensure the user interface is intuitive and responsive for a seamless user experience.  
