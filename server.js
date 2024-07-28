// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const axios = require('axios');
// const base64 = require('base-64');

// const app = express();
// app.use(cors());

// const db = mysql.createConnection({
//     host: '49.12.80.144',
//     user: 'sparkfi2_sebm',
//     password: 'sparkfi2_sebm',
//     database: 'sparkfi2_sebm',
//    port: 3306,
    
//     charset: 'utf8mb4'
    
    
//     // host: '49.12.80.144',
//     // user: 'sparkfi2_sebm',
//     // password: 'sparkfi2_sebm',
//     // database: 'sparkfi2_sebm',
//     // port: 3306
// });


// app.get('/cron-job', (req, res) => {
//     const userId = '6117c0f79d972c74fd7c2f54';
//     const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285';
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
//             console.error('Error truncating leaderboard table:', err);
//             return res.status(500).json({ message: 'Error truncating leaderboard table' });
//         }

//         console.log('Truncated existing data from leaderboard table');

//         axios.get(apiUrl, config)
//             .then(response => {
//                 const leaderboardData = response.data.data;

//                 // Filter out entries that already exist in the leaderboard table
//                 const filteredData = leaderboardData.filter(entry => {
//                     return new Promise((resolve, reject) => {
//                         const checkQuery = 'SELECT userId FROM leaderboard WHERE userId = ?';
//                         db.query(checkQuery, [entry.userId], (err, result) => {
//                             if (err) {
//                                 reject(err);
//                             } else {
//                                 resolve(result.length === 0); // Resolve with true if entry doesn't exist, false otherwise
//                             }
//                         });
//                     });
//                 });

//                 // Insert filtered data into leaderboard table
//                 const insertQuery = 'INSERT INTO leaderboard (userId, username, xp) VALUES ?';
//                 const values = filteredData.map(entry => [entry.userId, entry.username, entry.xp]);

//                 db.query(insertQuery, [values], (err, result) => {
//                     if (err) {
//                         console.error('Error inserting data into leaderboard table:', err);
//                         return res.status(500).json({ message: 'Error inserting data into leaderboard table' });
//                     }

//                     console.log('Inserted data into leaderboard table');
                    
//                     // Log the counts
//                     const dataFetched = leaderboardData.length;
//                     const dataInserted = result.affectedRows;
//                     console.log(`Data fetched from the API: ${dataFetched}`);
//                     console.log(`Entries inserted into the database: ${dataInserted}`);

//                     // Respond with success
//                     return res.status(200).json({
//                         message: 'Data fetched and inserted successfully',
//                         dataFetched,
//                         dataInserted
//                     });
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching data from API:', error);
//                 return res.status(500).json({ message: 'Error fetching data from API' });
//             });
//     });
// });


// // Endpoint to get all bonuses
// app.get('/bonuses', (req, res) => {
//     const sql = `SELECT * FROM bonuses`;
//     db.query(sql, (err, data) => {
//         if (err) return res.status(500).json({ message: "Internal server error." });
//         return res.status(200).json(data);
//     });
// });

// // Endpoint to get top 10 users from leaderboard
// app.get('/leaderboard', (req, res) => {
// const sql = `SELECT * FROM leaderboard ORDER BY CAST(xp AS SIGNED) DESC LIMIT 10`;
// db.query(sql, (err, data) => {
// if (err) return res.status(500).json({ message: "Internal server error." });
// return res.status(200).json(data);
// });
// });




const express = require('express');
const cors = require('cors');
const axios = require('axios');
const base64 = require('base-64');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(cors());

const uri = `mongodb+srv://mdanamerasulc:mdanamerasulc@cluster0.yioatww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function connectToMongoDB() {
  try {
    // await client.connect();
    // console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToMongoDB();

app.get('/cron-job', async (req, res) => {
  const userId = '6117c0f79d972c74fd7c2f54';
  const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285';
  const authString = userId + ':' + apiSecret;
  const encodedAuthString = base64.encode(authString);

  const config = {
    headers: {
      'Authorization': 'Basic ' + encodedAuthString
    }
  };

  const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

  try {
    const database = client.db('sebm');
    const leaderboardCollection = database.collection('leaderboard');

    // Truncate existing data from leaderboard collection
    await leaderboardCollection.deleteMany({});
    console.log('Truncated existing data from leaderboard collection');

    const response = await axios.get(apiUrl, config);
    const leaderboardData = response.data.data;

    // Insert data into leaderboard collection
    const insertResult = await leaderboardCollection.insertMany(leaderboardData);
    console.log('Inserted data into leaderboard collection');
    
    // Log the counts
    const dataFetched = leaderboardData.length;
    const dataInserted = insertResult.insertedCount;
    console.log(`Data fetched from the API: ${dataFetched}`);
    console.log(`Entries inserted into the database: ${dataInserted}`);

    // Respond with success
    return res.status(200).json({
      message: 'Data fetched and inserted successfully',
      dataFetched,
      dataInserted
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get all bonuses
app.get('/bonuses', async (req, res) => {
  try {
    const database = client.db('sebm');
    const bonusesCollection = database.collection('bonuses');
    const bonuses = await bonusesCollection.find({}).toArray();
    return res.status(200).json(bonuses);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get top 10 users from leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const database = client.db('sebm');
    const leaderboardCollection = database.collection('leaderboard');
    const topUsers = await leaderboardCollection.find({}).sort({ xp: -1 }).limit(10).toArray();
    return res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/show-api-json', async (req, res) => {
  const userId = '6117c0f79d972c74fd7c2f54';
  const apiSecret = 'cd592e901587ff78a35e4f5ef85a12585f2660fee0d434d5156674be65045285';
  const authString = userId + ':' + apiSecret;
  const encodedAuthString = base64.encode(authString);

  const config = {
    headers: {
      'Authorization': 'Basic ' + encodedAuthString
    }
  };

  const apiUrl = 'https://csgo500.com/api/v1/influencer/top-wager?period=monthly';

  try {
    const response = await axios.get(apiUrl, config);
    const leaderboardData = response.data.data;
    
    // Respond with the fetched data in JSON format
    return res.status(200).json(leaderboard)
                                

      
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

      });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




/*
// Endpoint to add a new bonus with image upload
app.post('/bonuses', (req, res) => {
    const { color, headline, conditions, link, image } = req.body;

    // Decode base64 image data
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const imageName = Date.now() + '.png';

    // Path to save the image
    const imagePath = '../sebm/src/assets/images' + imageName;

    // Write the image data to the file
    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." });
        }

        // Insert the bonus into the database with the image filename
        const sql = `INSERT INTO bonuses (color, image, headline, conditions, link) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [color, imageName, headline, conditions, link], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error." });
            }
            return res.status(201).json({ message: "Bonus added successfully." });
        });
    });
});

 Endpoint to delete a bonus
app.delete('/bonuses/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM bonuses WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error." });
        return res.status(200).json({ message: "Bonus deleted successfully." });
    });
});

// Endpoint to update a bonus
app.put('/bonuses/:id', (req, res) => {
    const id = req.params.id;
    const { color, image, headline, conditions, link } = req.body;
    const sql = `UPDATE bonuses SET color = ?, image = ?, headline = ?, conditions = ?, link = ? WHERE id = ?`;
    db.query(sql, [color, image, headline, conditions, link, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal server error." });
        return res.status(200).json({ message: "Bonus updated successfully." });
    });
});

*/








app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
