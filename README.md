# Mentor Booking Platform

The Mentor Booking Platform is a full-stack web application designed to connect individuals with expert mentors. Users can browse available mentors, view their profiles and availability, and book sessions. Administrators can manage mentor data and availability through backend access.

This repository contains the **React Frontend** application, which provides the user interface. It interacts with a separate **Spring Boot Backend** API.

---

## ✨ Features (Application)

* **User Authentication:** Register and log in as a regular user or an Admin.
* **Role-Based Access Control:** Different features visible/accessible based on user roles (e.g., Admin for data entry).
* **Browse Mentors:** View a list of all available mentors.
* **Mentor Details:** See detailed information about a specific mentor, including their expertise and availability.
* **View Availability:** Check scheduled availability slots for each mentor.
* **Book Sessions:** Authenticated users can book an available time slot with a mentor.
* **User Bookings:** View a list of sessions booked by the logged-in user.
* **Admin Functionality:** (Accessed via backend API or potentially a dedicated admin UI section if implemented later) Ability to add/edit/delete mentors and availability.
* **Responsive Design:** User interface designed to work across different screen sizes.
* **Custom Styling:** Clean user interface built with Tailwind CSS.

---

## 💻 Technologies Used

* **Frontend:**
    * **React:** For building the user interface.
    * **Vite:** As the build tool for the React application.
    * **React Router DOM:** For handling navigation.
    * **State Management:** (Specify if you used Redux, Context API, or just React hooks).
    * **Tailwind CSS:** For styling.
    * **API Communication:** (Specify if you used Fetch API, Axios, etc.).
* **Backend:**
    * **Spring Boot (Java):** Framework for the RESTful API.
    * **Spring Security:** For authentication and authorization.
    * **JPA / Hibernate:** For database interaction.
    * **Maven:** Build tool.
* **Database:**
    * **MySQL:** Relational database for persistent data storage.

---

## 🚀 Getting Started

To run the full Mentor Booking Platform application locally, you need to set up and run both the backend and frontend projects.

### Prerequisites

Make sure you have the following installed:

* **Node.js & npm** (or yarn)
* **Java Development Kit (JDK)** (Version 8 or higher)
* **Maven** (or Gradle)
* **MySQL Server**

### Installation

1.  **Clone Repositories:** Clone both the backend and frontend repositories from GitHub:
    ```bash
    # Clone the backend repository
    git clone https://github.com/Ubaidulla1810/mentor-booking-backend.git

    # Clone the frontend repository
    git clone https://github.com/Ubaidulla1810/mentor-booking-backend/blob/master/README.md
    ```
    Navigate into the respective project directories (`cd mentorbooking` and `cd mb_frontend`).

2.  **Backend Setup:**
    * Follow the instructions in the [Backend README]for setting up the MySQL database and configuring the backend's `application.properties` with your local MySQL credentials.
    * Build and run the backend application. Ensure it is running on `http://localhost:8080` (or the configured port).
    * [Link to Backend README: https://github.com/Ubaidulla1810/mentor-booking-backend/blob/master/README.md]

3.  **Frontend Installation:**
    * Navigate into the frontend project directory:
        ```bash
        cd mb_frontend
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        # or
        yarn install
        ```

### Running the Application (Frontend)

1.  Ensure your **Spring Boot Backend is running** on `http://localhost:8080`.
2.  Start the frontend development server from the frontend project directory:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3.  Open your web browser and visit the address provided by Vite (usually `http://localhost:5173`).

The frontend should now be running and able to communicate with your local backend.

---

## 💡 Usage

* Navigate through the application using the links provided in the UI.
* Explore mentors on the Home page.
* Click on mentors to view details and availability.
* Register or Log In to book sessions.
* If you have an Admin account, you can use tools like Postman  to add mentors and availability by hitting the backend API endpoints directly.

---

## 👤 Authorship

Made with 🤍 by Ubaidulla khan. Mentor Booking Platform.

---

## 📞 Contact

Connect with Me:

* If you have any feedback or suggestions, feel free to reach out:
* Email: ubaidulla.cse01@gmail.com
* GitHub: [Ubaidulla1810](https://github.com/Ubaidulla1810)

---

## 🔒 License

All Rights Reserved. Standard Copyright Applies.

This project is copyrighted by Ubaidulla khan. You may view the code publicly on GitHub, but copying, distribution, or modification requires explicit permission from the author.

---

---