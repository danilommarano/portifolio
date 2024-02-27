# Raw Next.js + Pocketbase + Nginx

This project demonstrates a setup integrating Next.js, Pocketbase, and Nginx within a Docker environment.  

**Features**

* Next.js for a dynamic frontend application framework
* Pocketbase as a backend providing database and API functionalities
* Nginx as a reverse proxy and web server

**Prerequisites**

* Docker
* Docker Compose
* Basic understanding of Next.js, Pocketbase, and Nginx configuration

**Getting Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danilommarano/raw-nextjs-pocketbase-nginx.git
   ```

2. **Build the Docker images:**
   ```bash
   cd raw-nextjs-pocketbase-nginx
   docker-compose build
   ```

3. **Start the containers:**
   ```bash
   docker-compose up -d
   ```

**Accessing the Application**

* **Frontend:** http://localhost (Next.js)
* **Pocketbase Admin:** http://localhost/api/ 

**Project Structure**

* `nextjs/`
    * Contains the source code for your Next.js application
* `pocketbase/`
    * Contains the Dockerfile for the Pocketbase image
* `nginx/`
    * Contains the `default.conf` configuration file for Nginx
* `docker-compose.yml`
    * Configuration for Docker Compose specifying the services and their relationships

**Important Notes**

* For production environments, consider:
   * **Persistent storage:** Using volumes or AWS EBS to retain Pocketbase data.
   * **Security:** Hardening your EC2 instance and implementing HTTPS.
   * **Load Balancing:**  Scaling with AWS load balancers if you expect high traffic.

**Support**

If you have questions or encounter issues, feel free to open an issue in this repository.

**Let me know if you'd like any specific sections expanded or any further details added to the README!**

