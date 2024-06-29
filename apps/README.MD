# Instructions to Clone and Set Up the Repository

## Prerequisites
1. **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Git**: Ensure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).


## 1. Clone the Repository
1. Open your terminal (Command Prompt, PowerShell, Git Bash, etc.).
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

```sh
git clone https://github.com/selimharfouche/wellplates.git
cd wellplates
```

## 2. Set Up Environment Variables

### 2.1. Create `.env` in the `apps/client` Directory

Run the following commands to create the `.env` file and set the environment variable:

```sh
echo "REACT_APP_API_BASE_URL=http://localhost:3001" > apps/client/.env
```

### 2.2. Create `.env` in the `apps/server` Directory

Run the following commands to create the `.env` file and set the environment variables:

```
echo "MONGODB_URI=your-mongodb-connection-string" > apps/server/.env
echo "PORT=3001" >> apps/server/.env
```

Replace `your-mongodb-connection-string` with your actual MongoDB connection string.

## 3. Install Dependencies

You can install dependencies for both the client and server without changing directories by using the `--prefix` flag:

```sh
npm install --prefix apps/client && npm install --prefix apps/server
```

## 4. Start App

#### Use `npm start` for both server and client

```sh
(npm start --prefix apps/server) & (npm start --prefix apps/client)
```

### Alternative: Using `vercel dev` for both server and client

```sh
(vercel dev --cwd apps/server) & (vercel dev --cwd apps/client)
```

## What to Do If Port 3001 Is Already in Use

If port 3001 is already in use, you can either kill the process using the port or change the ports in the configuration files.

### Kill the Process Using the Port

**On macOS or Linux:** 

```sh
lsof -i :3001
kill <PID>
```
<PID> being your process name

**On Windows:**(not tested)

```sh
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Alternatively, Change the Ports in the Configuration Files

1. **Change the Port in the `.env` file:**

Edit `apps/server/.env` to use a different port, e.g.,

```sh
PORT=3002
```

2. **Update the `REACT_APP_API_BASE_URL` in `apps/client/.env`:**

```sh
REACT_APP_API_BASE_URL=http://localhost:3002
```
