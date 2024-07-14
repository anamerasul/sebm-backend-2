const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const base64 = require('base-64');

const app = express();
const PORT = process.env.port|| 8082;

// MySQL database connection configuration
const db = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'Admin@123', // Add your MySQL password here
    // database: 'sebm'
    
     host: 'localhost',
    user: 'sebmnew',
    password: '6d96718b13',
    database: 'sebmnew',
    port: 3307,
    
    charset: 'utf8mb4'
    
    
    //  host: '49.12.80.144',
    // user: 'sparkfi2_sebm',
    // password: 'sparkfi2_sebm',
    // database: 'sparkfi2_sebm',
    // port: 3306
});

// Connect to the MySQL database
// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database');

//     // Fetch data from API
//     const userId = '6117c0f79d972c74fd7c2f54';
//     const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285'; // Replace 'your_api_secret_here' with your actual API secret

//     const authString = userId + ':' + apiSecret;
//     const encodedAuthString = base64.encode(authString);

//     const config = {
//         headers: {
//             'Authorization': 'Basic ' + encodedAuthString
//         }
//     };

//     const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

//     // Truncate existing data from leaderboard table
//     const truncateQuery = 'TRUNCATE TABLE leaderboard';
//     db.query(truncateQuery, (err, result) => {
//         if (err) throw err;
//         console.log('Truncated existing data from leaderboard table');

//         axios.get(apiUrl, config)
//             .then(response => {
//                 const leaderboardData = response.data.data;

//                 // Insert data into leaderboard table
//                 const insertQuery = 'INSERT INTO leaderboard (userId, username, xp) VALUES ?';
//                 const values = leaderboardData.map(entry => [entry.userId, entry.username, entry.xp]);

//                 db.query(insertQuery, [values], (err, result) => {
//                     if (err) throw err;
//                     console.log('Inserted data into leaderboard table');

//                     // Terminate the process after completing data insertion
//                     process.exit();
//                 });
//             })
//             .catch(error => console.error('Error fetching data from API:', error));
//     });
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database');

//     // Fetch data from API
//     const userId = '6117c0f79d972c74fd7c2f54';
//     const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285'; // Replace 'your_api_secret_here' with your actual API secret

//     const authString = userId + ':' + apiSecret;
//     const encodedAuthString = base64.encode(authString);

//     const config = {
//         headers: {
//             'Authorization': 'Basic ' + encodedAuthString
//         }
//     };

//     const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

//     // Truncate existing data from leaderboard table
//     const truncateQuery = 'TRUNCATE TABLE leaderboard';
//     db.query(truncateQuery, (err, result) => {
//         if (err) throw err;
//         console.log('Truncated existing data from leaderboard table');

//         axios.get(apiUrl, config)
//             .then(response => {
//                 const leaderboardData = response.data.data;

//                 // Check if each entry already exists in the leaderboard table
//                 const checkQuery = 'SELECT userId FROM leaderboard WHERE userId = ?';
//                 Promise.all(leaderboardData.map(entry => {
//                     return new Promise((resolve, reject) => {
//                         db.query(checkQuery, entry.userId, (err, result) => {
//                             if (err) {
//                                 reject(err);
//                             } else {
//                                 resolve(result.length === 0); // Resolve with true if entry doesn't exist, false otherwise
//                             }
//                         });
//                     });
//                 }))
//                 .then(results => {
//                     // Filter out data that already exists in the leaderboard table
//                     const filteredData = leaderboardData.filter((entry, index) => results[index]);

//                     // Insert filtered data into leaderboard table
//                     const insertQuery = 'INSERT INTO leaderboard (userId, username, xp) VALUES ?';
//                     const values = filteredData.map(entry => [entry.userId, entry.username, entry.xp]);

//                     db.query(insertQuery, [values], (err, result) => {
//                         if (err) throw err;
//                         console.log('Inserted data into leaderboard table');

//                         // Terminate the process after completing data insertion
//                         process.exit();
//                     });
//                 })
//                 .catch(error => console.error('Error checking data in leaderboard table:', error));
//             })
//             .catch(error => console.error('Error fetching data from API:', error));
//     });
// });

// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');

//     // Fetch data from API
//     const userId = '6117c0f79d972c74fd7c2f54';
//     const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285'; // Replace 'your_api_secret_here' with your actual API secret

//     const authString = userId + ':' + apiSecret;
//     const encodedAuthString = base64.encode(authString);

//     const config = {
//         headers: {
//             'Authorization': 'Basic ' + encodedAuthString
//         }
//     };

//     const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

//     // Truncate existing data from leaderboard table
//     const truncateQuery = 'TRUNCATE TABLE leaderboard';
//     db.query(truncateQuery, (err, result) => {
//         if (err) {
//             console.error('Error truncating data from leaderboard table:', err);
//             return;
//         }
//         console.log('Truncated existing data from leaderboard table');

//         axios.get(apiUrl, config)
//             .then(response => {
//                 const leaderboardData = response.data.data;

//                 // Prepare values for bulk insert without duplicates
//                 const values = leaderboardData.map(entry => [entry.userId, entry.username, entry.xp]);
//                 const insertQuery = `
//                     INSERT INTO leaderboard (userId, username, xp) 
//                     SELECT * FROM (SELECT ? AS userId, ? AS username, ? AS xp) AS tmp 
//                     WHERE NOT EXISTS (
//                         SELECT userId FROM leaderboard WHERE userId = ?
//                     )
//                     LIMIT 1
//                 `;

//                 // Insert data into leaderboard table without duplicates
//                 leaderboardData.forEach(entry => {
//                     db.query(insertQuery, [entry.userId, entry.username, entry.xp, entry.userId], (err, result) => {
//                         if (err) console.error('Error inserting data into leaderboard table:', err);
//                     });
//                 });

//                 console.log('Inserted data into leaderboard table');

//                 // Terminate the process after completing data insertion
//                 process.exit();
//             })
//             .catch(error => console.error('Error fetching data from API:', error));
//     });
// });

// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');

//     // Fetch data from API
//     const userId = '6117c0f79d972c74fd7c2f54';
//     const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285'; // Replace 'your_api_secret_here' with your actual API secret

//     const authString = userId + ':' + apiSecret;
//     const encodedAuthString = base64.encode(authString);

//     const config = {
//         headers: {
//             'Authorization': 'Basic ' + encodedAuthString
//         }
//     };

//     const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

//     axios.get(apiUrl, config)
//         .then(response => {
//             const leaderboardData = response.data.data;

//             // Prepare values for bulk insert without duplicates
//             const values = leaderboardData.map(entry => [entry.userId, entry.username, entry.xp]);
//             const insertQuery = `
//                 INSERT INTO leaderboard (userId, username, xp) 
//                 SELECT * FROM (SELECT ? AS userId, ? AS username, ? AS xp) AS tmp 
//                 WHERE NOT EXISTS (
//                     SELECT userId FROM leaderboard WHERE userId = ?
//                 )
//                 LIMIT 1
//             `;

//             // Insert data into leaderboard table without duplicates
//             leaderboardData.forEach(entry => {
//                 db.query(insertQuery, [entry.userId, entry.username, entry.xp, entry.userId], (err, result) => {
//                     if (err) console.error('Error inserting data into leaderboard table:', err);
//                 });
//             });

//             console.log('Inserted data into leaderboard table');

//             // Terminate the process after completing data insertion
//             process.exit();
//         })
//         .catch(error => console.error('Error fetching data from API:', error));
// });

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    // Fetch data from API
    const userId = '6117c0f79d972c74fd7c2f54';
    const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285'; // Replace 'your_api_secret_here' with your actual API secret

    const authString = userId + ':' + apiSecret;
    const encodedAuthString = base64.encode(authString);

    const config = {
        headers: {
            'Authorization': 'Basic ' + encodedAuthString
        }
    };

    const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

    // Truncate existing data from leaderboard table
    const truncateQuery = 'TRUNCATE TABLE leaderboard';
    db.query(truncateQuery, (err, result) => {
        if (err) throw err;
        console.log('Truncated existing data from leaderboard table');

        axios.get(apiUrl, config)
            .then(response => {
                const leaderboardData = response.data.data;

                // Filter out entries that already exist in the leaderboard table
                const filteredData = leaderboardData.filter(entry => {
                    return new Promise((resolve, reject) => {
                        const checkQuery = 'SELECT userId FROM leaderboard WHERE userId = ?';
                        db.query(checkQuery, [entry.userId], (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result.length === 0); // Resolve with true if entry doesn't exist, false otherwise
                            }
                        });
                    });
                });

                // Insert filtered data into leaderboard table
                const insertQuery = 'INSERT INTO leaderboard (userId, username, xp) VALUES ?';
                const values = filteredData.map(entry => [entry.userId, entry.username, entry.xp]);

                db.query(insertQuery, [values], (err, result) => {
                    if (err) throw err;
                    console.log('Inserted data into leaderboard table');
                    
                     // Log the counts
                    const dataFetched = leaderboardData.length;
                    const dataInserted = result.affectedRows;
                    console.log(`Data fetched from the API: ${dataFetched}`);
                    console.log(`Entries inserted into the database: ${dataInserted}`);

                    // Terminate the process after completing data insertion
                    process.exit();
                });
            })
            .catch(error => console.error('Error fetching data from API:', error));
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});